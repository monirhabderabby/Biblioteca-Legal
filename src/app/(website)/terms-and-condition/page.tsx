import ContentViewer from "@/app/dashboard/documents/[documentId]/[sectionId]/[chapterId]/_components/contentViwer";
import HeaderSection from "@/components/shared/sections/header";
import { prisma } from "@/lib/db";

const Page = async () => {
  const data = await prisma.termsOfService.findFirst();

  let content;

  if (!data) {
    content = (
      <div className="h-[600px] flex justify-center items-center">
        Content not published
      </div>
    );
  } else {
    content = <ContentViewer content={data.content} />;
  }

  return (
    <div>
      <HeaderSection
        imageUrl="https://files.edgestore.dev/ln9m9j3kr2yibrue/staticFiled/_public/terms%20and%20condition.webp"
        title="Terms of Service"
        description=""
      />

      <div className="container pt-10">{content}</div>
    </div>
  );
};

export default Page;
