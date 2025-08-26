import HeaderSection from "@/components/shared/sections/header";
import { paddle } from "@/lib/paddle";
import RegistrationForm from "./_components/registration-form";

const Page = async () => {
  const price = await paddle.prices.get(process.env.NEXT_PUBLIC_PRICE_ID!);
  const trialPeriod = price.trialPeriod; // in seconds or as object
  // Convert to days if necessary
  const days = trialPeriod?.interval === "day" ? trialPeriod.frequency : null;

  return (
    <div>
      <HeaderSection
        imageUrl="/auth/registration.webp"
        title="Crea tu cuenta"
        description="Únete a nuestra plataforma para acceder a recursos legales completos"
      />

      <div className="my-[50px] md:my-[100px] container max-w-[830px] w-full mx-auto md:px-[60px] md:py-[30px] md:shadow-[0px_4px_12px_0px_#0000001A] rounded-[16px]">
        <div>
          <h1 className="text-black font-semibold text-[25px] lg:text-[40px] leading-[120%]">
            Crea una cuenta
          </h1>
          <p className="text-black font-medium text-[14px] leading-[120%] md:text-[18px]">
            Completa el siguiente formulario para crear tu cuenta
          </p>
        </div>
        <RegistrationForm freeTrial={days!} />
      </div>
    </div>
  );
};

export default Page;
