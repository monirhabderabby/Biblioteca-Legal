"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { generalFormSchema, GeneralFormType } from "@/schemas/site";

import { redirect } from "next/navigation";

export async function settingAction(data: GeneralFormType) {
  const cu = await auth();

  if (!cu) redirect("/login");

  if (cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access.",
    };
  }

  const parsedValue = generalFormSchema.safeParse(data);

  if (!parsedValue.success) {
    return {
      success: false,
      message: parsedValue.error.message,
    };
  }

  try {
    await prisma.setting.upsert({
      where: {
        adminId: cu.user.id as string,
      },
      create: {
        adminId: cu.user.id as string,
        siteName: parsedValue.data.siteName,
        supportEmail: parsedValue.data.supportEmail,
        description: parsedValue.data.description,
        keywords: parsedValue.data.keywords,
      },
      update: {
        siteName: parsedValue.data.siteName,
        supportEmail: parsedValue.data.supportEmail,
        description: parsedValue.data.description,
        keywords: parsedValue.data.keywords,
      },
    });

    return {
      success: true,
      message: "Settings saved successfully!",
    };

    // Optional: Redirect after saving
    // redirect("/admin/settings");
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
