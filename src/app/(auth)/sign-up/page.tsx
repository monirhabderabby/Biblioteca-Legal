import HeaderSection from "@/components/shared/sections/header";
import RegistrationForm from "./_components/registration-form";

const Page = () => {
  return (
    <div>
      <HeaderSection
        imageUrl="https://files.edgestore.dev/ln9m9j3kr2yibrue/public/_public/1a156ded2c008b4e68215f72ff33f2df9088c3f7.jpg"
        title="Create Your Account"
        description="Join our platform to access comprehensive legal resources"
      />

      <div className="my-[50px] md:my-[100px] container max-w-[830px] w-full mx-auto md:px-[60px] md:py-[30px] md:shadow-[0px_4px_12px_0px_#0000001A] rounded-[16px]">
        <div>
          <h1 className="text-black font-semibold text-[25px] lg:text-[40px] leading-[120%]">
            Create an Account
          </h1>
          <p className="text-black font-medium text-[14px] leading-[120%] md:text-[18px]">
            Fill out the form below to create your account and get 15 days of
            free access
          </p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Page;
