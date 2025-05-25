"use client";
import { createCategory } from "@/actions/category/create";
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
import { categorySchema, CategorySchemaType } from "@/schemas/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { ReactNode, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  trigger: ReactNode;
}
export default function AddCategoryDialog({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
  });

  function onSubmit(values: CategorySchemaType) {
    startTransition(() => {
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
    });
  }

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
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder=""
                      type="text"
                      {...field}
                      disabled={pending}
                    />
                  </FormControl>
                  <FormDescription>Write a category name</FormDescription>
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
                Submit {pending && <Loader2 className="animate-spin" />}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
