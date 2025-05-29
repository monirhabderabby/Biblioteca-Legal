import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import EmployeeCard from "./employee-card";

interface Props {
  users: User[] | [];
}
const EmployeeContainer = ({ users }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-[20px] leading-[120%]">
          Employee Lists ({users.length})
        </h1>

        <Button>Add Employee</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {users.map((item) => (
          <EmployeeCard
            key={item.id}
            profileImage={
              item.image ??
              "https://files.edgestore.dev/ln9m9j3kr2yibrue/public/_public/08ce8d0c-d7ec-40bc-9beb-6972163e3e9b.jpg"
            }
            firstName={item.first_name}
            lastName={item.last_name}
            emailVerified={!!item.emailVerified}
            onRemove={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeContainer;
