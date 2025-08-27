import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BulkEmployeeUploadForm from "./_components/bulk-employee-upload-form";
import CSVTemplate from "./_components/csv-template";
import VideoInstruction from "./_components/video-instruction";

export default function BulkUploadPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className=" mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Bulk Upload Employees</h1>
          <p></p>
        </div>

        {/* CSV Template Download */}
        <CSVTemplate />

        {/* Video Instructions */}
        <VideoInstruction />

        {/* File Upload Form */}
        <BulkEmployeeUploadForm companyId={params.id} />

        {/* Upload Guidelines */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Upload Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Ensure your file follows the exact template format</li>
              <li>• Company ID is pre-filled and should not be changed</li>
              <li>
                • First name, Last name, and Email are required for each
                employee
              </li>
              <li>• Email addresses must be unique and valid</li>
              <li>• Maximum 1000 employees per upload</li>
              <li>• File size limit: 5MB</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
