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
  employeeName = "John Doe",
  email = "john.doe@company.com",
  password = "TempPass123!",
  companyName = "Your Company",
  websiteUrl = "https://biblioteca-legal.com",
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Biblioteca Legal - Your account is ready!</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Header */}
            <Section className="bg-white rounded-t-lg border border-gray-200">
              <div className="bg-[#1E2A38] text-white p-8 rounded-t-lg text-center">
                <Text className="text-2xl font-bold m-0 mb-2">
                  BIBLIOTECA LEGAL
                </Text>
                <Text className="text-sm opacity-90 m-0">
                  Legal Research Platform
                </Text>
              </div>
            </Section>

            {/* Main Content */}
            <Section className="bg-white border-l border-r border-gray-200 p-8">
              {/* Welcome Message */}
              <Text className="text-2xl font-semibold text-gray-800 mb-6">
                Hello {employeeName},
              </Text>

              <Text className="text-gray-700 text-base leading-relaxed mb-6">
                Welcome to <strong>Biblioteca Legal</strong>! We&apos;re excited
                to have you on board. Your administrator at {companyName} has
                granted you access to our comprehensive legal research platform.
              </Text>

              {/* Credentials Section */}
              <Section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <Text className="text-lg font-semibold text-[#1E2A38] mb-4 text-center">
                  Your Login Credentials
                </Text>

                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-md p-4">
                    <Text className="text-sm font-medium text-gray-600 mb-1">
                      Website:
                    </Text>
                    <Text className="text-base font-mono text-[#1E2A38] m-0">
                      {websiteUrl}
                    </Text>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-md p-4">
                    <Text className="text-sm font-medium text-gray-600 mb-1">
                      Email:
                    </Text>
                    <Text className="text-base font-mono text-[#1E2A38] m-0">
                      {email}
                    </Text>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-md p-4">
                    <Text className="text-sm font-medium text-gray-600 mb-1">
                      Temporary Password:
                    </Text>
                    <Text className="text-base font-mono text-[#1E2A38] m-0">
                      {password}
                    </Text>
                  </div>
                </div>
              </Section>

              {/* Important Notice */}
              <Section className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <Text className="text-base font-semibold text-amber-800 mb-2">
                  🔒 Important Security Notice
                </Text>
                <Text className="text-sm text-amber-700 m-0">
                  Please change your password immediately after your first login
                  for security purposes. You can update your password in your
                  account settings.
                </Text>
              </Section>

              {/* Getting Started */}
              <Text className="text-gray-700 text-base leading-relaxed mb-4">
                To get started:
              </Text>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <ol className="text-sm text-gray-700 space-y-2 pl-4">
                  <li>1. Visit the website using the link above</li>
                  <li>2. Log in with your provided credentials</li>
                  <li>3. Change your password in account settings</li>
                  <li>4. Explore the platform and start your legal research</li>
                </ol>
              </div>

              <Text className="text-gray-700 text-base leading-relaxed">
                If you have any questions or need assistance, please don&apos;t
                hesitate to contact your administrator or our support team.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="bg-[#1E2A38] text-white p-6 rounded-b-lg border border-gray-200">
              <Text className="text-center text-sm opacity-90 m-0 mb-2">
                Best regards,
                <br />
                The Biblioteca Legal Team
              </Text>
              <Text className="text-center text-xs opacity-75 m-0">
                This is an automated message. Please do not reply to this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
