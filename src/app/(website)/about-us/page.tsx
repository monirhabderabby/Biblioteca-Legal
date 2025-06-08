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
                Biblioteca Legal was born in response to the lack of digital
                access to updated legal information in Honduras. It emerged from
                the real need to provide an accessible, reliable, and
                easy-to-use tool for those who study or practice law.
              </p>
              <p className="text-[14px] md:text-[16px]">
                The platform was created by a visionary law student who, based
                on his own experience, identified the shortcomings of the sector
                and decided to turn them into an opportunity to improve access
                to legal knowledge
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
                <h3 className="text-2xl md:text-[25px] font-bold text-[#1E2A38] mb-4">
                  Vision Statement
                </h3>
                <p className="text-[16px] ">
                  We want thousands of people across Central America to be able
                  to say, “I study and work better thanks to Biblioteca Legal.”
                  Our goal is to reach every corner of the region, helping to
                  shape better-prepared professionals who are connected to the
                  legal knowledge they need to grow.
                </p>
              </div>
              <div>
                <h3 className="text-2xl md:text-[25px] font-bold text-[#1E2A38] mb-4">
                  Mission Statement
                </h3>
                <p className="text-[16px] ">
                  At Biblioteca Legal, we believe that everyone should have easy
                  and affordable access to the laws and codes they need. That’s
                  why we created a modern and accessible platform where
                  students, professionals, and legal enthusiasts can find
                  reliable and always up-to-date legal information, without
                  complications.
                </p>
              </div>
              <div className="mt-12">
                <h3 className="text-2xl md:text-[25px] font-bold text-[#1E2A38] mb-4">
                  💡 Our Values
                </h3>
                <ul>
                  <li>
                    <span className="font-semibold">Accessibility:</span> We
                    bring the law closer to everyone.
                  </li>
                  <li>
                    <span className="font-semibold">Empathy:</span> We
                    understand your challenges and support you.
                  </li>
                  <li>
                    <span className="font-semibold">Quality:</span> Reliable,
                    up-to-date, and useful content.
                  </li>
                  <li>
                    <span className="font-semibold">Trust:</span> You can always
                    count on us.
                  </li>
                  <li>
                    <span className="font-semibold">Professionalism:</span> We
                    work with passion and responsibility.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-12 max-w-[900px]">
            We believe in a flexible team that learns every day and collaborates
            with enthusiasm. We support each other, share ideas, and grow
            together—because legal knowledge can also be dynamic, approachable,
            and transformative.
          </p>
        </div>
      </section>
    </div>
  );
};

export default page;
