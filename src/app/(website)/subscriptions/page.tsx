import CTA from "@/components/shared/sections/cta";
import HeaderSection from "@/components/shared/sections/header";
import { getCurrentUserSubscription } from "@/helper/subscription";
import PricingComparison from "./_components/pricing-plan";

const Page = async () => {
  const currentSubscription = await getCurrentUserSubscription();

  return (
    <div>
      <HeaderSection
        imageUrl="https://files.edgestore.dev/ln9m9j3kr2yibrue/staticFiled/_public/subscription%20page.webp"
        title="Our Subscriptions"
        description="Join our platform to access comprehensive legal resources"
      />

      <PricingComparison
        subscription={currentSubscription?.subscription}
        sub_type={currentSubscription?.type as "user" | "company"}
      />

      <CTA />
    </div>
  );
};

export default Page;
