import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import CollectionHeader from "./_components/collection-header";

const Page = async ({ params }: { params: { id: string } }) => {
  const document = await prisma.document.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!document) notFound();

  return (
    <div className="mt-10">
      <CollectionHeader />
    </div>
  );
};

export default Page;
