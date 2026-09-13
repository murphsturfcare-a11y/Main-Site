export const CONSENT_KEY = 'murphys_turf_cookie_consent';
export type ConsentChoice = 'accepted' | 'declined';
const subscribers = new Set<() => void>();

const DENIED = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
} as const;
const GRANTED = {
  analytics_storage: 'granted',
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
} as const;

declare global {
  interface Window {
    murphysConsentInitialized?: boolean;
    murphysConsentChoice?: ConsentChoice | null;
  }
}

export function readStoredConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return null;
  }
}

// An explicit decision on this page takes precedence even when persistence
// fails. A new document falls back to the saved choice, or denied if absent.
export function readEffectiveConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  return window.murphysConsentChoice !== undefined ? window.murphysConsentChoice : readStoredConsent();
}

function settings(choice: ConsentChoice | null) {
  return choice === 'accepted' ? { ...GRANTED } : { ...DENIED };
}

// The banner can run before the external Google library. Keep its commands in
// Google's standard queue, with a default before the first update.
export function initializeConsent() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function () {
      // Google consumes the Arguments object used by its standard gtag snippet.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
  if (window.murphysConsentInitialized) return;
  window.gtag('consent', 'default', settings(readEffectiveConsent()));
  window.murphysConsentInitialized = true;
}

export function saveConsent(choice: ConsentChoice) {
  initializeConsent();
  window.murphysConsentChoice = choice;
  try { window.localStorage.setItem(CONSENT_KEY, choice); } catch { /* This page still honors the explicit choice. */ }
  window.gtag('consent', 'update', settings(choice));
  subscribers.forEach((onChange) => onChange());
}

function onStorage(event: StorageEvent) {
  if (event.key !== CONSENT_KEY && event.key !== null) return;
  window.murphysConsentChoice = readStoredConsent();
  initializeConsent();
  window.gtag('consent', 'update', settings(readEffectiveConsent()));
  // Update the shared choice before any consumer responds, regardless of
  // whether the banner or attribution component subscribed first.
  subscribers.forEach((onChange) => onChange());
}

export function subscribeToConsent(onChange: () => void) {
  if (subscribers.size === 0) window.addEventListener('storage', onStorage);
  subscribers.add(onChange);
  return () => {
    subscribers.delete(onChange);
    if (subscribers.size === 0) window.removeEventListener('storage', onStorage);
  };
}

// This small initializer runs from the root layout before hydration or tag
// loading. The same guard keeps a choice queued by the banner from being reset.
// Only the explicit stored value "accepted" restores a grant.
export const CONSENT_INITIALIZATION_SCRIPT = `
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
  if (!window.murphysConsentInitialized) {
    var murphysChoice = window.murphysConsentChoice;
    if (typeof murphysChoice === 'undefined') {
      try { murphysChoice = window.localStorage.getItem(${JSON.stringify(CONSENT_KEY)}); } catch (error) {}
    }
    window.gtag('consent', 'default', murphysChoice === 'accepted' ? ${JSON.stringify(GRANTED)} : ${JSON.stringify(DENIED)});
    window.murphysConsentInitialized = true;
  }
`;
