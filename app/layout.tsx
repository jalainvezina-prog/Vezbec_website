import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Horizon Condos Locatifs | Résidences modernes et gestion locative intelligente",
  description: "Découvrez nos unités de condos locatifs modernes. Gestion en ligne sécurisée des loyers, baux certifiés et requêtes de maintenance en direct.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://condos.vezbec.ca"),
  openGraph: {
    title: "Horizon Condos Locatifs",
    description: "Location de condos contemporains et portail locataire intégré.",
    siteName: "Horizon Condos",
    locale: "fr_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="h-full bg-slate-50 text-slate-900 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
