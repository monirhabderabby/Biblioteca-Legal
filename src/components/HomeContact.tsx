import ContactForm from "@/app/(website)/contact/_components/contact-form.";
import Image from "next/image";

const HomeContact = () => {
  return (
    <section className="flex container flex-col lg:flex-row items-center justify-between gap-10 px-4 lg:px-16 py-10">
      {/* Left: Image */}
      <div className="flex-shrink-0">
        <Image
          src="https://files.edgestore.dev/ln9m9j3kr2yibrue/staticFiled/_public/contactimg.webp"
          height={300}
          width={300}
          alt="Contact"
          className="w-[450px] h-[635px] rounded-[16px] object-cover"
        />
      </div>

      {/* Right: Form Section */}
      <div className="w-full lg:w-1/2 py-[50px] lg:py-[100px]">
        <div className="text-center mb-8">
          <h2 className="text-[28px] lg:text-[32px] font-semibold text-black mb-[30px] leading-tight">
            HAVE QUESTIONS? <br /> SEND US A MESSAGE
          </h2>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

export default HomeContact;
