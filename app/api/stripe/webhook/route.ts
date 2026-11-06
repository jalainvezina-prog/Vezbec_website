import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { adminDb } from "@/lib/firebase-admin";
import Stripe from "stripe";
import admin from "firebase-admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET n'est pas configuré.");
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur de validation webhook";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Traitement des événements Stripe
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (metadata && metadata.contratId && adminDb) {
      try {
        const montantEnDollars = session.amount_total ? session.amount_total / 100 : 0;
        const contratId = metadata.contratId;

        // Enregistrement dans la sous-collection Firestore : /contrats/{contratId}/paiements
        const paiementsRef = adminDb.collection("contrats").doc(contratId).collection("paiements");

        await paiementsRef.doc(session.id).set({
          montant: montantEnDollars,
          devise: session.currency || "cad",
          moisConcerne: metadata.moisConcerne || new Date().toISOString().substring(0, 7),
          dateTransaction: admin.firestore.FieldValue.serverTimestamp(),
          statut: "reussi",
          methodePaiement: "card",
          stripePaymentIntentId: session.payment_intent as string || session.id,
          stripeSessionId: session.id,
          locataireId: metadata.locataireId || null,
        });

        console.log(`Paiement ${session.id} validé et enregistré pour le contrat ${contratId}.`);
      } catch (dbError) {
        console.error("Erreur d'écriture Firestore lors du webhook:", dbError);
        return NextResponse.json({ error: "Erreur d'écriture base de données" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
