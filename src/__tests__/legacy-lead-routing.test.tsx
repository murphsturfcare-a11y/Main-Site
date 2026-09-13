import { renderToStaticMarkup } from 'react-dom/server';
import ResidentialCity from '@/app/locations/[slug]/[subLocation]/page';
import CommercialCity from '@/app/commercial-turf-cleaning/[location]/[subLocation]/page';
import { locations, residentialLocationParams } from '@/data/locations';
import { commercialSubLocationParams } from '@/data/commercial';
import handler from '../../netlify/functions/lead.mjs';

const observed = vi.hoisted(() => [] as { locationCity: string; locationSlug: string }[]);
vi.mock('@/components/forms/LeadForm', () => ({
  default: (props: { locationCity: string; locationSlug: string }) => { observed.push(props); return null; },
}));

beforeEach(() => {
  vi.stubGlobal('Netlify', { env: { get: (key: string) => ({ GHL_API_KEY: 'test-only-token', GHL_LOCATION_ID: 'test-only-location' })[key] } });
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ contact: { id: 'test-contact' } }), { status: 201 })));
});
afterEach(() => vi.unstubAllGlobals());

it.each(['residential', 'commercial'] as const)('accepts actual LeadForm routing props from every legacy %s child page', async (kind) => {
  const pages = kind === 'residential'
    ? residentialLocationParams().filter((params) => params.slug !== 'palm-desert').map((params) => ({ region: params.slug, render: () => ResidentialCity({ params: Promise.resolve(params) }) }))
    : commercialSubLocationParams().filter((params) => params.location !== 'palm-desert').map((params) => ({ region: params.location, render: () => CommercialCity({ params: Promise.resolve(params) }) }));
  expect(pages).toHaveLength(56);
  for (const page of pages) {
    observed.length = 0;
    renderToStaticMarkup(await page.render());
    expect(observed).toHaveLength(1);
    const routing = observed[0];
    expect(routing.locationSlug).toBe(page.region);
    expect(locations.find((location) => location.slug === page.region)?.neighborhoods).toContain(routing.locationCity);
    const response = await handler(new Request('https://murphysturf.com/.netlify/functions/lead', {
      method: 'POST',
      body: JSON.stringify({ ...routing, firstName: 'QA', lastName: 'Example', phone: '2025550112', email: 'qa@example.com', city: routing.locationCity, turfIssues: 'Pet Odor', timeline: 'Within the next week' }),
    }));
    expect(response.status, `${kind} form for ${routing.locationCity} must be accepted`).toBe(200);
    const payload = JSON.parse(String(vi.mocked(fetch).mock.lastCall?.[1]?.body));
    expect(payload.tags).toEqual(['website-lead', `location-${page.region}`]);
    expect(payload.customFields).toContainEqual({ id: 'zXPUvnAUEX1nFUT0kRKM', field_value: `Website - ${routing.locationCity}` });
  }
  expect(fetch).toHaveBeenCalledTimes(pages.length);
});
