import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AccountSidebar from "./account-sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-fit">Account Menu</Button>
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Menus</SheetTitle>
        </SheetHeader>

        <AccountSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
