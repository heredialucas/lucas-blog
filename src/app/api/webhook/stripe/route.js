import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;

export async function POST(request) {
  const body = await request.text();
  const sig = (await headers()).get("stripe-signature");
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.log("⚠️  Webhook signature verification failed:", error.message);
    return NextResponse.json({
      error: "Webhook signature verification failed",
    });
  }

  let data = event.data;
  let eventType = event.type;
  let chargeId;
  let charge;
  let customerEmail = event.data.object.customer_email;

  try {
    switch (eventType) {
      case "checkout.session.completed":
        if (!customerEmail) {
          return NextResponse.json({
            error: "Customer email not found",
          });
        }

        const client = await prisma.client.update({
          where: {
            email: customerEmail,
          },
          data: {
            isSubscribed: true,
          },
        });

        if (client) {
          return NextResponse.json({
            message: "Checkout session completed",
          });
        } else {
          return NextResponse.json({
            error: "Client not found",
          });
        }
      case "charge.succeeded":
        chargeId = data.object.id;
        charge = await stripe.charges.retrieve(chargeId);
        if (!charge) {
          return NextResponse.json({
            error: "Charge not found",
          });
        }

        if (charge.billing_details) {
          const client = await prisma.client.update({
            where: {
              email: charge.billing_details.email,
            },
            data: {
              isSubscribed: true,
            },
          });
          if (client) {
            return NextResponse.json({
              message: "Charge succeeded",
            });
          } else {
            return NextResponse.json({
              error: "Client not found",
            });
          }
        }

      case "charge.refunded":
        chargeId = data.object.id;
        charge = await stripe.charges.retrieve(chargeId);
        if (!charge) {
          return NextResponse.json({
            error: "Charge not found",
          });
        }

        if (charge.billing_details) {
          const client = await prisma.client.update({
            where: {
              email: charge.billing_details.email,
            },
            data: {
              isSubscribed: false,
            },
          });
          if (client) {
            return NextResponse.json({
              message: "Charge refunded",
            });
          } else {
            return NextResponse.json({
              error: "Client not found",
            });
          }
        }
      case "charge.failed":
        return NextResponse.json({
          message: "Charge failed",
        });
      default:
        console.log("\n");
        console.log(`Unhandled event type ${eventType}.`);
        return NextResponse.json({ error: "Unhandled event type" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
