"use client";

// Packages
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

// Components
import { logoutAction } from "@/actions/auth/logout";
import { logoSrc } from "@/helper/assets";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import FramerDropdown from "./framer-dropdown";

interface Props {
  isLoggedin: boolean;
  user: User | null;
}

const Navbar = ({ isLoggedin, user }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [scrolling, setScrolling] = useState(false); // Track scrolling state for styling changes

  const pathname = usePathname(); // Get current route to highlight active menu

  const menus = [
    { id: 1, href: "/", linkText: "Inicio" },
    { id: 2, href: "/collections", linkText: "Colección" },
    { id: 3, href: "/subscriptions", linkText: "Subscripciones" },
    { id: 4, href: "/contact", linkText: "Contacto" },
  ];

  // Track window scroll to update navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true); // Set navbar background when scrolling
      } else {
        setScrolling(false); // Reset when not scrolling
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onLogout = async () => {
    startTransition(() => {
      logoutAction().then((res) => {
        if (res && !res.success) {
          toast.error(res.message);
          return;
        }
      });
    });
  };

  return (
    <div
      className={cn(
        "py-3 fixed top-0 z-50  w-full h-[60px] transition duration-300",
        scrolling && "bg-white",
        pathname === "/"
          ? "text-primary"
          : pathname.startsWith("/collections/") ||
              pathname.startsWith("/account")
            ? "text-black"
            : scrolling
              ? "text-primary"
              : "text-white"
      )}
    >
      <div className="container mx-auto h-full">
        <div className="flex justify-between items-center">
          <div>
            <Link href={"/"} className="bg-red-500 ">
              <Image src={logoSrc} width={40} height={40} alt="Logo" />
            </Link>
          </div>
          <div className="hidden md:flex items-center md:gap-x-5 lg:gap-x-10">
            {/* Desktop Menu Links */}
            {menus.map((menu) => (
              <Link
                key={menu.id}
                href={menu.href}
                className={cn(
                  pathname === menu.href ? "font-semibold" : "font-light"
                )}
              >
                {menu.linkText}
              </Link>
            ))}
          </div>
          {/* Login button */}
          <div className="hidden md:block">
            {isLoggedin ? (
              <>
                <FramerDropdown
                  trigger={
                    <Image
                      src={user?.image ?? "https://github.com/shadcn.png"}
                      alt={user?.first_name + " " + user?.last_name}
                      height={30}
                      width={30}
                      className="rounded-full"
                    />
                  }
                >
                  {(close) => (
                    <div>
                      <Button
                        className="w-full text-primary hover:text-primary/90 border-none"
                        variant="outline"
                        asChild
                        onClick={close}
                      >
                        <Link href="/account" className="w-full">
                          Cuenta
                        </Link>
                      </Button>
                      <Button
                        onClick={async () => {
                          close(); // Close before signing out
                          await onLogout();
                        }}
                        className="cursor-pointer w-full text-primary hover:text-primary/90 border-none"
                        variant="outline"
                        disabled={isPending}
                      >
                        Cerrar sesión
                      </Button>
                    </div>
                  )}
                </FramerDropdown>
              </>
            ) : (
              <Button asChild>
                <Link href="/login" className="w-full h-full">
                  Iniciar sesión
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Responsive */}
          <div className="md:hidden flex items-center gap-x-4">
            <div>
              {!isLoggedin && <Button size="sm">Iniciar sesión</Button>}
              {isLoggedin && (
                <Link href="/account" className="flex items-center">
                  <Image
                    src={user?.image ?? "https://github.com/shadcn.png"}
                    alt={user?.first_name + " " + user?.last_name}
                    height={30}
                    width={30}
                    className="rounded-full"
                  />{" "}
                </Link>
              )}
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="p-1" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="bg-white text-primary">
                <div className="flex flex-col items-center gap-y-8 mt-6">
                  {/* Login button for mobile */}

                  <div className="flex flex-col items-center gap-y-5">
                    {/* Mobile Menu Links */}
                    {menus.map((menu) => (
                      <Link
                        key={menu.id}
                        href={menu.href}
                        className={`${
                          pathname === menu.href
                            ? "font-semibold"
                            : "font-light" // Highlight active menu on mobile
                        }`}
                      >
                        <SheetClose>{menu.linkText}</SheetClose>
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
