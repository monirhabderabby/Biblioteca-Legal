import ActivityAction from "./_components/activity-action";
import Stats from "./_components/stats";

const Page = () => {
  return (
    <main className="flex-1 overflow-auto p-6">
      {/* Stats Cards */}
      <Stats />

      {/* Activity and Actions */}
      <ActivityAction />

      {/* Content Popularity */}
    </main>
  );
};

export default Page;
