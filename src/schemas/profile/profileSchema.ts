import { z } from "zod";

export const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  image: z.string().optional(),
  email: z.string(),
  phone: z.string().optional(),
  dateOfBirth: z.date().optional(),
  gender: z.string().optional(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
