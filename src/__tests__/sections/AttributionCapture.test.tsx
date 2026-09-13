import { act, fireEvent, render, screen } from '@testing-library/react';
import AttributionCapture from '@/components/analytics/AttributionCapture';
import { CookieConsent } from '@/components/analytics/CookieConsent';
import { captureLeadAttribution } from '@/lib/analytics/attribution';
import { CONSENT_KEY } from '@/lib/analytics/consent';

vi.mock('next/navigation', () => ({ usePathname: () => window.location.pathname, useSearchParams: () => new URLSearchParams(window.location.search) }));

beforeEach(() => {
  delete window.murphysConsentChoice;
  localStorage.clear();
  sessionStorage.clear();
  captureLeadAttribution();
  window.history.replaceState({}, '', '/?utm_source=google&gclid=click_123');
  window.dataLayer = [];
  window.gtag = vi.fn();
  delete window.murphysConsentInitialized;
});

it.each([CONSENT_KEY, null])('clears captured data and reopens the banner after a cross-tab deletion (%s)', (key) => {
  render(<><AttributionCapture /><CookieConsent /></>);
  fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
  expect(captureLeadAttribution()).toHaveProperty('gclid', 'click_123');
  localStorage.removeItem(CONSENT_KEY);
  act(() => window.dispatchEvent(new StorageEvent('storage', { key })));
  expect(captureLeadAttribution()).toEqual({});
  expect(sessionStorage.getItem('murphys_turf_lead_attribution')).toBeNull();
  expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
});

it('captures a landing campaign when the visitor accepts, then retains it on navigation', () => {
  const { rerender } = render(<><AttributionCapture /><CookieConsent /></>);
  expect(sessionStorage.getItem('murphys_turf_lead_attribution')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
  expect(JSON.parse(sessionStorage.getItem('murphys_turf_lead_attribution')!)).toEqual({ utm_source: 'google', gclid: 'click_123', landing_page: '/' });
  window.history.replaceState({}, '', '/locations/palm-desert');
  rerender(<><AttributionCapture /><CookieConsent /></>);
  expect(captureLeadAttribution()).toMatchObject({ gclid: 'click_123', landing_page: '/' });
});
