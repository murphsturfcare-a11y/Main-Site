'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { captureLeadAttribution } from '@/lib/analytics/attribution';
import { subscribeToConsent } from '@/lib/analytics/consent';

export default function AttributionCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureLeadAttribution();
    return subscribeToConsent(() => { captureLeadAttribution(); });
  }, [pathname, searchParams]);

  return null;
}
