import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  Droplets,
  PawPrint,
  Building2,
  GraduationCap,
  Dumbbell,
  type LucideIcon,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import LeadForm from '@/components/forms/LeadForm';
import FAQ from '@/components/sections/FAQ';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SITE_URL, COMPANY_NAME } from '@/lib/seo/constants';
import {
  commercialRegions,
  commercialSegments,
  commercialOverview,
  findCommercialRegion,
} from '@/data/commercial';

const iconMap: Record<string, LucideIcon> = {
  PawPrint,
  Building2,
  GraduationCap,
  Dumbbell,
};

export function generateStaticParams() {
  return commercialRegions.map((region) => ({ location: region.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const region = findCommercialRegion(location);
  if (!region) return { title: 'Area Not Found' };

  const title = `Commercial Artificial Turf Cleaning in ${region.region}`;
  const description = `Commercial artificial turf cleaning across ${region.region}, CA — dog daycares, HOAs, schools, gyms & hospitality. Discuss access, surface care and maintenance. Call ${region.phone} for a free quote.`;
  return generatePageMetadata(title, description, `/commercial-turf-cleaning/${region.slug}`);
}

export default async function CommercialRegionPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const region = findCommercialRegion(location);
  if (!region) notFound();

  const pageUrl = `${SITE_URL}/commercial-turf-cleaning/${region.slug}`;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Commercial Artificial Turf Cleaning',
    name: `Commercial Artificial Turf Cleaning in ${region.region}`,
    description: region.commercialIntro,
    url: pageUrl,
    provider: { '@id': `${SITE_URL}/#localbusiness` },
    areaServed: { '@type': 'City', name: region.city, containedInPlace: { '@type': 'State', name: 'California' } },
  };

  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Commercial Turf Cleaning', url: `${SITE_URL}/commercial-turf-cleaning` },
    { name: region.region, url: pageUrl },
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
            <span className="text-white">{region.region}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-4 leading-tight">
                Commercial Artificial Turf Cleaning
                <br />
                <span className="text-cream">in {region.region}</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 font-body mb-8">{region.commercialIntro}</p>
              <a
                href={`tel:${region.phone.replace(/[^\d+]/g, '')}`}
                className="inline-flex items-center gap-3 bg-white text-forest font-bold text-lg px-8 py-4 rounded-xl hover:bg-cream transition-colors font-body shadow-lg"
              >
                <Phone className="w-5 h-5" /> {region.phone}
              </a>
            </div>
            <div className="w-full">
              <LeadForm locationCity={region.city} locationSlug={region.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-6">
            Commercial Turf Care for {region.region} Businesses
          </h2>
          <div className="space-y-4 text-charcoal-light font-body leading-relaxed">
            <p>
              {COMPANY_NAME} provides recurring, commercial-grade artificial turf cleaning to
              businesses throughout {region.region}. From dog daycares and HOA common areas to
              childcare centers, gyms, and hospitality venues, we review the turf condition and agree on the work to include in your quote.
            </p>
            <p>{region.serviceAreaDescription}</p>
          </div>
          <div className="bg-sage/10 rounded-xl p-4 border border-sage/20 mt-8">
            <div className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-charcoal font-heading mb-1">Local Climate Considerations</h3>
                <p className="text-charcoal-light font-body text-sm leading-relaxed">{region.climateNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEGMENTS */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-10 text-center">
            Who We Serve in {region.city}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commercialSegments.map((segment) => {
              const Icon = iconMap[segment.iconName] ?? Building2;
              return (
                <div key={segment.slug} className="bg-cream rounded-2xl p-6 border border-gray-100 flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-charcoal mb-1">{segment.name}</h3>
                    <p className="text-charcoal-light font-body text-sm leading-relaxed">{segment.blurb}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CITY LINKS */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-6 text-center">
            Commercial Turf Cleaning by City
          </h2>
          <p className="text-charcoal-light font-body text-center mb-8">
            We provide commercial turf cleaning across {region.region}. Find your city below.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {region.subLocations.map((sub) => (
              <Link
                key={sub.slug}
                href={`/commercial-turf-cleaning/${region.slug}/${sub.slug}`}
                className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                <span className="text-charcoal font-body text-sm font-medium">{sub.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={commercialOverview.faqs} />

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-forest">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mb-4">
            Ready for Cleaner Commercial Turf in {region.city}?
          </h2>
          <p className="text-lg text-white/80 font-body mb-8 max-w-2xl mx-auto">
            Get a free quote for recurring commercial turf cleaning across {region.region}.
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
              className="inline-flex items-center justify-center gap-2 bg-sage text-forest-dark font-bold text-lg px-8 py-4 rounded-xl hover:bg-sage-light transition-colors font-body shadow-lg"
            >
              Get Free Quote <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
