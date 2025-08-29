"use server";

import ContactFormSubmissionTemplate from "@/email-templates/contact-form-submission";
import { prisma } from "@/lib/db";
import { resend } from "@/lib/resend";
import { contactFormSchema, ContactFormValues } from "@/schemas/contact";

// Optional: in-memory or Redis cache for settings
let cachedSettings: { supportEmail: string } | null = null;

export async function createContact(data: ContactFormValues) {
  // Fetch settings from the database
  const settings = await prisma.setting.findFirst();

  // Return early if settings or supportEmail are missing
  if (!settings || !settings.supportEmail) {
    return {
      success: false,
      message:
        "Unable to process your request at the moment. Please try again later.",
    };
  }

  // Validate the input data
  const parsedData = contactFormSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Invalid form data. " + parsedData.error.message,
    };
  }

  const { name, email, message } = parsedData.data;
  const submittedAt = new Date();

  // Fetch settings with caching
  if (!cachedSettings) {
    const settings = await prisma.setting.findFirst();
    if (!settings?.supportEmail) {
      return {
        success: false,
        message: "Cannot process request at this time.",
      };
    }
    cachedSettings = { supportEmail: settings.supportEmail };
  }

  try {
    // Send the email using Resend
    await resend.emails.send({
      from: `${name} <contact@bibliotecalegalhn.com>`,
      to: [settings.supportEmail],
      subject: "New Contact Form Submission",
      replyTo: email,
      react: ContactFormSubmissionTemplate({
        customerEmail: email,
        customerName: name,
        message,
        submittedAt,
      }),
    });

    return {
      success: true,
      message: `Thank you ${name}, your message has been sent.`,
    };
  } catch (error) {
    console.error("Email sending error:", error);

    return {
      success: false,
      message:
        "There was an error sending your message. Please try again later or contact us directly at " +
        settings.supportEmail,
    };
  }
}
