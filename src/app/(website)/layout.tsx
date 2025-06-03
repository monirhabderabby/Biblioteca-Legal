import { auth } from "@/auth";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import { prisma } from "@/lib/db";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";

const WebsiteLayout = async ({ children }: { children: ReactNode }) => {
  const cu = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: cu?.user.id,
    },
  });
  return (
    <div>
      <Navbar isLoggedin={!!cu} user={user} />

      {children}
      <Footer />
      <NextTopLoader showSpinner={false} color="#FFFFFF" />
    </div>
  );
};

export default WebsiteLayout;
