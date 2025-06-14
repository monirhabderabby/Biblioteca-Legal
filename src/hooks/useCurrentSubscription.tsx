import { getCurrentUserSubscription } from "@/helper/subscription";
import { useEffect, useState } from "react";

interface Sub {
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  sub_id?: string;
  isActive: boolean;
  userId: string;
}

export function useCurrentUserSubscription() {
  const [subscription, setSubscription] = useState<{
    type: "user" | "company";
    subscription: Sub;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSubscription = async () => {
      try {
        const cs = await getCurrentUserSubscription();
        if (isMounted) {
          setSubscription(cs);
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
