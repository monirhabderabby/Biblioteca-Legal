"use server";

import { auth } from "@/auth";
import { paddleCustomerCreate } from "@/helper/subscription";
import { prisma } from "@/lib/db";

export async function makeSubscribe() {
  const cu = await auth();

  if (!cu) {
    return {
      success: false,
      message: "No estás autenticado.",
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
      message: "Usuario no encontrado.",
    };
  }

  let paddleCustomerId = user.paddleCustomerId;

  // Crear cliente de Paddle si no existe
  if (!paddleCustomerId) {
    try {
      paddleCustomerId = await paddleCustomerCreate({
        email: user.email!,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
      });

      // Guardar paddleCustomerId en la base de datos
      await prisma.user.update({
        where: { id: user.id },
        data: { paddleCustomerId },
      });
    } catch (error) {
      console.error("Error al crear el cliente en Paddle:", error);
      return {
        success: false,
        message: "Error al crear el cliente en Paddle.",
      };
    }
  }

  return {
    success: true,
    message: "La transacción de Paddle está lista.",
    customerId: paddleCustomerId,
    userId: user.id,
  };
}
