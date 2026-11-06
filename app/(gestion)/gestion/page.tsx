"use client";

import React from "react";
import Link from "next/link";
import { Building2, Users, FileSpreadsheet, Wrench, ArrowLeft, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function PortailGestion() {
  const { profile } = useAuth();

  const stats = [
    { label: "Unités Totales", valeur: "1 000", icon: Building2 },
    { label: "Taux d'occupation", valeur: "98.4 %", icon: Users },
    { label: "Baux Actifs", valeur: "984", icon: FileSpreadsheet },
    { label: "Tickets en cours", valeur: "12", icon: Wrench },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 text-purple-700 rounded-2xl">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Console de Gestion Immobilière
              </h1>
              <p className="text-sm text-slate-500">
                Supervision des 1 000 condos, baux légaux, encaissements et équipes terrain
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Site public
          </Link>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">{s.label}</span>
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-black text-slate-900 mt-3">{s.valeur}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center max-w-xl mx-auto">
          <h2 className="text-lg font-bold text-slate-800">Accès Administrateur Débloqué</h2>
          <p className="text-sm text-slate-600 mt-2">
            Connecté en tant que <strong className="text-slate-900">{profile?.email || "Gestionnaire"}</strong> (Rôle: {profile?.role || "gestion"}).
          </p>
        </div>
      </div>
    </div>
  );
}
