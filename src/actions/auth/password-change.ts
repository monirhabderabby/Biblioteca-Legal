"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import {
  passwordChangeSchema,
  passwordChangeSchemaType,
} from "@/schemas/profile/profileSchema";
import bcrypt from "bcryptjs";

export async function changePasswordAction(data: passwordChangeSchemaType) {
  const cu = await auth();

  if (!cu?.user.id) {
    return {
      success: false,
      message: "You must be logged in to change your password.",
    };
  }

  const parsedData = passwordChangeSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.message,
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

  const isPasswordValid = bcrypt.compare(
    parsedData.data.currentPassword,
    user.password
  );

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Current password is incorrect.",
    };
  }

  const hashedNewPassword = await bcrypt.hash(parsedData.data.newPassword, 10);
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedNewPassword,
    },
  });
  return {
    success: true,
    message: "Password changed successfully.",
  };
}
