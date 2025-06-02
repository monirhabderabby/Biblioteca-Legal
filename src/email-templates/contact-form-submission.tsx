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
  customerName = "John Doe",
  customerEmail = "john.doe@example.com",
  message = "Hello, I'm interested in your services and would like to know more about your offerings. Please contact me at your earliest convenience.",
  submittedAt = new Date(),
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {customerName}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Header */}
            <Section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-[#1E2A38] px-6 py-4">
                <Text className="text-white text-xl font-bold m-0">
                  📧 New Contact Form Submission
                </Text>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <Text className="text-gray-600 text-sm m-0 mb-6">
                  You have received a new message through your website contact
                  form.
                </Text>

                {/* Customer Information */}
                <Section className="mb-6">
                  <Text className="text-[#1E2A38] text-lg font-semibold m-0 mb-4">
                    Customer Information
                  </Text>

                  <Row className="mb-3">
                    <Column className="w-24">
                      <Text className="text-gray-600 font-medium text-sm m-0">
                        Name:
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
                        Email:
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
                        Submitted:
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

                {/* Message */}
                <Section>
                  <Text className="text-[#1E2A38] text-lg font-semibold m-0 mb-4">
                    Message
                  </Text>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
                    <Text className="text-gray-900 text-sm m-0 leading-relaxed whitespace-pre-wrap">
                      {message}
                    </Text>
                  </div>
                </Section>

                <Hr className="border-gray-200 my-6" />
              </div>

              {/* Footer */}
              <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
                <Text className="text-gray-500 text-xs m-0 text-center font-poppins">
                  This email was automatically generated from your website
                  contact form.
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
