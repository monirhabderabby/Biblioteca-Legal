import { auth } from "@/auth";
import AdSenseUnit from "@/components/AdsenseUnit";
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
    86400,
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
    86400,
  ); // 1 hour cache

  const cu = await auth();

  const cs = await getCurrentUserSubscription();

  const hasFullAccess = cs?.hasAccess;

  if (!document) notFound();

  return (
    <div className="flex items-start container mt-28">
      <div>
        <CollectionHeader document={document} hasFullAccess={hasFullAccess!} />

        {/* Only show Ads if the user does NOT have full access */}

        <ArticleContainer
          documentId={params.id}
          isLoggedin={!!cu}
          hasFullAccess={hasFullAccess!}
        />

        {!hasFullAccess && <AdSenseUnit slot="6259496363" />}
      </div>
      <div className="w-[300px] h-[600px] bg-red-500 sticky top-28 flex justify-center items-center">
        Google Will Inject ads here
      </div>
    </div>
  );
};

export default Page;
