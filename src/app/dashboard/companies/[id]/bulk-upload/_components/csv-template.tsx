"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

const CSVTemplate = () => {
  // Generate and download Excel template
  const downloadTemplate = () => {
    // Define worksheet data
    const worksheetData = [
      ["email", "first_name", "last_name"], // header row
      ["", "", ""], // sample row with companyId filled
      ["", "", ""], // another empty row
    ];

    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Set column widths
    worksheet["!cols"] = [
      { wpx: 200 }, // email
      { wpx: 200 }, // companyId
      { wpx: 200 }, // first_name
      { wpx: 200 }, // last_name
    ];

    // Header style (bold + center align)
    const headerStyle = {
      font: { bold: true },
      alignment: { horizontal: "center", vertical: "center" },
    };

    // Cell style (center align)
    const cellStyle = {
      alignment: { horizontal: "center", vertical: "center" },
    };

    // Apply header style
    ["A1", "B1", "C1", "D1"].forEach((cell) => {
      if (worksheet[cell]) {
        worksheet[cell].s = headerStyle;
      }
    });

    // Apply cell style to the rest
    Object.keys(worksheet).forEach((cell) => {
      if (cell !== "!ref" && !["A1", "B1", "C1", "D1"].includes(cell)) {
        worksheet[cell].s = cellStyle;
      }
    });

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    // Export as Excel file
    XLSX.writeFile(workbook, "employee_template.xlsx");

    toast.success("Template Downloaded", {
      description: "Excel template has been downloaded successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Step 1: Download CSV Template
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Download our Excel template to ensure your data is formatted correctly
          for bulk upload. The company ID is already filled in.
        </p>
        <Button onClick={downloadTemplate} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Template
        </Button>
      </CardContent>
    </Card>
  );
};

export default CSVTemplate;
