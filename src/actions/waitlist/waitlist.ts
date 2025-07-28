"use server";

import { prisma } from "@/lib/db";
import { paddle } from "@/lib/paddle";
import {
  waitlistSchema,
  WaitlistSchemaType,
} from "@/schemas/waitlist/waitlistSchema";

export async function createWaitlist(data: WaitlistSchemaType) {
  try {
    const parsed = waitlistSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, message: "Invalid input" };
    }

    const { first_name, last_name, email, customerId } = parsed.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (existingUser) {
      return { success: false, message: "Already registered" };
    }

    // Validate customer ID with Paddle
    const customer = await paddle.customers.get(customerId).catch(() => null);
    if (!customer) {
      return { success: false, message: "Invalid customer" };
    }

    // Add to waitlist queue
    const created = await prisma.userQue.create({
      data: { first_name, last_name, email, customerId },
      select: { id: true },
    });
    if (!created) {
      return { success: false, message: "Could not join queue" };
    }

    return { success: true, message: "Added to waitlist" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Server error" };
  }
}
