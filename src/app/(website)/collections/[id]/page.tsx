import { auth } from "@/auth";
import { getCurrentUserSubscription } from "@/helper/subscription";
import { prisma } from "@/lib/db";
import { cache } from "@/lib/redis/cache";
import { notFound } from "next/navigation";
import ArticleContainer from "./_components/article-container";
import CollectionHeader from "./_components/collection-header";

export const revalidate = 86400;

// Cache static params to reduce DB queries
export async function generateStaticParams() {
  const ids = await cache(
    "document_ids",
    async () => {
      const res = await prisma.document.findMany({
        select: { id: true },
      });
      return res;
    },
    86400
  ); // cache 1 day
  return ids;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const document = await cache(
    `document:${params.id}`,
    async () => {
      return await prisma.document.findUnique({
        where: { id: params.id },
      });
    },
    86400
  ); // 1 hour cache

  const cu = await auth();

  const cs = await getCurrentUserSubscription();

  const isActive = cs?.subscription.isActive ?? false;
  const currentPeriodEnd = cs?.subscription.currentPeriodEnd;

  const now = new Date();
  const hasFullAccess =
    isActive && !!currentPeriodEnd && currentPeriodEnd > now && !!cu;

  if (!document) notFound();

  return (
    <div>
      <CollectionHeader document={document} hasFullAccess={hasFullAccess} />

      <ArticleContainer documentId={params.id} isLoggedin={!!cu} />
    </div>
  );
};

export default Page;
