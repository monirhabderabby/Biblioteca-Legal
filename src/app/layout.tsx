import Navbar from "@/components/ui/navbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
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

export const metadata: Metadata = {
  title: "Biblioteca Legal",
  description:
    "Biblioteca Legal offers reliable legal resources, case law, and expert insights to support legal professionals, students, and researchers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(raleway.className, poppins.variable, "")}>
        <Navbar isLoggedin={false} />
        {children}

        <NextTopLoader showSpinner={false} color="#FFFFFF" />
      </body>
    </html>
  );
}
