import { prisma } from "@/lib/db";
import { paddle } from "@/lib/paddle";
import { EventName } from "@paddle/paddle-node-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const rawRequestBody = await req.text();
  const paddleSignature = req.headers.get("paddle-signature");

  const secretKey = process.env.PADDLE_WEBHOOK_SECRET;

  // (Optional) Check if header and secret key are present and return error if not
  if (!paddleSignature) {
    console.error("Paddle-Signature not present in request headers");
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  if (!secretKey) {
    console.error("Secret key not defined");
    return NextResponse.json(
      { message: "Server misconfigured" },
      { status: 500 }
    );
  }

  try {
    if (paddleSignature) {
      // The `unmarshal` function will validate the integrity of the webhook and return an entity
      const eventData = await paddle.webhooks.unmarshal(
        rawRequestBody,
        secretKey,
        paddleSignature
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = eventData.data;
      const startsAt = data.currentBillingPeriod.startsAt;
      const endsAt = data.currentBillingPeriod.endsAt;
      const userId = data.customData.userId;
      const txnId = data.transactionId;
      const subscriptionId = data.id;

      switch (eventData.eventType) {
        case EventName.SubscriptionCreated:
          // WHY? > When a customer starts a subscription
          // When ? > To create the user’s subscription record in your system (e.g., store plan, status, billing dates).
          await prisma.userSubscription.create({
            data: {
              userId: userId,
              currentPeriodStart: startsAt,
              currentPeriodEnd: endsAt,
              txn_id: txnId,
              sub_id: subscriptionId,
              isActive: true,
            },
          });
          break;
        case EventName.SubscriptionActivated:
          // Why? > When the subscription becomes active (e.g., after payment or pause).
          // When ? > To unlock access to paid features. Can also be used to confirm that the subscription is live.
          console.log("subscription activated");

          break;

        case EventName.SubscriptionCanceled:
          await prisma.userSubscription.update({
            where: {
              userId,
            },
            data: {
              isActive: false,
            },
          });

          break;

        case EventName.SubscriptionPaused:
          await prisma.userSubscription.update({
            where: {
              userId,
            },
            data: {
              isActive: false,
            },
          });
          break;

        case EventName.SubscriptionResumed:
          await prisma.userSubscription.update({
            where: {
              userId,
            },
            data: {
              isActive: true,
            },
          });
          break;
        case EventName.SubscriptionUpdated:
          await prisma.userSubscription.update({
            where: {
              userId,
            },
            data: {
              isActive: true,
              currentPeriodEnd: endsAt,
              currentPeriodStart: startsAt,
              sub_id: subscriptionId,
              txn_id: txnId,
            },
          });
          break;

        default:
          console.log(eventData.eventType);
      }
    } else {
      console.log("Signature missing in header");
    }
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ success: true });
}
