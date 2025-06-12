import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import moment from "moment";

interface ContactFormEmailProps {
  customerName?: string;
  customerEmail?: string;
  message?: string;
  submittedAt: Date;
}

export default function ContactFormSubmissionTemplate({
  customerName = "Juan Pérez",
  customerEmail = "juan.perez@ejemplo.com",
  message = "Hola, estoy interesado en sus servicios y me gustaría saber más sobre sus ofertas. Por favor contácteme a la brevedad.",
  submittedAt = new Date(),
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nuevo mensaje de contacto de {customerName}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Encabezado */}
            <Section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-[#1E2A38] px-6 py-4">
                <Text className="text-white text-xl font-bold m-0">
                  📧 Nuevo mensaje de formulario de contacto
                </Text>
              </div>

              {/* Contenido */}
              <div className="px-6 py-6">
                <Text className="text-gray-600 text-sm m-0 mb-6">
                  Has recibido un nuevo mensaje a través del formulario de
                  contacto de tu sitio web.
                </Text>

                {/* Información del cliente */}
                <Section className="mb-6">
                  <Text className="text-[#1E2A38] text-lg font-semibold m-0 mb-4">
                    Información del cliente
                  </Text>

                  <Row className="mb-3">
                    <Column className="w-24">
                      <Text className="text-gray-600 font-medium text-sm m-0">
                        Nombre:
                      </Text>
                    </Column>
                    <Column>
                      <Text className="text-gray-900 text-sm m-0">
                        {customerName}
                      </Text>
                    </Column>
                  </Row>

                  <Row className="mb-3">
                    <Column className="w-24">
                      <Text className="text-gray-600 font-medium text-sm m-0">
                        Correo:
                      </Text>
                    </Column>
                    <Column>
                      <Text className="text-blue-600 text-sm m-0">
                        {customerEmail}
                      </Text>
                    </Column>
                  </Row>

                  <Row>
                    <Column className="w-24">
                      <Text className="text-gray-600 font-medium text-sm m-0">
                        Fecha:
                      </Text>
                    </Column>
                    <Column>
                      <Text className="text-gray-900 text-sm m-0">
                        {moment(submittedAt).format("YYYY-MM-DD HH:mm")}
                      </Text>
                    </Column>
                  </Row>
                </Section>

                <Hr className="border-gray-200 my-6" />

                {/* Mensaje */}
                <Section>
                  <Text className="text-[#1E2A38] text-lg font-semibold m-0 mb-4">
                    Mensaje
                  </Text>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
                    <Text className="text-gray-900 text-sm m-0 leading-relaxed whitespace-pre-wrap">
                      {message}
                    </Text>
                  </div>
                </Section>

                <Hr className="border-gray-200 my-6" />
              </div>

              {/* Pie de página */}
              <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
                <Text className="text-gray-500 text-xs m-0 text-center font-poppins">
                  Este correo fue generado automáticamente desde el formulario
                  de contacto de tu sitio web.
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
