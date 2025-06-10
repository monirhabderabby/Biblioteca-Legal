import { DocumentCreateForm } from "@/components/shared/forms/document-create-form";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const docId = params.id;

  const document = await prisma.document.findUnique({
    where: {
      id: docId,
    },
  });

  if (!document) notFound();
  return (
    <div className="space-y-[40px]">
      <h1 className="text-primary font-semibold text-[32px] leading-[120%]">
        Edit Document
      </h1>

      <DocumentCreateForm initialData={document} />
    </div>
  );
};

export default Page;
