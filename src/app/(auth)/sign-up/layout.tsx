import { auth } from "@/auth";
import Navbar from "@/components/ui/navbar";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const RegistrationLayout = async ({ children }: { children: ReactNode }) => {
  const cu = await auth();
  let user;
  if (cu?.user.id) {
    user = await prisma.user.findUnique({
      where: {
        id: cu.user.id,
      },
    });
  }

  if (!!cu) redirect("/");
  return (
    <div>
      <Navbar isLoggedin={!!cu} user={user ?? null} />
      {children}
    </div>
  );
};

export default RegistrationLayout;
