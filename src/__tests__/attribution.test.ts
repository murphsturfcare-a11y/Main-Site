import { captureLeadAttribution, mappedAttributionFields, sanitizeAttribution } from '@/lib/analytics/attribution';
import { CONSENT_KEY } from '@/lib/analytics/consent';

beforeEach(() => {
  delete window.murphysConsentChoice;
  localStorage.clear();
  sessionStorage.clear();
  captureLeadAttribution();
  window.history.replaceState({}, '', '/');
});
afterEach(() => vi.restoreAllMocks());

it('keeps only bounded campaign fields and a query-free same-site path', () => {
  expect(sanitizeAttribution({ utm_source: ' google ', utm_medium: '<cpc>\n', gclid: 'abc_-123', wbraid: 'bad<script>', landing_page: '/locations/palm-desert?email=private', email: 'private@example.com' })).toEqual({ utm_source: 'google', utm_medium: 'cpc', gclid: 'abc_-123' });
  expect(sanitizeAttribution({ gclid: 'a'.repeat(513), utm_campaign: 'a'.repeat(300), landing_page: '/locations/palm-desert' })).toEqual({ utm_campaign: 'a'.repeat(200), landing_page: '/locations/palm-desert' });
  expect(sanitizeAttribution(null)).toEqual({});
  expect(sanitizeAttribution(['utm_source'])).toEqual({});
});

it('retains a consented landing campaign when navigating to a quote page', () => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  window.history.replaceState({}, '', '/?utm_source=google&utm_medium=cpc&utm_campaign=desert&gclid=click_123&email=private');
  expect(captureLeadAttribution()).toEqual({ utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'desert', gclid: 'click_123', landing_page: '/' });
  window.history.replaceState({}, '', '/locations/palm-desert');
  expect(captureLeadAttribution()).toMatchObject({ gclid: 'click_123', landing_page: '/' });
  expect(sessionStorage.getItem('murphys_turf_lead_attribution')).not.toContain('private');
});

it('does not combine a new campaign with a previous campaign click ID', () => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  window.history.replaceState({}, '', '/?utm_source=google&gclid=old_click');
  captureLeadAttribution();
  window.history.replaceState({}, '', '/locations/palm-desert?utm_source=newsletter');
  expect(captureLeadAttribution()).toEqual({ utm_source: 'newsletter', landing_page: '/locations/palm-desert' });
});

it.each([null, 'declined', 'invalid'])('omits and clears campaign data without explicit acceptance (%s)', (choice) => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  window.history.replaceState({}, '', '/?gclid=click_123');
  captureLeadAttribution();
  if (choice === null) localStorage.removeItem(CONSENT_KEY);
  else localStorage.setItem(CONSENT_KEY, choice);
  expect(captureLeadAttribution()).toEqual({});
  expect(sessionStorage.getItem('murphys_turf_lead_attribution')).toBeNull();
});

it('retains consented attribution in memory when session storage is blocked', () => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('Blocked'); });
  window.history.replaceState({}, '', '/?gbraid=braid_123');
  expect(captureLeadAttribution()).toMatchObject({ gbraid: 'braid_123' });
  window.history.replaceState({}, '', '/locations/palm-desert');
  expect(captureLeadAttribution()).toMatchObject({ gbraid: 'braid_123' });
});

it('uses only explicitly configured field IDs without duplicating reserved fields', () => {
  const attribution = { utm_source: 'google', gclid: 'click_123', gbraid: 'braid_123' };
  expect(mappedAttributionFields(attribution, undefined)).toEqual([]);
  expect(mappedAttributionFields(attribution, 'invalid json')).toEqual([]);
  expect(mappedAttributionFields(attribution, JSON.stringify({ utm_source: 'sourceField', gclid: 'reserved', gbraid: 'sourceField', unrecognized: 'newId' }), ['reserved'])).toEqual([{ id: 'sourceField', field_value: 'google' }]);
});
