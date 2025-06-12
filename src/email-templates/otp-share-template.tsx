import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface OtpEmailProps {
  otpCode?: string;
}

const validityMinutes = 15;
const supportEmail = "support@bibliotecalegalhn.com";
const companyName = "Biblioteca Legal";

export const OtpEmail = ({ otpCode = "123456" }: OtpEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Tu código para restablecer la contraseña es: {otpCode}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 my-auto mx-auto font-sans">
          <Container className="border border-solid border-gray-200 rounded my-10 mx-auto p-5 max-w-md bg-white">
            {/* Header con Logo */}
            {/* <Section className="mt-4 text-center">
              <Img
                src={companyLogo}
                width="80"
                height="40"
                alt={`${companyName} Logo`}
                className="mx-auto"
              />
            </Section> */}

            {/* Título */}
            <Section className="mt-6">
              <Text className="text-2xl font-bold text-center text-gray-800">
                Restablecer contraseña
              </Text>
            </Section>

            {/* Saludo */}
            <Section>
              <Text className="text-gray-700">Hola,</Text>
              <Text className="text-gray-700">
                Hemos recibido una solicitud para restablecer tu contraseña. Por
                favor, usa el siguiente código para completar el proceso:
              </Text>
            </Section>

            {/* Código OTP */}
            <Section className="my-6">
              <div className="bg-gray-50 border border-gray-200 rounded-md py-6 px-4 text-center">
                <Text className="text-3xl font-mono tracking-widest font-bold text-gray-800 my-0">
                  {otpCode}
                </Text>
              </div>
            </Section>

            {/* Validez */}
            <Section>
              <Text className="text-sm text-gray-600 text-center">
                Este código es válido por {validityMinutes} minutos.
              </Text>
            </Section>

            {/* Instrucciones */}
            <Section className="mt-6">
              <Text className="text-gray-700">
                Si no solicitaste restablecer la contraseña, ignora este correo
                o contáctanos para informarnos.
              </Text>
            </Section>

            {/* Nota de seguridad */}
            <Section className="mt-6 bg-blue-50 p-4 rounded-md">
              <Text className="text-sm text-blue-800 my-0">
                <strong>Consejo de seguridad:</strong> {companyName} nunca te
                pedirá compartir este código con nadie, ni siquiera con nuestro
                equipo de soporte.
              </Text>
            </Section>

            {/* Pie de página */}
            <Section className="mt-8 text-center text-gray-500 text-xs border-t border-gray-200 pt-4">
              <Text>
                Si tienes problemas, por favor contacta a nuestro equipo de
                soporte en{" "}
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-blue-600 underline"
                >
                  {supportEmail}
                </a>
              </Text>
              <Text>
                &copy; {new Date().getFullYear()} {companyName}. Todos los
                derechos reservados.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OtpEmail;
