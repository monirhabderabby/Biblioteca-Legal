import ContentViewer from "@/app/dashboard/documents/[documentId]/[sectionId]/[chapterId]/_components/contentViwer";
import HeaderSection from "@/components/shared/sections/header";
import { prisma } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const Page = async () => {
  const data = await prisma.privacyPolicy.findFirst();

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
        imageUrl="https://files.edgestore.dev/ln9m9j3kr2yibrue/staticFiled/_public/terms%20and%20condition.webp"
        title="Política de Privacidad"
        description=""
      />

      <div className="container mr-auto py-10 lg:py-20 max-w-[850px]">
        {content}
      </div>
    </div>
  );
};

export default Page;
