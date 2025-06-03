"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { paddle } from "@/lib/paddle";
import { revalidatePath } from "next/cache";

export async function cancelSubscriptionAction() {
  const cu = await auth();

  if (!cu?.user.id) {
    return {
      success: false,
      message: "You must be logged in to cancel your subscription.",
    };
  }

  const sub = await prisma.userSubscription.findFirst({
    where: {
      userId: cu.user.id,
    },
  });

  if (!sub) {
    return {
      success: false,
      message: "No subscription found.",
    };
  }

  const subId = sub.sub_id;

  const paddleRes = await paddle.subscriptions.cancel(subId);

  if (paddleRes) {
    // remove subscription for database
    await prisma.userSubscription.update({
      where: {
        id: sub.id,
      },
      data: {
        isActive: false,
        currentPeriodEnd: new Date(),
      },
    });

    revalidatePath("/account");

    return {
      success: true,
      message:
        "Your subscription has been successfully cancelled. You will no longer be charged.",
    };
  }

  return {
    success: false,
    message: "Failed to cancel subscription. Please try again later.",
  };
}
