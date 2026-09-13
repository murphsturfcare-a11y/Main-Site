"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { type UTMParams, parseUTMFromURL, storeUTMParams, getStoredUTMParams } from "@/lib/analytics/utm";

function subscribeToStorage(onChange: () => void) {
  window.addEventListener('storage', onChange);
  return () => window.removeEventListener('storage', onChange);
}
function readStoredSnapshot() {
  return JSON.stringify(getStoredUTMParams() ?? null);
}

export function useUTM() {
  const searchParams = useSearchParams();
  const parsed = useMemo(() => parseUTMFromURL(searchParams), [searchParams]);
  // A serialized snapshot stays referentially stable between storage updates.
  const storedSnapshot = useSyncExternalStore(subscribeToStorage, readStoredSnapshot, () => 'null');
  const stored = useMemo(() => JSON.parse(storedSnapshot) as UTMParams | null, [storedSnapshot]);
  useEffect(() => {
    if (parsed) storeUTMParams(parsed);
  }, [parsed]);
  const utmParams = parsed ?? stored;
  return { utmParams, hasUTM: utmParams !== null };
}
