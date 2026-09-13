import { fireEvent, render, screen } from '@testing-library/react';
import handler from '../../netlify/functions/lead.mjs';
import ResidentialHub from '@/app/locations/[slug]/page';
import ResidentialCity from '@/app/locations/[slug]/[subLocation]/page';
import CommercialHub from '@/app/commercial-turf-cleaning/[location]/page';
import CommercialCity from '@/app/commercial-turf-cleaning/[location]/[subLocation]/page';
import { palmDesertAreas, palmDesertPath } from '@/data/palm-desert';
import { locations } from '@/data/locations';

const CONTACTS_URL = 'https://services.leadconnectorhq.com/contacts/';

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  delete window.murphysConsentChoice;
  vi.stubGlobal('Netlify', { env: { get: (key: string) => ({ GHL_API_KEY: 'test-only-token', GHL_LOCATION_ID: 'test-only-location' })[key] } });
  vi.stubGlobal('fetch', vi.fn(async (url: RequestInfo | URL, init?: RequestInit) => {
    if (url === '/.netlify/functions/lead') return handler(new Request('https://murphysturf.com/.netlify/functions/lead', init));
    if (url === CONTACTS_URL) return new Response(JSON.stringify({ contact: { id: 'test-contact' } }), { status: 201 });
    throw new Error('Unexpected test request; no live writes are allowed.');
  }));
});
afterEach(() => vi.unstubAllGlobals());

describe.each(palmDesertAreas)('$name hierarchy routing', (area) => {
  it.each([false, true])('applies the canonical regional tag through the actual route, form, and function (commercial=%s)', async (commercial) => {
    const path = palmDesertPath(area, commercial);
    window.history.replaceState({}, '', path);
    const hub = area.slug === 'palm-desert';
    const element = commercial
      ? hub
        ? await CommercialHub({ params: Promise.resolve({ location: 'palm-desert' }) })
        : await CommercialCity({ params: Promise.resolve({ location: 'palm-desert', subLocation: `commercial-turf-cleaning-in-${area.slug}` }) })
      : hub
        ? await ResidentialHub({ params: Promise.resolve({ slug: 'palm-desert' }) })
        : await ResidentialCity({ params: Promise.resolve({ slug: 'palm-desert', subLocation: `turf-cleaning-in-${area.slug}` }) });
    render(element);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(area.name);
    for (const [label, value] of [['First Name', 'QA'], ['Last Name', 'Example'], ['Phone', '2025550112'], ['Email', 'qa@example.com'], ['City', area.name]]) {
      fireEvent.change(screen.getByLabelText(new RegExp(`^${label}`)), { target: { value } });
    }
    fireEvent.change(screen.getByLabelText(/Issues With Turf/), { target: { value: 'Pet Odor' } });
    fireEvent.change(screen.getByLabelText(/How Soon/), { target: { value: 'Within the next week' } });
    fireEvent.click(screen.getByRole('button', { name: 'Get Quote' }));
    await screen.findByRole('heading', { name: 'Quote Request Received!' });
    const calls = vi.mocked(fetch).mock.calls;
    expect(calls).toHaveLength(2);
    const formPayload = JSON.parse(String(calls[0][1]?.body));
    expect(formPayload).toMatchObject({ locationSlug: 'palm-desert', locationCity: area.name });
    const crmPayload = JSON.parse(String(calls[1][1]?.body));
    expect(crmPayload.tags).toEqual(['website-lead', 'location-palm-desert']);
    expect(crmPayload.source).toBe('Website');
    expect(crmPayload.customFields).toContainEqual({ id: 'zXPUvnAUEX1nFUT0kRKM', field_value: `Website - ${area.name}` });
    expect(JSON.stringify(crmPayload)).not.toContain('Unknown');
  });
});

it.each(locations.filter((location) => location.slug !== 'palm-desert'))('preserves the existing $slug tag convention', async (location) => {
  const response = await handler(new Request('https://murphysturf.com/.netlify/functions/lead', {
    method: 'POST',
    body: JSON.stringify({ firstName: 'QA', lastName: 'Example', phone: '2025550112', email: 'qa@example.com', city: location.neighborhoods[0], locationSlug: location.slug, locationCity: location.neighborhoods[0], turfIssues: 'Pet Odor', timeline: 'Within the next week' }),
  }));
  expect(response.status).toBe(200);
  const payload = JSON.parse(String(vi.mocked(fetch).mock.calls[0][1]?.body));
  expect(payload.tags).toEqual(['website-lead', `location-${location.slug}`]);
  expect(payload.customFields).toContainEqual({ id: 'zXPUvnAUEX1nFUT0kRKM', field_value: `Website - ${location.neighborhoods[0]}` });
});
