import CTA from "@/components/shared/sections/cta";
import HeaderSection from "@/components/shared/sections/header";
import ContactForm from "./_components/contact-form.";

const Page = () => {
  return (
    <div>
      <HeaderSection
        imageUrl="https://files.edgestore.dev/ln9m9j3kr2yibrue/public/_public/30e3389036fce18f046221fe160bc5c37d0a167b.jpg"
        title="Get in Touch"
        description="We're here to help with any questions about our legal resources"
      />

      <div className="py-[100px]">
        <div className="text-center mb-8">
          <h2 className="text-[32px] font-semibold text-black mb-[30px]">
            HAVE QUESTIONS? <br /> SEND US A MESSAGE
          </h2>
        </div>
        <ContactForm />
      </div>

      <CTA />
    </div>
  );
};

export default Page;
