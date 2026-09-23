import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { locations } from '@/data/locations';
import { services } from '@/data/services';
import BeforeAfterGallery from '@/components/sections/BeforeAfterGallery';
import WorkClip from '@/components/sections/WorkClip';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import { Check, ArrowRight, MapPin, ChevronRight, type LucideIcon } from 'lucide-react';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FAQ {
  question: string;
  answer: string;
}

interface BenefitCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface BeforeAfterPair {
  label: string;
  beforeColor: string;
  afterColor: string;
  beforeCaption: string;
  afterCaption: string;
}

interface RelatedService {
  name: string;
  slug: string;
}

interface ServiceData {
  name: string;
  slug: string;
  image: string;
  tagline: string;
  metaDescription: string;
  descriptionParagraphs: string[];
  included: string[];
  benefits: BenefitCard[];
  beforeAfter: BeforeAfterPair[];
  faqs: FAQ[];
  relatedServices: RelatedService[];
}

// ---------------------------------------------------------------------------
// Service Data
// ---------------------------------------------------------------------------

const servicesData: Record<string, ServiceData> = Object.fromEntries(services.map((service) => [service.slug, { name: service.name, slug: service.slug, image: service.image, tagline: service.shortDescription, metaDescription: service.metaDescription, descriptionParagraphs: service.fullDescription.split('\n\n'), included: service.whatIncludes, benefits: service.benefits.map((description) => ({ icon: Check, title: description, description: '' })), beforeAfter: [], faqs: service.faqs, relatedServices: services.filter((other) => other.slug !== service.slug).map(({ name, slug }) => ({ name, slug })) }]));

// ---------------------------------------------------------------------------
// Static Params & Metadata
// ---------------------------------------------------------------------------

const validSlugs = [
  'pet-hair-debris',
  'blooming-decompacting',
  'disinfect-deodorize',
  'poop-scooping',
];

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    // Plain string: the layout title.template appends " | Murphy's Turf" once.
    title: service.name,
    description: service.metaDescription,
    alternates: {
      canonical: `https://murphysturf.com/services/${slug}`,
    },
    openGraph: {
      title: `${service.name} | Murphy's Turf — Artificial Turf Cleaning`,
      description: service.metaDescription,
      type: 'website',
      url: `https://murphysturf.com/services/${slug}`,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: `Murphy's Turf - ${service.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.name} | Murphy's Turf`,
      description: service.metaDescription,
      images: ['/images/og-image.png'],
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(service.faqs)).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
        { name: 'Home', url: 'https://murphysturf.com/' },
        { name: 'Services', url: 'https://murphysturf.com/services' },
        { name: service.name, url: `https://murphysturf.com/services/${service.slug}` },
      ])).replace(/</g, '\\u003c') }} />
      {/* Service structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.name,
            "description": service.metaDescription,
            "provider": {
              "@type": "LocalBusiness",
              "@id": "https://murphysturf.com/#localbusiness",
              "name": "Murphy's Turf",
              "url": "https://murphysturf.com",
            },
            "areaServed": locations.flatMap(location => location.neighborhoods).map(name => ({ "@type": "Place", name })),
            "url": `https://murphysturf.com/services/${slug}`,
          }),
        }}
      />

      {/* ----------------------------------------------------------------- */}
      {/* Hero */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Hero background image */}
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-forest/90 via-forest-light/85 to-sage/80" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 font-body mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">{service.name}</span>
          </nav>

          <AnimateOnScroll direction="fade">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white mb-3 tracking-tight">
              {service.name}
            </h1>
            <p className="text-lg sm:text-xl text-white/85 font-body max-w-2xl">
              {service.tagline}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Full Description */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <AnimateOnScroll direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-8">
            About {service.name}
          </h2>
          <div className="space-y-6">
            {service.descriptionParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-charcoal-light font-body text-base sm:text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* What's Included */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-cream">
        <AnimateOnScroll direction="up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            What&apos;s Included
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.included.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="w-6 h-6 bg-sage/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-forest" />
                </div>
                <span className="text-charcoal font-body text-sm sm:text-base font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Benefits */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            Key Benefits
          </h2>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <StaggerItem key={index}>
                  <div
                    className="text-center p-6 rounded-2xl bg-cream border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-sage/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <BenefitIcon className="w-6 h-6 text-forest" />
                    </div>
                    <h3 className="font-bold font-heading text-charcoal mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-charcoal-light font-body leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Before / After Gallery */}
      {/* ----------------------------------------------------------------- */}
      <BeforeAfterGallery />

      {/* ----------------------------------------------------------------- */}
      {/* Grooming clip (only where the footage shows the service itself) */}
      {/* ----------------------------------------------------------------- */}
      {service.slug === 'blooming-decompacting' && (
        <section className="py-16 sm:py-20 bg-cream">
          <AnimateOnScroll direction="up" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-4 text-center">
              Grooming in progress
            </h2>
            <p className="text-charcoal-light font-body leading-relaxed mb-8 text-center max-w-2xl mx-auto">
              A power broom lifting flattened fibers on an installed lawn. The method and
              equipment should suit your turf and its care instructions.
            </p>
            <WorkClip
              src="/images/gallery/turf-grooming-clip.mp4"
              poster="/images/gallery/turf-grooming-poster.webp"
              label="Power brooming a residential artificial turf lawn"
              className="aspect-[9/16] max-w-xs mx-auto"
            />
          </AnimateOnScroll>
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Quote CTA (No Prices) */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <AnimateOnScroll direction="up" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-cream to-cream-dark rounded-3xl p-10 sm:p-14 border border-sage/20">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-3">
              Interested in {service.name}?
            </h2>
            <p className="text-charcoal-light font-body mb-8 max-w-2xl mx-auto leading-relaxed">
              Every property is different. Contact us for a free, no-obligation
              quote tailored to your turf size, use, access, and condition.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 bg-sage hover:bg-sage-light text-forest-dark font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md hover:shadow-lg"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 text-forest font-semibold font-body hover:text-forest-light transition-colors"
              >
                <MapPin className="w-5 h-5" />
                Find Your Service Area
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* FAQ */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-cream">
        <AnimateOnScroll direction="up" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 font-semibold font-heading text-charcoal hover:text-forest transition-colors list-none">
                  <span className="pr-4">{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-sage flex-shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1">
                  <p className="text-charcoal-light font-body leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Related Services */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            Related Services
          </h2>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {service.relatedServices.map((related) => (
              <StaggerItem key={related.slug}>
                <Link
                  href={`/services/${related.slug}`}
                  className="card-hover group flex flex-col items-center p-6 bg-cream rounded-2xl border border-gray-100 hover:border-sage/30 hover:shadow-md transition-all text-center"
                >
                  <span className="font-bold font-heading text-charcoal group-hover:text-forest transition-colors">
                    {related.name}
                  </span>
                  <span className="text-xs text-forest font-body mt-2 inline-flex items-center gap-1">
                    View Details
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom CTA */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-forest to-forest-dark">
        <AnimateOnScroll direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
            Ready to Restore Your Turf?
          </h2>
          <p className="text-lg text-white/85 font-body mb-8 max-w-2xl mx-auto leading-relaxed">
            Request a free, no-obligation quote for {service.name.toLowerCase()} and
            discuss the work that fits your property.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/locations"
              className="btn-hover inline-flex items-center gap-2 bg-sage hover:bg-sage-light text-forest-dark font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md hover:shadow-lg"
            >
              Contact Us for Pricing
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/locations"
              className="btn-hover inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body backdrop-blur-sm"
            >
              <MapPin className="w-5 h-5" />
              Find Your Service Area
            </Link>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
