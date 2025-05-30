import CTA from "@/components/shared/sections/cta";
import HeaderSection from "@/components/shared/sections/header";
import { getCurrentUserSubscription } from "@/helper/subscription";
import PricingComparison from "./_components/pricing-plan";

const Page = async () => {
  const currentSubscription = await getCurrentUserSubscription();

  return (
    <div>
      <HeaderSection
        imageUrl="https://files.edgestore.dev/ln9m9j3kr2yibrue/public/_public/56a74cc0-2cda-4bc2-8641-c3b9914a3bdf.jpg"
        title="Our Subscriptions"
        description="Join our platform to access comprehensive legal resources"
      />

      <PricingComparison subscription={currentSubscription?.subscription} />

      <CTA />
    </div>
  );
};

export default Page;
