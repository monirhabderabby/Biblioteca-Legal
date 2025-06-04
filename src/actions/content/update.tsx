"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { contentSchema, ContentSchemaType } from "@/schemas/content";

export async function updateTermsAndCondition(data: ContentSchemaType) {
  const cu = await auth();

  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "You are not authorized to perform this action.",
    };
  }

  const parsedData = contentSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.message,
    };
  }

  const content = await prisma.termsOfService.findFirst();

  if (content) {
    await prisma.termsOfService.update({
      where: { id: content.id },
      data: {
        content: parsedData.data.content,
      },
    });

    return {
      success: true,
      message: "Terms and conditions updated successfully.",
    };
  }

  await prisma.termsOfService.create({
    data: {
      content: parsedData.data.content,
    },
  });
  return {
    success: true,
    message: "Terms and conditions created successfully.",
  };
}
export async function updatePrivacyPolicy(data: ContentSchemaType) {
  const cu = await auth();

  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "You are not authorized to perform this action.",
    };
  }

  const parsedData = contentSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.message,
    };
  }

  const content = await prisma.privacyPolicy.findFirst();

  if (content) {
    await prisma.privacyPolicy.update({
      where: { id: content.id },
      data: {
        content: parsedData.data.content,
      },
    });

    return {
      success: true,
      message: "Privacy policy updated successfully.",
    };
  }

  await prisma.privacyPolicy.create({
    data: {
      content: parsedData.data.content,
    },
  });
  return {
    success: true,
    message: "Privacy policy created successfully.",
  };
}
export async function updateRefundPolicy(data: ContentSchemaType) {
  const cu = await auth();

  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "You are not authorized to perform this action.",
    };
  }

  const parsedData = contentSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.message,
    };
  }

  const content = await prisma.refundPolicy.findFirst();

  if (content) {
    await prisma.refundPolicy.update({
      where: { id: content.id },
      data: {
        content: parsedData.data.content,
      },
    });

    return {
      success: true,
      message: "Privacy policy updated successfully.",
    };
  }

  await prisma.refundPolicy.create({
    data: {
      content: parsedData.data.content,
    },
  });
  return {
    success: true,
    message: "Privacy policy created successfully.",
  };
}
