import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  Droplets,
  ShieldCheck,
  PawPrint,
  Clock,
  Award,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import LeadForm from '@/components/forms/LeadForm';
import { services as sharedServices } from '@/data/services';
import { homeFaqs } from '@/data/home-faqs';
import { regionalCare, cityCareContext } from '@/data/regional-care';
import PalmDesertAreaPage from '@/components/sections/PalmDesertAreaPage';
import { locations, residentialLocationParams } from '@/data/locations';
import { getPalmDesertArea, palmDesertPageMetadata } from '@/data/palm-desert';
import { generatePageMetadata } from '@/lib/seo/metadata';

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

const parentLocations: Record<string, ParentLocation> = Object.fromEntries(locations.filter((loc) => loc.slug !== 'palm-desert').map((loc) => [loc.slug, { city: loc.neighborhoods[0], slug: loc.slug, state: loc.state, phone: loc.phone, email: 'murphsturfcare@gmail.com', formId: '', climateNote: regionalCare[loc.slug].climate, serviceAreaDescription: loc.serviceAreaDescription, subLocations: loc.neighborhoods.filter((name) => slugify(name) !== loc.slug).map((name) => ({ name, slug: toSubLocationSlug(name) })) }]));

// ---------------------------------------------------------------------------
// Services data (shared with parent page)
// ---------------------------------------------------------------------------

const services = sharedServices;

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

const faqs = homeFaqs;

// ---------------------------------------------------------------------------
// Process steps
// ---------------------------------------------------------------------------

const processSteps = [
  {
    image: '/images/gallery/process-contact-us.png',
    title: 'Contact Us',
    description: 'Get a free quote online or call us directly. Include the property address and requested work.',
  },
  {
    image: '/images/gallery/process-schedule-estimate.png',
    title: 'Get Your Fast Online Quote',
    description: 'Send measurements and photos; we will advise if a site assessment is needed.',
  },
  {
    image: '/images/gallery/process-get-job-done.png',
    title: 'Get The Job Done',
    description: 'Confirm the service scope and follow the treatment instructions before using the turf.',
  },
];

// ---------------------------------------------------------------------------
// Trust badges
// ---------------------------------------------------------------------------

const trustBadges = [{ icon: ShieldCheck, title: 'Clear Work Scope', description: 'Confirm the areas and services included' }, { icon: PawPrint, title: 'Pet-Yard Care', description: 'Plan around pet use and treatment instructions' }, { icon: Clock, title: 'Access Planning', description: 'Share gates, water access, and scheduling needs' }, { icon: Award, title: 'Care Guidance', description: 'Follow the instructions for your turf and treatment' }];

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
  return residentialLocationParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subLocation: string }>;
}): Promise<Metadata> {
  const { slug, subLocation } = await params;
  if (slug === 'palm-desert') {
    const area = getPalmDesertArea(subLocation.replace(/^turf-cleaning-in-/, ''));
    if (!area || area.slug === 'palm-desert' || subLocation !== `turf-cleaning-in-${area.slug}`) return { title: 'Location Not Found' };
    const meta = palmDesertPageMetadata(area);
    return generatePageMetadata(meta.title, meta.description, meta.path);
  }
  const result = findSubLocation(slug, subLocation);
  if (!result) {
    return { title: 'Location Not Found' };
  }
  const { parent, sub } = result;

  const title = `Artificial Turf Cleaning in ${sub.name}, CA | Murphy's Turf`;
  const description = `Artificial turf cleaning in ${sub.name}, CA. Debris removal, grooming, pet odor treatment, and waste pickup. Call ${parent.phone} for a property-specific quote.`;

  return {
    // `title` already includes the brand; use `absolute` so the layout
    // template doesn't append a second " | Murphy's Turf".
    title: { absolute: title },
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
  if (slug === 'palm-desert') {
    const area = getPalmDesertArea(subLocation.replace(/^turf-cleaning-in-/, ''));
    if (!area || area.slug === 'palm-desert' || subLocation !== `turf-cleaning-in-${area.slug}`) notFound();
    return <PalmDesertAreaPage area={area} />;
  }
  const result = findSubLocation(slug, subLocation);

  if (!result) {
    notFound();
  }

  const { parent, sub } = result;
  const careContext = cityCareContext(sub.name);
  const siblings = parent.subLocations.filter((s) => s.slug !== sub.slug);

  // Schema.org Service JSON-LD: city coverage is not a separate business office.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Artificial Turf Cleaning in ${sub.name}`,
    provider: { '@id': 'https://murphysturf.com/#localbusiness' },
    description: `Professional artificial turf cleaning in ${sub.name}, CA. Debris removal, grooming, odor treatment, and waste pickup.`,
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
              <LeadForm locationCity={sub.name} locationSlug={parent.slug} />
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
            Planning Turf Cleaning in {sub.name}
          </h2>
          <div className="space-y-4 text-charcoal-light font-body leading-relaxed">
            <p>Murphy&apos;s Turf accepts cleaning requests in {sub.name} through the {parent.city} service area. Share the turf size, condition, and requested work with your property address to confirm the scope and access details.</p>
            <p>{regionalCare[parent.slug].intro}</p>
            {careContext && <div className="rounded-xl bg-white p-6 border border-sage/15"><h3 className="text-xl font-heading font-bold text-charcoal mb-3">{careContext.title}</h3><p>{careContext.text}</p></div>}
            <p>Choose debris removal, grooming, odor treatment, or waste pickup as appropriate for the surface. Keep people and pets away during treatment and follow the product-specific instructions before returning to the area. Cleaning does not replace repair of damaged seams, backing, or drainage.</p>
          </div>

          {/* Climate note */}
          <div className="bg-sage/10 rounded-xl p-4 border border-sage/20 mt-8">
            <div className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-charcoal font-heading mb-1">
                  Local Climate Considerations
                </h3>
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
              Select the services that fit your property and its condition.
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
                  <span className="text-forest font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
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
                <div className="w-8 h-8 rounded-full bg-sage text-forest-dark font-bold text-sm flex items-center justify-center mb-3">
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
              className="inline-flex items-center justify-center gap-2 bg-sage text-forest-dark font-bold text-lg px-8 py-4 rounded-xl hover:bg-sage-light transition-colors font-body shadow-lg"
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
