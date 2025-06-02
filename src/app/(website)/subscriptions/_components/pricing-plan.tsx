"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPaddleCustomerId } from "@/helper/subscription";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface Sub {
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  sub_id?: string;
  isActive: boolean;
  userId: string;
}

interface Props {
  subscription?: Sub;
  sub_type: "user" | "company";
}

export default function PricingComparison({ subscription, sub_type }: Props) {
  // const [pending, startTransition] = useTransition();
  const [paddle, setPaddle] = useState<Paddle>();

  const router = useRouter();
  const features = [
    { name: "Unlimited Access to Documents", starter: true, business: true },
    { name: "Update and News", starter: true, business: true },
    { name: "Multi Device Access", starter: true, business: false },
    { name: "Smart Reading Tools", starter: true, business: true },
    { name: "Multi User Access", starter: false, business: true },
    { name: "Tiered Pricing Packages", starter: false, business: true },
  ];

  const now = new Date();

  const isSubscribed =
    subscription?.isActive && new Date(subscription.currentPeriodEnd) > now;

  const userButtonLabel = !subscription
    ? "Get Started"
    : isSubscribed
      ? "Subscribed"
      : "Renew";

  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_TOKEN!,
    }).then((paddle) => setPaddle(paddle));
  }, []);

  const onNewSubscribe = () => {
    if (isSubscribed) {
      toast.info("You are already subscribed.");
      return;
    }

    if (!paddle) {
      toast.warning("Paddle is not initialized");
      return;
    }

    startTransition(() => {
      startTransition(async () => {
        const customerId = await getPaddleCustomerId(
          subscription?.userId as string
        );
        if (!customerId) {
          toast.error("user not found to create paddle customer id");
          return;
        }
        paddle.Checkout.open({
          items: [
            {
              priceId: "pri_01jwbf7deypnwz4jya27m0nzjq",
              quantity: 1,
            },
          ],
          customer: {
            id: customerId,
          },
          customData: {
            userId: subscription?.userId,
          },
        });
      });
    });
  };

  const renewSubscription = () => {
    if (isSubscribed) {
      toast.info("You are already subscribed.");
      return;
    }

    if (!paddle) {
      toast.warning("Paddle is not initialized");
      return;
    }
  };

  return (
    <div className="container mx-auto py-[100px]">
      <div className="flex flex-col md:flex-row justify-center gap-10">
        {/* Starter Plan */}
        <Card className="relative bg-white border-2 border-gray-200 w-full md:max-w-[334px] shadow-[0px_4px_12px_0px_#0000001A] ">
          <CardHeader className="text-start pb-8">
            <CardTitle className="text-xl font-semibold text-primary mb-2">
              User base
            </CardTitle>
            <div className="flex items-baseline justify-start">
              <span className="text-4xl font-bold text-primary">$150</span>
              <span className="text-gray-500 ml-1">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              className="w-full bg-gray-900 hover:bg-gray-800 text-white relative"
              disabled={isSubscribed}
              onClick={() => {
                if (userButtonLabel === "Get Started") {
                  router.push("/sign-up");
                } else if (
                  userButtonLabel === "Renew" &&
                  sub_type === "company"
                ) {
                  onNewSubscribe();
                } else if (userButtonLabel === "Renew" && sub_type === "user") {
                  renewSubscription();
                }
                // Add additional logic for "Renew" here if needed
              }}
            >
              {userButtonLabel}
              {/* {pending && <Loader2 className="animate-spin absolute right-3" />} */}
            </Button>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  {feature.starter ? (
                    <div className="bg-[#E8EDFB] w-5 h-5 rounded-full flex justify-center items-center">
                      <Check className="w-3 h-3 text-black flex-shrink-0" />
                    </div>
                  ) : (
                    <div className="bg-[#F7F8F9] w-5 h-5 rounded-full flex justify-center items-center">
                      <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                  )}
                  <span
                    className={`text-sm ${
                      feature.starter ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Business Plan */}
        <Card className="relative bg-primary border-2 w-full border-black/20 md:max-w-[334px] shadow-[0px_4px_12px_0px_#0000001A]">
          <CardHeader className="text-start pb-8">
            <CardTitle className="text-xl font-semibold text-white mb-2">
              Company base
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 ">
            <Button className="w-full bg-white hover:bg-white/80 text-slate-900">
              Contact us
            </Button>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-white">{feature.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
