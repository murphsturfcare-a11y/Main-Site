import { readEffectiveConsent } from './consent';

export const ATTRIBUTION_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'landing_page'] as const;
export type AttributionField = typeof ATTRIBUTION_FIELDS[number];
export type LeadAttribution = Partial<Record<AttributionField, string>>;
const STORAGE_KEY = 'murphys_turf_lead_attribution';
let currentAttribution: LeadAttribution = {};

export function sanitizeAttribution(value: unknown): LeadAttribution {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const candidate = value as Record<string, unknown>;
  const result: LeadAttribution = {};
  for (const key of ATTRIBUTION_FIELDS) {
    const item = candidate[key];
    if (typeof item !== 'string' || !item.trim()) continue;
    const clean = item.trim();
    if (key === 'landing_page') {
      // Record a same-site path, never an entire query string or fragment.
      if (/^\/(?!\/)[^?#<>\s]*$/.test(clean) && clean.length <= 500) result[key] = clean;
    } else if (key === 'gclid' || key === 'gbraid' || key === 'wbraid') {
      // Do not truncate a click ID into a different identifier.
      if (/^[A-Za-z0-9._~-]{1,512}$/.test(clean)) result[key] = clean;
    } else {
      result[key] = clean.replace(/[<>\r\n\t]/g, '').slice(0, 200);
    }
  }
  return result;
}

export function captureLeadAttribution(): LeadAttribution {
  if (typeof window === 'undefined') return {};
  if (readEffectiveConsent() !== 'accepted') {
    currentAttribution = {};
    try { window.sessionStorage.removeItem(STORAGE_KEY); } catch { /* Storage is optional. */ }
    return {};
  }
  const params = new URLSearchParams(window.location.search);
  const fromURL = sanitizeAttribution(Object.fromEntries(ATTRIBUTION_FIELDS.filter((key) => key !== 'landing_page').map((key) => [key, params.get(key)])));
  if (Object.keys(fromURL).length) {
    // A new campaign replaces the previous record instead of combining a new
    // UTM source with a click ID from a different visit.
    currentAttribution = { ...fromURL, ...sanitizeAttribution({ landing_page: window.location.pathname }) };
    try { window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentAttribution)); } catch { /* Retain only in memory for this page. */ }
  } else if (!Object.keys(currentAttribution).length) {
    try { currentAttribution = sanitizeAttribution(JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? 'null')); } catch { currentAttribution = {}; }
  }
  return { ...currentAttribution };
}

// Native contact attribution is not a writable field in the documented Create
// Contact API. Use only field IDs explicitly supplied for this CRM location.
export function mappedAttributionFields(attribution: LeadAttribution, configuration: string | undefined, reservedIds: readonly string[] = []) {
  let mapping: Record<string, unknown> = {};
  try {
    const parsed: unknown = JSON.parse(configuration ?? '{}');
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) mapping = parsed as Record<string, unknown>;
  } catch { /* Invalid optional configuration cannot block a quote request. */ }
  const usedIds = new Set(reservedIds);
  return ATTRIBUTION_FIELDS.flatMap((key) => {
    const id = mapping[key];
    if (!attribution[key] || typeof id !== 'string' || !/^[A-Za-z0-9_-]{1,100}$/.test(id) || usedIds.has(id)) return [];
    usedIds.add(id);
    return [{ id, field_value: attribution[key] }];
  });
}
