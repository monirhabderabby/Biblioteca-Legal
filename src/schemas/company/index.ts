import * as z from "zod";

export const companySchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  contact_email: z.string().email(),
  overview: z.string(),
});

export type CompanySchemaType = z.infer<typeof companySchema>;

export const employeeAdd = z.object({
  email: z.string().email().min(1),
  companyId: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
});

export type EmployeeAddSchemaType = z.infer<typeof employeeAdd>;

export const companySubscriptionSchema = z.object({
  txn_id: z.string().min(1),
  companyId: z.string().min(1),
  currentPeriodStart: z.date(),
  currentPeriodEnd: z.date(),
});

export type CompanySubscriptionSchemaType = z.infer<
  typeof companySubscriptionSchema
>;

export const companyContactSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  numberOfEmployee: z.number().min(1, "Must have at least 1 employee"),
  managerEmail: z.string().email("Invalid email address"),
  about: z.string().min(10, "Please tell us more about your company"),
});

export type CompanyContactSchemaType = z.infer<typeof companyContactSchema>;

// Bulk Employee Upload Schema
// Zod schema for file upload validation
export const excelUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, "File size should be less than 5MB")
    .refine(
      (file) =>
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.name.endsWith(".xlsx"),
      "Only XLSX files are allowed"
    ),
});

export type ExcelUploadSchemaType = z.infer<typeof excelUploadSchema>;
