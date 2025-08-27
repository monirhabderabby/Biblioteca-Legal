"use client";

import { cn } from "@/lib/utils";
import { FileIcon, Loader2, Upload } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

export interface FileUploaderProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  onUploadStateChange?: (isUploading: boolean) => void;
  id?: string;
}

export interface FileUploaderRef {
  reset: () => void;
}

export const FileUploader = forwardRef<FileUploaderRef, FileUploaderProps>(
  ({ value, onChange, onUploadStateChange, id }, ref) => {
    const [fileName, setFileName] = useState<string>("");
    const [isDragging, setIsDragging] = useState(false);
    const [reading, setReading] = useState(false);
    const [readProgress, setReadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setFileName("");
        setReading(false);
        setReadProgress(0);
        setError(null);
      },
    }));

    useEffect(() => {
      if (value) setFileName(value.name);
      else setFileName("");
    }, [value]);

    useEffect(() => {
      if (onUploadStateChange) onUploadStateChange(reading);
    }, [reading, onUploadStateChange]);

    const handleFile = useCallback(
      (selectedFile: File) => {
        if (!selectedFile) return;
        setError(null);

        const isXlsx =
          selectedFile.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          selectedFile.name.toLowerCase().endsWith(".xlsx");

        if (!isXlsx) {
          setError("Please select a valid XLSX file");
          return;
        }

        setFileName(selectedFile.name);
        setReading(true);
        setReadProgress(0);

        const reader = new FileReader();
        reader.onprogress = (e) => {
          if (e.lengthComputable)
            setReadProgress(Math.round((e.loaded / e.total) * 100));
        };
        reader.onload = () => {
          setReading(false);
          onChange(selectedFile);
        };
        reader.onerror = () => {
          setReading(false);
          setError("Error reading file");
        };

        reader.readAsArrayBuffer(selectedFile);
      },
      [onChange]
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) handleFile(selectedFile);
      e.target.value = ""; // allow reselect same file
    };

    const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const selectedFile = e.dataTransfer.files?.[0];
        if (selectedFile) handleFile(selectedFile);
      },
      [handleFile]
    );

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
    };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const truncateFileName = (name: string, max = 50) =>
      !name
        ? "No file selected"
        : name.length <= max
          ? name
          : name.slice(0, max) + "...";

    return (
      <div
        className={cn(
          "relative w-full rounded-md border bg-background",
          isDragging ? "border-primary bg-primary/10" : "border-input"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex h-10 items-center justify-between px-3 py-2 text-sm">
          <div className="flex items-center gap-2 truncate">
            {value && <FileIcon className="h-4 w-4 text-muted-foreground" />}
            <span>{truncateFileName(fileName)}</span>
          </div>

          <label
            htmlFor={id ?? "File-Upload"}
            className={cn(
              "flex cursor-pointer items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/20",
              reading && "pointer-events-none opacity-50"
            )}
          >
            {reading ? (
              <div className="flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>{readProgress}%</span>
              </div>
            ) : value ? (
              <>
                <Upload className="h-3 w-3" />
                <span>Replace</span>
              </>
            ) : (
              <>
                <Upload className="h-3 w-3" />
                <span>Choose XLSX File</span>
              </>
            )}
            <input
              id={id ?? "File-Upload"}
              type="file"
              className="sr-only"
              accept=".xlsx"
              onChange={handleFileChange}
              disabled={reading}
            />
          </label>
        </div>

        {error && <p className="text-red-500 px-3 text-sm mt-1">{error}</p>}

        {reading && (
          <div className="absolute left-0 bottom-0 h-[3px] w-full bg-gray-200">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${readProgress}%` }}
            />
          </div>
        )}
      </div>
    );
  }
);
FileUploader.displayName = "FileUploader";
