"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SignInToContinue = () => {
  const pathName = usePathname();

  return (
    <div className="mb-20 w-full flex justify-center">
      <Button>
        <Link href={`/login?redirectTo=${pathName}`}>Sign in to continue</Link>
      </Button>
    </div>
  );
};

export default SignInToContinue;
