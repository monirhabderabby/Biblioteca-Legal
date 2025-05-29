"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { CompanyWithEmployees } from "../page";
import EmployeeContainer from "./employee-container";

interface Props {
  data: CompanyWithEmployees;
}
const CompanyHeader = ({ data }: Props) => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-[24px] leading-[120%]">{data.name}</h1>
        <div className="flex items-center gap-x-5">
          <Button
            variant="outline"
            className="text-rose-500 hover:text-rose-500/80 bg-white"
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

      <EmployeeContainer users={data.employees} />
    </div>
  );
};

export default CompanyHeader;
