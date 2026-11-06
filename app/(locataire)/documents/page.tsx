"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { db, storage } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { FileText, Download, ShieldCheck, Clock, FileCheck } from "lucide-react";

interface ContratDocument {
  id: string;
  numeroBail: string;
  dateDebut: { toDate: () => Date };
  dateFin: { toDate: () => Date };
  urlFichierBailStorage: string;
  nomFichierOriginal: string;
  dateSignature?: { toDate: () => Date };
}

export default function PageDocumentsLocataire() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [baux, setBaux] = useState<ContratDocument[]>([]);
  const [chargement, setChargement] = useState(true);
  const [telechargementEnCours, setTelechargementEnCours] = useState<string | null>(null);

  const chargerDocuments = useCallback(async () => {
    if (!user) return;
    try {
      const q = query(collection(db, "contrats"), where("locataireId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const docs: ContratDocument[] = [];
      querySnapshot.forEach((d) => {
        docs.push({ id: d.id, ...d.data() } as ContratDocument);
      });
      setBaux(docs);
    } catch (err) {
      console.error("Erreur lors de la récupération des baux:", err);
    } finally {
      setChargement(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/connexion");
      return;
    }
    if (user) {
      chargerDocuments();
    }
  }, [user, loading, router, chargerDocuments]);

  const telechargerBail = async (storagePath: string, docId: string) => {
    try {
      setTelechargementEnCours(docId);
      const cheminNettoye = storagePath.startsWith("gs://")
        ? storagePath.replace(/gs:\/\/[^/]+\//, "")
        : storagePath;

      const fileRef = ref(storage, cheminNettoye);
      const url = await getDownloadURL(fileRef);

      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.click();
    } catch (err) {
      console.error("Erreur de téléchargement Storage:", err);
      alert("Impossible de générer le lien de téléchargement sécurisé du bail.");
    } finally {
      setTelechargementEnCours(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Documents et Baux Officiels
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Téléchargez vos copies légales de bail (Régie du logement / TAL) et leurs annexes
        </p>
      </div>

      {chargement ? (
        <div className="p-12 text-center text-slate-500">Chargement sécurisé de vos contrats...</div>
      ) : baux.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-lg mx-auto">
          <FileText className="w-12 h-12 mx-auto text-slate-400 mb-3" />
          <h3 className="text-lg font-bold text-slate-800">Aucun bail actuellement rattaché</h3>
          <p className="text-sm text-slate-500 mt-1">
            Votre bail est en cours de validation par la gestion et sera disponible sous 24h.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {baux.map((b) => (
            <div key={b.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {b.nomFichierOriginal || `Bail Officiel - ${b.numeroBail}`}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Période : {b.dateDebut?.toDate().toLocaleDateString("fr-CA")} au {b.dateFin?.toDate().toLocaleDateString("fr-CA")}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                    Certifié TAL
                  </span>
                </div>

                <div className="mt-6 bg-slate-50 rounded-xl p-3 text-xs text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Numéro de référence :</span>
                    <span className="font-mono font-semibold text-slate-800">{b.numeroBail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date de signature :</span>
                    <span className="font-medium text-slate-800">
                      {b.dateSignature?.toDate().toLocaleDateString("fr-CA") || "Signé numériquement"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Format PDF (Cloud Storage)</span>
                <button
                  onClick={() => telechargerBail(b.urlFichierBailStorage, b.id)}
                  disabled={telechargementEnCours === b.id}
                  className="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition disabled:bg-slate-300"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  {telechargementEnCours === b.id ? "Téléchargement..." : "Télécharger le bail"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
