// app/(protected)/upload/UploadDocument.tsx
"use client";

import { uploadLegalDocumentAction } from "@/actions/document/bulk-doc-upload";
import { ChangeEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export default function UploadDocument() {
  const [pending, startTransition] = useTransition();
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".xlsx")) {
      setStatus("error");
      setMessage("Only .xlsx files are allowed");
      return;
    }

    setFileName(file.name);
    setStatus("uploading");
    setMessage("Reading file...");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      // We take **only the first sheet** for simplicity
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // header:1 → array of arrays (raw rows)
      const rawRows = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
        blankrows: false,
      });

      if (rawRows.length < 2) {
        throw new Error("File is empty or has no data rows");
      }

      // Convert to array of objects
      const headers = rawRows[0] as string[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataRows = rawRows.slice(1) as any[][];

      const rowsAsObjects = dataRows.map((row) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        headers.reduce((obj: Record<string, any>, header, i) => {
          obj[header.trim()] = row[i] ?? "";
          return obj;
        }, {}),
      );

      setMessage("Sending data to server...");

      console.log("rowsObjects", rowsAsObjects);

      startTransition(() => {
        uploadLegalDocumentAction(rowsAsObjects).then((res) => {
          if (!res.success) {
            toast.error("failed to upload all data");
            return;
          }
          toast.success("document uploaded successfully");
        });
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage(err.message || "Failed to process file");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Legal Document (XLSX)</h1>

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          disabled={status === "uploading"}
          className="block mx-auto text-sm text-gray-500
            file:mr-4 file:py-3 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-100 file:text-blue-700
            hover:file:bg-blue-200 cursor-pointer"
        />

        {fileName && (
          <p className="mt-4 text-gray-600">
            Selected: <strong>{fileName}</strong>
          </p>
        )}

        {pending && (
          <p className="mt-4 text-blue-600 animate-pulse">Processing...</p>
        )}

        {status === "success" && (
          <p className="mt-4 text-green-600 font-medium">{message}</p>
        )}

        {status === "error" && <p className="mt-4 text-red-600">{message}</p>}
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p className="font-medium">Expected columns (case-sensitive):</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Document</li>
          <li>Title → Section title</li>
          <li>Subtitle → optional</li>
          <li>Chapter</li>
          <li>Article → number only (will be converted to integer)</li>
          <li>Text → article content</li>
        </ul>
      </div>
    </div>
  );
}
