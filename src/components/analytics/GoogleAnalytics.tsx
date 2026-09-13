"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { GA_MEASUREMENT_ID, pageview } from "@/lib/analytics/gtag";
import { CONSENT_INITIALIZATION_SCRIPT } from '@/lib/analytics/consent';

export function GoogleAnalytics() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // The bootstrap records the initial page. Only send another pageview when
    // client navigation changes the path, including after development remounts.
    if (GA_MEASUREMENT_ID && pathname && pathname !== previousPathname.current) {
      pageview(pathname);
    }
    previousPathname.current = pathname;
  }, [pathname]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            ${CONSENT_INITIALIZATION_SCRIPT}
            window.gtag('js', new Date());
            window.gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID).replace(/</g, '\\u003c')}, {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
