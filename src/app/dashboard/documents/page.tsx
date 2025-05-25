import { Button } from "@/components/ui/button";
import Link from "next/link";
import ManageDocumentContainer from "./_components/manage-document-container";

const Page = () => {
  return (
    <div>
      <div className="w-full flex justify-between mb-5">
        <h1 className="text-primary font-semibold text-[32px] leading-[120%]">
          Documents
        </h1>
        <Button asChild className="min-h-[45px]">
          <Link href="/dashboard/documents/new">Add Documeent</Link>
        </Button>
      </div>
      <ManageDocumentContainer />
    </div>
  );
};

export default Page;
