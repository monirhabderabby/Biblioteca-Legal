"use client";

import { sendSubscriptionReqCompany } from "@/actions/companies/subscription";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  companyContactSchema,
  CompanyContactSchemaType,
} from "@/schemas/company";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { ReactNode, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Schema for form validation

interface Props {
  trigger: ReactNode;
}

export default function CompanyContactModal({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<CompanyContactSchemaType>({
    resolver: zodResolver(companyContactSchema),
    defaultValues: {
      companyName: "",
      numberOfEmployee: undefined,
      managerEmail: "",
      about: "",
    },
  });

  function onSubmit(values: CompanyContactSchemaType) {
    startTransition(() => {
      sendSubscriptionReqCompany(values).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
        form.reset();
        setOpen(false);
      });
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="min-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. OpenAI" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfEmployee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Employees</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value || "0"))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="managerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Manager Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="manager@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Say About Your Company</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your company..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-x-4">
              <Button
                type="button"
                variant="outline"
                className="text-primary hover:text-primary/80"
                disabled={pending}
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={pending}>
                Submit{" "}
                {pending && <Loader2 className="ml-2 animate-spin w-4 h-4" />}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
