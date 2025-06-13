"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, MoveLeft } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { loginAction } from "@/actions/auth/login";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginFormSchema, LoginFormValues } from "@/schemas/auth";
import Cookies from "js-cookie"; // Import js-cookie for cookie retrieval
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

// Retrieve cookies for email and "Remember Me"
const rememberedEmail = Cookies.get("rememberMeEmail");
const rememberMePassword = Cookies.get("rememberMePassword");
const isRemembered = !!rememberedEmail && !!rememberMePassword;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pending, startTransition] = useTransition();
  const [isMounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize the form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: rememberedEmail ?? "",
      password: rememberMePassword ?? "",
      rememberMe: isRemembered ?? false,
    },
  });

  // Handle form submission
  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);

    const deviceId = Cookies.get("device_id") || crypto.randomUUID(); // Store if new

    Cookies.set("device_id", deviceId, { expires: 365 }); // Store for future logins
    const userAgent = navigator.userAgent;

    const ip = await fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => data.ip)
      .catch(() => "unknown");

    startTransition(() => {
      loginAction({ data, deviceId, userAgent, ipAddress: ip }).then((res) => {
        if (!res?.success) {
          toast.error(res?.message);
          setIsLoading(false);
          return;
        } else {
          setIsLoading(true);
          if (res.role === "user") {
            router.push(redirectTo ?? "/");
          } else if (res.role === "admin") {
            router.push(redirectTo ?? "/dashboard");
          }
        }
      });
    });
  }

  const loading = isLoading || pending;

  if (!isMounted) return;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo de correo electrónico */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Ingresa tu correo electrónico"
                      type="email"
                      className="border-primary border-[1px]  min-h-[45px] "
                      disabled={loading}
                      startIcon={Mail}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de contraseña */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Ingresa tu contraseña"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className=" pr-10 border-primary border-[1px]  min-h-[45px]"
                      startIcon={Lock}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Recordarme y Olvidé mi contraseña */}
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={loading}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm font-medium text-gray-700"
                  >
                    Recuérdame
                  </label>
                </div>
              )}
            />
            <Link
              href="/reset-request"
              className="text-sm font-medium text-primary"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón de enviar */}
          <Button
            type="submit"
            className="w-full  min-h-[45px]"
            disabled={loading}
          >
            {pending
              ? "Iniciando sesión..."
              : isLoading
                ? "Un momento..."
                : "Iniciar sesión"}
          </Button>
        </form>
      </Form>

      {/* Enlace para registrarse */}
      <div className="text-center text-sm">
        <span className="text-gray-600">¿Nuevo en nuestra plataforma?</span>{" "}
        <Link
          href="/sign-up"
          className="font-medium text-primary hover:underline"
        >
          Regístrate aquí
        </Link>
      </div>

      <div className="w-full flex justify-center">
        <Link href="/" className="flex items-center gap-x-2 group">
          <MoveLeft />
          <span className="group-hover:underline">Volver al inicio</span>
        </Link>
      </div>
    </>
  );
}
