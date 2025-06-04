import { auth } from "@/auth";
import CTA from "@/components/shared/sections/cta";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const cu = await auth();

  const isLoggedin = !!cu;
  return (
    <>
      <div
        className="h-screen md:h-[60vh] lg:h-screen  w-full flex justify-start items-center bg-cover md:bg-right-top"
        style={{
          backgroundImage:
            "url(https://files.edgestore.dev/ln9m9j3kr2yibrue/staticFiled/_public/b878d4e8-03ef-4945-963b-b8f95ddbfb03.webp)",
        }}
      >
        <div className="container">
          <h1 className="text-primary font-bold text-[35px] md:text-[40px] lg:text-[60px] leading-[120%]">
            Your Virtual Legal Library
          </h1>

          <p className="text-white font-normal text-[14px] md:text-[18px] leading-[120%] mt-[25px] max-w-[600px]">
            Access comprehensive legal documents, laws, and decrees in one
            centralized platform.
          </p>

          <div className="space-x-[40px] mt-[40px] md:mt-[60px]">
            {isLoggedin ? (
              <Button size="lg" asChild>
                <Link href="/collections">View Collection</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link href="/sign-up">Register</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <CTA />
    </>
  );
}
