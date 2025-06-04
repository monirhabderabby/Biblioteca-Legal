"use client";

import { updatePrivacyPolicy } from "@/actions/content/update";
import RichTextEditor from "@/components/shared/sections/RichTextEditor";
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
import { contentSchema, ContentSchemaType } from "@/schemas/content";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  initialContent: string;
}

const PrivacyPolicyContainer = ({ initialContent }: Props) => {
  const [pending, startTransition] = useTransition();

  const form = useForm<ContentSchemaType>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      content: initialContent,
    },
  });

  function onSubmit(values: ContentSchemaType) {
    startTransition(() => {
      updatePrivacyPolicy(values).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
      });
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-x-5 bg-white"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <RichTextEditor
                  content={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                This is your privacy policy content.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end mt-4">
          <Button type="submit" disabled={pending}>
            Publish {pending && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PrivacyPolicyContainer;
