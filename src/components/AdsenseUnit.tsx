// components/AdSenseUnit.tsx
"use client";

import { useEffect } from "react";

interface AdSenseUnitProps {
  slot: string;
}

const AdSenseUnit = ({ slot }: AdSenseUnitProps) => {
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error", err);
    }
  }, []);

  return (
    <div className="my-8 w-full overflow-hidden flex justify-center">
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
};

export default AdSenseUnit;
