import * as z from "zod";

export const contentSchema = z.object({
  content: z.string().min(1),
});

export type ContentSchemaType = z.infer<typeof contentSchema>;
