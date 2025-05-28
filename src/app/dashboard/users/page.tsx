import ManageUserContainer from "./_components/manage-user-container";
import ManageUserHeader from "./_components/manage-user-header";

const Page = () => {
  return (
    <div>
      <div className="w-full flex justify-between mb-5">
        <h1 className="text-primary font-semibold text-[32px] leading-[120%]">
          Manage User
        </h1>

        <ManageUserHeader />
      </div>

      <ManageUserContainer />
    </div>
  );
};

export default Page;
