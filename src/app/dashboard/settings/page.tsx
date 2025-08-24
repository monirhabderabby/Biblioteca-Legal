import { prisma } from "@/lib/db";
import { paddle } from "@/lib/paddle";
import AdminAccessContainer from "./_components/admin-access/admin-access-container";
import GeneralForm from "./_components/generate-form";
import SecurityForm from "./_components/security-form";
import SubscriptionPriceForm from "./_components/subscription-price/subscription-price-form";

const Page = async () => {
  const settings = await prisma.setting.findFirst();
  // Paddle থেকে USD price আনছি
  const response = await paddle.prices.get(process.env.NEXT_PUBLIC_PRICE_ID!);
  const priceData = response.unitPrice;
  const usdAmount = Number(priceData.amount) / 100; // cent থেকে dollar
  return (
    <div className="bg-[#F5F7FA] space-y-5 pb-[100px]">
      <AdminAccessContainer />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-7">
          <SecurityForm />
        </div>
        <div className="col-span-5">
          <SubscriptionPriceForm initialPrice={usdAmount} />
        </div>
      </div>
      <GeneralForm initialData={settings || undefined} />
    </div>
  );
};

export default Page;
