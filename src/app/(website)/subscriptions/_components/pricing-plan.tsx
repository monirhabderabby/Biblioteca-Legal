"use client";
import CompanyContactModal from "@/components/shared/modals/compnay-contact-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalizedPrice } from "@/hooks/use-localized-price";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

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
  price: number;
  note?: string;
}

export default function PricingComparison({
  subscription,
  price: usdAmount,
  note,
}: Props) {
  const price = useLocalizedPrice(usdAmount); // use hook
  const router = useRouter();
  const features = [
    { name: "Acceso ilimitado a documentos", starter: true, business: true },
    { name: "Actualizaciones y noticias", starter: true, business: true },
    {
      name: "Acceso en múltiples dispositivos",
      starter: true,
      business: false,
    },
    {
      name: "Herramientas de lectura inteligente",
      starter: true,
      business: true,
    },
    { name: "Acceso multiusuario", starter: false, business: true },
    { name: "Paquetes de precios escalonados", starter: false, business: true },
  ];

  const now = new Date();

  const isSubscribed =
    subscription?.isActive && new Date(subscription.currentPeriodEnd) > now;

  const userButtonLabel = !subscription
    ? "Comenzar"
    : isSubscribed
      ? "Suscrito"
      : "Renovar";

  return (
    <div className="container mx-auto py-[100px]">
      <div className="flex flex-col md:flex-row justify-center gap-10">
        {/* Plan Inicial */}
        <Card className="relative bg-white border-2 border-gray-200 w-full md:max-w-[334px] shadow-[0px_4px_12px_0px_#0000001A] ">
          <CardHeader className="text-start pb-8">
            <CardTitle className="text-xl font-semibold text-primary mb-2">
              Plan Personal
            </CardTitle>
            <div className="flex items-baseline justify-start">
              <span className="text-4xl font-bold text-primary">{price}</span>
              <span className="text-gray-500 ml-1">/mes</span>
            </div>
            {note && <p className="text-sm text-gray-500 mt-1">{note}</p>}
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              className="w-full bg-gray-900 hover:bg-gray-800 text-white relative"
              disabled={isSubscribed || userButtonLabel === "Renovar"}
              onClick={() => router.push("/sign-up")}
            >
              {userButtonLabel}
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

        {/* Plan Empresarial */}
        <Card className="relative bg-primary border-2 w-full border-black/20 md:max-w-[334px] shadow-[0px_4px_12px_0px_#0000001A]">
          <CardHeader className="text-start pb-8">
            <CardTitle className="text-xl font-semibold text-white mb-2">
              Plan Empresarial
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 ">
            <CompanyContactModal
              trigger={
                <Button className="w-full bg-white hover:bg-white/80 text-slate-900">
                  Contáctanos
                </Button>
              }
            />
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
