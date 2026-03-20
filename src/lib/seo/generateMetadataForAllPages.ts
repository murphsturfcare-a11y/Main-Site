import {
  generatePageMetadata,
  generateServiceMetadata,
  generateLocationMetadata,
} from "./metadata";

export const homeMetadata = generatePageMetadata(
  "Professional Lawn Care & Turf Cleaning in Colorado",
  "Murphy's Turf provides expert lawn care, turf cleaning, aeration, seeding, and fertilization services across Colorado. Free estimates — call (720) 555-0147 today!",
  "/"
);

export const aboutMetadata = generatePageMetadata(
  "About Us",
  "Learn about Murphy's Turf — Colorado's trusted lawn care professionals. Family-owned, locally operated, and committed to keeping your turf healthy and beautiful.",
  "/about"
);

export const contactMetadata = generatePageMetadata(
  "Contact Us",
  "Get in touch with Murphy's Turf for a free lawn care quote. Serving Denver, Colorado Springs, Aurora, Boulder, and more. Call (720) 555-0147 or fill out our form.",
  "/contact"
);

export const servicesMetadata = generatePageMetadata(
  "Our Lawn Care Services",
  "Explore Murphy's Turf professional lawn care services: cleaning, aeration, seeding, fertilization, pest control, and seasonal maintenance throughout Colorado.",
  "/services"
);

export const locationsMetadata = generatePageMetadata(
  "Service Locations in Colorado",
  "Murphy's Turf serves Denver, Colorado Springs, Aurora, Lakewood, Boulder, Fort Collins, and surrounding areas. Find lawn care services near you.",
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
      "Overseeding and reseeding with premium grass varieties suited to Colorado's climate.",
  },
  {
    name: "Fertilization",
    slug: "fertilization" as const,
    shortDescription:
      "Custom fertilization programs to nourish your lawn through every season in Colorado.",
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
    name: "Denver",
    slug: "denver" as const,
    description:
      "Serving the Denver metro area with expert lawn care and turf maintenance services.",
  },
  {
    name: "Colorado Springs",
    slug: "colorado-springs" as const,
    description:
      "Professional turf cleaning and lawn care for Colorado Springs homeowners and businesses.",
  },
  {
    name: "Aurora",
    slug: "aurora" as const,
    description:
      "Reliable lawn care services in Aurora, CO — from aeration to seasonal maintenance.",
  },
  {
    name: "Lakewood",
    slug: "lakewood" as const,
    description:
      "Trusted lawn care professionals serving Lakewood and the western Denver suburbs.",
  },
  {
    name: "Boulder",
    slug: "boulder" as const,
    description:
      "Eco-friendly lawn care and turf services for Boulder residents and businesses.",
  },
  {
    name: "Fort Collins",
    slug: "fort-collins" as const,
    description:
      "Full-service lawn care in Fort Collins — keeping Northern Colorado lawns healthy year-round.",
  },
];

export const locationMetadata: Record<string, ReturnType<typeof generateLocationMetadata>> = {};
for (const location of locations) {
  locationMetadata[location.slug] = generateLocationMetadata(location);
}
