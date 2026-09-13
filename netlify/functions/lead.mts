
// ---------------------------------------------------------------------------
// GHL v2 Contacts API — Murphy's Turf lead submission
// ---------------------------------------------------------------------------
import { ATTRIBUTION_FIELDS, mappedAttributionFields, sanitizeAttribution } from '../../src/lib/analytics/attribution';
import { isValidEmail, TIMELINE_OPTIONS, TURF_ISSUES } from '../../src/lib/forms/lead-fields';
import { locations } from '../../src/data/locations';

declare const Netlify: { env: { get(name: string): string | undefined } };

const GHL_API = "https://services.leadconnectorhq.com/contacts/";
const GHL_VERSION = "2021-07-28";

// Custom field IDs (from GET /locations/{id}/customFields)
const FIELD_TURF_ISSUES = "WtYBOqmmraY1I9fy5xa9";
const FIELD_TIMELINE = "ImZSphv7MkTINVPnx5cc";
const FIELD_CONSENT = "EkqebbONQPtvVGj4lauv";
const FIELD_CONTACT_SOURCE = "zXPUvnAUEX1nFUT0kRKM";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sanitize(s: unknown): string {
  if (typeof s !== "string") return "";
  return s.replace(/[<>]/g, "").trim().slice(0, 500);
}

function jsonError(msg: string, status: number) {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export default async function handler(req: Request) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return jsonError("Method not allowed", 405);
  }

  const API_KEY = Netlify.env.get("GHL_API_KEY");
  const LOCATION_ID = Netlify.env.get("GHL_LOCATION_ID");

  if (!API_KEY || !LOCATION_ID) {
    console.error("Missing GHL_API_KEY or GHL_LOCATION_ID env vars");
    return jsonError("Server configuration error", 500);
  }

  let input: unknown;
  try {
    input = await req.json();
  } catch {
    return jsonError("Invalid JSON", 400);
  }
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return jsonError('Invalid request body', 400);
  }
  const body = input as Record<string, unknown>;

  const firstName = sanitize(body.firstName);
  const lastName = sanitize(body.lastName);
  const phone = sanitize(body.phone);
  const email = sanitize(body.email);
  const city = sanitize(body.city);
  const turfIssues = sanitize(body.turfIssues);
  const timeline = sanitize(body.timeline);
  const consent = body.consent === 'Yes' ? 'Yes' : 'No';
  const requestedLocation = typeof body.locationSlug === 'string' ? body.locationSlug.trim() : '';
  const requestedPageCity = typeof body.locationCity === 'string' ? body.locationCity.trim().toLowerCase() : '';

  if (!firstName || !lastName || !phone || !email || !city) {
    return jsonError("Missing required fields", 400);
  }
  if (!isValidEmail(email)) return jsonError('Please enter a valid email address.', 400);
  if (!(TURF_ISSUES as readonly string[]).includes(turfIssues) || !(TIMELINE_OPTIONS as readonly string[]).includes(timeline)) {
    return jsonError('Please select a turf issue and service timeline.', 400);
  }
  const location = locations.find((area) => area.slug === requestedLocation);
  if (!location) return jsonError('Invalid service area', 400);
  // The entered property city is separate from the page's routing context.
  // Only a canonical city belonging to this region can label Contact Source.
  const locationCity = location.neighborhoods.find((name) => name.toLowerCase() === requestedPageCity);
  if (!locationCity) return jsonError('Invalid service-area page city', 400);

  // Communication consent above and optional analytics consent are distinct.
  const attribution = body.analyticsConsent === true ? sanitizeAttribution(body.attribution) : {};
  const attributionFields = mappedAttributionFields(attribution, Netlify.env.get('GHL_ATTRIBUTION_FIELD_IDS'), [FIELD_TURF_ISSUES, FIELD_TIMELINE, FIELD_CONSENT, FIELD_CONTACT_SOURCE]);

  // Build GHL v2 payload
  const ghlPayload = {
    locationId: LOCATION_ID,
    firstName,
    lastName,
    phone,
    email,
    city,
    source: "Website",
    tags: ["website-lead", `location-${location.slug}`],
    customFields: [
      { id: FIELD_TURF_ISSUES, field_value: turfIssues },
      { id: FIELD_TIMELINE, field_value: timeline },
      { id: FIELD_CONSENT, field_value: consent },
      { id: FIELD_CONTACT_SOURCE, field_value: `Website - ${locationCity}` },
      ...attributionFields,
    ],
  };

  try {
    const ghlRes = await fetch(GHL_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        Version: GHL_VERSION,
      },
      body: JSON.stringify(ghlPayload),
    });

    if (!ghlRes.ok) {
      console.error(`GHL API error ${ghlRes.status}`);
      return jsonError("Failed to submit lead. Please call us directly.", 502);
    }

    const result = await ghlRes.json();
    if (typeof result?.contact?.id !== 'string' || !result.contact.id.trim()) {
      console.error('GHL response did not confirm a contact ID');
      return jsonError('Could not confirm your quote request. Please call us directly.', 502);
    }
    if (Object.keys(attribution).length) {
      // The documented notes endpoint shares contacts.write authorization and
      // preserves campaign context without changing workflow-sensitive fields.
      // A failure here must never turn a created lead into a failed submission.
      const note = ['Website campaign attribution (analytics accepted)', ...ATTRIBUTION_FIELDS.flatMap((key) => attribution[key] ? [`${key}: ${attribution[key]}`] : [])].join('\n');
      try {
        const noteRes = await fetch(`${GHL_API}${encodeURIComponent(result.contact.id)}/notes`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json', Version: GHL_VERSION },
          body: JSON.stringify({ body: note.replace(/&/g, '&amp;').slice(0, 10000) }),
          signal: AbortSignal.timeout(2500),
        });
        if (!noteRes.ok) console.warn(`Lead saved; campaign attribution note failed (${noteRes.status}).`);
      } catch {
        console.warn('Lead saved; campaign attribution note was not confirmed.');
      }
    }
    return new Response(
      JSON.stringify({ ok: true, contactId: result.contact?.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch {
    console.error("GHL request failed");
    return jsonError("Service temporarily unavailable. Please call us directly.", 503);
  }
}
