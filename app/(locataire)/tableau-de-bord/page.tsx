"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { CreditCard, Calendar, CheckCircle2, Clock, AlertCircle, Download, FileText, ArrowUpRight } from "lucide-react";
import { formaterMontantCAD } from "@/lib/utils";

interface Contrat {
  id: string;
  montantMensuel: number;
  jourEcheance: number;
  condoId: string;
  statut: string;
  dateDebut: Timestamp;
  dateFin: Timestamp;
}

interface Paiement {
  id: string;
  montant: number;
  dateTransaction: Timestamp;
  statut: string;
  moisConcerne: string;
  recuPdfUrl?: string;
  methodePaiement: string;
}

export default function TableauDeBordFinancier() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  const [contrat, setContrat] = useState<Contrat | null>(null);
  const [paiements, setPaiements] = useState<Paiement[]>([]);
  const [chargementDonnees, setChargementDonnees] = useState(true);
  const [paiementEnCours, setPaiementEnCours] = useState(false);

  const chargerDonneesFinancieres = useCallback(async () => {
    if (!user) return;
    try {
      // 1. Récupérer le contrat actif
      const contratQuery = query(
        collection(db, "contrats"),
        where("locataireId", "==", user.uid),
        where("statut", "==", "actif")
      );
      const contratSnap = await getDocs(contratQuery);

      if (!contratSnap.empty) {
        const contratDoc = contratSnap.docs[0];
        const contratData = { id: contratDoc.id, ...contratDoc.data() } as Contrat;
        setContrat(contratData);

        // 2. Récupérer les paiements rattachés
        const paiementsQuery = query(
          collection(db, `contrats/${contratDoc.id}/paiements`),
          orderBy("dateTransaction", "desc")
        );
        const paiementsSnap = await getDocs(paiementsQuery);
        const listePaiements = paiementsSnap.docs.map(
          (d) => ({ id: d.id, ...d.data() } as Paiement)
        );
        setPaiements(listePaiements);
      }
    } catch (err) {
      console.error("Erreur de chargement des données financières:", err);
    } finally {
      setChargementDonnees(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/connexion");
      return;
    }
    if (user) {
      chargerDonneesFinancieres();
    }
  }, [user, loading, router, chargerDonneesFinancieres]);

  const initierPaiementStripe = async () => {
    if (!contrat || !user) return;
    setPaiementEnCours(true);

    const moisActuel = new Date().toLocaleDateString("fr-CA", { year: "numeric", month: "long" });

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contratId: contrat.id,
          montant: contrat.montantMensuel,
          locataireId: user.uid,
          condoNumero: profile?.condoAssigneId || "Unité",
          moisConcerne: moisActuel,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Impossible d'ouvrir le portail de paiement sécurisé.");
      }
    } catch (e) {
      console.error(e);
      alert("Erreur de communication avec le serveur Stripe.");
    } finally {
      setPaiementEnCours(false);
    }
  };

  if (loading || chargementDonnees) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-lg w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-44 bg-slate-200 rounded-2xl"></div>
          <div className="h-44 bg-slate-200 rounded-2xl"></div>
          <div className="h-44 bg-slate-200 rounded-2xl"></div>
        </div>
        <div className="h-72 bg-slate-200 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bonjour, {profile?.prenom || "Locataire"} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Unité active : <span className="font-semibold text-slate-800">{profile?.condoAssigneId || "En attente d'assignation"}</span>
          </p>
        </div>
        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 mr-1.5" />
          Bail certifié en vigueur
        </div>
      </div>

      {/* Cartes KPI Financières */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carte Loyer */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Loyer Mensuel</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 mt-4">
              {contrat?.montantMensuel ? formaterMontantCAD(contrat.montantMensuel) : "0,00 $"}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              Échéance : 1er du mois
            </p>
          </div>
          <button
            onClick={initierPaiementStripe}
            disabled={paiementEnCours || !contrat}
            className="mt-6 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md transition disabled:bg-slate-300 flex items-center justify-center space-x-2"
          >
            {paiementEnCours ? (
              <span>Redirection sécurisée...</span>
            ) : (
              <>
                <span>Payer le loyer en ligne</span>
                <ArrowUpRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Carte Statut & Période */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Période du bail</span>
              <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="text-sm font-semibold text-slate-800">
                Du {contrat?.dateDebut?.toDate().toLocaleDateString("fr-CA") || "N/A"}
              </div>
              <div className="text-sm font-semibold text-slate-800">
                Au {contrat?.dateFin?.toDate().toLocaleDateString("fr-CA") || "N/A"}
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Contrat ID</span>
            <span className="font-mono font-medium text-slate-700">{contrat?.id || "N/A"}</span>
          </div>
        </div>

        {/* Carte Sécurité & Stripe */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Paiement Garanti</span>
            <h3 className="text-lg font-bold mt-2">Passerelle Stripe SSL 256-bit</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Vos transactions sont cryptées de bout en bout. Nous ne conservons aucun numéro de carte sur nos serveurs.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between text-xs text-slate-300">
            <span>Visa • Mastercard • Amex</span>
            <span className="text-emerald-400 font-semibold">Protégé</span>
          </div>
        </div>
      </div>

      {/* Tableau d'Historique des Loyers */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Historique des transactions et reçus</h2>
            <p className="text-xs text-slate-500 mt-0.5">Téléchargez vos quittances officielles à des fins fiscales</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Mois</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date de règlement</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3.5 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Reçu fiscal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paiements.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-500">
                    <Clock className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                    Aucun paiement enregistré pour l&apos;instant.
                  </td>
                </tr>
              ) : (
                paiements.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                      {p.moisConcerne}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {p.dateTransaction?.toDate().toLocaleDateString("fr-CA")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                      {formaterMontantCAD(p.montant)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                        Payé
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      {p.recuPdfUrl ? (
                        <a
                          href={p.recuPdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-xs"
                        >
                          <Download className="w-3.5 h-3.5 mr-1" />
                          Télécharger
                        </a>
                      ) : (
                        <span className="text-slate-400 text-xs">Automatique</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
