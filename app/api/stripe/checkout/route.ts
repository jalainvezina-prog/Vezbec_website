import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { contratId, montant, locataireId, condoNumero, moisConcerne } = await req.json();

    if (!contratId || !montant || !locataireId) {
      return NextResponse.json(
        { error: "Paramètres manquants pour initialiser la session de paiement." },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: `Loyer Condo #${condoNumero} - ${moisConcerne}`,
              description: `Règlement officiel du loyer pour le contrat ${contratId}`,
            },
            unit_amount: Math.round(montant * 100), // Montant en cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        contratId,
        locataireId,
        moisConcerne,
      },
      success_url: `${appUrl}/tableau-de-bord?statutPaiement=succes&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/tableau-de-bord?statutPaiement=annule`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Erreur Stripe Checkout Session:", error);
    const msg = error instanceof Error ? error.message : "Erreur interne de passerelle.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
