import { z } from "zod";

export const waitlistSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  customerId: z.string().min(1, "Customer ID is required"),
});

export type WaitlistSchemaType = z.infer<typeof waitlistSchema>;
