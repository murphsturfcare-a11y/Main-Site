import {
  generatePageMetadata,
  generateServiceMetadata,
  generateLocationMetadata,
} from "./metadata";

export const homeMetadata = generatePageMetadata(
  "Professional Lawn Care & Turf Cleaning in California",
  "Murphy's Turf Care provides expert lawn care, turf cleaning, aeration, seeding, and fertilization services across California. Free estimates — call (951) 331-3300 today!",
  "/"
);

export const aboutMetadata = generatePageMetadata(
  "About Us",
  "Learn about Murphy's Turf Care — California's trusted lawn care professionals. Family-owned, locally operated, and committed to keeping your turf healthy and beautiful.",
  "/about"
);

export const contactMetadata = generatePageMetadata(
  "Contact Us",
  "Get in touch with Murphy's Turf Care for a free lawn care quote. Serving Los Angeles, Murrieta, Martinez, Sacramento, and more. Call (951) 331-3300 or fill out our form.",
  "/contact"
);

export const servicesMetadata = generatePageMetadata(
  "Our Lawn Care Services",
  "Explore Murphy's Turf Care professional lawn care services: cleaning, aeration, seeding, fertilization, pest control, and seasonal maintenance throughout California.",
  "/services"
);

export const locationsMetadata = generatePageMetadata(
  "Service Locations in California",
  "Murphy's Turf Care serves Los Angeles, Murrieta, Martinez, Sacramento, and surrounding areas. Find lawn care services near you.",
  "/locations"
);

const services = [
  {
    name: "Lawn Cleaning",
    slug: "lawn-cleaning" as const,
    shortDescription:
      "Comprehensive lawn cleaning to remove debris, thatch, and buildup for a pristine yard.",
  },
  {
    name: "Aeration",
    slug: "aeration" as const,
    shortDescription:
      "Core aeration to reduce soil compaction, improve drainage, and promote deep root growth.",
  },
  {
    name: "Seeding",
    slug: "seeding" as const,
    shortDescription:
      "Overseeding and reseeding with premium grass varieties suited to California's climate.",
  },
  {
    name: "Fertilization",
    slug: "fertilization" as const,
    shortDescription:
      "Custom fertilization programs to nourish your lawn through every season in California.",
  },
  {
    name: "Pest Control",
    slug: "pest-control" as const,
    shortDescription:
      "Targeted pest control to protect your turf from grubs, insects, and lawn-damaging pests.",
  },
  {
    name: "Seasonal Maintenance",
    slug: "seasonal-maintenance" as const,
    shortDescription:
      "Year-round seasonal lawn maintenance including spring cleanup, summer care, and winterization.",
  },
];

export const serviceMetadata: Record<string, ReturnType<typeof generateServiceMetadata>> = {};
for (const service of services) {
  serviceMetadata[service.slug] = generateServiceMetadata(service);
}

const locations = [
  {
    name: "Los Angeles",
    slug: "los-angeles" as const,
    description:
      "Serving the Los Angeles metro area with expert lawn care and turf maintenance services.",
  },
  {
    name: "Murrieta",
    slug: "murrieta" as const,
    description:
      "Murphy's Turf Care headquarters — professional turf cleaning and lawn care in the Inland Empire.",
  },
  {
    name: "Martinez",
    slug: "martinez" as const,
    description:
      "Professional turf cleaning and lawn care for Martinez and East Bay homeowners and businesses.",
  },
  {
    name: "Sacramento",
    slug: "sacramento" as const,
    description:
      "Full-service lawn care in Sacramento — keeping Central Valley lawns healthy year-round.",
  },
];

export const locationMetadata: Record<string, ReturnType<typeof generateLocationMetadata>> = {};
for (const location of locations) {
  locationMetadata[location.slug] = generateLocationMetadata(location);
}
