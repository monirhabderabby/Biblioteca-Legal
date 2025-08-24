import ContentViewer from "@/app/dashboard/documents/[documentId]/[sectionId]/[chapterId]/_components/contentViwer";
import HeaderSection from "@/components/shared/sections/header";
import { prisma } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
};

const Page = async () => {
  const data = await prisma.refundPolicy.findFirst();

  let content;

  if (!data) {
    content = (
      <div className="h-[600px] flex justify-center items-center">
        Contenido no publicado
      </div>
    );
  } else {
    content = <ContentViewer content={data.content} />;
  }

  return (
    <div>
      <HeaderSection
        imageUrl="/terms.webp"
        title="Política de Reembolsos"
        description=""
      />

      <div className="container mr-auto py-10 lg:py-20 max-w-[850px]">
        {content}
      </div>
    </div>
  );
};

export default Page;
