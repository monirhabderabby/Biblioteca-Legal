"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function makeAdmin(id: string) {
  const cu = await auth();

  if (!cu || !cu?.user || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized. Admin access required.",
    };
  }

  const masterAdmin = process.env.ADMIN_EMAIL!;

  if (!masterAdmin) {
    return {
      success: false,
      message: "Master admin email not configured.",
    };
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  if (user.email === masterAdmin) {
    return {
      success: false,
      message: "Cannot modify master admin.",
    };
  }

  if (cu.user.email !== masterAdmin) {
    return {
      success: false,
      message: "Only the master admin can promote users.",
    };
  }

  if (user.role === "admin") {
    return {
      success: false,
      message: "User is already an admin.",
    };
  }

  try {
    await prisma.user.update({
      where: { id },
      data: {
        role: "admin",
      },
    });

    revalidatePath("/dashboard/settings");

    return {
      success: true,
      message: "User successfully promoted to admin.",
    };
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    return {
      success: false,
      message: "An error occurred while updating the user role.",
    };
  }
}

export async function removeAdmin(id: string) {
  const cu = await auth();

  if (!cu || !cu?.user || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized. Admin access required.",
    };
  }

  const masterAdmin = process.env.ADMIN_EMAIL!;

  if (!masterAdmin) {
    return {
      success: false,
      message: "Master admin email not configured.",
    };
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  if (user.email === masterAdmin) {
    return {
      success: false,
      message: "Cannot demote the master admin.",
    };
  }

  if (cu.user.email !== masterAdmin) {
    return {
      success: false,
      message: "Only the master admin can revoke admin rights.",
    };
  }

  if (user.role !== "admin") {
    return {
      success: false,
      message: "User is not an admin.",
    };
  }

  try {
    await prisma.user.update({
      where: { id },
      data: {
        role: "user",
      },
    });

    revalidatePath("/dashboard/settings");

    return {
      success: true,
      message: "Admin rights successfully revoked.",
    };
  } catch (error) {
    console.error("Error revoking admin rights:", error);
    return {
      success: false,
      message: "An error occurred while updating the user role.",
    };
  }
}
