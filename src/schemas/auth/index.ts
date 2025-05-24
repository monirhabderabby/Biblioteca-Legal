import * as z from "zod";

export const registrationSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  terms: z.unknown(),
  promotion: z.boolean().default(true).optional(),
});

export type RegistrationSchemaType = z.infer<typeof registrationSchema>;

// LOGIN

// Define the form schema with Zod
export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

// Infer the type from the schema
export type LoginFormValues = z.infer<typeof loginFormSchema>;

// Define the form schema with Zod
export const resetReqestForm = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

// Infer the type from the schema
export type ResetRequestFormValues = z.infer<typeof resetReqestForm>;

// Define the form schema with Zod
export const forgetPassword = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export type ForgetPasswordType = z.infer<typeof forgetPassword>;
