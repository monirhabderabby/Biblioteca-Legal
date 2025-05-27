import { Document } from "@prisma/client";
import * as z from "zod";

export const documentFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Document name must be at least 2 characters.",
    })
    .max(100, {
      message: "Document name must not exceed 100 characters.",
    }),
  categoryIds: z.array(z.string()).min(1, "Please select a category."),
  short_description: z.string().max(500, {
    message: "Description must not exceed 500 characters.",
  }),
  law_number: z.string(),
  publishedDate: z.date({
    required_error: "Please select a published date.",
  }),
});

export type DocumentFormSchemaType = z.infer<typeof documentFormSchema>;

export type DocumentsApiResponse = {
  success: boolean;
  message: string;
  data: Document[];
  meta: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  };
};

export const sectionTitleSchema = z.object({
  name: z.string().min(1),
});

export type SectionTitleSchemaType = z.infer<typeof sectionTitleSchema>;
