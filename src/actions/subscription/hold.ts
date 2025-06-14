"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function holdSubscription() {
  const cu = await auth();

  if (!cu || !cu.user || !cu.user.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    const existingSubscription = await prisma.userSubscription.findUnique({
      where: {
        userId: cu.user.id,
      },
    });

    if (!existingSubscription) {
      return {
        success: false,
        message: "Subscription not found",
      };
    }

    // const res = await paddle.subscriptions.pause(existingSubscription.sub_id, {
    //   effectiveFrom: "immediately",
    // });

    // "Hold" the subscription - e.g., set isActive to false
    await prisma.userSubscription.update({
      where: {
        userId: cu.user.id,
      },
      data: {
        isActive: false,
        currentPeriodEnd: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      message: "Subscription successfully held",
    };
  } catch (error) {
    console.error("Error holding subscription:", error);
    return {
      success: false,
      message: "An error occurred while holding the subscription",
    };
  }
}
