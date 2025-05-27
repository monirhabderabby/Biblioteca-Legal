"use client";
import { createCategory } from "@/actions/category/create";
import { editCategory } from "@/actions/category/edit";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
import { sectionTitleSchema, SectionTitleSchemaType } from "@/schemas/document";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  trigger: ReactNode;
  initialData?: Category;
}
export default function AddDocumentSectionTitleModal({
  trigger,
  initialData,
}: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<SectionTitleSchemaType>({
    resolver: zodResolver(sectionTitleSchema),
    defaultValues: {
      name: initialData?.name ?? "",
    },
  });

  function onSubmit(values: SectionTitleSchemaType) {
    startTransition(() => {
      if (initialData) {
        editCategory(initialData.id, values).then((res) => {
          if (!res.success) {
            toast.error(res.message);
            return;
          }

          // handle success
          toast.success(res.message);
          form.reset();
          setOpen(false);
        });
      } else {
        createCategory(values).then((res) => {
          if (!res.success) {
            toast.error(res.message);
            return;
          }

          // handle success
          toast.success(res.message);
          form.reset();
          setOpen(false);
        });
      }
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 s">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder=""
                      type="text"
                      {...field}
                      disabled={pending}
                    />
                  </FormControl>
                  <FormDescription>
                    {initialData
                      ? "Edit a section title "
                      : "Write a section title"}
                  </FormDescription>
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
