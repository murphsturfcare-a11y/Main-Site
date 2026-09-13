import { blogPosts } from '@/data/blog';
import { locations } from '@/data/locations';

export const SITE_URL = "https://murphysturf.com";
export const COMPANY_NAME = "Murphy's Turf";
export const COMPANY_TAGLINE = "When you care about clean turf, call Murphy's Turf";
export const COMPANY_DESCRIPTION =
  "Murphy's Turf provides artificial turf cleaning, debris removal, grooming, pet odor treatment, and maintenance. Serving Huntington Beach, Murrieta, Martinez, Sacramento, Palm Desert, and surrounding service areas.";
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

export const LOCATION_SLUGS = locations.map((location) => location.slug);

export const COMMERCIAL_SLUG = "commercial-turf-cleaning";

export const BLOG_SLUGS = Object.keys(blogPosts);

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type LocationSlug = (typeof LOCATION_SLUGS)[number];
export type BlogSlug = (typeof BLOG_SLUGS)[number];
