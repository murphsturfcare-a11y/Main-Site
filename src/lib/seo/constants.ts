export const SITE_URL = "https://murphysturf.com";
export const COMPANY_NAME = "Murphy's Turf";
export const COMPANY_TAGLINE = "When you care about clean turf, call Murphy's Turf";
export const COMPANY_DESCRIPTION =
  "Professional artificial turf cleaning and sanitization services across California. With 30+ years of experience, Murphy's Turf uses professional-grade cleaning solutions to deep clean, deodorize, and sanitize your synthetic turf. Serving Huntington Beach, Murrieta, Martinez, and Sacramento.";
export const COMPANY_PHONE = "";
export const COMPANY_EMAIL = "info@murphysturf.com";

export const COMPANY_ADDRESS = {
  city: "Murrieta",
  state: "CA",
  full: "Murrieta, CA",
};

export const DEFAULT_OG_IMAGE = "/images/og-image.png";

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=100090088264095",
  instagram: "https://www.instagram.com/murphysturfcare/",
  youtube: "https://www.youtube.com/@murphysturfcare/featured",
};

export const SERVICE_SLUGS = [
  "pet-hair-debris",
  "blooming-decompacting",
  "disinfect-deodorize",
  "poop-scooping",
] as const;

export const LOCATION_SLUGS = [
  "huntington-beach",
  "murrieta",
  "martinez",
  "sacramento",
] as const;

export const BLOG_SLUGS = [
  // Existing posts (match actual built pages)
  "how-to-clean-artificial-turf",
  "removing-pet-odors-artificial-turf",
  "how-often-clean-artificial-turf",
  "diy-vs-professional-turf-cleaning",
  "artificial-turf-pets-clean-safe",
  "chlorine-based-turf-cleaning",
  "signs-turf-needs-professional-cleaning",
  "turf-cleaning-huntington-beach",
  "turf-cleaning-murrieta-inland-empire",
  "poop-scooping-service-worth-it",
  "artificial-turf-bacteria-health-risks",
  "seasonal-turf-maintenance-california",
  // City-targeted posts
  "turf-cleaning-bay-area-martinez",
  "turf-cleaning-sacramento",
  "artificial-turf-cleaning-los-angeles",
  "artificial-turf-cleaning-anaheim",
  "artificial-turf-cleaning-riverside",
  "artificial-turf-cleaning-irvine",
  "artificial-turf-cleaning-long-beach",
  "artificial-turf-cleaning-san-diego",
  "artificial-turf-cleaning-orange-county",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type LocationSlug = (typeof LOCATION_SLUGS)[number];
export type BlogSlug = (typeof BLOG_SLUGS)[number];
