import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export interface Company {
  id: string;
  name: string;
  location: string;
  totalEmployees: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

interface Props {
  data: Company;
}

const CompanyCard = ({ data }: Props) => {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex justify-between text-[18px]">
          <span className="text-primary font-bold">Company Name: </span>{" "}
          <span>{data.name}</span>
        </div>
        <div className="flex justify-between text-[18px]">
          <span className="text-primary font-bold">Location: </span>{" "}
          <span>{data.location}</span>
        </div>
        <div className="flex justify-between text-[18px]">
          <span className="text-primary font-bold">Employees Number: </span>{" "}
          <span>{data.totalEmployees}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/dashboard/companies/${data.id}`} className="w-full">
            Manage Company
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
