import { auth } from "@/auth";
import HomeContact from "@/components/HomeContact";
import OurServices from "@/components/OurServices";
import ResearchTools from "@/components/ResearchTools";
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
          backgroundImage: "url(/home/banner.webp)",
        }}
      >
        <div className="container">
          <h1 className="text-primary font-bold text-[35px] md:text-[40px] lg:text-[60px] leading-[120%]">
            Tu Biblioteca Jurídica Virtual
          </h1>

          <p className="text-white font-normal text-[14px] md:text-[18px] leading-[120%] mt-[25px] max-w-[600px]">
            Accede a documentos legales, leyes y decretos actualizados en una
            sola plataforma centralizada.
          </p>

          <div className="space-x-[40px] mt-[40px] md:mt-[60px]">
            {isLoggedin ? (
              <Button size="lg" asChild>
                <Link href="/collections">Ver Colección</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link href="/subscriptions">Registrarse</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/login">Iniciar sesión</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <OurServices />
      <ResearchTools />
      {!isLoggedin && <CTA />}

      <HomeContact />
    </>
  );
}
