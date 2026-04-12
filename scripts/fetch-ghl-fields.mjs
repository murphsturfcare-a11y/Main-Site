#!/usr/bin/env node
/**
 * Fetch GHL custom field IDs for Murphy's Turf.
 * Usage: GHL_API_KEY=xxx GHL_LOCATION_ID=yyy node scripts/fetch-ghl-fields.mjs
 */

const API_KEY = process.env.GHL_API_KEY;
const LOCATION_ID = process.env.GHL_LOCATION_ID;

if (!API_KEY || !LOCATION_ID) {
  console.error('Set GHL_API_KEY and GHL_LOCATION_ID env vars');
  process.exit(1);
}

const url = `https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customFields`;

const res = await fetch(url, {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    Version: '2021-07-28',
    Accept: 'application/json',
  },
});

const data = await res.json();

if (data.customFields) {
  console.log('Custom Fields:');
  data.customFields.forEach((f) => {
    console.log(`  ${f.id}  ${f.name}  (${f.dataType})`);
  });
} else {
  console.log('Response:', JSON.stringify(data, null, 2));
}
