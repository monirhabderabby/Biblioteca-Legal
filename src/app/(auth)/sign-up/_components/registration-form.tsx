"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { SubmitButton } from "@/components/ui/submit-button";
import { paddleCustomerCreate } from "@/helper/subscription";
import { registrationSchema, RegistrationSchemaType } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegistrationForm() {
  const [isRedirecting, setRedirecting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [paddle, setPaddle] = useState<Paddle>();

  const form = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
  });

  function onSubmit(values: RegistrationSchemaType) {
    if (!paddle) {
      toast.warning("Paddle no está inicializado");
      return;
    }

    startTransition(async () => {
      const customerId = await paddleCustomerCreate({
        email: values.email,
        customerName: `${values.first_name} ${values.last_name}`,
      });

      if (customerId) {
        paddle.Checkout.open({
          items: [
            {
              priceId: process.env.NEXT_PUBLIC_PRICE_ID!,
              quantity: 1,
            },
          ],
          customer: {
            id: customerId,
          },
          customData: {
            user: values,
          },
          settings: {
            successUrl: `https://bibliotecalegalhn.com/login`,
          },
        });
      }
    });
  }

  useEffect(() => {
    return () => {
      setRedirecting(false);
    };
  }, []);

  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_TOKEN!,
    }).then((paddle) => setPaddle(paddle));
  }, []);

  const isLoading = isPending || isRedirecting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-[20px] max-w-[730px] mx-auto py-10"
      >
        <h1 className="text-black font-semibold text-[20px] leading-[120%]">
          Información personal
        </h1>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa tu nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa tu apellido" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingresa tu correo electrónico"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h1 className="text-black font-semibold text-[20px] leading-[120%] pt-[30px]">
          Seguridad de la cuenta
        </h1>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Ingresa tu contraseña" {...field} />
              </FormControl>
              <FormDescription>
                La contraseña debe tener al menos 8 caracteres e incluir
                mayúsculas, minúsculas y números.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Confirma tu contraseña"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3 pt-[20px]">
          <p className="text-black font-medium text-[12px] md:text-[14px] mb-[20px]">
            Al crear una cuenta, aceptas nuestros Términos de servicio y
            Política de privacidad. Procesaremos tus datos personales de acuerdo
            con nuestra Política de privacidad.
          </p>
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border-0">
                <FormControl>
                  <Checkbox
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Acepto los Términos de servicio y la Política de privacidad
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="promotion"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Me gustaría recibir actualizaciones sobre productos,
                    servicios y promociones
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="pt-[30px]">
          <SubmitButton isLoading={isLoading}>Registrarse</SubmitButton>
        </div>
      </form>
    </Form>
  );
}
