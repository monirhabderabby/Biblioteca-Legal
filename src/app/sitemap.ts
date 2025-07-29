import { prisma } from "@/lib/db";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const documents = await prisma.document.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const documentEntries: MetadataRoute.Sitemap = documents.map((doc) => ({
    url: `${process.env.AUTH_URL}/collections/${doc.id}`,
    lastModified: new Date(doc.updatedAt),
    changeFrequency: "yearly",
  }));
  return [
    {
      url: `${process.env.AUTH_URL}`,
      priority: 1,
    },
    {
      url: `${process.env.AUTH_URL}/subscriptions`,
    },
    {
      url: `${process.env.AUTH_URL}/collections`,
      priority: 2,
    },
    {
      url: `${process.env.AUTH_URL}/about-us`,
    },
    {
      url: `${process.env.AUTH_URL}/contact`,
      priority: 3,
    },
    ...documentEntries,
  ];
}
