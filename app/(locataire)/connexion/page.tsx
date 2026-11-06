"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Lock, Mail, AlertCircle, ArrowLeft } from "lucide-react";

export default function PageConnexionLocataire() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);
  const router = useRouter();

  const handleConnexion = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur(null);
    setChargement(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, motDePasse);
      const user = userCredential.user;

      // Validation stricte du profil dans Firestore
      const userDoc = await getDoc(doc(db, "utilisateurs", user.uid));
      if (!userDoc.exists()) {
        throw new Error("Compte utilisateur introuvable dans la base de données.");
      }

      const donnees = userDoc.data();
      if (donnees.role !== "locataire" && donnees.role !== "gestion") {
        await auth.signOut();
        throw new Error("Accès refusé. Cet espace est strictement réservé aux locataires.");
      }

      router.push("/tableau-de-bord");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur de connexion inattendue.";
      if (message.includes("auth/invalid-credential") || message.includes("auth/user-not-found")) {
        setErreur("Adresse courriel ou mot de passe incorrect.");
      } else {
        setErreur(message);
      }
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <Building2 className="h-10 w-10" />
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">Horizon Condos</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold text-slate-900 tracking-tight">
          Portail Locataire Sécurisé
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Consultez votre bail, payez votre loyer et suivez vos requêtes
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-200">
          {erreur && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span>{erreur}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleConnexion}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Adresse courriel
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm"
                  placeholder="locataire@exemple.ca"
                />
              </div>
            </div>

            <div>
              <label htmlFor="motDePasse" className="block text-sm font-semibold text-slate-700">
                Mot de passe
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="motDePasse"
                  name="motDePasse"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-slate-600 text-xs">
                  Rester connecté
                </label>
              </div>
              <Link href="/contact" className="text-xs font-semibold text-blue-600 hover:text-blue-500">
                Mot de passe oublié ?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                disabled={chargement}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300"
              >
                {chargement ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    <span>Authentification...</span>
                  </span>
                ) : (
                  "Accéder à mon espace"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <Link href="/" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Retourner au site public
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
