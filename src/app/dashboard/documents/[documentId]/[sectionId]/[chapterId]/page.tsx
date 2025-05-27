import AddDocumentSectionTitleModal from "@/components/shared/modals/add-document-section-ttile-modal";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import moment from "moment";
import { notFound } from "next/navigation";

const Page = async ({
  params,
}: {
  params: { documentId: string; sectionId: string; chapterId: string };
}) => {
  const documentId = params.documentId;

  const document = await prisma.document.findFirst({
    where: {
      id: documentId,
    },
  });

  if (!document) notFound();

  return (
    <div>
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
        <div className="flex items-center gap-x-[30px]">
          <AddDocumentSectionTitleModal
            trigger={<Button>Add Title</Button>}
            documentId={params.documentId}
          />
          <Button
            variant="outline"
            className="text-primary hover:text-primary/80"
          >
            Publish
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Page;
