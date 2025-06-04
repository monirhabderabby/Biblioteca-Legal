import HeaderSection from "@/components/shared/sections/header";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <HeaderSection
        imageUrl="https://files.edgestore.dev/ln9m9j3kr2yibrue/staticFiled/_public/about%20us.webp"
        title="About Us"
        description=""
      />
      <section className="w-full py-16 px-4 md:px-8 lg:px-16 ">
        {/* About Section */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl md:text-[40px] font-bold text-[#1E2A38] mb-6">
                About Biblioteca legal
              </h2>
              <p className="text-[14px] md:text-[16px]  mb-6">
                We are dedicated to providing comprehensive legal resources and
                services to our clients. Our team of experienced professionals
                is committed to excellence and integrity in all aspects of legal
                practice.
              </p>
              <p className="text-[14px] md:text-[16px]">
                With years of experience in various fields of law, we strive to
                deliver the highest quality legal assistance tailored to meet
                the unique needs of each client.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-[684px] h-[542px]">
                <Image
                  src="/about1.png"
                  alt="Lady Justice statue"
                  fill
                  className="object-cover rounded-[16px]"
                  sizes="(max-width: 768px) 100vw, 684px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vision and Mission Section */}
        <div className="max-w-7xl mx-auto mt-24">
          <h3 className="text-lg md:text-[20px] font-semibold text-[#D4AF37] text-center mb-6">
            Our Vision and Mission
          </h3>
          <h2 className="text-2xl md:text-[32px]  font-semibold text-[#1E2A38] text-center mb-16">
            What makes us who we are
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="relative w-full max-w-[684px] h-[542px]">
                <Image
                  src="/about2.png"
                  alt="Legal scales and gavel"
                  fill
                  className="object-cover rounded-[16px]"
                  sizes="(max-width: 768px) 100vw, 684px"
                  priority
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="mb-12">
                <h3 className="text-2xl md:text-[32px] font-bold text-[#1E2A38] mb-4">
                  Vision Statement
                </h3>
                <p className="text-lg md:text-xl ">
                  To be the leading legal resource center, recognized for our
                  commitment to excellence, integrity, and innovation in
                  providing accessible legal solutions to all segments of
                  society.
                </p>
              </div>
              <div>
                <h3 className="text-2xl md:text-[32px] font-bold text-[#1E2A38] mb-4">
                  Mission Statement
                </h3>
                <p className="text-lg md:text-xl ">
                  To empower individuals and organizations through comprehensive
                  legal resources, education, and services that are accessible,
                  affordable, and of the highest quality, while upholding the
                  principles of justice and equity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
