"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import Link from "next/link";
import { Wrench, Plus, Clock, AlertTriangle, CheckCircle, Image as ImageIcon } from "lucide-react";

interface TicketItem {
  id: string;
  numeroReference: string;
  titre: string;
  categorie: string;
  priorite: string;
  statut: string;
  description: string;
  dateCreation: Timestamp;
  photos: string[];
}

export default function PageListeTickets() {
  const { user, loading } = useAuth();
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [chargement, setChargement] = useState(true);

  const chargerTickets = useCallback(async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, "tickets"),
        where("locataireId", "==", user.uid),
        orderBy("dateCreation", "desc")
      );
      const snap = await getDocs(q);
      const liste: TicketItem[] = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      } as TicketItem));
      setTickets(liste);
    } catch (e) {
      console.error("Erreur de chargement des tickets:", e);
    } finally {
      setChargement(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      chargerTickets();
    }
  }, [user, chargerTickets]);

  const badgePriorite = (p: string) => {
    switch (p) {
      case "urgente":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">Urgente</span>;
      case "haute":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">Haute</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">Normale</span>;
    }
  };

  const badgeStatut = (s: string) => {
    switch (s) {
      case "resolu":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">Résolu</span>;
      case "en_cours":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">En intervention</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">Reçu / En attente</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Mes Requêtes de Maintenance
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Suivi en temps réel des réparations et interventions dans votre unité
          </p>
        </div>
        <Link
          href="/requetes/nouvelle"
          className="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          Signaler un nouveau bris
        </Link>
      </div>

      {chargement ? (
        <div className="p-12 text-center text-slate-500">Chargement de vos requêtes...</div>
      ) : tickets.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-lg mx-auto">
          <Wrench className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h3 className="text-lg font-bold text-slate-800">Aucune requête en cours</h3>
          <p className="text-sm text-slate-500 mt-1">
            Tout est en ordre dans votre condo ! Si un bris survient, signalez-le avec des photos.
          </p>
          <Link
            href="/requetes/nouvelle"
            className="mt-6 inline-block px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition"
          >
            Créer un ticket
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    {t.numeroReference}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{t.titre}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  {badgePriorite(t.priorite)}
                  {badgeStatut(t.statut)}
                </div>
              </div>

              <p className="text-sm text-slate-600 mt-3 leading-relaxed">{t.description}</p>

              {t.photos && t.photos.length > 0 && (
                <div className="mt-4 flex items-center space-x-3">
                  <span className="text-xs font-semibold text-slate-400 flex items-center">
                    <ImageIcon className="w-3.5 h-3.5 mr-1" />
                    {t.photos.length} photo(s) :
                  </span>
                  <div className="flex space-x-2">
                    {t.photos.map((url, i) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block w-12 h-12 rounded-lg overflow-hidden border border-slate-200 hover:opacity-80 transition">
                        <img src={url} alt="Incident" className="w-full h-full object-cover" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Catégorie : <strong className="text-slate-600 capitalize">{t.categorie}</strong></span>
                <span>Créé le {t.dateCreation?.toDate().toLocaleDateString("fr-CA")}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
