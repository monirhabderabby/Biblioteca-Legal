import * as z from "zod";

export const companySchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  employees: z.array(z.string().email()),
});

export type CompanySchemaType = z.infer<typeof companySchema>;
