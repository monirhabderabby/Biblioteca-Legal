"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/db";
import { loginFormSchema, LoginFormValues } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

interface Props {
  data: LoginFormValues;
  userAgent: string;
  ipAddress: string;
}

export async function loginAction({ data, userAgent, ipAddress }: Props) {
  const { success, data: parsedData, error } = loginFormSchema.safeParse(data);

  const deviceId = cookies().get("device_id")?.value || crypto.randomUUID();

  if (!success) {
    return {
      success: false,
      message: error.message,
    };
  }

  // 1. Check if the user exists
  const user = await prisma.user.findFirst({
    where: {
      email: parsedData.email,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  // 2. Check if email is verified
  if (!user.emailVerified) {
    return {
      success: false,
      message:
        "Your email is not verified. Please check your inbox to verify your email before logging in.",
    };
  }

  // 3. Validate password
  const isPasswordValid = await bcrypt.compare(
    parsedData.password,
    user.password
  );

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Incorrect password.",
    };
  }

  const userDevices = await prisma.device.findMany({
    where: { userId: user.id },
  });

  const isKnownDevice = userDevices.some((d) => d.deviceId === deviceId);

  // Enforce maximum of 2 devices
  if (!isKnownDevice && userDevices.length >= 2) {
    return {
      success: false,
      message: "You can only log in from up to 2 devices.",
    };
  }

  // Register new device if unknown
  if (!isKnownDevice) {
    try {
      await prisma.device.create({
        data: {
          userId: user.id,
          deviceId,
          userAgent: userAgent ?? "unknown",
          ipAddress: ipAddress ?? "unknown",
        },
      });

      // Set persistent device_id cookie
      cookies().set("device_id", deviceId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: "/",
      });
    } catch (err) {
      console.error("Failed to save device info:", err);
    }
  }

  // 5. Sign in with next-auth
  try {
    await signIn("credentials", {
      email: parsedData.email,
      password: parsedData.password,
      redirect: false,
    });

    // 6. Handle "Remember me" cookies
    await manejarCookiesRecordarme(
      !!data.rememberMe,
      data.rememberMe ? data.email : undefined,
      data.rememberMe ? data.password : undefined
    );

    return {
      success: true,
      message: "Login successful.",
      role: user.role,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Sign-in error:", error);
    return {
      success: false,
      message: error.message ?? "Something went wrong.",
    };
  }
}

/**
 * Acción del servidor reutilizable para manejar las cookies de "Recordarme".
 *
 * @param {boolean} recordarme - Si el usuario desea ser recordado.
 * @param {string | undefined} email - Correo a guardar en la cookie (opcional si se va a eliminar).
 * @param {string | undefined} password - Contraseña a guardar en la cookie (opcional si se va a eliminar).
 */
export async function manejarCookiesRecordarme(
  recordarme: boolean,
  email?: string,
  password?: string
) {
  const opcionesCookie = {
    sameSite: "strict" as const,
    maxAge: 2592000, // 30 días
  };

  if (recordarme && email && password) {
    cookies().set({
      name: "rememberMeEmail",
      value: email,
      ...opcionesCookie,
    });
    cookies().set({
      name: "rememberMePassword",
      value: password,
      ...opcionesCookie,
    });
  } else {
    cookies().delete("rememberMeEmail");
    cookies().delete("rememberMePassword");
  }
}
