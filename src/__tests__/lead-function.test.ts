import handler from '../../netlify/functions/lead.mjs';

const valid = { firstName: 'QA', lastName: 'Example', phone: '2025550112', email: 'qa@example.com', city: 'Indio', turfIssues: 'Pet Odor', timeline: 'Within the next week', consent: 'No', locationSlug: 'palm-desert', locationCity: 'Indio' };
let fieldMapping: string | undefined;
const request = (body: unknown) => new Request('https://murphysturf.com/.netlify/functions/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

beforeEach(() => {
  fieldMapping = undefined;
  vi.stubGlobal('Netlify', { env: { get: (key: string) => ({ GHL_API_KEY: 'test-only-token', GHL_LOCATION_ID: 'test-only-location', GHL_ATTRIBUTION_FIELD_IDS: fieldMapping })[key] } });
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ contact: { id: 'test-contact' } }), { status: 201 })));
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

it('preserves Palm Desert routing, the actual city and existing communication consent fields', async () => {
  const response = await handler(request(valid));
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ ok: true, contactId: 'test-contact' });
  const payload = JSON.parse(String(vi.mocked(fetch).mock.calls[0][1]?.body));
  expect(payload).toMatchObject({ city: 'Indio', source: 'Website', tags: ['website-lead', 'location-palm-desert'] });
  expect(payload.customFields).toContainEqual({ id: 'EkqebbONQPtvVGj4lauv', field_value: 'No' });
  expect(payload.customFields).toContainEqual({ id: 'zXPUvnAUEX1nFUT0kRKM', field_value: 'Website - Indio' });
  expect(fetch).toHaveBeenCalledTimes(1);
});

it('uses the canonical page city while preserving the entered property city', async () => {
  const response = await handler(request({ ...valid, locationCity: ' iNdIo ', city: 'Sun City Palm Desert' }));
  expect(response.status).toBe(200);
  const payload = JSON.parse(String(vi.mocked(fetch).mock.calls[0][1]?.body));
  expect(payload.city).toBe('Sun City Palm Desert');
  expect(payload.customFields).toContainEqual({ id: 'zXPUvnAUEX1nFUT0kRKM', field_value: 'Website - Indio' });
  expect(payload.tags).toEqual(['website-lead', 'location-palm-desert']);
});

it.each(['', 'Unknown', 'Temecula', 'Palm Springs', '<Indio>', null])('rejects an invalid or mismatched page city (%s) before CRM submission', async (locationCity) => {
  const response = await handler(request({ ...valid, locationCity }));
  expect(response.status).toBe(400);
  expect(fetch).not.toHaveBeenCalled();
});

it('maps explicit attribution IDs and saves a bounded note after the contact succeeds', async () => {
  fieldMapping = JSON.stringify({ gclid: 'configuredClickField' });
  vi.mocked(fetch).mockImplementation(async (url) => String(url).endsWith('/notes') ? new Response('{}', { status: 201 }) : new Response(JSON.stringify({ contact: { id: 'test-contact' } }), { status: 201 }));
  const response = await handler(request({ ...valid, analyticsConsent: true, attribution: { utm_source: 'google', gclid: 'click_123', landing_page: '/', email: 'not-an-attribution-field' } }));
  expect(response.status).toBe(200);
  const payload = JSON.parse(String(vi.mocked(fetch).mock.calls[0][1]?.body));
  expect(payload.customFields).toContainEqual({ id: 'configuredClickField', field_value: 'click_123' });
  expect(payload).not.toHaveProperty('attributionSource');
  expect(fetch).toHaveBeenNthCalledWith(2, 'https://services.leadconnectorhq.com/contacts/test-contact/notes', expect.objectContaining({ method: 'POST', signal: expect.any(AbortSignal) }));
  const note = JSON.parse(String(vi.mocked(fetch).mock.calls[1][1]?.body));
  expect(note.body).toContain('gclid: click_123');
  expect(note.body).toContain('utm_source: google');
  expect(note.body).not.toContain(valid.email);
  expect(note.body).not.toContain('not-an-attribution-field');
});

it('saves campaign context as a note without requiring new custom-field IDs', async () => {
  await handler(request({ ...valid, analyticsConsent: true, attribution: { wbraid: 'braid_123' } }));
  expect(fetch).toHaveBeenCalledTimes(2);
  const payload = JSON.parse(String(vi.mocked(fetch).mock.calls[0][1]?.body));
  expect(payload.customFields).toHaveLength(4);
  expect(String(vi.mocked(fetch).mock.calls[1][1]?.body)).toContain('wbraid: braid_123');
});

it.each([false, undefined, 'true'])('does not forward attribution without explicit analytics consent (%s)', async (analyticsConsent) => {
  fieldMapping = JSON.stringify({ gclid: 'configuredClickField' });
  await handler(request({ ...valid, analyticsConsent, attribution: { gclid: 'click_123' } }));
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(String(vi.mocked(fetch).mock.calls[0][1]?.body)).not.toContain('click_123');
});

it.each([null, [], 'invalid', 123, {}, { ...valid, email: 'bad-email' }, { ...valid, turfIssues: 'invalid' }, { ...valid, timeline: '' }, { ...valid, locationSlug: 'unknown' }])('rejects an invalid request without contacting the CRM: %j', async (body) => {
  const response = await handler(request(body));
  expect(response.status).toBe(400);
  expect(fetch).not.toHaveBeenCalled();
});

it.each(['reject', 'http'])('keeps a confirmed lead successful when its attribution note fails (%s)', async (failure) => {
  vi.mocked(fetch).mockResolvedValueOnce(new Response(JSON.stringify({ contact: { id: 'test-contact' } }), { status: 201 }));
  if (failure === 'reject') vi.mocked(fetch).mockRejectedValueOnce(new Error('private response detail'));
  else vi.mocked(fetch).mockResolvedValueOnce(new Response('private response detail', { status: 403 }));
  const response = await handler(request({ ...valid, analyticsConsent: true, attribution: { gclid: 'click_123' } }));
  expect(response.status).toBe(200);
  expect(await response.json()).toMatchObject({ ok: true });
  expect(console.warn).toHaveBeenCalledTimes(1);
  expect(JSON.stringify(vi.mocked(console.warn).mock.calls)).not.toContain('private response detail');
});

it('does not accept an unconfirmed CRM response or log its private response body', async () => {
  vi.mocked(fetch).mockResolvedValueOnce(new Response('private response detail', { status: 422 }));
  expect((await handler(request(valid))).status).toBe(502);
  expect(console.error).toHaveBeenCalledWith('GHL API error 422');
  expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain('private response detail');
  vi.mocked(fetch).mockResolvedValueOnce(new Response('{}', { status: 201 }));
  expect((await handler(request(valid))).status).toBe(502);
});
