import * as z from "zod";

export const categorySchema = z.object({
  name: z.string().min(1),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
