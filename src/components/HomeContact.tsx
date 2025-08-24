import ContactForm from "@/app/(website)/contact/_components/contact-form.";
import Image from "next/image";
import contactImage from "../../public/home/contact.webp";

const HomeContact = async () => {
  return (
    <section className="flex container flex-col lg:flex-row items-center justify-between gap-10 px-4 lg:px-16 py-10">
      {/* Izquierda: Imagen */}
      <div className="flex-shrink-0">
        <Image
          src={contactImage}
          height={300}
          width={300}
          alt="Contacto"
          className="w-[450px] h-[635px] rounded-[16px] object-cover"
          loading="lazy"
        />
      </div>

      {/* Derecha: Sección de Formulario */}
      <div className="w-full lg:w-1/2 py-[50px] lg:py-[100px]">
        <div className="text-center mb-8">
          <h2 className="text-[28px] lg:text-[32px] font-semibold text-black mb-[30px] leading-tight">
            ¿TIENES PREGUNTAS? <br /> ENVÍANOS UN MENSAJE
          </h2>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

export default HomeContact;
