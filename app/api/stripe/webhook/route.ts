import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
  apiVersion: "2026-02-25.clover" as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret!);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const organizationId = session.metadata?.organizationId;
      const stripeSubscriptionId = session.subscription as string;
      const stripeCustomerId = session.customer as string;

      if (organizationId) {
        // Find the subscription details from Stripe
        const stripeSub = await stripe.subscriptions.retrieve(stripeSubscriptionId) as any;
        const planId = stripeSub.items.data[0].price.id;

        // Update organization with customer ID and create subscription record
        await prisma.organization.update({
          where: { id: organizationId },
          data: { 
            stripeCustomerId,
            subscriptions: {
              create: {
                stripeSubscriptionId,
                status: "ACTIVE",
                currentPeriodEnd: new Date(stripeSub.current_period_end * 1000),
                plan: {
                  connect: { priceId: planId }
                }
              }
            }
          }
        });
      }
      break;

    case "invoice.payment_succeeded":
      const invoice = event.data.object as any;
      if (invoice.subscription) {
        await prisma.subscription.update({
          where: { stripeSubscriptionId: invoice.subscription as string },
          data: {
            status: "ACTIVE",
            currentPeriodEnd: new Date((invoice.period_end ?? Date.now() / 1000) * 1000),
          }
        });
      }
      break;

    case "customer.subscription.deleted":
      const deletedSub = event.data.object as Stripe.Subscription;
      await prisma.subscription.update({
        where: { stripeSubscriptionId: deletedSub.id },
        data: { status: "CANCELED" }
      });
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
