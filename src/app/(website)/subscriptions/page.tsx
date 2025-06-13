import { auth } from "@/auth";
import CTA from "@/components/shared/sections/cta";
import HeaderSection from "@/components/shared/sections/header";
import { getCurrentUserSubscription } from "@/helper/subscription";
import { paddle } from "@/lib/paddle";
import PricingComparison from "./_components/pricing-plan";

const Page = async () => {
  const cu = await auth();
  const isLoggedin = !!cu;
  const currentSubscription = await getCurrentUserSubscription();

  const response = await paddle.prices.get(process.env.NEXT_PUBLIC_PRICE_ID!);
  const priceData = response.unitPrice;

  const formattedAmount = formatPrice(priceData.amount, priceData.currencyCode);

  return (
    <div>
      <HeaderSection
        imageUrl="https://files.edgestore.dev/ln9m9j3kr2yibrue/staticFiled/_public/subscription%20page.webp"
        title="Nuestros Planes"
        description="Únete a nuestra plataforma para acceder a recursos legales actualizados"
      />

      <PricingComparison
        subscription={currentSubscription?.subscription}
        sub_type={currentSubscription?.type as "user" | "company"}
        price={formattedAmount}
      />

      {!isLoggedin && <CTA />}
    </div>
  );
};

export default Page;

function formatPrice(amountCents: string, currencyCode: string): string {
  const amount = Number(amountCents) / 100;
  // Remove decimals if whole number
  const formattedAmount =
    amount % 1 === 0 ? amount.toString() : amount.toFixed(2);

  // Map currency codes to symbols
  const currencySymbols: Record<string, string> = {
    USD: "$",
    HNL: "L",
    // add more if needed
  };

  const symbol = currencySymbols[currencyCode] || currencyCode;

  return `${symbol}${formattedAmount}`;
}
