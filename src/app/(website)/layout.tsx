import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import { ReactNode } from "react";

const WebsiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar isLoggedin={false} />

      {children}
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
