import { z } from "zod";

// Define Zod schema
export const generalFormSchema = z.object({
  siteName: z
    .string()
    .min(1, { message: "Site name is required." })
    .max(100, { message: "Site name must not exceed 100 characters." }),
  supportEmail: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .max(255, { message: "Email must not exceed 255 characters." }),
  description: z
    .string()
    .min(1, { message: "Description is required." })
    .max(500, { message: "Description must not exceed 500 characters." }),
  keywords: z
    .array(
      z
        .string()
        .min(1, { message: "Keyword cannot be empty." })
        .max(50, { message: "Keyword must not exceed 50 characters." })
    )
    .min(1, { message: "At least one keyword is required." })
    .max(10, { message: "Maximum 10 keywords allowed." }),
});

export type GeneralFormType = z.infer<typeof generalFormSchema>;
