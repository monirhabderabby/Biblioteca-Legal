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

  // Asegurar que el usuario sea administrador
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Acceso no autorizado.",
    };
  }

  // Validar entrada
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
    // Opcional: verificar si la empresa existe
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return {
        success: false,
        message: "Empresa no encontrada.",
      };
    }

    // Crear suscripción (también puedes usar upsert si se permiten actualizaciones)
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
      message: `Empresa suscrita exitosamente.`,
      subscription,
    };
  } catch (error) {
    console.error("Error al suscribir empresa:", error);
    return {
      success: false,
      message: "Ocurrió un error al suscribir la empresa.",
    };
  }
}

export async function renewsubscribeCompany(
  data: CompanySubscriptionSchemaType,
  subId: string
) {
  const cu = await auth();

  // Asegurar que el usuario sea administrador
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Acceso no autorizado.",
    };
  }

  // Validar entrada
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
    // Opcional: verificar si la empresa existe
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return {
        success: false,
        message: "Empresa no encontrada.",
      };
    }

    // Actualizar suscripción existente
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
      message: `${company.name} renovada exitosamente.`,
      subscription,
    };
  } catch (error) {
    console.error("Error al renovar suscripción:", error);
    return {
      success: false,
      message: "Ocurrió un error al renovar la suscripción.",
    };
  }
}

export async function pauseCompanySubscription(companyId: string) {
  const cu = await auth();

  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Acceso no autorizado.",
    };
  }

  try {
    // Buscar la última suscripción activa
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
        message: "No se encontró una suscripción activa para esta empresa.",
      };
    }

    // Marcar la suscripción como inactiva (pausar)
    await prisma.companySubscription.update({
      where: { id: subscription.id },
      data: { isActive: false },
    });

    revalidatePath(`/dashboard/companies/${companyId}`);

    return {
      success: true,
      message: "Suscripción pausada exitosamente.",
    };
  } catch (error) {
    console.error("Error al pausar suscripción:", error);
    return {
      success: false,
      message: "Ocurrió un error al pausar la suscripción.",
    };
  }
}

export async function resumeCompanySubscription(companyId: string) {
  const cu = await auth();

  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Acceso no autorizado.",
    };
  }

  try {
    // Buscar la última suscripción inactiva
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
        message: "No se encontró una suscripción inactiva para esta empresa.",
      };
    }

    // Reactivar la suscripción
    await prisma.companySubscription.update({
      where: { id: subscription.id },
      data: { isActive: true },
    });

    revalidatePath(`/dashboard/companies/${companyId}`);

    return {
      success: true,
      message: "Suscripción reanudada exitosamente.",
    };
  } catch (error) {
    console.error("Error al reanudar suscripción:", error);
    return {
      success: false,
      message: "Ocurrió un error al reanudar la suscripción.",
    };
  }
}
