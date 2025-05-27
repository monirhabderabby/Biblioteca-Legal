"use client";
import { createDocumentChapterTitle } from "@/actions/document/section/chapter/create";
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
import { chapterTitleSchema, ChapterTitleSchemaType } from "@/schemas/document";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  trigger: ReactNode;
  initialData?: Chapter;
  sectionId: string;
  documentId: string; // Optional, if needed for context
}
export default function AddDocumentChapterTitleModal({
  trigger,
  initialData,
  sectionId,
  documentId, // Ensure this is passed if needed for the action
}: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<ChapterTitleSchemaType>({
    resolver: zodResolver(chapterTitleSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      sectionId: sectionId, // Ensure the documentId is set
    },
  });

  function onSubmit(values: ChapterTitleSchemaType) {
    startTransition(() => {
      createDocumentChapterTitle(values, documentId).then((res) => {
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

  useEffect(() => {
    if (open && initialData) {
      form.reset({ title: initialData.title });
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder=""
                      type="text"
                      {...field}
                      onChange={(e) => {
                        e.stopPropagation();
                        field.onChange(e);
                      }}
                      disabled={pending}
                    />
                  </FormControl>
                  <FormDescription>
                    {initialData
                      ? "Edit a chapter title "
                      : "Write a chapter title"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-x-4">
              <Button
                variant="outline"
                className="text-primary hover:text-primary/80"
                onClick={(e) => {
                  e.stopPropagation();
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
