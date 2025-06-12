"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/db";
import { loginFormSchema, LoginFormValues } from "@/schemas/auth";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function loginAction(data: LoginFormValues) {
  const { success, data: parsedData, error } = loginFormSchema.safeParse(data);

  if (!success) {
    return {
      success: false,
      message: error.message,
    };
  }

  // Verificar si el usuario existe
  const usuario = await prisma.user.findFirst({
    where: {
      email: parsedData.email as string,
    },
  });

  if (!usuario) {
    return {
      success: false,
      message: "¡Usuario no encontrado!",
    };
  }

  if (!usuario.emailVerified) {
    return {
      success: false,
      message:
        "Tu correo electrónico no está verificado. Por favor, revisa tu bandeja de entrada y verifica tu dirección antes de iniciar sesión.",
    };
  }

  // Verificar la contraseña
  const contraseñaValida = await bcrypt.compare(
    parsedData.password as string,
    usuario.password
  );

  if (!contraseñaValida) {
    return {
      success: false,
      message: "¡La contraseña no coincide!",
    };
  }

  try {
    await signIn("credentials", {
      email: parsedData.email,
      password: parsedData.password,
      redirect: false,
    });

    // Manejar cookies de "Recordarme"
    await manejarCookiesRecordarme(
      !!data.rememberMe,
      data.rememberMe ? data.email : undefined,
      data.rememberMe ? data.password : undefined
    );

    return {
      success: true,
      message: "Inicio de sesión exitoso",
      role: usuario.role as Role,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message ?? "¡Algo salió mal!",
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
