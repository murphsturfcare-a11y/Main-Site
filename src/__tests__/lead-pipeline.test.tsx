import { act, fireEvent, render, screen } from '@testing-library/react';
import handler from '../../netlify/functions/lead.mjs';
import LeadForm from '@/components/forms/LeadForm';
import { captureLeadAttribution } from '@/lib/analytics/attribution';
import { CONSENT_KEY, readEffectiveConsent, saveConsent } from '@/lib/analytics/consent';
import { CookieConsent } from '@/components/analytics/CookieConsent';

const CONTACTS_URL = 'https://services.leadconnectorhq.com/contacts/';
let crmResponse: () => Promise<Response>;

function fillForm(email = 'qa@example.com') {
  const fields = [['First Name', 'QA'], ['Last Name', 'Example'], ['Phone', '2025550112'], ['Email', email], ['City', 'Indio']] as const;
  for (const [label, value] of fields) fireEvent.change(screen.getByLabelText(new RegExp(`^${label}`)), { target: { value } });
  fireEvent.change(screen.getByLabelText(/Issues With Turf/), { target: { value: 'Pet Odor' } });
  fireEvent.change(screen.getByLabelText(/How Soon/), { target: { value: 'Within the next week' } });
}

beforeEach(() => {
  delete window.murphysConsentChoice;
  delete window.murphysConsentInitialized;
  localStorage.clear();
  sessionStorage.clear();
  captureLeadAttribution();
  localStorage.setItem(CONSENT_KEY, 'accepted');
  window.history.replaceState({}, '', '/locations/palm-desert/turf-cleaning-in-indio?utm_source=google&utm_campaign=desert&gclid=click_123');
  window.dataLayer = [];
  window.gtag = vi.fn();
  crmResponse = async () => new Response(JSON.stringify({ contact: { id: 'test-contact' } }), { status: 201 });
  vi.stubGlobal('Netlify', { env: { get: (key: string) => ({ GHL_API_KEY: 'test-only-token', GHL_LOCATION_ID: 'test-only-location' })[key] } });
  vi.stubGlobal('fetch', vi.fn(async (url: RequestInfo | URL, init?: RequestInit) => {
    if (url === '/.netlify/functions/lead') return handler(new Request('https://murphysturf.com/.netlify/functions/lead', init));
    if (url === CONTACTS_URL) return crmResponse();
    if (url === `${CONTACTS_URL}test-contact/notes`) return new Response('{}', { status: 201 });
    throw new Error('Unexpected test request; real network access is disabled.');
  }));
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

it('carries an explicitly accepted campaign and conversion through the pipeline when saving consent fails', async () => {
  localStorage.removeItem(CONSENT_KEY);
  render(<><CookieConsent /><LeadForm locationCity="Indio" locationSlug="palm-desert" /></>);
  vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => { throw new DOMException('Blocked', 'SecurityError'); });
  fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
  expect(localStorage.getItem(CONSENT_KEY)).toBeNull();
  expect(readEffectiveConsent()).toBe('accepted');
  expect(screen.queryByRole('region', { name: 'Cookie preferences' })).not.toBeInTheDocument();
  fillForm();
  fireEvent.click(screen.getByRole('button', { name: 'Get Quote' }));
  await screen.findByRole('heading', { name: 'Quote Request Received!' });
  const calls = vi.mocked(fetch).mock.calls;
  expect(JSON.parse(String(calls[0][1]?.body))).toMatchObject({ analyticsConsent: true, attribution: { gclid: 'click_123' } });
  expect(calls.some(([url]) => String(url).endsWith('/notes'))).toBe(true);
  expect(vi.mocked(window.gtag).mock.calls.filter(([command, event]) => command === 'event' && event === 'generate_lead')).toHaveLength(1);
});

it('omits attribution, CRM notes and conversion after an explicit decline even if stale acceptance cannot be overwritten', async () => {
  captureLeadAttribution();
  render(<><CookieConsent /><LeadForm locationCity="Indio" locationSlug="palm-desert" /></>);
  vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => { throw new DOMException('Blocked', 'SecurityError'); });
  act(() => saveConsent('declined'));
  expect(localStorage.getItem(CONSENT_KEY)).toBe('accepted');
  expect(readEffectiveConsent()).toBe('declined');
  fillForm();
  fireEvent.click(screen.getByRole('button', { name: 'Get Quote' }));
  await screen.findByRole('heading', { name: 'Quote Request Received!' });
  const calls = vi.mocked(fetch).mock.calls;
  expect(JSON.parse(String(calls[0][1]?.body))).toMatchObject({ analyticsConsent: false, attribution: {} });
  expect(calls).toHaveLength(2);
  expect(vi.mocked(window.gtag).mock.calls.filter(([command, event]) => command === 'event' && event === 'generate_lead')).toHaveLength(0);
  expect(window.dataLayer).toEqual([]);
  expect(sessionStorage.getItem('murphys_turf_lead_attribution')).toBeNull();
});

it('carries an Indio quote through the real function to CRM fields, attribution note and one non-PII conversion', async () => {
  render(<LeadForm locationCity="Indio" locationSlug="palm-desert" />);
  fillForm();
  fireEvent.click(screen.getByRole('button', { name: 'Get Quote' }));
  expect(await screen.findByRole('heading', { name: 'Quote Request Received!', level: 2 })).toBeInTheDocument();
  const calls = vi.mocked(fetch).mock.calls;
  const browserPayload = JSON.parse(String(calls.find(([url]) => url === '/.netlify/functions/lead')?.[1]?.body));
  expect(browserPayload).toMatchObject({ locationSlug: 'palm-desert', locationCity: 'Indio', city: 'Indio', consent: 'No', analyticsConsent: true, attribution: { gclid: 'click_123', utm_source: 'google' } });
  const crmPayload = JSON.parse(String(calls.find(([url]) => url === CONTACTS_URL)?.[1]?.body));
  expect(crmPayload.tags).toContain('location-palm-desert');
  expect(crmPayload.customFields).toContainEqual({ id: 'zXPUvnAUEX1nFUT0kRKM', field_value: 'Website - Indio' });
  expect(String(calls.find(([url]) => String(url).endsWith('/notes'))?.[1]?.body)).toContain('gclid: click_123');
  expect(window.gtag).toHaveBeenCalledExactlyOnceWith('event', 'generate_lead', { service_type: 'turf_cleaning', location: 'Indio' });
  expect(window.dataLayer).toEqual([{ event: 'lead_conversion', service_type: 'turf_cleaning', location: 'Indio' }]);
  expect(JSON.stringify(vi.mocked(window.gtag).mock.calls)).not.toContain('qa@example.com');
  expect(JSON.stringify(window.dataLayer)).not.toContain('2025550112');
});

it('keeps communication permission separate from declined analytics consent', async () => {
  localStorage.setItem(CONSENT_KEY, 'declined');
  render(<LeadForm locationCity="Indio" locationSlug="palm-desert" />);
  fillForm();
  fireEvent.click(screen.getByRole('checkbox'));
  fireEvent.click(screen.getByRole('button', { name: 'Get Quote' }));
  await screen.findByRole('heading', { name: 'Quote Request Received!' });
  const calls = vi.mocked(fetch).mock.calls;
  const browserPayload = JSON.parse(String(calls[0][1]?.body));
  expect(browserPayload).toMatchObject({ consent: 'Yes', analyticsConsent: false, attribution: {} });
  const crmPayload = JSON.parse(String(calls[1][1]?.body));
  expect(crmPayload.customFields).toContainEqual({ id: 'EkqebbONQPtvVGj4lauv', field_value: 'Yes' });
  expect(calls).toHaveLength(2);
  expect(window.gtag).not.toHaveBeenCalled();
  expect(window.dataLayer).toEqual([]);
});

it('does not record a conversion when CRM rejects a lead', async () => {
  crmResponse = async () => new Response('rejected', { status: 422 });
  render(<LeadForm locationCity="Indio" locationSlug="palm-desert" />);
  fillForm();
  fireEvent.click(screen.getByRole('button', { name: 'Get Quote' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Failed to submit lead');
  expect(window.gtag).not.toHaveBeenCalled();
  expect(window.dataLayer).toEqual([]);
});

it('keeps successful UI when an analytics callback throws', async () => {
  vi.mocked(window.gtag).mockImplementation(() => { throw new Error('Analytics unavailable'); });
  render(<LeadForm locationCity="Indio" locationSlug="palm-desert" />);
  fillForm();
  fireEvent.click(screen.getByRole('button', { name: 'Get Quote' }));
  expect(await screen.findByRole('heading', { name: 'Quote Request Received!' })).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

it('prevents overlapping requests from submitting the same form twice', async () => {
  let resolveCRM!: (response: Response) => void;
  crmResponse = () => new Promise((resolve) => { resolveCRM = resolve; });
  const { container } = render(<LeadForm locationCity="Indio" locationSlug="palm-desert" />);
  fillForm();
  fireEvent.submit(container.querySelector('form')!);
  fireEvent.submit(container.querySelector('form')!);
  // The function yields while parsing JSON before making its CRM request.
  await vi.waitFor(() => expect(resolveCRM).toBeTypeOf('function'));
  expect(vi.mocked(fetch).mock.calls.filter(([url]) => url === CONTACTS_URL)).toHaveLength(1);
  resolveCRM(new Response(JSON.stringify({ contact: { id: 'test-contact' } }), { status: 201 }));
  await screen.findByRole('heading', { name: 'Quote Request Received!' });
  expect(window.gtag).toHaveBeenCalledTimes(1);
});

it('rejects malformed email before making any request', async () => {
  render(<LeadForm locationCity="Indio" locationSlug="palm-desert" />);
  fillForm('invalid-email');
  fireEvent.click(screen.getByRole('button', { name: 'Get Quote' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('valid email address');
  expect(fetch).not.toHaveBeenCalled();
  expect(window.gtag).not.toHaveBeenCalled();
});

it('does not treat an arbitrary HTTP 200 as a successful lead', async () => {
  vi.mocked(fetch).mockResolvedValueOnce(new Response('{"ok":false}', { status: 200 }));
  render(<LeadForm locationCity="Indio" locationSlug="palm-desert" />);
  fillForm();
  fireEvent.click(screen.getByRole('button', { name: 'Get Quote' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('could not confirm');
  expect(window.gtag).not.toHaveBeenCalled();
});
