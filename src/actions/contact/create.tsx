"use server";

import ContactFormSubmissionTemplate from "@/email-templates/contact-form-submission";
import { resend } from "@/lib/resend";
import { contactFormSchema, ContactFormValues } from "@/schemas/contact";

const adminEmail = process.env.ADMIN_EMAIL!;

export async function createContact(data: ContactFormValues) {
  const parsedData = contactFormSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.message,
    };
  }

  const { name, email, message } = parsedData.data;
  const submittedAt = new Date();

  try {
    await resend.emails.send({
      from: `Contact Form <contact@bibliotecalegalhn.com>`,
      to: [adminEmail],
      subject: "Please verify your email address",
      react: ContactFormSubmissionTemplate({
        customerEmail: email,
        customerName: name,
        message,
        submittedAt: submittedAt,
      }),
    });

    return {
      success: true,
      message:
        "Your message has been sent successfully. We will get back to you soon.",
    };
  } catch {
    return {
      success: false,
      message:
        "There was an error sending your message. Please try again later.",
    };
  }
}
