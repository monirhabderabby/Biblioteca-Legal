import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
const PrivacyPolicyContainer = dynamic(
  () => import("./_components/privacy-policy-container"),
  {
    ssr: false,
  }
);

const Page = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy & Policy</CardTitle>
        <CardDescription>Manage your privacy & policy content</CardDescription>
      </CardHeader>
      <CardContent>
        <PrivacyPolicyContainer />
      </CardContent>
    </Card>
  );
};

export default Page;
