// Shared playback policy for background video. A clip only plays on a device
// that asked for motion, is not on a small screen, and is not saving data.
export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
export const MOBILE_VIEWPORT = '(max-width: 767px)';

type NetworkInformation = EventTarget & { saveData?: boolean; effectiveType?: string };

function connection(): NetworkInformation | undefined {
  return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

export function allowsVideo() {
  const network = connection();
  return !window.matchMedia(REDUCED_MOTION).matches
    && !window.matchMedia(MOBILE_VIEWPORT).matches
    && !network?.saveData
    && !['slow-2g', '2g', '3g'].includes(network?.effectiveType || '');
}

export function subscribeToPlaybackPolicy(onChange: () => void) {
  const queries = [window.matchMedia(REDUCED_MOTION), window.matchMedia(MOBILE_VIEWPORT)];
  const network = connection();
  queries.forEach((query) => query.addEventListener('change', onChange));
  network?.addEventListener('change', onChange);
  return () => {
    queries.forEach((query) => query.removeEventListener('change', onChange));
    network?.removeEventListener('change', onChange);
  };
}

// Static SSR snapshot: the initial HTML never contains a video source, so a
// crawler, no-JS browser or data-saving device gets only the poster image.
export const staticPoster = () => false;
