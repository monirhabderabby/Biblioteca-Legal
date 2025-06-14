"use client";

import { changePasswordAction } from "@/actions/auth/password-change";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import {
  passwordChangeSchema,
  passwordChangeSchemaType,
} from "@/schemas/profile/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const [editable, setEditable] = useState(false);
  const [pending, startTransition] = useTransition();
  const form = useForm<passwordChangeSchemaType>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: passwordChangeSchemaType) {
    startTransition(() => {
      changePasswordAction(values).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
        form.reset(); // Reset the form after successful submission
        setEditable(false); // Set editable to false after successful change
      });
    });
  }

  return (
    <div>
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              Cambiar Contraseña
            </CardTitle>
            {editable ? (
              <Button
                variant="outline"
                className="text-primary hover:text-primary/80"
                onClick={() => {
                  setEditable(!editable);
                  form.reset(); // Restablece el formulario al cancelar
                }}
                disabled={!editable}
              >
                Cancelar
              </Button>
            ) : (
              <Button
                variant="outline"
                className="text-primary hover:text-primary/80"
                onClick={() => setEditable(!editable)}
                disabled={editable}
              >
                Editar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-muted-foreground">
                        Ingresa tu contraseña actual
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Contraseña actual"
                          {...field}
                          disabled={!editable}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-muted-foreground">
                        Ingresa tu nueva contraseña
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Nueva contraseña"
                          {...field}
                          disabled={!editable}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-muted-foreground">
                        Confirma tu nueva contraseña
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Confirmar contraseña"
                          disabled={!editable}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {editable && (
                <div className="flex justify-start">
                  <Button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-700"
                  >
                    {pending && <Loader2 className="animate-spin" />} Guardar
                    cambios
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
