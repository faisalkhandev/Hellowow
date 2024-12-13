"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

const ADSENSE_ID = "ca-pub-3790006470209825";

export const AutoAdsRefresh: React.FC = () => {
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
   
    if (!initialized.current) {
      initialized.current = true;
      return;
    }

    if (typeof window !== "undefined") {
      try {
        const adElements = document.querySelectorAll(".adsbygoogle");
        adElements.forEach((ad) => {
          if (ad.hasAttribute("data-ad-status")) {
            ad.removeAttribute("data-ad-status");
          }
        });

        if (window.adsbygoogle) {
          window.location.reload();
        }
      } catch (e) {
        console.error(
          "Error handling ads:",
          e instanceof Error ? e.message : "Unknown error"
        );
      }
    }
  }, [pathname]);

  return (
    <Script
      id="adsense-init"
      strategy="afterInteractive"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
      crossOrigin="anonymous"
      onError={(e) => {
        console.error("Error loading AdSense script:", e);
      }}
    />
  );
};

export default AutoAdsRefresh;
