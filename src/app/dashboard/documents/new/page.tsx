import { DocumentCreateForm } from "@/components/shared/forms/document-create-form";

const Page = () => {
  return (
    <div className="space-y-[40px]">
      <h1 className="text-primary font-semibold text-[32px] leading-[120%]">
        Create Document
      </h1>

      <DocumentCreateForm />
    </div>
  );
};

export default Page;
