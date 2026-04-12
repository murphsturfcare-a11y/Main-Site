import type { Context } from "@netlify/functions";

// ---------------------------------------------------------------------------
// GHL v2 Contacts API — Murphy's Turf lead submission
// ---------------------------------------------------------------------------

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

export default async function handler(req: Request, _ctx: Context) {
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

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid JSON", 400);
  }

  const firstName = sanitize(body.firstName);
  const lastName = sanitize(body.lastName);
  const phone = sanitize(body.phone);
  const email = sanitize(body.email);
  const city = sanitize(body.city);
  const turfIssues = sanitize(body.turfIssues);
  const timeline = sanitize(body.timeline);
  const consent = sanitize(body.consent);
  const locationSlug = sanitize(body.locationSlug);
  const locationCity = sanitize(body.locationCity);

  if (!firstName || !lastName || !phone || !email) {
    return jsonError("Missing required fields", 400);
  }

  // Build GHL v2 payload
  const ghlPayload = {
    locationId: LOCATION_ID,
    firstName,
    lastName,
    phone,
    email,
    city,
    source: "Website",
    tags: ["website-lead", `location-${locationSlug || "unknown"}`],
    customFields: [
      { id: FIELD_TURF_ISSUES, field_value: turfIssues },
      { id: FIELD_TIMELINE, field_value: timeline },
      { id: FIELD_CONSENT, field_value: consent },
      { id: FIELD_CONTACT_SOURCE, field_value: `Website - ${locationCity || "Unknown"}` },
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
      const errBody = await ghlRes.text();
      console.error(`GHL API error ${ghlRes.status}: ${errBody}`);
      return jsonError("Failed to submit lead. Please call us directly.", 502);
    }

    const result = await ghlRes.json();
    return new Response(
      JSON.stringify({ ok: true, contactId: result.contact?.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("GHL fetch error:", err);
    return jsonError("Service temporarily unavailable. Please call us directly.", 503);
  }
}
