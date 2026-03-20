"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { type UTMParams, parseUTMFromURL, storeUTMParams, getStoredUTMParams } from "@/lib/analytics/utm";

export function useUTM() {
  const searchParams = useSearchParams();
  const [utmParams, setUtmParams] = useState<UTMParams | null>(null);

  useEffect(() => {
    const parsed = parseUTMFromURL(searchParams);
    if (parsed) {
      storeUTMParams(parsed);
      setUtmParams(parsed);
    } else {
      setUtmParams(getStoredUTMParams());
    }
  }, [searchParams]);

  return { utmParams, hasUTM: utmParams !== null };
}
