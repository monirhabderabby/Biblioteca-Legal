import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ArticleContainer from "./_components/article-container";
import CollectionHeader from "./_components/collection-header";

const Page = async ({ params }: { params: { id: string } }) => {
  const document = await prisma.document.findUnique({
    where: {
      id: params.id,
    },
  });

  const cu = await auth();

  if (!document) notFound();

  return (
    <div className="">
      <CollectionHeader document={document} />

      <ArticleContainer documentId={params.id} isLoggedin={!!cu} />
    </div>
  );
};

export default Page;
