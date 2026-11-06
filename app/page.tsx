import React from "react";
import Link from "next/link";
import NavbarPublic from "@/components/NavbarPublic";
import { Building2, ShieldCheck, CreditCard, Wrench, Search, CheckCircle2, ArrowRight } from "lucide-react";

export default function PageAccueilPublic() {
  const caracteristiques = [
    {
      icon: CreditCard,
      titre: "Paiement de loyer automatisé",
      desc: "Réglez votre loyer en toute sécurité par carte ou prélèvement grâce à l'infrastructure Stripe certifiée.",
    },
    {
      icon: Wrench,
      titre: "Maintenance réactive 24/7",
      desc: "Signalez un bris en 30 secondes avec photos. Suivi en temps réel de l'intervention de nos techniciens.",
    },
    {
      icon: ShieldCheck,
      titre: "Baux et documents certifiés",
      desc: "Accédez à votre bail légal et à vos quittances d'impôt en tout temps depuis votre espace sécurisé.",
    },
  ];

  const unitesEnVedette = [
    {
      id: "402",
      immeuble: "Tour Horizon - Unité 402",
      chambres: 2,
      sallesDeBain: 1.5,
      superficie: "920 pi²",
      loyer: "2 250 $",
      dispo: "1er Juillet 2025",
      photo: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "805",
      immeuble: "Tour Horizon - Unité 805 (Penthouse)",
      chambres: 3,
      sallesDeBain: 2,
      superficie: "1 250 pi²",
      loyer: "3 100 $",
      dispo: "Immédiate",
      photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "204",
      immeuble: "Tour Horizon - Unité 204",
      chambres: 1,
      sallesDeBain: 1,
      superficie: "640 pi²",
      loyer: "1 750 $",
      dispo: "1er Août 2025",
      photo: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavbarPublic />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 to-slate-900 text-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Building2 className="w-4 h-4" />
            <span>Plus de 1 000 condos gérés intelligemment</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Vivez l&apos;expérience locative <span className="text-blue-400">moderne & connectée</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light">
            Des condos urbains haut de gamme alliant confort supérieur, technologies écoénergétiques et gestion en ligne intégrale.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/condos"
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Explorer les condos disponibles</span>
            </Link>
            <Link
              href="/connexion"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur border border-white/20 transition flex items-center justify-center space-x-2"
            >
              <span>Accéder à l&apos;Espace Locataire</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Avantages Locataires */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Un portail pensé pour nos résidents</h2>
            <p className="text-slate-600 mt-3">Toutes vos démarches locatives accessibles 24/7 en quelques clics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caracteristiques.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 hover:shadow-md transition">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{c.titre}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Condos en vedette */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Unités disponibles immédiatement</h2>
              <p className="text-slate-600 mt-2">Réservez votre visite ou postulez directement en ligne.</p>
            </div>
            <Link href="/condos" className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center space-x-1 mt-4 md:mt-0">
              <span>Voir tout l&apos;inventaire</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {unitesEnVedette.map((u) => (
              <div key={u.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                <div>
                  <div className="h-52 w-full bg-cover bg-center" style={{ backgroundImage: `url(${u.photo})` }}>
                    <div className="p-4 flex justify-between">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow">
                        Dispo {u.dispo}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900">{u.immeuble}</h3>
                    <p className="text-2xl font-extrabold text-blue-600 mt-2">{u.loyer} <span className="text-xs font-normal text-slate-500">/ mois</span></p>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span>{u.chambres} Chambres</span>
                      <span>•</span>
                      <span>{u.sallesDeBain} SDB</span>
                      <span>•</span>
                      <span>{u.superficie}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    href={`/contact?condo=${u.id}`}
                    className="w-full block text-center py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition"
                  >
                    Planifier une visite
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2 text-white font-bold text-lg">
            <Building2 className="w-6 h-6 text-blue-500" />
            <span>Horizon Condos Locatifs</span>
          </div>
          <p>© {new Date().getFullYear()} Horizon Gestion Immobilière. Tous droits réservés.</p>
          <div className="flex space-x-6 text-xs">
            <Link href="/confidentialite" className="hover:text-white">Politique de confidentialité (Loi 25)</Link>
            <Link href="/conditions" className="hover:text-white">Conditions de location</Link>
            <Link href="/connexion" className="hover:text-white">Portail Résident</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
