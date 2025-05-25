import { Input } from "@/components/ui/input";
import { Document } from "@prisma/client";
import ManageDocumentCard from "./manage-document-card";

interface Props {
  data: Document[];
}

const ManageDocumentContainer = ({ data }: Props) => {
  return (
    <div className="w-full">
      <div>
        <Input placeholder="Search..." className="max-w-[500px] ml-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] mt-10">
        {data.map((item) => (
          <ManageDocumentCard key={item.id} document={item} />
        ))}
      </div>
    </div>
  );
};

export default ManageDocumentContainer;
