import { Timestamp } from "firebase/firestore";

export type RoleUtilisateur = "locataire" | "maintenance" | "gestion";
export type StatutCompte = "actif" | "suspendu" | "archive";
export type StatutCondo = "disponible" | "loue" | "maintenance" | "reserve";
export type StatutContrat = "actif" | "termine" | "resilie";
export type StatutPaiement = "en_attente" | "reussi" | "echoue" | "rembourse";
export type CategorieTicket = "plomberie" | "electricite" | "chauffage_climatisation" | "electromenagers" | "serrurerie" | "autre";
export type PrioriteTicket = "basse" | "normale" | "haute" | "urgente";
export type StatutTicket = "ouvert" | "en_cours" | "resolu" | "annule";

export interface Utilisateur {
  uid: string;
  email: string;
  prenom: string;
  nom: string;
  telephone: string;
  role: RoleUtilisateur;
  statutCompte: StatutCompte;
  condoAssigneId?: string;
  stripeCustomerId?: string;
  dateCreation: Timestamp;
  derniereConnexion?: Timestamp;
}

export interface Condo {
  id: string;
  numeroUnite: string;
  immeuble: string;
  adresse: {
    rue: string;
    ville: string;
    province: string;
    codePostal: string;
    pays: string;
  };
  caracteristiques: {
    chambres: number;
    sallesDeBain: number;
    superficiePiedsCarres: number;
    balcon: boolean;
    stationnementInclus: boolean;
    animauxPermis: boolean;
  };
  loyerMensuel: number;
  statut: StatutCondo;
  photos: string[];
  locataireActuelId?: string | null;
  seo: {
    titre: string;
    descriptionMeta: string;
    slug: string;
  };
  dateCreation: Timestamp;
  dateMiseAJour: Timestamp;
}

export interface Contrat {
  id: string;
  numeroBail: string;
  condoId: string;
  locataireId: string;
  dateDebut: Timestamp;
  dateFin: Timestamp;
  montantMensuel: number;
  jourEcheance: number;
  statut: StatutContrat;
  urlFichierBailStorage: string;
  nomFichierOriginal: string;
  depotSecurite: number;
  dateSignature: Timestamp;
}

export interface Paiement {
  id: string;
  montant: number;
  devise: string;
  moisConcerne: string;
  dateTransaction: Timestamp;
  statut: StatutPaiement;
  methodePaiement: "card" | "prelevement_bancaire" | "virement_interac";
  stripePaymentIntentId?: string;
  recuPdfUrl?: string;
}

export interface CommentaireTicket {
  auteurId: string;
  auteurNom: string;
  date: Timestamp;
  message: string;
}

export interface Ticket {
  id: string;
  numeroReference: string;
  locataireId: string;
  condoId: string;
  titre: string;
  description: string;
  categorie: CategorieTicket;
  priorite: PrioriteTicket;
  statut: StatutTicket;
  assigneA?: string | null;
  photos: string[];
  commentairesInternes: CommentaireTicket[];
  dateCreation: Timestamp;
  dateResolution?: Timestamp | null;
}
