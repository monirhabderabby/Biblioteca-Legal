"use client";
import { registeruser } from "@/actions/auth/registration";
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
import { registrationSchema, RegistrationSchemaType } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegistrationForm() {
  const [isRedirecting, setRedirecting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const form = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
  });

  function onSubmit(values: RegistrationSchemaType) {
    startTransition(() => {
      registeruser(values).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        setRedirecting(true);

        toast.success(res.message);
        router.push("/sign-up/confirmation");
      });
    });
  }

  useEffect(() => {
    return () => {
      setRedirecting(false);
    };
  }, []);

  const isLoading = isPending || isRedirecting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-[20px] max-w-[730px] mx-auto py-10"
      >
        <h1 className="text-black font-semibold text-[20px] leading-[120%]">
          Personal Information
        </h1>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" type="" {...field} />
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
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" type="" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <h1 className="text-black font-semibold text-[20px] leading-[120%] pt-[30px]">
          Account Security
        </h1>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>
                Password must be at least 8 characters and include uppercase,
                lowercase, and numbers
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
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm Password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3 pt-[20px]">
          <p className="text-black font-medium text-[12px] md:text-[14px] mb-[20px]">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy. We will process your personal data in accordance
            with our Privacy Policy.
          </p>
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex  flex-row items-start space-x-3 space-y-0 rounded-md border-0 ">
                <FormControl>
                  <Checkbox
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none ">
                  <FormLabel>
                    I accept the Terms of Service and Privacy Policy
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="promotion"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border-0 ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I would like to receive updates about products, services,
                    and promotions
                  </FormLabel>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="pt-[30px]">
          <SubmitButton isLoading={isLoading}>Sign up</SubmitButton>
        </div>
      </form>
    </Form>
  );
}
