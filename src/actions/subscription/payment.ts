"use server";

import { auth } from "@/auth";
import { paddleCustomerCreate } from "@/helper/subscription";
import { prisma } from "@/lib/db";

export async function makeSubscribe() {
  const cu = await auth();

  if (!cu) {
    return {
      success: false,
      message: "Not authenticated.",
      redirectTo: "/",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: cu.user.id,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  let paddleCustomerId = user.paddleCustomerId;

  // Create Paddle customer if one doesn't exist
  if (!paddleCustomerId) {
    try {
      paddleCustomerId = await paddleCustomerCreate({
        email: user.email!,
        customerName: `${user.first_name} ${user.last_name}`,
      });

      // Save paddleCustomerId to the database
      await prisma.user.update({
        where: { id: user.id },
        data: { paddleCustomerId },
      });
    } catch (error) {
      console.error("Failed to create Paddle customer:", error);
      return {
        success: false,
        message: "Failed to create Paddle customer.",
      };
    }
  }

  // const txn = await paddle.transactions.create({
  //   items: [
  //     {
  //       quantity: 1,
  //       price: {
  //         name: "User base",
  //         unitPrice: {
  //           currencyCode: "USD",
  //           amount: "3000",
  //         },
  //         description: "dynamically generated description",
  //         productId: "pro_01jwbf686w3y85w5twkxkbv9a9",
  //       },
  //     },
  //   ],
  //   customerId: paddleCustomerId,
  // });

  return {
    success: true,
    message: "Paddle Trasaction is ready",
    customerId: paddleCustomerId,
    userId: user.id,
  };
}
