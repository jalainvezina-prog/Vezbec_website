#!/usr/bin/env bash
# ==============================================================================
# Script d'automatisation : Configuration des Secrets GitHub Actions (GCP & Vercel)
# ==============================================================================
set -euo pipefail

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

TEMP_KEY_FILE="$(mktemp -t firebase-sa-key-XXXXXX.json)"
cleanup() {
    if [[ -f "$TEMP_KEY_FILE" ]]; then
        rm -f "$TEMP_KEY_FILE"
    fi
}
trap cleanup EXIT INT TERM

echo -e "${CYAN}================================================================${NC}"
echo -e "${CYAN}  Automatisation CI/CD : Configuration des Secrets GitHub Actions ${NC}"
echo -e "${CYAN}================================================================${NC}\n"

# ------------------------------------------------------------------------------
# 1. Vérification des outils CLI requis
# ------------------------------------------------------------------------------
echo -e "${BLUE}[1/5] Vérification des dépendances locales...${NC}"

verifier_commande() {
    if ! command -v "$1" &> /dev/null; then
        echo -e "${RED}Erreur : '$1' n'est pas installé ou n'est pas dans le PATH.${NC}"
        echo -e "${YELLOW}Veuillez installer $1 : $2${NC}"
        return 1
    fi
    echo -e "  ${GREEN}✔${NC} $1 détecté."
    return 0
}

MISSING_TOOLS=0
verifier_commande "gh" "https://cli.github.com/" || MISSING_TOOLS=1
verifier_commande "gcloud" "https://cloud.google.com/sdk/docs/install" || MISSING_TOOLS=1

if [[ $MISSING_TOOLS -ne 0 ]]; then
    echo -e "\n${RED}Arrêt : certaines dépendances sont manquantes.${NC}"
    exit 1
fi

# ------------------------------------------------------------------------------
# 2. Détection du dépôt GitHub & Git
# ------------------------------------------------------------------------------
echo -e "\n${BLUE}[2/5] Détection du dépôt GitHub...${NC}"

if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}Vous n'êtes pas connecté à GitHub CLI. Connexion requise :${NC}"
    gh auth login
else
    echo -e "  ${GREEN}✔${NC} Authentifié sur GitHub CLI."
fi

GH_REPO_FLAG=()
TARGET_REPO=""

# Vérification si le dossier est un dépôt Git avec remote
if git rev-parse --is-inside-work-tree &> /dev/null; then
    REMOTE_URL="$(git config --get remote.origin.url 2>/dev/null || true)"
    if [[ -n "$REMOTE_URL" ]]; then
        echo -e "  ${GREEN}✔${NC} Dépôt Git local détecté lié à : ${REMOTE_URL}"
    else
        echo -e "${YELLOW}  Dépôt Git local sans 'origin' distant configuré.${NC}"
    fi
else
    echo -e "${YELLOW}  Le dossier actuel n'est pas encore un dépôt Git (.git absent).${NC}"
fi

# Si aucun dépôt n'est déduit automatiquement par gh, demander le nom OWNER/REPO
if ! gh repo view &> /dev/null; then
    echo -e "${CYAN}  Indiquez le nom du dépôt GitHub cible où injecter les secrets (ex: mon-utilisateur/mon-projet)${NC}"
    read -rp "Dépôt GitHub [propriétaire/nom_depot] : " TARGET_REPO
    while [[ -z "$TARGET_REPO" ]]; do
        read -rp "Veuillez renseigner un dépôt valide (ex: mon-utilisateur/mon-projet) : " TARGET_REPO
    done
    GH_REPO_FLAG=("-R" "$TARGET_REPO")
    echo -e "  ${GREEN}✔${NC} Dépôt cible sélectionné : ${TARGET_REPO}"
else
    CURRENT_REPO="$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || true)"
    echo -e "  ${GREEN}✔${NC} Dépôt GitHub identifié : ${CURRENT_REPO}"
fi

# ------------------------------------------------------------------------------
# 3. Configuration Google Cloud & Firebase Service Account
# ------------------------------------------------------------------------------
echo -e "\n${BLUE}[3/5] Génération du compte de service GCP et de la clé Firebase...${NC}"

GCP_CURRENT_PROJECT="$(gcloud config get-value project 2>/dev/null || true)"
read -rp "Identifiant du projet GCP (Défaut: [${GCP_CURRENT_PROJECT}]): " GCP_PROJECT_INPUT
GCP_PROJECT="${GCP_PROJECT_INPUT:-$GCP_CURRENT_PROJECT}"

if [[ -z "$GCP_PROJECT" ]]; then
    echo -e "${RED}L'ID de projet GCP ne peut pas être vide.${NC}"
    exit 1
fi

SERVICE_ACCOUNT_NAME="github-deployer"
SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_NAME}@${GCP_PROJECT}.iam.gserviceaccount.com"

echo -e "  Vérification de l'existence du compte de service [${SERVICE_ACCOUNT_EMAIL}]..."
if ! gcloud iam service-accounts describe "$SERVICE_ACCOUNT_EMAIL" --project="$GCP_PROJECT" &> /dev/null; then
    echo -e "  Création du compte de service [${SERVICE_ACCOUNT_NAME}]..."
    gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME" \
        --description="Compte automatise pour deploiement CI/CD GitHub Actions" \
        --display-name="GitHub Deployer Agent" \
        --project="$GCP_PROJECT"
else
    echo -e "  ${GREEN}✔${NC} Le compte de service existe déjà."
fi

echo -e "  Attribution des rôles IAM requis..."
ROLES=(
    "roles/firebaserules.admin"
    "roles/firebase.admin"
    "roles/storage.admin"
)

for ROLE in "${ROLES[@]}"; do
    echo -e "  - Attribution de ${ROLE}..."
    gcloud projects add-iam-policy-binding "$GCP_PROJECT" \
        --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
        --role="$ROLE" \
        --condition=None \
        --quiet &> /dev/null
done
echo -e "  ${GREEN}✔${NC} Rôles IAM configurés avec succès."

echo -e "  Génération d'une nouvelle clé privée JSON temporaire..."
gcloud iam service-accounts keys create "$TEMP_KEY_FILE" \
    --iam-account="$SERVICE_ACCOUNT_EMAIL" \
    --project="$GCP_PROJECT" \
    --quiet

echo -e "  Injection de FIREBASE_SERVICE_ACCOUNT_KEY dans GitHub Secrets..."
gh secret set FIREBASE_SERVICE_ACCOUNT_KEY "${GH_REPO_FLAG[@]}" < "$TEMP_KEY_FILE"
echo -e "  ${GREEN}✔${NC} Secret GitHub FIREBASE_SERVICE_ACCOUNT_KEY configuré."

# ------------------------------------------------------------------------------
# 4. Configuration Vercel (Token, Org ID, Project ID)
# ------------------------------------------------------------------------------
echo -e "\n${BLUE}[4/5] Configuration des identifiants Vercel...${NC}"

DETECTED_ORG_ID=""
DETECTED_PROJECT_ID=""
if [[ -f ".vercel/project.json" ]]; then
    DETECTED_ORG_ID=$(grep -o '"orgId": *"[^"]*"' .vercel/project.json | cut -d'"' -f4 || true)
    DETECTED_PROJECT_ID=$(grep -o '"projectId": *"[^"]*"' .vercel/project.json | cut -d'"' -f4 || true)
    echo -e "  ${GREEN}✔${NC} Fichier .vercel/project.json détecté localement."
fi

read -rp "Entrez votre VERCEL_TOKEN (https://vercel.com/account/tokens): " VERCEL_TOKEN_INPUT
if [[ -z "$VERCEL_TOKEN_INPUT" ]]; then
    echo -e "${RED}Le token Vercel est obligatoire pour le déploiement headless.${NC}"
    exit 1
fi
echo "$VERCEL_TOKEN_INPUT" | gh secret set VERCEL_TOKEN "${GH_REPO_FLAG[@]}"
echo -e "  ${GREEN}✔${NC} Secret VERCEL_TOKEN injecté."

read -rp "VERCEL_ORG_ID [${DETECTED_ORG_ID}]: " VERCEL_ORG_INPUT
FINAL_ORG_ID="${VERCEL_ORG_INPUT:-$DETECTED_ORG_ID}"
if [[ -n "$FINAL_ORG_ID" ]]; then
    echo "$FINAL_ORG_ID" | gh secret set VERCEL_ORG_ID "${GH_REPO_FLAG[@]}"
    echo -e "  ${GREEN}✔${NC} Secret VERCEL_ORG_ID injecté."
else
    echo -e "${YELLOW}  Attention : VERCEL_ORG_ID non renseigné.${NC}"
fi

read -rp "VERCEL_PROJECT_ID [${DETECTED_PROJECT_ID}]: " VERCEL_PROJECT_INPUT
FINAL_PROJECT_ID="${VERCEL_PROJECT_INPUT:-$DETECTED_PROJECT_ID}"
if [[ -n "$FINAL_PROJECT_ID" ]]; then
    echo "$FINAL_PROJECT_ID" | gh secret set VERCEL_PROJECT_ID "${GH_REPO_FLAG[@]}"
    echo -e "  ${GREEN}✔${NC} Secret VERCEL_PROJECT_ID injecté."
else
    echo -e "${YELLOW}  Attention : VERCEL_PROJECT_ID non renseigné.${NC}"
fi

# ------------------------------------------------------------------------------
# 5. Configuration optionnelle Stripe
# ------------------------------------------------------------------------------
echo -e "\n${BLUE}[5/5] Configuration des clés Stripe (Optionnel)...${NC}"
read -rp "Souhaitez-vous configurer les clés Stripe dès maintenant ? (o/N): " REPONSE_STRIPE
if [[ "$REPONSE_STRIPE" =~ ^[oOyY]$ ]]; then
    read -rp "STRIPE_SECRET_KEY (sk_live_... ou sk_test_...): " STRIPE_KEY
    if [[ -n "$STRIPE_KEY" ]]; then
        echo "$STRIPE_KEY" | gh secret set STRIPE_SECRET_KEY "${GH_REPO_FLAG[@]}"
        echo -e "  ${GREEN}✔${NC} Secret STRIPE_SECRET_KEY injecté."
    fi

    read -rp "STRIPE_WEBHOOK_SECRET (whsec_...): " STRIPE_WEBHOOK
    if [[ -n "$STRIPE_WEBHOOK" ]]; then
        echo "$STRIPE_WEBHOOK" | gh secret set STRIPE_WEBHOOK_SECRET "${GH_REPO_FLAG[@]}"
        echo -e "  ${GREEN}✔${NC} Secret STRIPE_WEBHOOK_SECRET injecté."
    fi
fi

# ------------------------------------------------------------------------------
# Synthèse finale
# ------------------------------------------------------------------------------
echo -e "\n${GREEN}================================================================${NC}"
echo -e "${GREEN}  Félicitations ! Vos secrets GitHub Actions sont configurés.   ${NC}"
echo -e "${GREEN}================================================================${NC}"
echo -e "Liste des secrets configurés sur le dépôt distant :"
gh secret list "${GH_REPO_FLAG[@]}"

echo -e "\n${CYAN}La clé temporaire locale a été détruite avec succès.${NC}"
echo -e "${CYAN}Tout commit ou merge sur 'main' déclenchera automatiquement le workflow.${NC}\n"
