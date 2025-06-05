import { registeruser } from "@/actions/auth/registration";
import { prisma } from "@/lib/db";
import { paddle } from "@/lib/paddle";
import { EventName } from "@paddle/paddle-node-sdk";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.PADDLE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const rawRequestBody = await req.text();
  const paddleSignature = req.headers.get("paddle-signature");

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
      const txnId = data.transactionId;
      const subscriptionId = data.id;
      const formValues = data.customData.user;
      const customerId = data.customerId;

      switch (eventData.eventType) {
        case EventName.SubscriptionCreated:
          // WHY? > When a customer starts a subscription
          // When ? > To create the user’s subscription record in your system (e.g., store plan, status, billing dates).
          console.log("webhook called for subscription created");

          const user = await registeruser(formValues, customerId);
          const userId = user.data?.id;

          if (!userId) return;
          await prisma.userSubscription.upsert({
            where: {
              userId: userId,
            },
            create: {
              userId: userId,
              currentPeriodStart: startsAt,
              currentPeriodEnd: endsAt,
              txn_id: txnId,
              sub_id: subscriptionId,
              isActive: true,
            },
            update: {
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

          console.log("webhook called for subscription activated");

          break;

        case EventName.SubscriptionCanceled:
          console.log("webhook called for subscription canceled");
          const subscription = await prisma.userSubscription.findUnique({
            where: {
              sub_id: subscriptionId,
            },
          });
          if (!subscription) break;
          await prisma.userSubscription.update({
            where: { userId: subscription.userId },
            data: { isActive: false },
          });

          break;

        case EventName.SubscriptionPaused:
          console.log("webhook called for subscription paused");
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
          console.log("webhook called for subscription resumed");
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
          console.log("webhook called for subscription updated");
          console.log("subscription updated called");
          await prisma.userSubscription.update({
            where: {
              sub_id: subscriptionId,
            },
            data: {
              isActive: true,
              currentPeriodEnd: endsAt,
              currentPeriodStart: startsAt,
              txn_id: txnId,
            },
          });
          break;

        case EventName.SubscriptionPastDue:
          await prisma.userSubscription.update({
            where: {
              sub_id: subscriptionId,
            },
            data: {
              isActive: false,
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
