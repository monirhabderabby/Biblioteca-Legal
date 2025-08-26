import { getCurrentUserSubscription } from "@/helper/subscription";
import FeatureLocker from "@/provider/Feature-Locker";
import BookmarkContainer from "./_components/bookmark-container";

const Page = async () => {
  const cs = await getCurrentUserSubscription();

  const hasFullAccess = cs?.hasAccess;
  return (
    <div>
      {hasFullAccess ? (
        <BookmarkContainer />
      ) : (
        <FeatureLocker>
          <div className="min-h-[400px]"></div>
        </FeatureLocker>
      )}
    </div>
  );
};

export default Page;
