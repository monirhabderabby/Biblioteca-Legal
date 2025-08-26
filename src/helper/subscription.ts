// lib/subscription.ts
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { paddle } from "@/lib/paddle";
import { CompanySubscription, UserSubscription } from "@prisma/client";

// Define interfaces for type safety

export async function getCurrentUserSubscription() {
  const cu = await auth();
  if (!cu?.user.id) return null;

  const userId = cu.user.id.toString();

  // 1. Check if the user has a personal subscription
  const userSubscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  // 2. If not, check if the user's company has a subscription
  // (assuming User has companyId field)
  let companySubscription = null;
  if (!userSubscription) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { companyId: true },
    });

    if (user?.companyId) {
      companySubscription = await prisma.companySubscription.findUnique({
        where: { companyId: user.companyId },
      });
    }
  }

  // No subscription at all
  if (!userSubscription && !companySubscription) return null;

  const now = new Date();

  if (userSubscription) {
    // Check if subscription is active (paid)
    const hasPaidAccess =
      userSubscription.isActive &&
      userSubscription.currentPeriodEnd &&
      userSubscription.currentPeriodEnd > now;

    // Check if trial is active
    const hasTrialAccess =
      userSubscription.isTrialActive &&
      userSubscription.trialEnd &&
      userSubscription.trialEnd > now;

    const hasAccess = hasPaidAccess || hasTrialAccess;

    return {
      subscription: userSubscription,
      hasAccess,
      subType: "user" as const,
    };
  }

  if (companySubscription) {
    const hasAccess =
      companySubscription.isActive &&
      companySubscription.currentPeriodEnd &&
      companySubscription.currentPeriodEnd > now;

    return {
      subscription: companySubscription,
      hasAccess,
      subType: "company" as const,
    };
  }
}

export type CurrentSubscription = Awaited<
  Promise<{
    subscription: UserSubscription | CompanySubscription;
    hasAccess: boolean;
    subType: "user" | "company";
  } | null>
>;

interface PaddleCustomerCreateProps {
  email: string;
  first_name: string;
  last_name: string;
}

export const paddleCustomerCreate = async ({
  email,
  first_name,
  last_name,
}: PaddleCustomerCreateProps) => {
  const existingCustomerInQue = await prisma.userQue.findFirst({
    where: {
      email,
    },
  });

  if (existingCustomerInQue) {
    return existingCustomerInQue.customerId;
  }
  const customer = await paddle.customers.create({
    email,
    name: `${first_name} ${last_name}`,
  });

  const newCustomer = await prisma.userQue.create({
    data: {
      email,
      first_name,
      last_name,
      customerId: customer.id,
    },
  });

  return newCustomer.customerId;
};

export const getPaddleCustomerId = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return null;
  }

  let paddleCustomerId;

  if (!user.paddleCustomerId) {
    paddleCustomerId = await paddleCustomerCreate({
      email: user.email as string,
      first_name: user.first_name as string,
      last_name: user.last_name as string,
    });

    return paddleCustomerId;
  }

  paddleCustomerId = user.paddleCustomerId;

  return paddleCustomerId;
};

export const isSubscribed = async () => {
  const cu = await auth();

  const cs = await getCurrentUserSubscription();

  const now = new Date();

  const isActive = cs?.subscription.isActive ?? false;
  const currentPeriodEnd = cs?.subscription.currentPeriodEnd;

  const hasFullAccess =
    isActive && !!currentPeriodEnd && currentPeriodEnd > now && !!cu;

  return !!hasFullAccess;
};
