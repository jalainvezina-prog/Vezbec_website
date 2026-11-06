"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Building2, User, KeyRound } from "lucide-react";

export default function NavbarPublic() {
  const { user, profile } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Building2 className="h-7 w-7 text-blue-600" />
          <span className="font-bold text-xl text-slate-900 tracking-tight">
            Horizon Condos
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Accueil
          </Link>
          <Link href="/condos" className="hover:text-blue-600 transition-colors">
            Condos Disponibles
          </Link>
          <Link href="/services" className="hover:text-blue-600 transition-colors">
            Services Inclus
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          {user ? (
            <Link
              href={
                profile?.role === "gestion"
                  ? "/gestion"
                  : profile?.role === "maintenance"
                  ? "/maintenance"
                  : "/tableau-de-bord"
              }
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
            >
              <User className="w-4 h-4 mr-2" />
              Mon Espace ({profile?.prenom || "Connecté"})
            </Link>
          ) : (
            <Link
              href="/connexion"
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              <KeyRound className="w-4 h-4 mr-2" />
              Espace Locataire
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
