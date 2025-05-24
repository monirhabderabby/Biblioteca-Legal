"use server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/db";
import { registrationSchema, RegistrationSchemaType } from "@/schemas/auth";

export async function registeruser(data: RegistrationSchemaType) {
  const {
    success,
    data: parsedData,
    error,
  } = registrationSchema.safeParse(data);

  if (!success) {
    return {
      success: false,
      message: error.message,
    };
  }

  // Check if the user already exists
  const exist = await prisma.user.findFirst({
    where: {
      email: parsedData.email,
    },
  });

  if (exist) {
    return {
      success: false,
      message: "User already exists.",
    };
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(parsedData.password, 10);

  try {
    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        email: parsedData.email,
        password: hashedPassword,
        first_name: parsedData.first_name, // Assuming name is part of registrationSchema
        last_name: parsedData.last_name,
      },
    });

    // send email to the student
    // await resend.emails.send({
    //   from: "FreelancePM Club <support@thefreelancepmclub.com>",
    //   to: [newUser.email as string],
    //   subject: "Please verify your email address",
    //   react: EmailVerification({
    //     username: newUser?.name ?? "",
    //     verificationUrl: `${process.env.AUTH_URL}/email-verification/${newUser.id}`,
    //   }),
    // });

    return {
      success: true,
      message: "Registration successfully!",
      data: newUser,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
