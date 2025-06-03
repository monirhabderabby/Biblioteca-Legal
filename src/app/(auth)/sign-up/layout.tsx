import { auth } from "@/auth";
import Navbar from "@/components/ui/navbar";
import { prisma } from "@/lib/db";
import { ReactNode } from "react";

const RegistrationLayout = async ({ children }: { children: ReactNode }) => {
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
    </div>
  );
};

export default RegistrationLayout;
