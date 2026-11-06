"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  Wrench,
  PlusCircle,
  LogOut,
  Building2,
  User,
} from "lucide-react";

export default function SidebarLocataire() {
  const pathname = usePathname();
  const { profile, logout } = useAuth();

  const navigation = [
    {
      name: "Tableau de Bord & Loyers",
      href: "/tableau-de-bord",
      icon: LayoutDashboard,
    },
    {
      name: "Mon Bail & Documents",
      href: "/documents",
      icon: FileText,
    },
    {
      name: "Mes Requêtes de Bris",
      href: "/requetes",
      icon: Wrench,
    },
    {
      name: "Nouvelle Requête",
      href: "/requetes/nouvelle",
      icon: PlusCircle,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col justify-between shrink-0">
      <div>
        {/* En-tête */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 space-x-2">
          <Building2 className="h-6 w-6 text-blue-400" />
          <span className="font-bold text-lg tracking-tight">Horizon Condos</span>
        </div>

        {/* Profil Locataire Badge */}
        <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-800 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
            {profile?.prenom ? profile.prenom[0] : "L"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate text-slate-100">
              {profile ? `${profile.prenom} ${profile.nom}` : "Locataire"}
            </p>
            <p className="text-xs text-blue-400 font-mono truncate">
              {profile?.condoAssigneId || "Unité locative"}
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-4 space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Déconnexion & Pied */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Building2 className="w-4 h-4" />
          <span>Retour au site public</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
        >
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
