import DocumentCard from "@/components/shared/cards/document-card";
import CTA from "@/components/shared/sections/cta";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div
        className="min-h-screen w-full flex justify-center items-center bg-cover "
        style={{
          backgroundImage:
            "url(https://files.edgestore.dev/ln9m9j3kr2yibrue/public/_public/735903d7-d939-410f-8055-df466977358c.jpg)",
        }}
      >
        <Button>Get Started</Button>
      </div>
      <div className="py-[100px] container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
        <DocumentCard />
        <DocumentCard />
        <DocumentCard />
      </div>
      <CTA />
    </>
  );
}
