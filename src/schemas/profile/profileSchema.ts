import { z } from "zod";

export const profileSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  dateOfBirth: z.date().optional(),
  gender: z.string().optional(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
