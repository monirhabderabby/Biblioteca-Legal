import { BarChart3, FileText } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";

const Stats = async () => {
  const totalUsers = await prisma.user.count();
  const totalDocuments = await prisma.document.count();
  return (
    <div className="grid gap-6 md:grid-cols-2 ">
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Active users
            </p>
            <h3 className="mt-2 text-3xl font-bold text-primary">
              {totalUsers}
            </h3>
          </div>
          <div className="rounded-full bg-blue-50 p-3">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
        </CardContent>
      </Card>
      {/* <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Live User
            </p>
            <h3 className="mt-2 text-3xl font-bold text-primary">{0}</h3>
          </div>
          <div className="rounded-full bg-blue-50 p-3">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
        </CardContent>
      </Card> */}
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Documents
            </p>
            <h3 className="mt-2 text-3xl font-bold text-primary">
              {totalDocuments}{" "}
            </h3>
          </div>
          <div className="rounded-full bg-blue-50 p-3">
            <FileText className="h-6 w-6 text-primary" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
