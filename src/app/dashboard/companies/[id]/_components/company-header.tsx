"use client";

import { deleteCompany } from "@/actions/companies/delete";
import AlertModal from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { CompanyWithEmployees } from "../page";
const EmployeeContainer = dynamic(() => import("./employee-container"), {
  ssr: false,
});

interface Props {
  data: CompanyWithEmployees;
}
const CompanyHeader = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const [pending, startTranistion] = useTransition();
  const router = useRouter();

  const onRemoveCompany = () => {
    startTranistion(() => {
      deleteCompany(data.id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
        setOpen(false);
        router.push("/dashboard/companies");
      });
    });
  };
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-[24px] leading-[120%]">{data.name}</h1>
          <div className="flex items-center gap-x-5">
            <Button
              variant="outline"
              className="text-rose-500 hover:text-rose-500/80 bg-white"
              onClick={() => setOpen(true)}
            >
              <Trash />
            </Button>
            <Button>Subscribe</Button>
          </div>
        </div>
        <div className="mt-[20px] space-y-[10px] mb-10">
          <p className="text-[18px]">
            <span className="font-semibold">Company Location: </span>{" "}
            <span>{data.location}</span>
          </p>
          <p className="text-[18px]">
            <span className="font-semibold">Employees Number: </span>{" "}
            <span>{data.employees.length}</span>
          </p>
        </div>

        <EmployeeContainer users={data.employees} companyId={data.id} />
      </div>

      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={pending}
        onConfirm={onRemoveCompany}
      />
    </>
  );
};

export default CompanyHeader;
