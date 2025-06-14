"use client";
import AlertModal from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { accountTablists } from "./data";

const AccountSidebar = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();

  const onLogout = () => {
    setIsLoading(true);
    signOut({
      redirectTo: "/",
    });
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);
  return (
    <div className=" h-full">
      <div className="flex h-full max-h-screen flex-col gap-2 ">
        <div className="flex-1 overflow-auto">
          <nav className="grid items-start pr-6 text-sm font-medium space-y-2">
            {accountTablists.map((tab) => (
              <Link
                key={tab.id}
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-white  transition-all hover:text-white/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                      pathname === tab.path,
                  }
                )}
                href={tab.path}
              >
                {/* <div className="border rounded-lg border-gray-400 p-1 bg-white">
                  {tab.icon}
                </div> */}
                {tab.linkText}
              </Link>
            ))}

            <Button
              variant="link"
              className={clsx(
                "flex items-start text-start mr-auto gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              )}
              onClick={() => setOpen(true)}
            >
              Logout
            </Button>
          </nav>
        </div>
      </div>

      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onLogout}
        loading={isLoading}
        title="¿Estás seguro que quieres cerrar sesión?"
        message=""
      />
    </div>
  );
};

export default AccountSidebar;
