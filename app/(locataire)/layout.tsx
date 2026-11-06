"use client";

import React, { useEffect } from "react";
import SidebarLocataire from "@/components/SidebarLocataire";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function LocataireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Si la page est la page de connexion, on ne redirige pas
    if (pathname === "/connexion") return;

    if (!loading && !user) {
      router.push("/connexion");
    }
  }, [user, loading, router, pathname]);

  // Si on est sur la page de connexion, on affiche uniquement la page sans la sidebar
  if (pathname === "/connexion") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-600">Chargement de votre espace sécurisé...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <SidebarLocataire />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
