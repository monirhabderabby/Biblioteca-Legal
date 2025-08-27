import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";

const VideoInstruction = () => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Step 2: Watch Instructions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Learn how to fill out the CSV template and upload your employee data
          correctly.
        </p>
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <Play className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-500">
              Video: How to Fill CSV and Bulk Upload
            </p>
            <p className="text-sm text-gray-400 mt-1">Duration: 3:45</p>
          </div>
        </div>
        <Alert className="mt-4">
          <AlertDescription>
            <strong>Important:</strong> Make sure to follow the exact column
            format shown in the template. Required fields: Name, Email,
            Position. Optional fields: Department, Salary, Start Date.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default VideoInstruction;
