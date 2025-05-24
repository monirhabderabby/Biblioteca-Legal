import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export default function PricingComparison() {
  const features = [
    { name: "Up to 5 team members", starter: true, business: true },
    { name: "10GB cloud storage", starter: true, business: true },
    { name: "Basic analytics dashboard", starter: true, business: true },
    { name: "Email support", starter: true, business: true },
    { name: "Advanced reporting", starter: false, business: true },
    { name: "Priority support", starter: false, business: true },
    { name: "Custom integrations", starter: false, business: true },
    { name: "Unlimited team members", starter: false, business: true },
  ];

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
              <span className="text-4xl font-bold text-primary">$29</span>
              <span className="text-gray-500 ml-1">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
              Get Started Now
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
            <div className="flex items-baseline justify-start">
              <span className="text-4xl font-bold text-white">$99</span>
              <span className="text-slate-300 ml-1">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
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
