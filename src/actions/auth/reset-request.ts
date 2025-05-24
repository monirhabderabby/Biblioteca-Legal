"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

// Helper to generate a 6-digit OTP
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtp(email: string) {
  try {
    // Check if there is an existing reset request
    const exist = await prisma.resetReq.findFirst({
      where: {
        email,
      },
    });

    if (exist) {
      // Delete old request to avoid duplicates
      await prisma.resetReq.delete({
        where: {
          id: exist.id,
        },
      });
    }

    // Generate OTP
    const otp = generateOtp();

    // Create new reset request
    const newReq = await prisma.resetReq.create({
      data: {
        email,
        otp: Number(otp),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
      },
    });

    // Send OTP via email
    // await resend.emails.send({
    //   from: "FreelancePM Club <support@thefreelancepmclub.com>",
    //   to: [newReq.email as string],
    //   subject: `Your Password Reset OTP: [${newReq.otp}]`,
    //   react: OtpEmail({
    //     otpCode: newReq.otp.toString(),
    //   }),
    // });

    return {
      success: true,
      message: "OTP sent successfully.",
      otpId: newReq.id,
    };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

export async function verifyOTP(id: string, otp: number) {
  const exist = await prisma.resetReq.findFirst({
    where: {
      id,
      otp,
    },
  });

  if (!exist) {
    return {
      success: false,
      message: "Invalid OTP or ID",
    };
  }

  // Check if the OTP has expired
  if (exist.expiresAt && new Date() > exist.expiresAt) {
    // Optional: Delete the expired OTP
    await prisma.resetReq.delete({
      where: { id: exist.id },
    });

    return {
      success: false,
      message: "OTP has expired",
    };
  }

  await prisma.resetReq.update({
    where: {
      id,
    },
    data: {
      isOtpVerified: true,
    },
  });

  return {
    success: true,
    message: "OTP verified successfully",
    data: exist,
  };
}

export async function resetNow(id: string, password: string) {
  const req = await prisma.resetReq.findFirst({
    where: {
      id,
    },
  });

  if (!req) {
    return {
      success: false,
      message: "Invalid request or ID not found",
    };
  }

  if (!req.isOtpVerified) {
    return {
      success: false,
      message: "OTP has not been verified yet",
    };
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update user's password using the email stored in the reset request
  await prisma.user.update({
    where: {
      email: req.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  // Optionally delete the reset request after successful password reset
  await prisma.resetReq.delete({
    where: {
      id: req.id,
    },
  });

  return {
    success: true,
    message: "Password reset successfully",
  };
}
