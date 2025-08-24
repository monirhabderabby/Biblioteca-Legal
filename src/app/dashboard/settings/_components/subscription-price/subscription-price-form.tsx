/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { subscriptionPriceChangeAction } from "@/actions/subscription/dashboard";
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
import { Input } from "@/components/ui/input";
import { SmoothCollapse } from "@/provider/smooth-collapse";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define Zod schema
const formSchema = z.object({
  subscriptionPrice: z
    .number({ invalid_type_error: "Price must be a number." })
    .min(1, { message: "Price must be at least 1." })
    .max(10000, { message: "Price must not exceed 10000." }),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  initialPrice: number;
}

export default function SubscriptionPriceForm({ initialPrice }: Props) {
  const [updateReady, setUpdateReady] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subscriptionPrice: initialPrice ?? 0,
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (values.subscriptionPrice === initialPrice) {
      setUpdateReady(false);
      console.log("dukse");
      return;
    }
    startTransition(() => {
      subscriptionPriceChangeAction({
        newPrice: values.subscriptionPrice,
      }).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }
        // handle success
        toast.success(res.message);
        setUpdateReady(false);
      });
    });
  };

  return (
    <div className="w-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="bg-white rounded-[15px] shadow-none">
            <CardHeader className="pb-3 pt-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-primary text-xl font-semibold">
                  Subscription Settings
                </CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  className="px-4 py-2 text-primary hover:text-primary/80 rounded-md"
                  onClick={() => setUpdateReady((p) => !p)}
                  disabled={pending}
                >
                  {updateReady ? "Cancel" : "Update"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4 mb-[50px]">
                <FormLabel className="text-sm font-medium text-gray-700 w-1/3">
                  Subscription Price ($):
                </FormLabel>
                <FormField
                  control={form.control}
                  name="subscriptionPrice"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="w-full p-2 border rounded-md bg-[#F5F7FA]"
                          placeholder="Enter new subscription price"
                          aria-label="Subscription price"
                          disabled={!updateReady}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <SmoothCollapse isOpen={updateReady}>
                <div className="flex justify-end space-x-[30px]">
                  <Button
                    type="submit"
                    className="px-4 py-2 text-white rounded-md"
                    disabled={pending}
                  >
                    {pending ? "Saving" : "Save"}
                    {pending && <Loader2 className="animate-spin ml-2" />}
                  </Button>
                </div>
              </SmoothCollapse>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
