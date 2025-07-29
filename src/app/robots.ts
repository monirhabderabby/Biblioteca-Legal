import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/account",
          "/privacy-policy",
          "/privacy-policy",
          "/terms-and-condition",
        ],
      },
    ],
    sitemap: `${process.env.AUTH_URL}/sitemap.xml`,
  };
}
