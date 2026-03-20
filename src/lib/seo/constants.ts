export const SITE_URL = "https://murphysturf.com";
export const COMPANY_NAME = "Murphy's Turf";
export const COMPANY_DESCRIPTION =
  "Professional turf cleaning and lawn care services across Colorado. From aeration and seeding to fertilization and pest control, Murphy's Turf keeps your lawn healthy and beautiful year-round.";
export const COMPANY_PHONE = "(720) 555-0147";
export const COMPANY_EMAIL = "info@murphysturf.com";

export const COMPANY_ADDRESS = {
  street: "1847 Green Valley Rd",
  city: "Denver",
  state: "CO",
  zip: "80203",
  full: "1847 Green Valley Rd, Denver, CO 80203",
};

export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/murphysturf",
  instagram: "https://instagram.com/murphysturf",
  google: "https://g.page/murphysturf",
  yelp: "https://yelp.com/biz/murphys-turf-denver",
};

export const SERVICE_SLUGS = [
  "lawn-cleaning",
  "aeration",
  "seeding",
  "fertilization",
  "pest-control",
  "seasonal-maintenance",
] as const;

export const LOCATION_SLUGS = [
  "denver",
  "colorado-springs",
  "aurora",
  "lakewood",
  "boulder",
  "fort-collins",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type LocationSlug = (typeof LOCATION_SLUGS)[number];
