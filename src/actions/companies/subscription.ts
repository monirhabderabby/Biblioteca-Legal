"use server";

import CompanyCollectTemplate from "@/email-templates/company-collect-template";
import { prisma } from "@/lib/db";
import { resend } from "@/lib/resend";
import {
  companyContactSchema,
  CompanyContactSchemaType,
} from "@/schemas/company";

export async function sendSubscriptionReqCompany(
  data: CompanyContactSchemaType
) {
  const settings = await prisma.setting.findFirst();

  if (!settings?.supportEmail) {
    return {
      success: false,
      message: "Support email is not configured.",
    };
  }

  const parsedData = companyContactSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.message,
    };
  }

  const { companyName, numberOfEmployee, managerEmail, about } =
    parsedData.data;
  const collectedAt = new Date();

  try {
    await resend.emails.send({
      from: `Contact Form <contact@bibliotecalegalhn.com>`,
      to: [settings.supportEmail],
      subject: "📥 New Company Interest Submission",
      react: CompanyCollectTemplate({
        companyName,
        employeeCount: numberOfEmployee.toString(),
        accountManagerEmail: managerEmail,
        companyDescription: about,
        collectedAt,
      }),
    });

    return {
      success: true,
      message:
        "Your message has been sent successfully. We will get back to you soon.",
    };
  } catch (error) {
    console.error("Email sending failed:", error);
    return {
      success: false,
      message:
        "There was an error sending your message. Please try again later.",
    };
  }
}
