const AddDocumentSectionTitleModal = dynamic(
  () => import("@/components/shared/modals/add-document-section-ttile-modal"),
  {
    ssr: false,
  }
);
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import moment from "moment";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import DocumentHeaderAction from "./_components/document-header-action";
import SectionTitleContainer from "./_components/section-title-container";

const Page = async ({ params }: { params: { documentId: string } }) => {
  const document = await prisma.document.findFirst({
    where: {
      id: params.documentId,
    },
  });

  if (!document) notFound();

  const allSections = await prisma.section.findMany({
    where: {
      documentId: document.id,
    },
    include: {
      chapters: true,
    },
  });

  return (
    <div className="space-y-[30px]">
      <section className="flex justify-between items-start">
        <div className="space-y-[15px]">
          <h1 className="font-bold text-[24px] leading-[120%]">
            {document.name}
          </h1>
          <p className="font-medium leading-[120%]">
            {document.short_description}
          </p>
          <p className=" leading-[120%]">
            Law No. <span className="font-medium">{document.law_number}</span>
          </p>
          <p>
            Published:{" "}
            <span className="font-medium">
              {moment(document.createdAt).format("MMMM D, YYYY")}
            </span>
          </p>
        </div>
        <DocumentHeaderAction
          documentId={params.documentId}
          document={document}
        />
      </section>

      <div className="w-full flex justify-end">
        <AddDocumentSectionTitleModal
          trigger={<Button>Add Title</Button>}
          documentId={params.documentId}
        />
      </div>

      <SectionTitleContainer
        sections={allSections ?? []}
        documentId={params.documentId}
      />
    </div>
  );
};

export default Page;
