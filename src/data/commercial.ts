import { locations } from './locations';

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
    slug: 'dog-daycare',
    name: 'Dog Daycares, Boarding & Kennels',
    iconName: 'PawPrint',
    blurb:
      'Pet facilities put more wear and waste on turf in a week than a backyard sees in a year. We keep play yards sanitized, odor-free, and safe for every dog that comes through your doors.',
    painPoints: [
      'Constant urine saturation and baked-in odor',
      'Bacteria and parasite risk in high-density play areas',
      'Owners and inspectors who notice smell the moment they walk in',
    ],
  },
  {
    slug: 'hoa-property-management',
    name: 'HOAs & Property Management',
    iconName: 'Building2',
    blurb:
      'Common-area turf, dog runs, and entry landscaping reflect on the whole community. We keep multi-family and HOA grounds presentable with predictable, invoice-friendly recurring service.',
    painPoints: [
      'Shared dog areas with no single owner maintaining them',
      'Resident complaints about odor and matted, dirty turf',
      'Board budgets that need predictable, documented costs',
    ],
  },
  {
    slug: 'schools-childcare',
    name: 'Schools, Preschools & Playgrounds',
    iconName: 'GraduationCap',
    blurb:
      'Where kids crawl, sit, and play, sanitization is not optional. Our pet-safe, chlorine-based process eliminates bacteria without harsh chemicals — safe for children as soon as it dries.',
    painPoints: [
      'High-traffic play surfaces that trap dirt and germs',
      'Parent and licensing expectations around hygiene',
      'Need for non-toxic, child-safe cleaning products',
    ],
  },
  {
    slug: 'gyms-hospitality-sports',
    name: 'Gyms, Hotels, Sports & Event Venues',
    iconName: 'Dumbbell',
    blurb:
      'Turf gym floors, rooftop lounges, hotel pet areas, and athletic fields take a beating and stay in the public eye. We restore appearance and freshness on a schedule that fits your hours.',
    painPoints: [
      'Sweat, foot traffic, and matting on turf training areas',
      'Guest-facing spaces where appearance is everything',
      'Operations that can only allow after-hours service windows',
    ],
  },
];

// ---------------------------------------------------------------------------
// Overview content (powers the /commercial-turf-cleaning hub page)
// ---------------------------------------------------------------------------

export const commercialOverview = {
  tagline:
    'Recurring, pet-safe artificial turf cleaning for businesses across California.',
  descriptionParagraphs: [
    `Murphy's Turf brings 30+ years of professional artificial turf cleaning to commercial properties across California. From a single dog-daycare play yard to a portfolio of HOA common areas, we deep clean, disinfect, and deodorize synthetic turf so your space stays presentable, hygienic, and odor-free.`,
    `Commercial turf takes far more abuse than a backyard lawn — heavier foot traffic, more pets, and far higher expectations from customers, residents, and inspectors. Our commercial-grade process penetrates past the surface into the infill where bacteria and odor actually live, using a chlorine-based solution that is safe for pets and children once dry.`,
    `We build recurring maintenance plans around your hours and budget, with documented, invoice-friendly service. Whether you run a kennel, manage a community, operate a childcare center, or oversee a gym or hotel, we keep your turf in front-of-house condition year-round.`,
  ],
  whatIncludes: [
    'Pet hair, waste, and debris extraction from fibers and infill',
    'De-weeding and magnet sweep for metal objects',
    'Commercial-grade blooming and de-compacting of high-traffic areas',
    'Full disinfect and deodorize treatment at the infill level',
    'Recurring weekly, bi-weekly, monthly, or quarterly plans',
    'After-hours scheduling and documented, invoice-friendly billing',
  ],
  benefits: [
    {
      iconName: 'ShieldCheck',
      title: 'Bonded & Insured',
      description: 'Licensed, bonded, and insured crews your facility and board can sign off on.',
    },
    {
      iconName: 'PawPrint',
      title: 'Pet- & Child-Safe',
      description: 'Chlorine-based process — no bleach, no ammonia. Safe for pets and kids once dry.',
    },
    {
      iconName: 'CalendarClock',
      title: 'Recurring Plans',
      description: 'Predictable schedules and pricing built around your hours and budget.',
    },
    {
      iconName: 'FileText',
      title: 'Documented Service',
      description: 'Clear invoicing and service records for property managers and boards.',
    },
  ],
  faqs: [
    {
      question: 'Do you offer recurring commercial maintenance contracts?',
      answer:
        'Yes. Most commercial clients are on weekly, bi-weekly, monthly, or quarterly plans. Recurring service keeps costs predictable and turf consistently presentable, and we tailor the frequency to your traffic and pet load.',
    },
    {
      question: 'Can you clean outside of business hours?',
      answer:
        'Absolutely. For gyms, hotels, daycares, and childcare centers we routinely schedule early-morning, evening, or weekend windows so service never disrupts your operations.',
    },
    {
      question: 'Are you bonded and insured for commercial work?',
      answer:
        "Yes — Murphy's Turf is fully bonded and insured. We're happy to provide documentation for property managers, HOA boards, and facility operators.",
    },
    {
      question: 'Is the cleaning safe for facilities with children or pets?',
      answer:
        'Yes. Our chlorine-based cleaning solution contains no bleach or ammonia, leaves no harmful residue, and is safe for children and pets once the turf has dried — typically within 1-2 hours.',
    },
    {
      question: 'How do you handle billing and invoicing for commercial accounts?',
      answer:
        'We provide itemized invoices and service records suited to property managers, boards, and accounts-payable teams, with recurring billing options to match your maintenance plan.',
    },
  ],
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

const regionMeta: Record<string, RegionMeta> = {
  'huntington-beach': {
    phone: '(951) 331-3300',
    formId: 'HYkmRFcmdQ1GD7aEpXzq',
    climateNote:
      'Coastal fog and marine layer promote mold growth on turf, while afternoon sun bakes pet contaminants into infill.',
    commercialIntro:
      'Coastal Orange County businesses — from beachfront hotels and dog daycares to HOA common areas — battle salt air, sand, and humidity that wear turf down fast.',
  },
  murrieta: {
    phone: '(951) 331-3300',
    formId: 'xBvd9OY1s3jhTIKq93sM',
    climateNote:
      'Summer temperatures regularly exceed 100°F in the Inland Empire, baking pet waste into infill and accelerating bacterial growth.',
    commercialIntro:
      'As our Inland Empire home turf, we serve kennels, gyms, childcare centers, and property managers across the IE where triple-digit heat amplifies odor and bacteria.',
  },
  martinez: {
    phone: '(925) 338-0048',
    formId: 'mSr8BxMIMWFW5iSStd5F',
    climateNote:
      'Bay Area microclimates range from damp coastal fog near the Carquinez Strait to hot, dry conditions inland — each creating different turf maintenance challenges.',
    commercialIntro:
      'East Bay and Contra Costa businesses — dog boarding, HOAs, schools, and hospitality venues — face microclimates that swing from coastal damp to inland heat.',
  },
  sacramento: {
    phone: '(916) 432-5033',
    formId: 'oM5QyTGbZdvGpxU0EvUL',
    climateNote:
      "Sacramento's Central Valley heat regularly exceeds 100°F, baking pet waste into turf and accelerating bacterial growth far beyond what milder climates produce.",
    commercialIntro:
      'Greater Sacramento facilities — from Elk Grove daycares to Roseville fitness studios and HOA communities — contend with Central Valley heat that bakes contaminants into turf.',
  },
};

// ---------------------------------------------------------------------------
// Derived region + sub-location structures
// ---------------------------------------------------------------------------

export interface CommercialSubLocation {
  name: string;
  slug: string;
}

export interface CommercialRegion {
  slug: string;
  region: string; // e.g. "Huntington Beach / LA Area"
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

const EMAIL = 'info@murphysturf.com';

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
