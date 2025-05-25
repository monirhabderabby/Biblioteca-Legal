import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SIdebar from "./_components/sidebar";
import Topbar from "./_components/top-bar";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const cu = await auth();

  if (!cu) redirect("/login");

  if (cu.user.role !== "admin") redirect("/");
  return (
    <div className="flex min-h-screen flex-col">
      <SIdebar />
      {/* Main Content */}
      <div className="ml-64 flex flex-1 flex-col">
        {/* Top Bar */}
        <Topbar name={cu.user.name as string} />

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
