import { Button } from "@/components/ui/button";
import ManageDocumentContainer from "./_components/manage-document-container";

const Page = () => {
  return (
    <div>
      <div className="w-full flex justify-between mb-5">
        <h1 className="text-primary font-semibold text-[32px] leading-[120%]">
          Documents
        </h1>
        <Button>Add Documeent</Button>
      </div>
      <ManageDocumentContainer />
    </div>
  );
};

export default Page;
