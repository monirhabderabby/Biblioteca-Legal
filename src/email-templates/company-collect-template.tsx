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
  companyDescription = "We are a mid-sized company specializing in logistics and supply chain optimization.",
  collectedAt = new Date(),
}: CompanyCollectTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>New company details submitted: {companyName}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            <Section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-[#1E2A38] px-6 py-4">
                <Text className="text-white text-xl font-bold m-0">
                  🏢 Company Information Submission
                </Text>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <Text className="text-gray-600 text-sm m-0 mb-6">
                  A new company has submitted their details through the form.
                </Text>

                {/* Company Information */}
                <Section className="mb-6">
                  <Text className="text-[#1E2A38] text-lg font-semibold m-0 mb-4">
                    Submitted Details
                  </Text>

                  {[
                    ["Company Name:", companyName],
                    ["Employee Count:", employeeCount],
                    ["Account Manager Email:", accountManagerEmail],
                    [
                      "Collected At:",
                      moment(collectedAt).format("D MMMM, YYYY h:mm A"),
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

                {/* Company Description */}
                <Section>
                  <Text className="text-[#1E2A38] text-lg font-semibold m-0 mb-4">
                    About the Company
                  </Text>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
                    <Text className="text-gray-900 text-sm m-0 leading-relaxed whitespace-pre-wrap">
                      {companyDescription}
                    </Text>
                  </div>
                </Section>

                <Hr className="border-gray-200 my-6" />
              </div>

              {/* Footer */}
              <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
                <Text className="text-gray-500 text-xs m-0 text-center">
                  This email was automatically generated from your website form
                  submission.
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
