import { auth } from "@/auth";
import { getCurrentUserSubscription } from "@/helper/subscription";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ArticleContainer from "./_components/article-container";
import CollectionHeader from "./_components/collection-header";

export async function generateStaticParams() {
  const ids = await prisma.document.findMany({
    select: {
      id: true,
    },
  });

  return ids;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const document = await prisma.document.findUnique({
    where: {
      id: params.id,
    },
  });

  const cu = await auth();

  const cs = await getCurrentUserSubscription();

  const isActive = cs?.subscription.isActive ?? false;
  const currentPeriodEnd = cs?.subscription.currentPeriodEnd;

  const now = new Date();
  const hasFullAccess =
    isActive && !!currentPeriodEnd && currentPeriodEnd > now && !!cu;

  if (!document) notFound();

  return (
    <div className="">
      <CollectionHeader document={document} hasFullAccess={hasFullAccess} />

      <ArticleContainer documentId={params.id} isLoggedin={!!cu} />
    </div>
  );
};

export default Page;
