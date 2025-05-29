import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import CompanyHeader from "./_components/company-header";

export type CompanyWithEmployees = Prisma.CompanyGetPayload<{
  include: {
    employees: true;
  };
}>;

const Page = async ({ params }: { params: { id: string } }) => {
  const company = await prisma.company.findUnique({
    where: {
      id: params.id,
    },
    include: {
      employees: true,
    },
  });

  if (!company) notFound();
  return (
    <div>
      <CompanyHeader data={company} />
    </div>
  );
};

export default Page;
