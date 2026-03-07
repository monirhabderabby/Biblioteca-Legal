import { auth } from "@/auth";
import AdSenseUnit from "@/components/AdsenseUnit";
import { adsSLot } from "@/constants";
import { getCurrentUserSubscription } from "@/helper/subscription";
import { prisma } from "@/lib/db";
import { cache } from "@/lib/redis/cache";
import { notFound } from "next/navigation";
import ArticleContainer from "./_components/article-container";
import CollectionHeader from "./_components/collection-header";

export const revalidate = 86400;

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
  );
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
  );

  const cu = await auth();
  const cs = await getCurrentUserSubscription();
  const hasFullAccess = cs?.hasAccess;
  const showAds = !hasFullAccess; // logged-out + free users both see ads

  if (!document) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4">
      <CollectionHeader document={document} hasFullAccess={hasFullAccess!} />

      {/* ── AD SLOT 1: Top banner — below header, above content ── */}
      {showAds && (
        <div className="w-full my-4 flex justify-center">
          <AdSenseUnit slot={adsSLot} format="horizontal" />
        </div>
      )}

      {/* ── Main layout: content + sidebar ── */}
      <div className="flex gap-6 items-start">
        {/* ── Article content ── */}
        <div className="flex-1 min-w-0">
          <ArticleContainer
            documentId={params.id}
            isLoggedin={!!cu}
            hasFullAccess={hasFullAccess!}
            /* Pass showAds so ArticleContainer can inject between-section ads */
            showAds={showAds}
          />
        </div>

        {/* ── AD SLOT 3: Sticky sidebar ── */}
        {showAds && (
          <aside className="hidden lg:block w-[300px] shrink-0">
            <div className="sticky top-24 space-y-6">
              <AdSenseUnit slot={adsSLot} format="vertical" />
              {/* Second sidebar unit lower down */}
              <AdSenseUnit slot={adsSLot} format="vertical" />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Page;
