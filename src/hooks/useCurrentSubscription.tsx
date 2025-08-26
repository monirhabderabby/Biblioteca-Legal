import { getCurrentUserSubscription } from "@/helper/subscription";
import { CompanySubscription, UserSubscription } from "@prisma/client";
import { useEffect, useState } from "react";

export function useCurrentUserSubscription() {
  const [subscription, setSubscription] = useState<{
    type: "user" | "company";
    subscription: UserSubscription | CompanySubscription;
    hasFullAccess: boolean;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSubscription = async () => {
      try {
        const cs = await getCurrentUserSubscription();
        if (isMounted) {
          if (cs) {
            setSubscription({
              type: cs.subType,
              subscription: cs.subscription,
              hasFullAccess: !!cs.hasAccess,
            });
          } else {
            setSubscription(null);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSubscription();

    return () => {
      isMounted = false;
    };
  }, []);

  return { subscription, loading, error };
}
