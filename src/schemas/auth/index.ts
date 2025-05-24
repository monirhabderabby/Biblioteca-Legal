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
