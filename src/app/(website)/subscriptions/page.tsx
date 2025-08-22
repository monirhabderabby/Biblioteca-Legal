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

  // Paddle থেকে USD price আনছি
  const response = await paddle.prices.get(process.env.NEXT_PUBLIC_PRICE_ID!);
  const priceData = response.unitPrice;
  const usdAmount = Number(priceData.amount) / 100; // cent থেকে dollar

  return (
    <div>
      <HeaderSection
        imageUrl="https://files.edgestore.dev/ln9m9j3kr2yibrue/staticFiled/_public/subscription%20page.webp"
        title="Nuestros Planes"
        description="Únete a nuestra plataforma para acceder a recursos legales actualizados"
      />

      {/* এখানে number (usdAmount) পাঠানো হলো */}
      <PricingComparison
        subscription={currentSubscription?.subscription}
        sub_type={currentSubscription?.type as "user" | "company"}
        price={usdAmount}
        note={`(Approx USD $${usdAmount})`} // চাইলে reference USD টেক্সট দেখাতে পারেন
      />

      {!isLoggedin && <CTA />}
    </div>
  );
};

export default Page;
