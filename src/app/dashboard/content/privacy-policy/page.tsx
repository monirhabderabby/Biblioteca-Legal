import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import dynamic from "next/dynamic";
const PrivacyPolicyContainer = dynamic(
  () => import("./_components/privacy-policy-container"),
  {
    ssr: false,
  }
);

const Page = async () => {
  const data = await prisma.privacyPolicy.findFirst();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy & Policy</CardTitle>
        <CardDescription>Manage your privacy & policy content</CardDescription>
      </CardHeader>
      <CardContent>
        <PrivacyPolicyContainer initialContent={data?.content ?? ""} />
      </CardContent>
    </Card>
  );
};

export default Page;
