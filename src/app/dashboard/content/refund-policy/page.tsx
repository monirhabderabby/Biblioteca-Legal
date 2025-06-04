import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import dynamic from "next/dynamic";
const RefundPolicyContainer = dynamic(
  () => import("./_components/refund-policy-container"),
  {
    ssr: false,
  }
);

const Page = async () => {
  const data = await prisma.refundPolicy.findFirst();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Refund Policy</CardTitle>
        <CardDescription>Manage your refund policy content</CardDescription>
      </CardHeader>
      <CardContent>
        <RefundPolicyContainer initialContent={data?.content ?? ""} />
      </CardContent>
    </Card>
  );
};

export default Page;
