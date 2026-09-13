import type { NavItem, NavGroup } from '../types';
import { locations } from './locations';

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Commercial", href: "/commercial-turf-cleaning" },
  { label: "Locations", href: "/locations" },
  { label: "Contact", href: "/locations" },
  { label: "Blog", href: "/blog" },
];

export const footerNav: NavGroup[] = [
  {
    title: "Services",
    links: [
      { label: "Pet Hair & Debris Removal", href: "/services/pet-hair-debris" },
      { label: "Blooming & De-Compacting", href: "/services/blooming-decompacting" },
      { label: "Disinfect & Deodorize", href: "/services/disinfect-deodorize" },
      { label: "Poop Scooping & Removal", href: "/services/poop-scooping" },
      { label: "Commercial Turf Cleaning", href: "/commercial-turf-cleaning" },
    ],
  },
  {
    title: "Locations",
    links: locations.map(location => ({ label: location.name, href: `/locations/${location.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/locations" },
      { label: "Blog", href: "/blog" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

export const ctaText = "Get a Quote";
export const ctaHref = "/locations";
