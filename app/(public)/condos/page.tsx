import React from "react";
import NavbarPublic from "@/components/NavbarPublic";
import Link from "next/link";
import { Building2, Search, SlidersHorizontal, Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Condos à louer | Inventaire en temps réel - Horizon Condos",
  description: "Découvrez nos appartements et condos contemporains disponibles à la location. 3 1/2, 4 1/2, 5 1/2 et penthouses tout inclus.",
};

export default function PageCatalogueCondos() {
  const condos = [
    {
      id: "402",
      titre: "Condo 4 1/2 lumineux avec vue dégagée",
      numero: "Unité 402",
      immeuble: "Tour Horizon A",
      prix: 2250,
      chambres: 2,
      sallesDeBain: 1.5,
      superficie: 920,
      animaux: false,
      stationnement: true,
      balcon: true,
      photo: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "805",
      titre: "Penthouse de prestige avec terrasse privée",
      numero: "Unité 805",
      immeuble: "Tour Horizon A",
      prix: 3100,
      chambres: 3,
      sallesDeBain: 2,
      superficie: 1250,
      animaux: true,
      stationnement: true,
      balcon: true,
      photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "204",
      titre: "Condo urbain moderne idéal pour professionnel",
      numero: "Unité 204",
      immeuble: "Tour Horizon B",
      prix: 1750,
      chambres: 1,
      sallesDeBain: 1,
      superficie: 640,
      animaux: false,
      stationnement: false,
      balcon: true,
      photo: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "310",
      titre: "Spacieux condo 4 1/2 avec bureau à domicile",
      numero: "Unité 310",
      immeuble: "Tour Horizon B",
      prix: 2350,
      chambres: 2,
      sallesDeBain: 2,
      superficie: 980,
      animaux: true,
      stationnement: true,
      balcon: true,
      photo: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavbarPublic />

      <div className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Nos Condos Locatifs Disponibles</h1>
          <p className="mt-2 text-slate-400">
            Trouvez le logement qui correspond à votre style de vie. Plus de 1 000 unités de qualité supérieure.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Grille des condos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {condos.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div
                  className="h-56 w-full bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${c.photo})` }}
                >
                  <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full shadow">
                    Disponible
                  </span>
                </div>

                <div className="p-6">
                  <div className="text-xs font-semibold uppercase text-blue-600 tracking-wider">
                    {c.immeuble} • {c.numero}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{c.titre}</h3>
                  <div className="text-2xl font-extrabold text-slate-900 mt-3">
                    {c.prix.toLocaleString("fr-CA")} $ <span className="text-xs font-normal text-slate-500">/ mois</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs text-slate-600">
                    <div className="p-2 bg-slate-50 rounded">
                      <span className="font-bold text-slate-800 block text-sm">{c.chambres}</span>
                      Chambres
                    </div>
                    <div className="p-2 bg-slate-50 rounded">
                      <span className="font-bold text-slate-800 block text-sm">{c.sallesDeBain}</span>
                      SDB
                    </div>
                    <div className="p-2 bg-slate-50 rounded">
                      <span className="font-bold text-slate-800 block text-sm">{c.superficie}</span>
                      pi²
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                    {c.stationnement && <span className="px-2 py-1 bg-slate-100 rounded">Stationnement inclus</span>}
                    {c.balcon && <span className="px-2 py-1 bg-slate-100 rounded">Balcon</span>}
                    {c.animaux && <span className="px-2 py-1 bg-slate-100 rounded">Animaux admis</span>}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/contact?condo=${c.id}`}
                  className="w-full block text-center py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition"
                >
                  Déposer une candidature
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
