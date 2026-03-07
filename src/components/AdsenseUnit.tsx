"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type AdFormat = "fluid" | "auto" | "rectangle" | "vertical" | "horizontal";

interface AdSenseUnitProps {
  slot: string;
  format?: AdFormat;
  layout?: string; // only used with fluid
}

const formatConfig: Record<
  AdFormat,
  React.CSSProperties & { minHeight: string }
> = {
  fluid: { display: "block", textAlign: "center", minHeight: "250px" },
  auto: { display: "block", minHeight: "100px" },
  rectangle: {
    display: "inline-block",
    width: "336px",
    height: "280px",
    minHeight: "280px",
  },
  vertical: {
    display: "inline-block",
    width: "300px",
    height: "600px",
    minHeight: "600px",
  },
  horizontal: {
    display: "block",
    width: "728px",
    height: "90px",
    minHeight: "90px",
  },
};

export default function AdSenseUnit({
  slot,
  format = "fluid",
  layout,
}: AdSenseUnitProps) {
  const pathname = usePathname();

  useEffect(() => {
    const loadAd = () => {
      try {
        if (typeof window !== "undefined" && window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error("AdSense error:", err);
      }
    };

    const timer = setTimeout(loadAd, 500);
    return () => clearTimeout(timer);
  }, [pathname, slot]);

  const { minHeight, ...insStyle } = formatConfig[format];

  return (
    <div
      key={`${pathname}-${slot}-${format}`}
      className="overflow-hidden flex justify-center"
      style={{ minHeight }}
    >
      <ins
        className="adsbygoogle"
        style={insStyle}
        data-ad-format={format === "fluid" ? "fluid" : "auto"}
        {...(format === "fluid" && {
          "data-ad-layout": layout ?? "in-article",
        })}
        data-ad-client="ca-pub-5685390714020326"
        data-ad-slot={slot}
      />
    </div>
  );
}
