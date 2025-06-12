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

interface CompanyCollectTemplateProps {
  companyName?: string;
  employeeCount?: string;
  accountManagerEmail?: string;
  companyDescription?: string;
  collectedAt: Date;
}

export default function CompanyCollectTemplate({
  companyName = "Acme Inc.",
  employeeCount = "50-100",
  accountManagerEmail = "manager@acme.com",
  companyDescription = "Somos una empresa mediana especializada en logística y optimización de la cadena de suministro.",
  collectedAt = new Date(),
}: CompanyCollectTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Nuevos detalles de la empresa enviados: {companyName}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            <Section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Encabezado */}
              <div className="bg-[#1E2A38] px-6 py-4">
                <Text className="text-white text-xl font-bold m-0">
                  🏢 Envío de información de la empresa
                </Text>
              </div>

              {/* Contenido */}
              <div className="px-6 py-6">
                <Text className="text-gray-600 text-sm m-0 mb-6">
                  Una nueva empresa ha enviado sus detalles a través del
                  formulario.
                </Text>

                {/* Información de la empresa */}
                <Section className="mb-6">
                  <Text className="text-[#1E2A38] text-lg font-semibold m-0 mb-4">
                    Detalles enviados
                  </Text>

                  {[
                    ["Nombre de la empresa:", companyName],
                    ["Número de empleados:", employeeCount],
                    ["Correo del gestor de cuenta:", accountManagerEmail],
                    [
                      "Fecha de envío:",
                      moment(collectedAt).format("D [de] MMMM, YYYY h:mm A"),
                    ],
                  ].map(([label, value], idx) => (
                    <Row className="mb-3" key={idx}>
                      <Column className="w-40">
                        <Text className="text-gray-600 font-medium text-sm m-0">
                          {label}
                        </Text>
                      </Column>
                      <Column>
                        <Text className="text-gray-900 text-sm m-0">
                          {value}
                        </Text>
                      </Column>
                    </Row>
                  ))}
                </Section>

                <Hr className="border-gray-200 my-6" />

                {/* Descripción de la empresa */}
                <Section>
                  <Text className="text-[#1E2A38] text-lg font-semibold m-0 mb-4">
                    Sobre la empresa
                  </Text>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
                    <Text className="text-gray-900 text-sm m-0 leading-relaxed whitespace-pre-wrap">
                      {companyDescription}
                    </Text>
                  </div>
                </Section>

                <Hr className="border-gray-200 my-6" />
              </div>

              {/* Pie de página */}
              <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
                <Text className="text-gray-500 text-xs m-0 text-center">
                  Este correo fue generado automáticamente desde el formulario
                  de tu sitio web.
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
