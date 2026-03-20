export interface UTMParams {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

const UTM_STORAGE_KEY = "murphys_turf_utm";

export function parseUTMFromURL(searchParams: URLSearchParams): UTMParams | null {
  const source = searchParams.get("utm_source");
  const medium = searchParams.get("utm_medium");
  const campaign = searchParams.get("utm_campaign");
  const term = searchParams.get("utm_term");
  const content = searchParams.get("utm_content");

  if (!source && !medium && !campaign) return null;

  return {
    source: source ?? "",
    medium: medium ?? "",
    campaign: campaign ?? "",
    term: term ?? "",
    content: content ?? "",
  };
}

export function storeUTMParams(params: UTMParams): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
}

export function getStoredUTMParams(): UTMParams | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as UTMParams;
  } catch {
    return null;
  }
}

export function appendUTMToFormData(formData: Record<string, any>): Record<string, any> {
  const utm = getStoredUTMParams();
  if (!utm) return formData;
  return {
    ...formData,
    utm_source: utm.source,
    utm_medium: utm.medium,
    utm_campaign: utm.campaign,
    utm_term: utm.term,
    utm_content: utm.content,
  };
}
