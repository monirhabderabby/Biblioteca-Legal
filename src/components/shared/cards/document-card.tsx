import { Calendar, FileText } from "lucide-react";

const DocumentCard = () => {
  return (
    <div className="w-full max-w-[422px] rounded-[8px] border-[1px] p-[20px] border-[#000000]/20">
      <h2 className="text-primary font-bold text-[24px] leading-[120%]">
        Criminal Procedure Amendment
      </h2>
      <p className="mt-[15px] text-primary font-semibold text-[14px] leading-[120%] tracking-[0%]">
        Lorem ipsum dolor sit amet consectetur. Sed convallis varius urna et
        volutpat consectetur sem
      </p>

      <div className="mt-[20px] flex items-center gap-x-[13px] text-[#0D99FF]">
        <FileText className="h-5 w-5" />
        <span className="font-poppins">Law No. 91-2024</span>
      </div>
      <div className="mt-[20px] flex items-center gap-x-[13px] text-black">
        <Calendar className="h-5 w-5" />
        <span className="font-poppins text-[12px]">
          Published: July 10, 2024
        </span>
      </div>
    </div>
  );
};

export default DocumentCard;
