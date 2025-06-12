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

interface WelcomeEmailProps {
  employeeName?: string;
  email?: string;
  password?: string;
  companyName?: string;
  websiteUrl?: string;
}

export default function WelcomeEmail({
  employeeName = "Juan Pérez",
  email = "juan.perez@empresa.com",
  password = "TempPass123!",
  companyName = "Tu Empresa",
  websiteUrl = "https://biblioteca-legal.com",
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Bienvenido a Biblioteca Legal - ¡Tu cuenta está lista!</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Encabezado */}
            <Section className="bg-white rounded-t-lg border border-gray-200">
              <div className="bg-[#1E2A38] text-white p-8 rounded-t-lg text-center">
                <Text className="text-2xl font-bold m-0 mb-2">
                  BIBLIOTECA LEGAL
                </Text>
                <Text className="text-sm opacity-90 m-0">
                  Plataforma de Investigación Legal
                </Text>
              </div>
            </Section>

            {/* Contenido Principal */}
            <Section className="bg-white border-l border-r border-gray-200 p-8">
              {/* Mensaje de bienvenida */}
              <Text className="text-2xl font-semibold text-gray-800 mb-6">
                Hola {employeeName},
              </Text>

              <Text className="text-gray-700 text-base leading-relaxed mb-6">
                ¡Bienvenido a <strong>Biblioteca Legal</strong>! Nos alegra
                tenerte con nosotros. Tu administrador en {companyName} te ha
                concedido acceso a nuestra completa plataforma de investigación
                legal.
              </Text>

              {/* Sección de credenciales */}
              <Section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <Text className="text-lg font-semibold text-[#1E2A38] mb-4 text-center">
                  Tus credenciales de acceso
                </Text>

                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-md p-4">
                    <Text className="text-sm font-medium text-gray-600 mb-1">
                      Sitio web:
                    </Text>
                    <Text className="text-base font-mono text-[#1E2A38] m-0">
                      {websiteUrl}
                    </Text>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-md p-4">
                    <Text className="text-sm font-medium text-gray-600 mb-1">
                      Correo electrónico:
                    </Text>
                    <Text className="text-base font-mono text-[#1E2A38] m-0">
                      {email}
                    </Text>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-md p-4">
                    <Text className="text-sm font-medium text-gray-600 mb-1">
                      Contraseña temporal:
                    </Text>
                    <Text className="text-base font-mono text-[#1E2A38] m-0">
                      {password}
                    </Text>
                  </div>
                </div>
              </Section>

              {/* Aviso importante */}
              <Section className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <Text className="text-base font-semibold text-amber-800 mb-2">
                  🔒 Aviso de seguridad importante
                </Text>
                <Text className="text-sm text-amber-700 m-0">
                  Por favor, cambia tu contraseña inmediatamente después de tu
                  primer acceso por motivos de seguridad. Puedes actualizar tu
                  contraseña en la configuración de tu cuenta.
                </Text>
              </Section>

              {/* Cómo empezar */}
              <Text className="text-gray-700 text-base leading-relaxed mb-4">
                Para comenzar:
              </Text>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <ol className="text-sm text-gray-700 space-y-2 pl-4">
                  <li>1. Visita el sitio web usando el enlace de arriba</li>
                  <li>2. Inicia sesión con las credenciales proporcionadas</li>
                  <li>
                    3. Cambia tu contraseña en la configuración de la cuenta
                  </li>
                  <li>
                    4. Explora la plataforma y comienza tu investigación legal
                  </li>
                </ol>
              </div>

              <Text className="text-gray-700 text-base leading-relaxed">
                Si tienes alguna pregunta o necesitas ayuda, no dudes en
                contactar a tu administrador o a nuestro equipo de soporte.
              </Text>
            </Section>

            {/* Pie de página */}
            <Section className="bg-[#1E2A38] text-white p-6 rounded-b-lg border border-gray-200">
              <Text className="text-center text-sm opacity-90 m-0 mb-2">
                Saludos cordiales,
                <br />
                El equipo de Biblioteca Legal
              </Text>
              <Text className="text-center text-xs opacity-75 m-0">
                Este es un mensaje automático. Por favor, no respondas a este
                correo.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
