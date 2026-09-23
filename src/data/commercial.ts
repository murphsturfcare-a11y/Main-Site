import { locations } from './locations';
import { regionalCare } from './regional-care';

// ---------------------------------------------------------------------------
// Commercial Turf Cleaning — data layer
//
// Regions + neighborhoods are derived from locations.ts (single source of
// truth). Commercial-specific copy lives here. Sub-location slugs mirror the
// residential pattern but with a `commercial-` prefix so the two trees never
// collide.
// ---------------------------------------------------------------------------

export const COMMERCIAL_BASE_PATH = 'commercial-turf-cleaning';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function toCommercialSubSlug(name: string): string {
  return `commercial-turf-cleaning-in-${slugify(name)}`;
}

// ---------------------------------------------------------------------------
// Segments — weighted toward smaller accounts (the ones who actually search),
// but covering the full commercial spectrum.
// ---------------------------------------------------------------------------

export interface CommercialSegment {
  slug: string;
  name: string;
  iconName: string;
  blurb: string;
  painPoints: string[];
}

export const commercialSegments: CommercialSegment[] = [
  {
    "slug": "dog-daycare",
    "name": "Dog Daycares, Boarding & Kennels",
    "iconName": "PawPrint",
    "blurb": "Plan turf care around daily pet use, routine staff pickup, and the time needed to close and reopen the play area.",
    "painPoints": [
      "Concentrated pet use and recurring odor",
      "Work zones that need an alternate pet area",
      "Clear product and reopening instructions"
    ]
  },
  {
    "slug": "hoa-property-management",
    "name": "HOAs & Property Management",
    "iconName": "Building2",
    "blurb": "Separate association common areas from private yards and request a defined maintenance scope for each synthetic surface.",
    "painPoints": [
      "Unclear responsibility for shared turf",
      "Resident reports of odor, debris, or matting",
      "Board approval, access, and invoicing requirements"
    ]
  },
  {
    "slug": "schools-childcare",
    "name": "Schools, Preschools & Playgrounds",
    "iconName": "GraduationCap",
    "blurb": "Identify the installed play surface, its care requirements, and the facility schedule before selecting a cleaning plan.",
    "painPoints": [
      "Play-surface manufacturer requirements",
      "Area closure and supervised reopening",
      "Cleaning records and facility-specific procedures"
    ]
  },
  {
    "slug": "gyms-hospitality-sports",
    "name": "Gyms, Hotels, Sports & Event Venues",
    "iconName": "Dumbbell",
    "blurb": "Distinguish fitness, recreation, and landscape turf, then coordinate equipment access and cleaning with your operating hours.",
    "painPoints": [
      "Different synthetic surface specifications",
      "Guest or member circulation around the work area",
      "Traffic wear that may need a repair assessment"
    ]
  }
];

// ---------------------------------------------------------------------------
// Overview content (powers the /commercial-turf-cleaning hub page)
// ---------------------------------------------------------------------------

export const commercialOverview = {
  "tagline": "Artificial turf cleaning and maintenance planning for commercial properties.",
  "descriptionParagraphs": [
    "Murphy's Turf accepts commercial artificial turf cleaning requests across its California service areas. A useful quote identifies each synthetic surface, its size and condition, how it is used, and the work you want included. Separate pet areas, decorative landscaping, and specialty play or fitness surfaces so each can be assessed appropriately.",
    "Before scheduling, provide the property address, an approving contact, vendor access instructions, water availability, and the operating window. Describe recurring odor, debris, matting, or standing water as separate concerns. Cleaning and grooming do not establish regulatory compliance or repair a failed base, damaged seams, or permanently worn fibers.",
    "Discuss the proposed products and surface compatibility before treatment, then agree who will close the area and confirm reopening according to the actual instructions. For recurring service, request the current scheduling, billing, change, and cancellation terms."
  ],
  "whatIncludes": [
    "Turf area, use, and condition review",
    "Debris and pet-use concerns identified by zone",
    "Cleaning or grooming scope suited to the surface",
    "Treatment and reopening instructions",
    "Access and operating-window coordination",
    "Recurring-service terms confirmed in the quote"
  ],
  "benefits": [
    {
      "iconName": "ShieldCheck",
      "title": "Defined Scope",
      "description": "Confirm the areas, work, and approval contact before service."
    },
    {
      "iconName": "PawPrint",
      "title": "Pet-Area Planning",
      "description": "Coordinate routine pickup, treatment access, and reopening instructions."
    },
    {
      "iconName": "CalendarClock",
      "title": "Scheduling Discussion",
      "description": "Share the operating hours and available work windows."
    },
    {
      "iconName": "FileText",
      "title": "Property Requirements",
      "description": "Request current documentation and service terms during vendor review."
    }
  ],
  "faqs": [
    {
      "question": "Can I request recurring commercial maintenance?",
      "answer": "Yes. Provide the turf areas, traffic and pet use, current condition, and preferred work windows. Confirm frequency, included services, pricing, and agreement terms in the quote."
    },
    {
      "question": "Can cleaning take place outside business hours?",
      "answer": "Share your operating hours and any permitted vendor windows. The team will confirm appointment availability and the time needed for the work and product-specific reopening instructions."
    },
    {
      "question": "What documentation should a property manager request?",
      "answer": "Tell the team which current insurance, licensing, vendor, product, or invoicing documents your property requires. Review the actual documents and agreed scope before approving work."
    },
    {
      "question": "When can children, pets, or guests use the area again?",
      "answer": "Keep the area closed during treatment and follow the product-specific instructions for application, rinsing, drying, and reopening. Ask who will communicate and confirm those steps at your facility."
    },
    {
      "question": "Does a cleaning visit cover damaged turf?",
      "answer": "Cleaning and grooming can address some surface conditions. Loose seams, backing damage, an uneven base, or drainage faults may require a separate repair assessment. Include photos of those concerns in the request."
    }
  ]
};

// ---------------------------------------------------------------------------
// Per-region commercial framing (differentiates the ~56 city pages so they
// don't read as templated duplicates). Climate notes mirror the residential
// language; commercial intros add a B2B angle.
// ---------------------------------------------------------------------------

interface RegionMeta {
  phone: string;
  formId: string;
  climateNote: string;
  commercialIntro: string;
}

const regionMeta: Record<string, RegionMeta> = Object.fromEntries(locations.map((loc) => [loc.slug, { phone: loc.phone, formId: '', climateNote: regionalCare[loc.slug]?.climate ?? 'Discuss desert debris, access, and the condition of the installed turf.', commercialIntro: regionalCare[loc.slug]?.commercial ?? 'Commercial artificial turf care for Palm Desert and nearby city properties. Request a scope based on your surfaces, operating hours, and access requirements.' }]));

// ---------------------------------------------------------------------------
// Derived region + sub-location structures
// ---------------------------------------------------------------------------

export interface CommercialSubLocation {
  name: string;
  slug: string;
}

export interface CommercialRegion {
  slug: string;
  region: string; // e.g. "Orange County / LA Area"
  city: string; // primary city, e.g. "Huntington Beach"
  state: string;
  phone: string;
  email: string;
  formId: string;
  climateNote: string;
  commercialIntro: string;
  serviceAreaDescription: string;
  subLocations: CommercialSubLocation[];
}

const EMAIL = 'murphsturfcare@gmail.com';

export const commercialRegions: CommercialRegion[] = locations.map((loc) => {
  const meta = regionMeta[loc.slug];
  const primaryCity = loc.neighborhoods[0] ?? loc.name;
  const subLocations = loc.neighborhoods
    .filter((n) => slugify(n) !== loc.slug)
    .map((n) => ({ name: n, slug: toCommercialSubSlug(n) }));

  return {
    slug: loc.slug,
    region: loc.name,
    city: primaryCity,
    state: loc.state,
    phone: meta?.phone ?? loc.phone,
    email: EMAIL,
    formId: meta?.formId ?? '',
    climateNote: meta?.climateNote ?? '',
    commercialIntro: meta?.commercialIntro ?? '',
    serviceAreaDescription: loc.serviceAreaDescription,
    subLocations,
  };
});

export function findCommercialRegion(slug: string): CommercialRegion | null {
  return commercialRegions.find((r) => r.slug === slug) ?? null;
}

export function findCommercialSubLocation(
  regionSlug: string,
  subSlug: string,
): { region: CommercialRegion; sub: CommercialSubLocation } | null {
  const region = findCommercialRegion(regionSlug);
  if (!region) return null;
  const sub = region.subLocations.find((s) => s.slug === subSlug);
  if (!sub) return null;
  return { region, sub };
}

// All [location, subLocation] slug pairs — used by generateStaticParams + sitemap.
// Keys match the dynamic route segments [location]/[subLocation] exactly.
export function commercialSubLocationParams(): {
  location: string;
  subLocation: string;
}[] {
  return commercialRegions.flatMap((region) =>
    region.subLocations.map((sub) => ({
      location: region.slug,
      subLocation: sub.slug,
    })),
  );
}
