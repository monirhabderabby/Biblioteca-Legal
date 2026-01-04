"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdSenseUnit({ slot }: { slot: string }) {
  const pathname = usePathname();

  useEffect(() => {
    const loadAd = () => {
      try {
        if (typeof window !== "undefined" && window.adsbygoogle) {
          // Check if an ad has already been pushed to this specific element
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error("AdSense error:", err);
      }
    };

    // Small delay ensures the DOM element is fully rendered before AdSense looks for it
    const timer = setTimeout(loadAd, 500);
    return () => clearTimeout(timer);
  }, [pathname, slot]); // Re-run when the URL changes

  return (
    <div
      key={`${pathname}-${slot}`} // Force re-render on route change
      className="my-8 w-full overflow-hidden flex justify-center min-h-[250px]"
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-5685390714020326"
        data-ad-slot={slot}
      />
    </div>
  );
}
