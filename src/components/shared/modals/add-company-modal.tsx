"use client";
import { createCompanies } from "@/actions/companies/create";
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
import { companySchema, CompanySchemaType } from "@/schemas/company";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  trigger: ReactNode;
  initialData?: Company;
}
export default function AddCompanyModal({ trigger, initialData }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const form = useForm<CompanySchemaType>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: initialData?.name ?? "",
      location: initialData?.location ?? "",
    },
  });

  function onSubmit(values: CompanySchemaType) {
    startTransition(() => {
      createCompanies(values).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        form.reset();
        toast.success(res.message, {
          description: res.description,
        });

        queryClient.invalidateQueries({ queryKey: ["companies"] });

        setOpen(false);
      });
    });
  }

  useEffect(() => {
    if (open && initialData) {
      form.reset({ name: initialData.name });
    }
  }, [open, initialData, form]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 s">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Enter Company Name"
                      type="text"
                      {...field}
                      disabled={pending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Location</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Enter company location"
                      type="text"
                      {...field}
                      disabled={pending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Owner Email</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Enter Contact email"
                      type="email"
                      {...field}
                      disabled={pending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overview</FormLabel>
                  <FormControl>
                    <Textarea
                      className="w-full min-h-[160px]"
                      placeholder="Company overview"
                      {...field}
                      disabled={pending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-x-4">
              <Button
                variant="outline"
                className="text-primary hover:text-primary/80"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
                type="button"
                disabled={pending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={pending}>
                {initialData ? "Save Now" : "Submit"}{" "}
                {pending && <Loader2 className="animate-spin" />}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
