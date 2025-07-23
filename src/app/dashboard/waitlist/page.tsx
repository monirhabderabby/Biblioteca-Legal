import { prisma } from "@/lib/db";
import WaitListContainer from "./_components/wait-list-container";

const Page = async () => {
  const userQue = await prisma.userQue.findMany();

  return (
    <div>
      <div className="w-full flex justify-between mb-5">
        <h1 className="text-primary font-semibold text-[32px] leading-[120%]">
          Waitlist
        </h1>
      </div>
      <WaitListContainer data={userQue ?? []} />
    </div>
  );
};

export default Page;
