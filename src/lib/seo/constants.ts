export const SITE_URL = "https://murphysturfcare.com";
export const COMPANY_NAME = "Murphy's Turf Care";
export const COMPANY_DESCRIPTION =
  "Professional turf cleaning and lawn care services across California. From aeration and seeding to fertilization and pest control, Murphy's Turf Care keeps your lawn healthy and beautiful year-round.";
export const COMPANY_PHONE = "(951) 331-3300";
export const COMPANY_EMAIL = "info@murphysturfcare.com";

export const COMPANY_ADDRESS = {
  street: "26323 Jefferson Avenue",
  city: "Murrieta",
  state: "CA",
  zip: "92562",
  full: "26323 Jefferson Avenue, Murrieta, CA 92562",
};

export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/murphysturfcare",
  instagram: "https://instagram.com/murphysturfcare",
  google: "https://g.page/murphysturfcare",
  yelp: "https://yelp.com/biz/murphys-turf-care-murrieta",
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
  "los-angeles",
  "murrieta",
  "martinez",
  "sacramento",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type LocationSlug = (typeof LOCATION_SLUGS)[number];
