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
      message: "El correo de soporte no está configurado.",
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
      from: `Formulario de Contacto <contacto@bibliotecalegalhn.com>`,
      to: [settings.supportEmail],
      subject: "📥 Nueva Solicitud de Interés de Empresa",
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
        "Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto contigo pronto.",
    };
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return {
      success: false,
      message:
        "Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente más tarde.",
    };
  }
}
