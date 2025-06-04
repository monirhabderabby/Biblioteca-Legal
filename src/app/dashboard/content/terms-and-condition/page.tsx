import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import dynamic from "next/dynamic";
const TermsAndConditionContainer = dynamic(
  () => import("./_components/terms-condition-container"),
  {
    ssr: false,
  }
);

const Page = async () => {
  const data = await prisma.termsOfService.findFirst();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Terms and Conditions</CardTitle>
        <CardDescription>
          Manage your terms and condition content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TermsAndConditionContainer initialContent={data?.content ?? ""} />
      </CardContent>
    </Card>
  );
};

export default Page;
