import { Input } from "@/components/ui/input";
import ManageDocumentCard from "./manage-document-card";

const ManageDocumentContainer = () => {
  return (
    <div className="w-full">
      <div>
        <Input placeholder="Search..." className="max-w-[500px] ml-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] mt-10">
        <ManageDocumentCard />
        <ManageDocumentCard />
        <ManageDocumentCard />
        <ManageDocumentCard />
      </div>
    </div>
  );
};

export default ManageDocumentContainer;
