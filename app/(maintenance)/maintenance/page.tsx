"use client";

import React from "react";
import Link from "next/link";
import { Wrench, CheckCircle, Clock, AlertTriangle, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function PortailMaintenance() {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
              <Wrench className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Portail Équipe Technique & Maintenance
              </h1>
              <p className="text-sm text-slate-500">
                Interventions d&apos;urgence, assignation des pièces et rapports de réparation
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

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center max-w-xl mx-auto">
          <h2 className="text-lg font-bold text-slate-800">Technicien Connecté</h2>
          <p className="text-sm text-slate-600 mt-2">
            Session active pour <strong className="text-slate-900">{profile?.email || "Technicien"}</strong> (Rôle: {profile?.role || "maintenance"}).
          </p>
        </div>
      </div>
    </div>
  );
}
