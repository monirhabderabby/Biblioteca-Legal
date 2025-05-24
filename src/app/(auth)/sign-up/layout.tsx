import Navbar from "@/components/ui/navbar";
import { ReactNode } from "react";

const RegistrationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar isLoggedin={false} />
      {children}
    </div>
  );
};

export default RegistrationLayout;
