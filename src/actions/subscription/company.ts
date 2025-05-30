"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import {
  companySubscriptionSchema,
  CompanySubscriptionSchemaType,
} from "@/schemas/company";
import { revalidatePath } from "next/cache";

export async function subscribeCompany(data: CompanySubscriptionSchemaType) {
  const cu = await auth();

  // Ensure user is admin
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }

  // Validate input
  const parsedData = companySubscriptionSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.errors.map((e) => e.message).join(", "),
    };
  }

  const { txn_id, companyId, currentPeriodStart, currentPeriodEnd } =
    parsedData.data;

  try {
    // Optional: check if company exists
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return {
        success: false,
        message: "Company not found.",
      };
    }

    // Create subscription (you can also use upsert if updates are allowed)
    const subscription = await prisma.companySubscription.create({
      data: {
        txn_id,
        companyId,
        currentPeriodStart,
        currentPeriodEnd,
      },
    });

    revalidatePath(`/dashboard/companies/${companyId}`);

    return {
      success: true,
      message: `Company subscribed successfully.`,
      subscription,
    };
  } catch (error) {
    console.error("Error subscribing company:", error);
    return {
      success: false,
      message: "An error occurred while subscribing the company.",
    };
  }
}

export async function renewsubscribeCompany(
  data: CompanySubscriptionSchemaType,
  subId: string
) {
  const cu = await auth();

  // Ensure user is admin
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }

  // Validate input
  const parsedData = companySubscriptionSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.errors.map((e) => e.message).join(", "),
    };
  }

  const { txn_id, companyId, currentPeriodStart, currentPeriodEnd } =
    parsedData.data;

  try {
    // Optional: check if company exists
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return {
        success: false,
        message: "Company not found.",
      };
    }

    // Create subscription (you can also use upsert if updates are allowed)
    const subscription = await prisma.companySubscription.update({
      where: {
        id: subId,
      },
      data: {
        currentPeriodStart,
        currentPeriodEnd,
        txn_id,
      },
    });

    revalidatePath(`/dashboard/companies/${companyId}`);

    return {
      success: true,
      message: `${company.name} renewd successfully.`,
      subscription,
    };
  } catch (error) {
    console.error("Error subscribing company:", error);
    return {
      success: false,
      message: "An error occurred while subscribing the company.",
    };
  }
}

export async function pauseCompanySubscription(companyId: string) {
  const cu = await auth();

  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }

  try {
    // Find the latest active subscription
    const subscription = await prisma.companySubscription.findFirst({
      where: {
        companyId,
        isActive: true,
      },
      orderBy: {
        currentPeriodEnd: "desc",
      },
    });

    if (!subscription) {
      return {
        success: false,
        message: "No active subscription found for this company.",
      };
    }

    // Set isActive to false (pause)
    await prisma.companySubscription.update({
      where: { id: subscription.id },
      data: { isActive: false },
    });

    revalidatePath(`/dashboard/companies/${companyId}`);

    return {
      success: true,
      message: "Subscription paused successfully.",
    };
  } catch (error) {
    console.error("Error pausing subscription:", error);
    return {
      success: false,
      message: "An error occurred while pausing the subscription.",
    };
  }
}
export async function resumeCompanySubscription(companyId: string) {
  const cu = await auth();

  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }

  try {
    // Find the latest active subscription
    const subscription = await prisma.companySubscription.findFirst({
      where: {
        companyId,
        isActive: false,
      },
      orderBy: {
        currentPeriodEnd: "desc",
      },
    });

    if (!subscription) {
      return {
        success: false,
        message: "No active subscription found for this company.",
      };
    }

    // Set isActive to false (pause)
    await prisma.companySubscription.update({
      where: { id: subscription.id },
      data: { isActive: true },
    });

    revalidatePath(`/dashboard/companies/${companyId}`);

    return {
      success: true,
      message: "Subscription resumed successfully.",
    };
  } catch (error) {
    console.error("Error pausing subscription:", error);
    return {
      success: false,
      message: "An error occurred while pausing the subscription.",
    };
  }
}
