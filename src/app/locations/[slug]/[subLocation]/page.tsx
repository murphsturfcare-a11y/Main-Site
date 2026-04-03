import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  ArrowRight,
  Star,
  ChevronRight,
  CheckCircle,
  Droplets,
  ShieldCheck,
  PawPrint,
  Clock,
  Award,
} from 'lucide-react';
import { notFound } from 'next/navigation';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SubLocationInfo {
  name: string;
  slug: string;
}

interface ParentLocation {
  city: string;
  slug: string;
  state: string;
  phone: string;
  email: string;
  formId: string;
  subLocations: SubLocationInfo[];
  climateNote: string;
  serviceAreaDescription: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function toSubLocationSlug(name: string): string {
  return `turf-cleaning-in-${slugify(name)}`;
}

// ---------------------------------------------------------------------------
// Parent location data with sub-locations
// ---------------------------------------------------------------------------

const parentLocations: Record<string, ParentLocation> = {
  'huntington-beach': {
    city: 'Huntington Beach',
    slug: 'huntington-beach',
    state: 'CA',
    phone: '(951) 331-3300',
    email: 'info@murphysturf.com',
    formId: 'HYkmRFcmdQ1GD7aEpXzq',
    climateNote:
      'Coastal fog and marine layer promote mold growth on turf, while afternoon sun bakes pet contaminants into infill.',
    serviceAreaDescription:
      'Serving the LA coastal corridor and Orange County — from Long Beach and Seal Beach through Huntington Beach, Newport Beach, Costa Mesa, Irvine, Fountain Valley, Laguna Beach, Dana Point, San Clemente, and Anaheim.',
    subLocations: [
      { name: 'Newport Beach', slug: toSubLocationSlug('Newport Beach') },
      { name: 'Costa Mesa', slug: toSubLocationSlug('Costa Mesa') },
      { name: 'Long Beach', slug: toSubLocationSlug('Long Beach') },
      { name: 'Seal Beach', slug: toSubLocationSlug('Seal Beach') },
      { name: 'Irvine', slug: toSubLocationSlug('Irvine') },
      { name: 'Fountain Valley', slug: toSubLocationSlug('Fountain Valley') },
      { name: 'Garden Grove', slug: toSubLocationSlug('Garden Grove') },
      { name: 'Westminster', slug: toSubLocationSlug('Westminster') },
      { name: 'Laguna Beach', slug: toSubLocationSlug('Laguna Beach') },
      { name: 'Dana Point', slug: toSubLocationSlug('Dana Point') },
      { name: 'San Clemente', slug: toSubLocationSlug('San Clemente') },
      { name: 'Anaheim', slug: toSubLocationSlug('Anaheim') },
    ],
  },
  murrieta: {
    city: 'Murrieta',
    slug: 'murrieta',
    state: 'CA',
    phone: '(951) 331-3300',
    email: 'info@murphysturf.com',
    formId: 'xBvd9OY1s3jhTIKq93sM',
    climateNote:
      'Summer temperatures regularly exceed 100°F in the Inland Empire, baking pet waste into infill and accelerating bacterial growth.',
    serviceAreaDescription:
      'Serving the entire Inland Empire from Temecula and French Valley through Menifee, Lake Elsinore, Hemet, Perris, Wildomar, Canyon Lake, Winchester, Corona, Riverside, Moreno Valley, Eastvale, and Fallbrook.',
    subLocations: [
      { name: 'Temecula', slug: toSubLocationSlug('Temecula') },
      { name: 'French Valley', slug: toSubLocationSlug('French Valley') },
      { name: 'Menifee', slug: toSubLocationSlug('Menifee') },
      { name: 'Lake Elsinore', slug: toSubLocationSlug('Lake Elsinore') },
      { name: 'Hemet', slug: toSubLocationSlug('Hemet') },
      { name: 'Perris', slug: toSubLocationSlug('Perris') },
      { name: 'Wildomar', slug: toSubLocationSlug('Wildomar') },
      { name: 'Canyon Lake', slug: toSubLocationSlug('Canyon Lake') },
      { name: 'Temescal Valley', slug: toSubLocationSlug('Temescal Valley') },
      { name: 'Winchester', slug: toSubLocationSlug('Winchester') },
      { name: 'Corona', slug: toSubLocationSlug('Corona') },
      { name: 'Riverside', slug: toSubLocationSlug('Riverside') },
      { name: 'Moreno Valley', slug: toSubLocationSlug('Moreno Valley') },
      { name: 'San Jacinto', slug: toSubLocationSlug('San Jacinto') },
      { name: 'Beaumont', slug: toSubLocationSlug('Beaumont') },
      { name: 'Eastvale', slug: toSubLocationSlug('Eastvale') },
      { name: 'Norco', slug: toSubLocationSlug('Norco') },
      { name: 'Fallbrook', slug: toSubLocationSlug('Fallbrook') },
    ],
  },
  martinez: {
    city: 'Martinez',
    slug: 'martinez',
    state: 'CA',
    phone: '(925) 338-0048',
    email: 'info@murphysturf.com',
    formId: 'mSr8BxMIMWFW5iSStd5F',
    climateNote:
      'Bay Area microclimates range from damp coastal fog near the Carquinez Strait to hot, dry conditions inland — each creating different turf maintenance challenges.',
    serviceAreaDescription:
      'Serving Contra Costa County and the Tri-Valley — from Martinez through Concord, Pleasant Hill, Walnut Creek, Antioch, Brentwood, Lafayette, Danville, San Ramon, Dublin, Livermore, and Pleasanton.',
    subLocations: [
      { name: 'Concord', slug: toSubLocationSlug('Concord') },
      { name: 'Pleasant Hill', slug: toSubLocationSlug('Pleasant Hill') },
      { name: 'Walnut Creek', slug: toSubLocationSlug('Walnut Creek') },
      { name: 'Antioch', slug: toSubLocationSlug('Antioch') },
      { name: 'Brentwood', slug: toSubLocationSlug('Brentwood') },
      { name: 'Lafayette', slug: toSubLocationSlug('Lafayette') },
      { name: 'Danville', slug: toSubLocationSlug('Danville') },
      { name: 'San Ramon', slug: toSubLocationSlug('San Ramon') },
      { name: 'Dublin', slug: toSubLocationSlug('Dublin') },
      { name: 'Livermore', slug: toSubLocationSlug('Livermore') },
      { name: 'Pleasanton', slug: toSubLocationSlug('Pleasanton') },
      { name: 'Orinda', slug: toSubLocationSlug('Orinda') },
      { name: 'Alamo', slug: toSubLocationSlug('Alamo') },
      { name: 'Oakley', slug: toSubLocationSlug('Oakley') },
    ],
  },
  sacramento: {
    city: 'Sacramento',
    slug: 'sacramento',
    state: 'CA',
    phone: '(916) 432-5033',
    email: 'info@murphysturf.com',
    formId: 'oM5QyTGbZdvGpxU0EvUL',
    climateNote:
      'Sacramento\'s Central Valley heat regularly exceeds 100°F, baking pet waste into turf and accelerating bacterial growth far beyond what milder climates produce.',
    serviceAreaDescription:
      'Serving the entire Sacramento metropolitan area, including Elk Grove, Roseville, Folsom, Rancho Cordova, Citrus Heights, West Sacramento, Carmichael, Fair Oaks, Rocklin, Granite Bay, and Orangevale.',
    subLocations: [
      { name: 'Elk Grove', slug: toSubLocationSlug('Elk Grove') },
      { name: 'Roseville', slug: toSubLocationSlug('Roseville') },
      { name: 'Folsom', slug: toSubLocationSlug('Folsom') },
      { name: 'Rancho Cordova', slug: toSubLocationSlug('Rancho Cordova') },
      { name: 'Citrus Heights', slug: toSubLocationSlug('Citrus Heights') },
      { name: 'West Sacramento', slug: toSubLocationSlug('West Sacramento') },
      { name: 'Carmichael', slug: toSubLocationSlug('Carmichael') },
      { name: 'Fair Oaks', slug: toSubLocationSlug('Fair Oaks') },
      { name: 'Rocklin', slug: toSubLocationSlug('Rocklin') },
      { name: 'Granite Bay', slug: toSubLocationSlug('Granite Bay') },
      { name: 'Natomas', slug: toSubLocationSlug('Natomas') },
      { name: 'Orangevale', slug: toSubLocationSlug('Orangevale') },
    ],
  },
};

// ---------------------------------------------------------------------------
// Services data (shared with parent page)
// ---------------------------------------------------------------------------

const services = [
  {
    name: 'Pet Hair & Debris Removal',
    slug: 'pet-hair-debris',
    image: '/images/gallery/service-pet-hair-debris.jpeg',
    shortDescription:
      'Commercial-grade extraction of pet hair, leaves, dirt, and embedded debris from turf fibers and infill.',
  },
  {
    name: 'Blooming & De-Compacting',
    slug: 'blooming-decompacting',
    image: '/images/gallery/service-turf-blooming-v2.png',
    shortDescription:
      'Restore flattened fibers and break up compacted infill for better drainage and appearance.',
  },
  {
    name: 'Disinfect & Deodorize',
    slug: 'disinfect-deodorize',
    image: '/images/gallery/service-turf-disinfecting-v2.jpeg',
    shortDescription:
      'Professional-grade disinfecting that eliminates bacteria, pet odors, mold, and mildew at their source.',
  },
  {
    name: 'Poop Scooping & Removal',
    slug: 'poop-scooping',
    image: '/images/gallery/service-turf-deodorizing.png',
    shortDescription:
      'Scheduled weekly or bi-weekly pet waste removal to keep your turf clean and hygienic.',
  },
];

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

const faqs = [
  {
    question: 'How often should artificial turf be cleaned?',
    answer:
      'We recommend professional cleaning every 4-6 weeks for homes with pets. For turf without pets, a quarterly deep clean is usually sufficient.',
  },
  {
    question: 'Are your cleaning products safe for pets and kids?',
    answer:
      'Absolutely. Our cleaning solution is chlorine-based with no bleach or ammonia. It leaves no harmful residue, making it safe for pets, children, and the environment.',
  },
  {
    question: 'What does your turf cleaning process include?',
    answer:
      'Our process includes pet hair and debris removal, de-weeding, magnet sweep for metal objects, blooming and de-compacting, and a full disinfect and deodorize treatment.',
  },
  {
    question: 'How long does a cleaning take?',
    answer:
      'Most residential cleanings take 45 minutes to 1.5 hours depending on size and services included. Your turf is safe to use as soon as it dries, usually 1-2 hours.',
  },
  {
    question: 'Do you offer maintenance plans?',
    answer:
      'Yes, we offer weekly, bi-weekly, monthly, and quarterly maintenance plans. Regular plans keep costs predictable and your turf clean year-round.',
  },
];

// ---------------------------------------------------------------------------
// Process steps
// ---------------------------------------------------------------------------

const processSteps = [
  {
    image: '/images/gallery/process-contact-us.png',
    title: 'Contact Us',
    description: 'Get a free quote online or call us directly. We respond the same day.',
  },
  {
    image: '/images/gallery/process-schedule-estimate.png',
    title: 'Schedule Your Estimate',
    description: 'We visit your property, assess the turf, and provide a detailed estimate.',
  },
  {
    image: '/images/gallery/process-get-job-done.png',
    title: 'Get The Job Done',
    description: 'Our crew performs a full deep clean. Enjoy your fresh, clean turf the same day.',
  },
];

// ---------------------------------------------------------------------------
// Trust badges
// ---------------------------------------------------------------------------

const trustBadges = [
  { icon: ShieldCheck, title: 'Fully Bonded & Insured', description: 'Licensed professionals you can trust' },
  { icon: PawPrint, title: '100% Pet-Safe Products', description: 'No bleach, no ammonia — safe for pets & kids' },
  { icon: Clock, title: '30+ Years Experience', description: 'Decades of professional cleaning expertise' },
  { icon: Award, title: 'Satisfaction Guaranteed', description: "Not happy? We'll make it right" },
];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

function findSubLocation(
  parentSlug: string,
  subSlug: string,
): { parent: ParentLocation; sub: SubLocationInfo } | null {
  const parent = parentLocations[parentSlug];
  if (!parent) return null;
  const sub = parent.subLocations.find((s) => s.slug === subSlug);
  if (!sub) return null;
  return { parent, sub };
}

// ---------------------------------------------------------------------------
// Static params & metadata
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  const params: { slug: string; subLocation: string }[] = [];
  for (const [parentSlug, parent] of Object.entries(parentLocations)) {
    for (const sub of parent.subLocations) {
      params.push({ slug: parentSlug, subLocation: sub.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subLocation: string }>;
}): Promise<Metadata> {
  const { slug, subLocation } = await params;
  const result = findSubLocation(slug, subLocation);
  if (!result) {
    return { title: 'Location Not Found' };
  }
  const { parent, sub } = result;

  const title = `Artificial Turf Cleaning in ${sub.name}, CA | Murphy's Turf`;
  const description = `Professional artificial turf cleaning in ${sub.name}, California. Pet-safe disinfecting, deodorizing, blooming & debris removal. 30+ years experience serving ${sub.name} and the ${parent.city} area. Call ${parent.phone} for a free quote.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://murphysturf.com/locations/${parent.slug}/${sub.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://murphysturf.com/locations/${parent.slug}/${sub.slug}`,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: `Murphy's Turf - ${sub.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.png'],
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function SubLocationPage({
  params,
}: {
  params: Promise<{ slug: string; subLocation: string }>;
}) {
  const { slug, subLocation } = await params;
  const result = findSubLocation(slug, subLocation);

  if (!result) {
    notFound();
  }

  const { parent, sub } = result;
  const siblings = parent.subLocations.filter((s) => s.slug !== sub.slug);

  // Schema.org LocalBusiness JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: "Murphy's Turf",
    description: `Professional artificial turf cleaning in ${sub.name}, CA. Pet-safe disinfecting, deodorizing, and turf restoration.`,
    telephone: parent.phone,
    email: parent.email,
    url: `https://murphysturf.com/locations/${parent.slug}/${sub.slug}`,
    areaServed: {
      '@type': 'City',
      name: sub.name,
      containedInPlace: {
        '@type': 'State',
        name: 'California',
      },
    },
    serviceType: [
      'Artificial Turf Cleaning',
      'Turf Disinfecting',
      'Turf Deodorizing',
      'Pet Hair Removal',
      'Turf Blooming',
    ],
  };

  // Schema.org BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://murphysturf.com/' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://murphysturf.com/locations' },
      { '@type': 'ListItem', position: 3, name: `${parent.city}, ${parent.state}`, item: `https://murphysturf.com/locations/${parent.slug}` },
      { '@type': 'ListItem', position: 4, name: sub.name },
    ],
  };

  return (
    <div className="scroll-smooth pb-20 lg:pb-0">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ================================================================
          1. HERO
          ================================================================ */}
      <section id="quote-form" className="relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/about-turf-cleaning.png"
            alt={`Professional artificial turf cleaning in ${sub.name}, California`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-forest/85" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-sm font-body mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/locations" className="hover:text-white transition-colors">
              Locations
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href={`/locations/${parent.slug}`}
              className="hover:text-white transition-colors"
            >
              {parent.city}, {parent.state}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{sub.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: headline + phone */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-4 leading-tight">
                Professional Artificial Turf Cleaning
                <br />
                <span className="text-cream">
                  in {sub.name}, CA
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 font-body mb-8">
                Expert turf cleaning, disinfecting &amp; maintenance for {sub.name} homes and businesses.
              </p>
              <a
                href={`tel:${parent.phone.replace(/[^\d+]/g, '')}`}
                className="inline-flex items-center gap-3 bg-white text-forest font-bold text-lg px-8 py-4 rounded-xl hover:bg-cream transition-colors font-body shadow-lg"
              >
                <Phone className="w-5 h-5" />
                {parent.phone}
              </a>
            </div>

            {/* Right: Lead form */}
            <div className="w-full">
              <div className="bg-white rounded-2xl shadow-2xl p-2 sm:p-3">
                <iframe
                  src={`https://api.leadconnectorhq.com/widget/form/${parent.formId}`}
                  style={{
                    width: '100%',
                    border: 'none',
                    borderRadius: '12px',
                  }}
                  scrolling="no"
                  className="min-h-[500px]"
                  title={`Get a Free Quote - ${sub.name}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. ABOUT / INTRO — SEO content
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-6">
            Why {sub.name}{' '}Homeowners Choose Murphy&apos;s Turf
          </h2>
          <div className="space-y-4 text-charcoal-light font-body leading-relaxed">
            <p>
              If you have artificial turf in {sub.name}, California, you know that it needs regular
              maintenance to stay clean, fresh, and safe for your family and pets. Murphy&apos;s Turf
              provides professional artificial grass cleaning services throughout {sub.name} and the
              greater {parent.city} area.
            </p>
            <p>
              Our comprehensive turf cleaning process includes pet hair and debris extraction, turf
              blooming and de-compacting, and a full disinfect and deodorize treatment using our
              chlorine-based cleaning solution — no bleach, no harsh chemicals, completely
              safe for pets and children.
            </p>
            <p>
              With 30+ years of professional cleaning experience, Murphy&apos;s Turf understands the
              specific challenges that {sub.name}&apos;s climate creates for artificial turf owners.{' '}
              {parent.climateNote}
            </p>
          </div>

          {/* Climate note */}
          <div className="bg-sage/10 rounded-xl p-4 border border-sage/20 mt-8">
            <div className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-charcoal font-heading mb-1">
                  Local Climate Considerations
                </h4>
                <p className="text-charcoal-light font-body text-sm leading-relaxed">
                  {parent.climateNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          2b. TRUST BADGES
          ================================================================ */}
      <section className="py-10 sm:py-14 bg-white border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <badge.icon className="w-6 h-6 text-sage" />
                </div>
                <h3 className="font-heading font-bold text-charcoal text-sm">{badge.title}</h3>
                <p className="text-charcoal-light font-body text-xs">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          3. SERVICES
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-4">
              Our Turf Cleaning Services in {sub.name}
            </h2>
            <p className="text-lg text-charcoal-light font-body max-w-2xl mx-auto">
              Professional turf care tailored to {sub.name}&apos;s specific needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-cream rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.name} in ${sub.name}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-charcoal font-heading text-lg mb-2">
                    {service.name}
                  </h3>
                  <p className="text-charcoal-light font-body text-sm leading-relaxed mb-3">
                    {service.shortDescription}
                  </p>
                  <span className="text-sage font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          3b. HOW IT WORKS — process steps
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-4">
              How It Works in {sub.name}
            </h2>
            <p className="text-lg text-charcoal-light font-body max-w-2xl mx-auto">
              Getting your turf professionally cleaned is simple. Here&apos;s our 3-step process.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={step.title} className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 shadow-lg">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-sage text-white font-bold text-sm flex items-center justify-center mb-3">
                  {idx + 1}
                </div>
                <h3 className="font-heading font-bold text-charcoal text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-charcoal-light font-body text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          4. CTA BANNER
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-forest">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mb-4">
            Ready for Clean Turf in {sub.name}?
          </h2>
          <p className="text-lg text-white/80 font-body mb-8 max-w-2xl mx-auto">
            Get a free quote for professional artificial turf cleaning. We serve {sub.name} and all
            of the {parent.city} area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${parent.phone.replace(/[^\d+]/g, '')}`}
              className="inline-flex items-center justify-center gap-3 bg-white text-forest font-bold text-lg px-8 py-4 rounded-xl hover:bg-cream transition-colors font-body shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Call {parent.phone}
            </a>
            <a
              href="#quote-form"
              className="inline-flex items-center justify-center gap-2 bg-sage text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-sage/90 transition-colors font-body shadow-lg"
            >
              Get Free Quote <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          5. FAQ
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-8 text-center">
            Turf Cleaning FAQs — {sub.name}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-cream rounded-xl border border-charcoal/10"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-heading font-bold text-charcoal">
                  {faq.question}
                  <ChevronRight className="w-5 h-5 text-charcoal-light transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-4 text-charcoal-light font-body leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          6. OTHER AREAS WE SERVE — internal linking
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-6 text-center">
            Other Areas We Serve Near {sub.name}
          </h2>
          <p className="text-charcoal-light font-body text-center mb-8">
            {parent.serviceAreaDescription}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Link to parent city */}
            <Link
              href={`/locations/${parent.slug}`}
              className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
              <span className="text-charcoal font-body text-sm font-medium">
                {parent.city}
              </span>
            </Link>
            {/* Sibling sub-locations */}
            {siblings.map((sibling) => (
              <Link
                key={sibling.slug}
                href={`/locations/${parent.slug}/${sibling.slug}`}
                className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                <span className="text-charcoal font-body text-sm font-medium">
                  {sibling.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
