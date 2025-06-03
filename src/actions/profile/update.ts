"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import {
  profileSchema,
  ProfileSchemaType,
} from "@/schemas/profile/profileSchema";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: ProfileSchemaType) {
  const cu = await auth();

  if (!cu?.user.id) {
    return {
      success: false,
      message: "User not authenticated",
    };
  }

  const parsedData = profileSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.message,
    };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: cu.user.id,
      },
      data: parsedData.data,
    });

    revalidatePath("/account");

    return {
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      message: "Failed to update profile",
    };
  }
}
