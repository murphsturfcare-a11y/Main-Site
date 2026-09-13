"use client";

import { useSyncExternalStore } from "react";
import { readEffectiveConsent, saveConsent, subscribeToConsent } from '@/lib/analytics/consent';

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribeToConsent, readEffectiveConsent, () => 'pending');
  const showBanner = consent === null;

  function handleAccept() {
    saveConsent('accepted');
  }

  function handleDecline() {
    saveConsent('declined');
  }

  if (!showBanner) return null;

  return (
    <div role="region" aria-label="Cookie preferences" className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-700">
          We use cookies to improve your experience and analyze site traffic. By accepting, you
          consent to our use of cookies.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-md bg-forest px-4 py-2 text-sm font-medium text-white hover:bg-forest-dark transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
