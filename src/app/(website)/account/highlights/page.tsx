import { getCurrentUserSubscription } from "@/helper/subscription";
import FeatureLocker from "@/provider/Feature-Locker";
import HighlightContainer from "./_components/highlights-container";

const Page = async () => {
  const cs = await getCurrentUserSubscription();

  const hasFullAccess = cs?.hasAccess;
  return (
    <div>
      {hasFullAccess ? (
        <HighlightContainer />
      ) : (
        <FeatureLocker>
          <div className="min-h-[400px]" />
        </FeatureLocker>
      )}
    </div>
  );
};

export default Page;
