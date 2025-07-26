"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import AccountSidebar from "./account-sidebar";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="w-fit" onClick={() => setOpen((p) => !p)}>
          Account Menu
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Menus</SheetTitle>
        </SheetHeader>

        <AccountSidebar onTabClick={() => setOpen((p) => !p)} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
