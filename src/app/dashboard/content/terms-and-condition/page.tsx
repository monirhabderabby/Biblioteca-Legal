import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
const TermsAndConditionContainer = dynamic(
  () => import("./_components/terms-condition-container"),
  {
    ssr: false,
  }
);

const Page = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Terms and Conditions</CardTitle>
        <CardDescription>
          Manage your terms and condition content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TermsAndConditionContainer />
      </CardContent>
    </Card>
  );
};

export default Page;
