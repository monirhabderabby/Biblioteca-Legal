import { auth } from "@/auth";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import { prisma } from "@/lib/db";
import { GoogleAnalytics } from "@next/third-parties/google";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";

const WebsiteLayout = async ({ children }: { children: ReactNode }) => {
  const cu = await auth();
  let user;
  if (cu?.user.id) {
    user = await prisma.user.findUnique({
      where: {
        id: cu.user.id,
      },
    });
  }
  return (
    <div>
      <Navbar isLoggedin={!!cu} user={user ?? null} />

      {children}
      <Footer />
      <NextTopLoader showSpinner={false} color="#FFFFFF" />
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
    </div>
  );
};

export default WebsiteLayout;
