"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { Wrench, UploadCloud, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const TAILLE_MAX_MO = 5;
const TAILLE_MAX_OCTETS = TAILLE_MAX_MO * 1024 * 1024;
const FORMATS_ACCEPTES = ["image/jpeg", "image/png", "image/webp"];

export default function FormulaireRequeteBris() {
  const { user, profile } = useAuth();
  const router = useRouter();

  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("plomberie");
  const [priorite, setPriorite] = useState("normale");
  const [description, setDescription] = useState("");
  const [fichiers, setFichiers] = useState<File[]>([]);
  const [erreursFichiers, setErreursFichiers] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);

  const handleSelectionFichier = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErreursFichiers(null);
    if (!e.target.files) return;

    const fichiersSelectionnes = Array.from(e.target.files);
    const fichiersValides: File[] = [];

    for (const f of fichiersSelectionnes) {
      if (!FORMATS_ACCEPTES.includes(f.type)) {
        setErreursFichiers(`Le fichier ${f.name} n'est pas un format valide (JPEG, PNG ou WEBP).`);
        return;
      }
      if (f.size > TAILLE_MAX_OCTETS) {
        setErreursFichiers(`Le fichier ${f.name} dépasse la limite autorisée de ${TAILLE_MAX_MO} Mo.`);
        return;
      }
      fichiersValides.push(f);
    }

    setFichiers(fichiersValides);
  };

  const soumettreTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Votre session a expiré. Veuillez vous reconnecter.");
      return;
    }

    setChargement(true);
    try {
      const urlsPhotos: string[] = [];
      const timestampDossier = Date.now();

      // Téléversement sécurisé vers Firebase Storage
      for (const [index, f] of fichiers.entries()) {
        const extension = f.name.split(".").pop();
        const cheminStorage = `tickets/${user.uid}/${timestampDossier}_incident_${index}.${extension}`;
        const storageRef = ref(storage, cheminStorage);

        const uploadResult = await uploadBytes(storageRef, f, {
          contentType: f.type,
          customMetadata: {
            uploadePar: user.uid,
            taille: f.size.toString(),
          },
        });

        const url = await getDownloadURL(uploadResult.ref);
        urlsPhotos.push(url);
      }

      // Création du document dans Firestore
      await addDoc(collection(db, "tickets"), {
        numeroReference: `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
        locataireId: user.uid,
        condoId: profile?.condoAssigneId || "Non assigné",
        titre,
        categorie,
        priorite,
        description,
        statut: "ouvert",
        assigneA: null,
        photos: urlsPhotos,
        commentairesInternes: [],
        dateCreation: serverTimestamp(),
        dateResolution: null,
      });

      router.push("/requetes");
    } catch (err) {
      console.error("Erreur création ticket:", err);
      alert("Une erreur est survenue lors de l'enregistrement de votre requête.");
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/requetes" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        Retour à la liste des requêtes
      </Link>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Wrench className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Signaler un bris ou un problème</h1>
        </div>
        <p className="text-sm text-slate-500 mb-8">
          Notre équipe technique est notifiée immédiatement et planifiera un passage dans votre unité.
        </p>

        {erreursFichiers && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 text-sm text-red-700">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <span>{erreursFichiers}</span>
          </div>
        )}

        <form onSubmit={soumettreTicket} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Titre de la requête *</label>
            <input
              type="text"
              required
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Ex: Fuite sous évier, lave-vaisselle bloqué..."
              className="mt-1.5 block w-full px-3.5 py-2.5 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Catégorie</label>
              <select
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                className="mt-1.5 block w-full px-3.5 py-2.5 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm bg-white"
              >
                <option value="plomberie">Plomberie</option>
                <option value="electricite">Électricité</option>
                <option value="chauffage_climatisation">Chauffage & Climatisation</option>
                <option value="electromenagers">Électroménagers</option>
                <option value="serrurerie">Serrurerie & Portes</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Niveau d&apos;urgence</label>
              <select
                value={priorite}
                onChange={(e) => setPriorite(e.target.value)}
                className="mt-1.5 block w-full px-3.5 py-2.5 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm bg-white"
              >
                <option value="basse">Basse (Amélioration mineure)</option>
                <option value="normale">Normale (Gêne sans risque direct)</option>
                <option value="haute">Haute (Perturbation importante)</option>
                <option value="urgente">Urgente (Dégât d&apos;eau, arrêt complet de chauffage)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Description détaillée du bris *</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez précisément ce qui se passe et l'endroit où se situe le problème dans le condo..."
              className="mt-1.5 block w-full px-3.5 py-2.5 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Photos justificatives (Optionnel, Max 5 Mo / photo)
            </label>
            <div className="mt-2 flex justify-center px-6 pt-6 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-blue-500 transition-colors">
              <div className="space-y-2 text-center">
                <UploadCloud className="mx-auto h-10 w-10 text-slate-400" />
                <div className="flex text-sm text-slate-600 justify-center">
                  <label htmlFor="photos-upload" className="relative cursor-pointer bg-white rounded-md font-semibold text-blue-600 hover:text-blue-500">
                    <span>Sélectionner des images</span>
                    <input
                      id="photos-upload"
                      name="photos-upload"
                      type="file"
                      multiple
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleSelectionFichier}
                      className="sr-only"
                    />
                  </label>
                </div>
                <p className="text-xs text-slate-400">PNG, JPG, WEBP acceptés jusqu&apos;à 5 Mo</p>
              </div>
            </div>

            {fichiers.length > 0 && (
              <ul className="mt-3 divide-y divide-slate-100 text-xs text-slate-600">
                {fichiers.map((f, i) => (
                  <li key={i} className="py-1.5 flex items-center justify-between">
                    <span className="font-medium text-slate-800">{f.name}</span>
                    <span className="text-slate-400">{(f.size / (1024 * 1024)).toFixed(2)} Mo</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={chargement}
              className="px-6 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 transition"
            >
              {chargement ? "Enregistrement..." : "Envoyer la requête"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
