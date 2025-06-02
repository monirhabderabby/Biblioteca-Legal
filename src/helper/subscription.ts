// lib/subscription.ts
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { paddle } from "@/lib/paddle";

interface Sub {
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  sub_id?: string;
  isActive: boolean;
  userId: string;
}

export async function getCurrentUserSubscription(): Promise<{
  type: "user" | "company";
  subscription: Sub;
} | null> {
  const cu = await auth();

  if (!cu?.user?.id) {
    return null; // Not logged in
  }

  // 1. Try fetching the user's personal active subscription
  const userSubscription = await prisma.userSubscription.findFirst({
    where: {
      userId: cu.user.id,
      isActive: true,
    },
  });

  if (userSubscription) {
    return {
      type: "user",
      subscription: {
        currentPeriodStart: userSubscription.currentPeriodStart,
        currentPeriodEnd: userSubscription.currentPeriodEnd,
        sub_id: userSubscription.sub_id,
        isActive: userSubscription.isActive,
        userId: userSubscription.userId,
      },
    };
  }

  // 2. Check if the user belongs to a company
  const user = await prisma.user.findUnique({
    where: { id: cu.user.id },
    select: {
      companyId: true,
    },
  });

  if (!user?.companyId) {
    return null; // Not part of a company, and no personal sub
  }

  // 3. Try fetching the company’s active subscription
  const companySubscription = await prisma.companySubscription.findFirst({
    where: {
      companyId: user.companyId,
    },
  });

  if (companySubscription) {
    return {
      type: "company",
      subscription: {
        currentPeriodStart: companySubscription.currentPeriodStart,
        currentPeriodEnd: companySubscription.currentPeriodEnd,
        isActive: companySubscription.isActive,
        sub_id: undefined,
        userId: cu.user.id,
      },
    };
  }

  return null; // No valid subscription found
}

interface PaddleCustomerCreateProps {
  email: string;
  customerName: string;
}

export const paddleCustomerCreate = async ({
  email,
  customerName,
}: PaddleCustomerCreateProps) => {
  const customer = await paddle.customers.create({
    email,
    name: customerName,
  });

  return customer.id;
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
      customerName: `${user.first_name} ${user.last_name}`,
    });

    return paddleCustomerId;
  }

  paddleCustomerId = user.paddleCustomerId;

  return paddleCustomerId;
};
