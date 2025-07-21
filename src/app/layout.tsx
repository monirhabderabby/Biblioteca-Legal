import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";
import AppProvider from "@/provider/AppProvider";
import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-raleway",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await prisma.setting.findFirst();

  return {
    title: {
      default: "Biblioteca Legal",
      template: `%s - Biblioteca Legal`,
    },
    description:
      data?.description ??
      "Biblioteca Legal provides expert legal document services, including drafting, reviewing, and managing legal paperwork with accuracy and confidentiality.",
    keywords: data?.keywords ?? [
      "legal document services",
      "legal drafting",
      "contract creation",
      "document review",
      "legal paperwork",
      "business legal documents",
      "remote legal assistance",
      "legal templates",
      "freelance legal support",
      "online legal document services",
      "legal compliance documentation",
      "legal writing services",
      "privacy policy drafting",
      "terms and conditions generator",
    ],
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(raleway.className, poppins.variable, "")}>
        <AppProvider>{children}</AppProvider>
        <Toaster richColors position="bottom-right" />
        <NextTopLoader showSpinner={false} color="#1E2A38" />
      </body>
    </html>
  );
}
