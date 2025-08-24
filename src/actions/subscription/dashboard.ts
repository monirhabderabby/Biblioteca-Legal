"use server";

import { paddle } from "@/lib/paddle"; // assume you have Paddle SDK client configured
import { revalidatePath } from "next/cache";

interface Props {
  newPrice: number;
}

export async function subscriptionPriceChangeAction({ newPrice }: Props) {
  try {
    // Convert dollars to cents
    const amountInCents = Math.round(newPrice * 100);

    // Update Paddle Price
    await paddle.prices.update(process.env.NEXT_PUBLIC_PRICE_ID!, {
      unitPrice: {
        amount: amountInCents.toString(),
        currencyCode: "USD",
      },
    });

    // Optionally revalidate some path
    revalidatePath("/dashboard/settings");

    return {
      success: true,
      message: `Subscription price updated to $${newPrice.toFixed(2)}.`,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating subscription price:", error);
    return {
      success: false,
      message: error?.message || "Failed to update subscription price.",
    };
  }
}
