import type { SEOMetadata } from '../types';
import { locations } from './locations';

export const seoMetadata: Record<string, SEOMetadata> = {
  home: {
    title: "Murphy's Turf | Professional Artificial Turf Cleaning California",
    description: "Artificial turf cleaning, debris removal, grooming, and odor treatment. Serving Huntington Beach, Murrieta, Bay Area, Sacramento & Palm Desert. Get a free quote today.",
    keywords: ["artificial turf cleaning", "synthetic turf cleaning California", "turf sanitization", "pet turf cleaning", "professional turf cleaning", "Murphy's Turf", "turf odor removal", "California turf cleaning"],
  },
  contact: {
    title: "Contact Murphy's Turf | Free Artificial Turf Cleaning Quote",
    description: "Contact Murphy's Turf for a free artificial turf cleaning estimate. Serving Huntington Beach, Murrieta, Martinez, Sacramento, and Palm Desert. Get a free quote today.",
    keywords: ["contact Murphy's Turf", "free turf cleaning quote", "artificial turf cleaning estimate", "schedule turf cleaning"],
  },
  services: {
    title: "Artificial Turf Cleaning Services | Murphy's Turf",
    description: "Professional artificial turf cleaning services: pet hair & debris removal, blooming & decompacting, disinfect & deodorize, poop scooping, and our signature deep cleaning treatment. Request a free quote.",
    keywords: ["artificial turf cleaning services", "professional turf cleaning", "turf sanitization", "pet odor removal turf", "turf blooming decompacting", "poop scooping turf"],
  },
  "services/pet-hair-debris": {
    title: "Pet Hair & Debris Removal from Artificial Turf | Murphy's Turf",
    description: "Professional pet hair and debris removal from artificial turf. Thorough cleaning using professional-grade equipment to remove embedded dirt, leaves, and pet hair. Get a free quote today.",
    keywords: ["pet hair removal artificial turf", "debris removal synthetic turf", "turf cleaning pet hair", "artificial grass debris cleanup", "professional turf cleaning California"],
  },
  "services/blooming-decompacting": {
    title: "Turf Blooming & Decompacting Services | Murphy's Turf",
    description: "Turf blooming and de-compacting for matted artificial grass. Discuss the surface condition, infill, and a suitable grooming plan. Request a free quote.",
    keywords: ["turf blooming", "turf decompacting", "artificial turf restoration", "matted turf fibers", "infill decompacting", "synthetic turf rejuvenation"],
  },
  "services/disinfect-deodorize": {
    title: "Artificial Turf Disinfecting & Deodorizing | Murphy's Turf",
    description: "Artificial turf odor treatment and cleaning with a scope suited to your surface. Ask about products, application, and return-to-use instructions.",
    keywords: ["turf disinfecting", "turf deodorizing", "artificial turf sanitization", "synthetic grass odor removal", "antibacterial turf treatment", "safe turf cleaning pets kids"],
  },
  "services/poop-scooping": {
    title: "Poop Scooping Service for Artificial Turf | Murphy's Turf",
    description: "Regular poop scooping service for artificial turf. Request pickup for the agreed areas and discuss any additional cleaning. Serving California.",
    keywords: ["poop scooping artificial turf", "pet waste removal turf", "dog poop cleanup synthetic grass", "turf poop scooping service", "pet waste turf sanitization"],
  },
  locations: {
    title: "Service Areas | Artificial Turf Cleaning Across California | Murphy's Turf",
    description: "Murphy's Turf serves Huntington Beach, Murrieta, Martinez/Bay Area, Sacramento, and Palm Desert. Professional artificial turf cleaning with a property-specific service scope. Get a free quote today.",
    keywords: ["California artificial turf cleaning", "Huntington Beach turf cleaning", "Murrieta turf cleaning", "Bay Area turf cleaning", "Sacramento turf cleaning", "Inland Empire turf cleaning"],
  },
  ...Object.fromEntries(locations.map((location) => [`locations/${location.slug}`, {
    title: location.metaTitle,
    description: location.metaDescription,
    keywords: [`artificial turf cleaning ${location.name}`, 'pet turf cleaning', 'turf odor removal'],
  }])),
  blog: {
    title: "Artificial Turf Cleaning Blog | Tips & Guides | Murphy's Turf",
    description: "Expert artificial turf cleaning tips, guides, and maintenance advice from Murphy's Turf. Learn about turf sanitization, pet odor removal, and keeping synthetic grass clean.",
    keywords: ["artificial turf cleaning blog", "synthetic turf maintenance tips", "turf cleaning guide", "turf cleaning advice", "pet turf care", "Murphy's Turf blog"],
  },
  privacy: {
    title: "Privacy Policy | Murphy's Turf",
    description: "Read the Murphy's Turf privacy policy. Learn how we collect, use, and protect your personal information when you use our artificial turf cleaning services and website.",
    keywords: ["Murphy's Turf privacy policy", "turf cleaning privacy", "data protection"],
  },
  terms: {
    title: "Terms of Service | Murphy's Turf",
    description: "Review Murphy's Turf terms of service for our professional artificial turf cleaning and sanitization services in California.",
    keywords: ["Murphy's Turf terms of service", "turf cleaning terms", "service agreement"],
  },
};
