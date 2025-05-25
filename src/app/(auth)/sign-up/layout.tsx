import { auth } from "@/auth";
import Navbar from "@/components/ui/navbar";
import { ReactNode } from "react";

const RegistrationLayout = async ({ children }: { children: ReactNode }) => {
  const cu = await auth();
  return (
    <div>
      <Navbar isLoggedin={!!cu} />
      {children}
    </div>
  );
};

export default RegistrationLayout;
