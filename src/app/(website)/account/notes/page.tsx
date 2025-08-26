import { getCurrentUserSubscription } from "@/helper/subscription";
import FeatureLocker from "@/provider/Feature-Locker";
import NotesContainer from "./_components/notes-container";

const Page = async () => {
  const cs = await getCurrentUserSubscription();

  const hasFullAccess = cs?.hasAccess;

  return (
    <div>
      {hasFullAccess ? (
        <NotesContainer />
      ) : (
        <FeatureLocker>
          <div className="min-h-[400px]" />
        </FeatureLocker>
      )}
    </div>
  );
};

export default Page;
