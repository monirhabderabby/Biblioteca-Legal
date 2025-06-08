import { prisma } from "@/lib/db";
import GeneralForm from "./_components/generate-form";
import SecurityForm from "./_components/security-form";

const Page = async () => {
  const settings = await prisma.setting.findFirst();
  return (
    <div className="bg-[#F5F7FA] space-y-5">
      <GeneralForm initialData={settings || undefined} />
      <SecurityForm />
    </div>
  );
};

export default Page;
