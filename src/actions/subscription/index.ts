"use server";

import { paddle } from "@/lib/paddle";

interface PaddleCustomerCreateProps {
  email: string;
  id: string;
  customerName: string;
}

export const paddleCustomerCreate = async ({
  email,
  id,
  customerName,
}: PaddleCustomerCreateProps) => {
  const customer = await paddle.customers.create({
    email,
    customData: {
      db_id: id,
    },
    name: customerName,
  });

  return customer.id;
};
