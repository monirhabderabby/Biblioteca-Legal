import { ReactNode } from "react";
import AccountSidebar from "./_components/account-sidebar";
import MobileSidebar from "./_components/mobile-sidebar";

const AccountLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container grid h-auto grid-cols-6 pt-[80px] md:pt-[100px]  w-full min-h-screen">
      <div className="w-full ">
        <div className="hidden md:block md:col-span-1">
          <AccountSidebar />
        </div>
        <div className="md:hidden  w-full">
          <MobileSidebar />
        </div>
      </div>
      <div className="col-span-6 md:col-span-5 md:px-4 lg:px-6">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
