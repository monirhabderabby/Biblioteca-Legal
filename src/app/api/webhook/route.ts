import { registeruser } from "@/actions/auth/registration";
import { prisma } from "@/lib/db";
import { paddle } from "@/lib/paddle";
import { EventName } from "@paddle/paddle-node-sdk";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.PADDLE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const rawRequestBody = await req.text();
  const paddleSignature = req.headers.get("paddle-signature");

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
    const eventData = await paddle.webhooks.unmarshal(
      rawRequestBody,
      secretKey,
      paddleSignature
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = eventData.data;
    const startsAt = data.currentBillingPeriod?.startsAt;
    const endsAt = data.currentBillingPeriod?.endsAt;
    const txnId = data.transactionId;
    const subscriptionId = data.id;
    const formValues = data.customData?.user;
    const customerId = data.customerId;
    const status = data.status; // "trialing", "active", "paused", "canceled"

    switch (eventData.eventType) {
      case EventName.SubscriptionCreated:
        console.log("➡️ Subscription created");

        // Create user in DB
        const user = await registeruser(formValues, customerId);
        const userId = user.data?.id;
        if (!userId) return;

        await prisma.userSubscription.upsert({
          where: { userId },
          create: {
            userId,
            currentPeriodStart: startsAt,
            currentPeriodEnd: endsAt,
            txn_id: txnId,
            sub_id: subscriptionId,
            isActive: status === "active",
            isTrialActive: status === "trialing",
            trialStart: status === "trialing" ? startsAt : null,
            trialEnd: status === "trialing" ? endsAt : null,
          },
          update: {
            currentPeriodStart: startsAt,
            currentPeriodEnd: endsAt,
            txn_id: txnId,
            sub_id: subscriptionId,
            isActive: status === "active",
            isTrialActive: status === "trialing",
            trialStart: status === "trialing" ? startsAt : null,
            trialEnd: status === "trialing" ? endsAt : null,
          },
        });

        // Clean up queued user
        if (user.data?.email) {
          await prisma.userQue.delete({
            where: { email: user.data.email },
          });
        }
        break;

      case EventName.SubscriptionActivated:
        console.log("➡️ Subscription activated (trial ended, now paid)");
        await prisma.userSubscription.update({
          where: { sub_id: subscriptionId },
          data: { isActive: true, isTrialActive: false },
        });
        break;

      case EventName.SubscriptionCanceled:
        console.log("➡️ Subscription canceled");
        await prisma.userSubscription.updateMany({
          where: { sub_id: subscriptionId },
          data: { isActive: false, isTrialActive: false },
        });
        break;

      case EventName.SubscriptionPaused:
        console.log("➡️ Subscription paused");
        await prisma.userSubscription.updateMany({
          where: { sub_id: subscriptionId },
          data: { isActive: false, isTrialActive: false },
        });
        break;

      case EventName.SubscriptionResumed:
        console.log("➡️ Subscription resumed");
        await prisma.userSubscription.updateMany({
          where: { sub_id: subscriptionId },
          data: { isActive: true, isTrialActive: false },
        });
        break;

      case EventName.SubscriptionUpdated:
        console.log("➡️ Subscription updated");
        await prisma.userSubscription.update({
          where: { sub_id: subscriptionId },
          data: {
            currentPeriodStart: startsAt,
            currentPeriodEnd: endsAt,
            txn_id: txnId,
            isActive: status === "active",
            isTrialActive: status === "trialing",
            trialStart: status === "trialing" ? startsAt : null,
            trialEnd: status === "trialing" ? endsAt : null,
          },
        });
        break;

      case EventName.SubscriptionPastDue:
        console.log("➡️ Subscription past due (payment failed)");
        await prisma.userSubscription.updateMany({
          where: { sub_id: subscriptionId },
          data: { isActive: false, isTrialActive: false },
        });
        break;

      default:
        console.log(`Unhandled event: ${eventData.eventType}`);
    }
  } catch (error) {
    console.error("Webhook error:", error);
  }

  return NextResponse.json({ success: true });
}
