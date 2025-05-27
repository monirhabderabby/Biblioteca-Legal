import { auth } from "@/auth";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";

const WebsiteLayout = async ({ children }: { children: ReactNode }) => {
  const cu = await auth();
  return (
    <div>
      <Navbar isLoggedin={!!cu} />

      {children}
      <Footer />
      <NextTopLoader showSpinner={false} color="#FFFFFF" />
    </div>
  );
};

export default WebsiteLayout;
