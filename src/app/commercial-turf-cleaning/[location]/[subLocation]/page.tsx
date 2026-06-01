import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  Droplets,
  ShieldCheck,
  PawPrint,
  Building2,
  GraduationCap,
  Dumbbell,
  type LucideIcon,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import LeadForm from '@/components/forms/LeadForm';
import { generateCommercialLocationMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SITE_URL, COMPANY_NAME } from '@/lib/seo/constants';
import {
  commercialSegments,
  commercialOverview,
  commercialSubLocationParams,
  findCommercialSubLocation,
} from '@/data/commercial';

const iconMap: Record<string, LucideIcon> = {
  PawPrint,
  Building2,
  GraduationCap,
  Dumbbell,
};

export function generateStaticParams() {
  return commercialSubLocationParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string; subLocation: string }>;
}): Promise<Metadata> {
  const { location, subLocation } = await params;
  const result = findCommercialSubLocation(location, subLocation);
  if (!result) return { title: 'Location Not Found' };
  const { region, sub } = result;

  return generateCommercialLocationMetadata({
    name: sub.name,
    regionSlug: region.slug,
    subSlug: sub.slug,
    phone: region.phone,
  });
}

export default async function CommercialSubLocationPage({
  params,
}: {
  params: Promise<{ location: string; subLocation: string }>;
}) {
  const { location, subLocation } = await params;
  const result = findCommercialSubLocation(location, subLocation);
  if (!result) notFound();

  const { region, sub } = result;
  const siblings = region.subLocations.filter((s) => s.slug !== sub.slug);

  // Rotate the lead segment by city index so neighbouring city pages don't read identically.
  const cityIndex = region.subLocations.findIndex((s) => s.slug === sub.slug);
  const spotlight = commercialSegments[cityIndex % commercialSegments.length];
  const SpotlightIcon = iconMap[spotlight.iconName] ?? Building2;

  const pageUrl = `${SITE_URL}/commercial-turf-cleaning/${region.slug}/${sub.slug}`;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Commercial Artificial Turf Cleaning',
    name: `Commercial Artificial Turf Cleaning in ${sub.name}, CA`,
    description: `Recurring commercial artificial turf cleaning in ${sub.name}, CA for dog daycares, HOAs, schools, gyms, and hospitality venues.`,
    url: pageUrl,
    provider: { '@type': 'LocalBusiness', name: COMPANY_NAME, url: SITE_URL, telephone: region.phone },
    areaServed: { '@type': 'City', name: sub.name, containedInPlace: { '@type': 'State', name: 'California' } },
  };

  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Commercial Turf Cleaning', url: `${SITE_URL}/commercial-turf-cleaning` },
    { name: region.region, url: `${SITE_URL}/commercial-turf-cleaning/${region.slug}` },
    { name: sub.name, url: pageUrl },
  ]);

  const faqJsonLd = generateFAQSchema(commercialOverview.faqs);

  return (
    <div className="scroll-smooth pb-20 lg:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section id="quote-form" className="relative bg-gradient-to-br from-forest via-forest-light to-sage py-12 sm:py-16 lg:py-20 scroll-mt-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-white/60 text-sm font-body mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/commercial-turf-cleaning" className="hover:text-white transition-colors">Commercial Turf Cleaning</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/commercial-turf-cleaning/${region.slug}`} className="hover:text-white transition-colors">{region.city}, {region.state}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{sub.name}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-4 leading-tight">
                Commercial Artificial Turf Cleaning
                <br />
                <span className="text-cream">in {sub.name}, CA</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 font-body mb-8">
                Recurring, pet-safe turf cleaning for {sub.name}{' '}businesses — daycares, HOAs, schools, gyms &amp; more.
              </p>
              <a
                href={`tel:${region.phone.replace(/[^\d+]/g, '')}`}
                className="inline-flex items-center gap-3 bg-white text-forest font-bold text-lg px-8 py-4 rounded-xl hover:bg-cream transition-colors font-body shadow-lg"
              >
                <Phone className="w-5 h-5" /> {region.phone}
              </a>
            </div>
            <div className="w-full">
              <LeadForm locationCity={sub.name} locationSlug={region.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO + SPOTLIGHT */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-6">
            Commercial Turf Cleaning for {sub.name} Businesses
          </h2>
          <div className="space-y-4 text-charcoal-light font-body leading-relaxed">
            <p>
              {COMPANY_NAME} provides commercial-grade artificial turf cleaning to businesses in{' '}
              {sub.name}, California. Whether you run a dog daycare, manage an HOA, operate a
              childcare center, or oversee a gym or hotel, we keep your turf sanitized, fresh, and
              presentable with recurring service built around your hours.
            </p>
            <p>
              Commercial turf in {sub.name} sees far more traffic and wear than a backyard lawn.
              Our process penetrates past the surface into the infill — where bacteria and odor
              actually live — using a chlorine-based solution that is safe for pets and children
              once dry. With 30+ years of experience serving the {region.city} area, we understand
              the local conditions {sub.name} businesses face. {region.climateNote}
            </p>
          </div>

          {/* Segment spotlight (rotates per city) */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 mt-8 flex gap-4">
            <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
              <SpotlightIcon className="w-6 h-6 text-sage" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-charcoal mb-1">
                {spotlight.name} in {sub.name}
              </h3>
              <p className="text-charcoal-light font-body text-sm leading-relaxed">{spotlight.blurb}</p>
            </div>
          </div>

          {/* Climate note */}
          <div className="bg-sage/10 rounded-xl p-4 border border-sage/20 mt-6">
            <div className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-charcoal font-heading mb-1">Local Climate Considerations</h4>
                <p className="text-charcoal-light font-body text-sm leading-relaxed">{region.climateNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-8 text-center">
            What Commercial Turf Cleaning in {sub.name} Includes
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {commercialOverview.whatIncludes.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-cream rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                <span className="text-charcoal-light font-body text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-8 text-charcoal-light font-body text-sm">
            <ShieldCheck className="w-5 h-5 text-sage" /> Bonded &amp; insured · pet- and child-safe · recurring plans available
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-forest">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mb-4">
            Get Commercial Turf Cleaning in {sub.name}
          </h2>
          <p className="text-lg text-white/80 font-body mb-8 max-w-2xl mx-auto">
            Free quotes and recurring plans for {sub.name} businesses and the greater {region.city} area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${region.phone.replace(/[^\d+]/g, '')}`}
              className="inline-flex items-center justify-center gap-3 bg-white text-forest font-bold text-lg px-8 py-4 rounded-xl hover:bg-cream transition-colors font-body shadow-lg"
            >
              <Phone className="w-5 h-5" /> Call {region.phone}
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

      {/* FAQ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-8 text-center">
            Commercial Turf Cleaning FAQs — {sub.name}
          </h2>
          <div className="space-y-4">
            {commercialOverview.faqs.map((faq) => (
              <details key={faq.question} className="group bg-cream rounded-xl border border-charcoal/10">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-heading font-bold text-charcoal">
                  {faq.question}
                  <ChevronRight className="w-5 h-5 text-charcoal-light transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-4 text-charcoal-light font-body leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER AREAS */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-6 text-center">
            Commercial Turf Cleaning Near {sub.name}
          </h2>
          <p className="text-charcoal-light font-body text-center mb-8">{region.serviceAreaDescription}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link
              href={`/commercial-turf-cleaning/${region.slug}`}
              className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
              <span className="text-charcoal font-body text-sm font-medium">{region.city} (all areas)</span>
            </Link>
            {siblings.map((sibling) => (
              <Link
                key={sibling.slug}
                href={`/commercial-turf-cleaning/${region.slug}/${sibling.slug}`}
                className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                <span className="text-charcoal font-body text-sm font-medium">{sibling.name}</span>
              </Link>
            ))}
          </div>
          {/* Cross-link to the residential page for the same city */}
          <div className="text-center mt-8">
            <Link
              href={`/locations/${region.slug}/turf-cleaning-in-${sub.slug.replace('commercial-turf-cleaning-in-', '')}`}
              className="inline-flex items-center gap-2 text-sage font-semibold font-body text-sm hover:text-forest transition-colors"
            >
              Looking for residential turf cleaning in {sub.name}? <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
