import AddCompanyModal from "@/components/shared/modals/add-company-modal";
import { Button } from "@/components/ui/button";
import CompanyCardsContainer from "./_components/company-cards-container";

const Page = () => {
  return (
    <div>
      <div className="w-full flex justify-between mb-5">
        <h1 className="text-primary font-semibold text-[32px] leading-[120%]">
          Manage Company
        </h1>

        <AddCompanyModal
          trigger={<Button className="h-[45px]">Add Company</Button>}
        />
      </div>

      <CompanyCardsContainer />
    </div>
  );
};

export default Page;
