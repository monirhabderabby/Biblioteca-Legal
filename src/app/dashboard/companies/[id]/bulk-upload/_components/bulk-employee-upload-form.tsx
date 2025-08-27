"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as XLSX from "xlsx";

import { addEmployeesBulk } from "@/actions/companies/create";
import {
  excelUploadSchema,
  type ExcelUploadSchemaType,
} from "@/schemas/company";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FileUploader, FileUploaderRef } from "./csv-upload"; // <- returns File | null

// -------- Helpers & Types --------
type EmployeeRow = {
  email: string;
  first_name: string;
  last_name: string;
  companyId: string;
};

type BulkServerResult = {
  success: boolean;
  results: {
    successCount: number;
    failed: { row: number; email?: string; error: string }[];
  };
};

const EXPECTED_HEADERS = ["email", "first_name", "last_name"] as const;

/** Keep UI responsive and avoid overwhelming server by chunking bulk calls */
function chunk<T>(arr: T[], size = 200): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size)
    chunks.push(arr.slice(i, i + size));
  return chunks;
}

/** Soft trim and coerce a value to string */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const s = (v: any) => (typeof v === "string" ? v.trim() : `${v ?? ""}`.trim());

/** Ensure XLSX sheet has exactly the expected headers (case-sensitive) */
function validateHeaders(ws: XLSX.WorkSheet) {
  const rows = XLSX.utils.sheet_to_json<string[]>(ws, {
    header: 1,
    defval: "",
  });
  const headerRow = (rows[0] ?? []).map((h) => s(h));
  const missing = EXPECTED_HEADERS.filter((h) => !headerRow.includes(h));
  return { headerRow, missing };
}

// -------- Component --------
interface Props {
  companyId: string;
}

const BulkEmployeeUploadForm = ({ companyId }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const uploaderRef = useRef<FileUploaderRef>(null);

  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const [lastResult, setLastResult] = useState<
    BulkServerResult["results"] | null
  >(null);

  const form = useForm<ExcelUploadSchemaType>({
    resolver: zodResolver(excelUploadSchema),
    defaultValues: {
      // file is controlled by FileUploader; no default
    },
  });

  const isFileAdded = !!form.watch("file");

  const onSubmit = async (data: ExcelUploadSchemaType) => {
    setUploadStatus("uploading");
    setLastResult(null);

    try {
      // --- 1) Read workbook ---
      const arrayBuffer = await data.file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      if (!workbook.SheetNames.length) {
        throw new Error("The uploaded workbook has no sheets.");
      }

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // --- 2) Validate headers ---
      const { missing } = validateHeaders(worksheet);
      if (missing.length) {
        throw new Error(
          `Invalid header(s). Missing: ${missing.join(
            ", "
          )}. Expected headers: ${EXPECTED_HEADERS.join(", ")}`
        );
      }

      // --- 3) Convert to JSON objects keyed by headers ---
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, {
        defval: "",
      });

      // --- 4) Sanitize & enrich rows ---
      const employees: EmployeeRow[] = rawRows
        .map((row) => {
          const email = s(row.email);
          const first_name = s(row.first_name);
          const last_name = s(row.last_name);

          // Skip totally empty lines
          if (!email && !first_name && !last_name) return null;

          return {
            email,
            first_name,
            last_name,
            companyId,
          };
        })
        .filter(Boolean) as EmployeeRow[];

      if (!employees.length) {
        throw new Error("No valid rows found. Please fill at least one row.");
      }

      // --- 5) Batch the server work to avoid overload/timeouts ---
      const batches = chunk(employees, 200); // adjust if needed
      let totalSuccess = 0;
      const failedAgg: BulkServerResult["results"]["failed"] = [];

      await new Promise<void>((resolveAll, rejectAll) => {
        startTransition(async () => {
          try {
            for (let b = 0; b < batches.length; b++) {
              const batch = batches[b];
              // Call the server action (row-by-row processing on server)
              const res: BulkServerResult = await addEmployeesBulk(batch);

              totalSuccess += res.results.successCount;
              failedAgg.push(...res.results.failed);

              // Optional: progressive toast
              toast.message(`Processed batch ${b + 1}/${batches.length}`, {
                description: `Added: ${res.results.successCount}, Failed: ${res.results.failed.length}`,
              });
            }

            setLastResult({ successCount: totalSuccess, failed: failedAgg });
            setUploadStatus("success");

            // toast.success("Bulk upload finished", {
            //   description: `Added ${totalSuccess} employee(s). ${failedAgg.length} failed.`,
            // });

            // Reset form only after success
            router.refresh();
            form.reset({
              file: undefined,
            });
            uploaderRef.current?.reset();

            resolveAll();
          } catch (err) {
            rejectAll(err);
          }
        });
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setUploadStatus("error");
      toast.error("Upload Failed", {
        description: err?.message ?? "There was an error processing your file.",
      });
    }
  };

  useEffect(() => {
    if (uploadStatus === "success") {
      setTimeout(() => {
        setUploadStatus("idle");
      }, 10000);
    }
  }, [uploadStatus]);

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Step 3: Upload Your XLSX File
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Select XLSX File</FormLabel>
                  <FormControl>
                    <FileUploader
                      ref={uploaderRef}
                      value={value ?? null}
                      onChange={onChange}
                      onUploadStateChange={(isUploading) =>
                        setUploadStatus(isUploading ? "uploading" : "idle")
                      }
                      id="file-upload"
                    />
                  </FormControl>
                  <FormDescription>
                    Upload an <strong>.xlsx</strong> file with columns:{" "}
                    <code>email</code>, <code>first_name</code>,{" "}
                    <code>last_name</code>. Max size: 5MB.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {uploadStatus === "success" && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Employee data uploaded successfully.
                  {lastResult && (
                    <>
                      {" "}
                      <strong>{lastResult.successCount}</strong> employees have
                      been added to your company.
                      {lastResult.failed.length > 0 && (
                        <>
                          {" "}
                          However, <strong>
                            {lastResult.failed.length}
                          </strong>{" "}
                          records could not be processed. Please review the
                          details below.
                        </>
                      )}
                    </>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {uploadStatus === "error" && (
              <Alert variant="destructive">
                <AlertDescription>
                  Upload failed. Please check your file format and try again.
                </AlertDescription>
              </Alert>
            )}

            {lastResult?.failed?.length ? (
              <div className="rounded-md border p-3">
                <p className="mb-2 text-sm font-medium">
                  Failures ({lastResult.failed.length})
                </p>
                <ul className="max-h-48 space-y-1 overflow-auto text-sm">
                  {lastResult.failed.slice(0, 200).map((f, i) => (
                    <li key={`${f.row}-${i}`}>
                      Row {f.row}
                      {f.email ? ` (${f.email})` : ""}: {f.error}
                    </li>
                  ))}
                  {lastResult.failed.length > 200 && (
                    <li>…and more. (Showing first 200)</li>
                  )}
                </ul>
              </div>
            ) : null}

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={
                  uploadStatus === "uploading" || isPending || !isFileAdded
                }
                className="flex items-center gap-2"
              >
                {uploadStatus === "uploading" || isPending ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload XLSX
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="text-primary hover:text-primary/80"
                onClick={() => router.back()}
                disabled={isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BulkEmployeeUploadForm;
