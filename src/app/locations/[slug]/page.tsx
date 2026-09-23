import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { turfGalleryPhotos } from '@/data/gallery';
import {
  Phone,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  PawPrint,
  Leaf,
  ThumbsUp,
  Droplets,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';
import FAQ from '@/components/sections/FAQ';
import LeadForm from '@/components/forms/LeadForm';
import WorkClip from '@/components/sections/WorkClip';
import { services as sharedServices } from '@/data/services';
import { homeFaqs } from '@/data/home-faqs';
import { regionalCare } from '@/data/regional-care';
import { locations } from '@/data/locations';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Testimonial {
  name: string;
  neighborhood: string;
  rating: number;
  text: string;
}

interface LocationData {
  city: string;
  slug: string;
  state: string;
  phone: string;
  email: string;
  neighborhoods: string[];
  testimonials: Testimonial[];
  metaTitle: string;
  metaDescription: string;
  serviceAreaDescription: string;
  climateNote: string;
  formId: string;
  mapQuery: string;
  mapEmbedUrl?: string;
  localContentHeading: string;
  localContentIntro: string;
  localChallenges: { title: string; description: string }[];
  localWhyUs: string;
}

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------

const services = sharedServices;

const processSteps = [
  {
    image: '/images/gallery/process-contact-us.png',
    title: 'Contact Us',
    description: 'Get a free quote',
  },
  {
    image: '/images/gallery/process-schedule-estimate.png',
    title: 'Get Your Fast Online Quote',
    description: 'Send measurements and photos so we can review the service scope',
  },
  {
    image: '/images/gallery/process-get-job-done.png',
    title: 'Get The Job Done',
    description: 'Enjoy your fresh, clean turf',
  },
];

const galleryImages = turfGalleryPhotos;

const locationFaqs = homeFaqs;

// ---------------------------------------------------------------------------
// Location data
// ---------------------------------------------------------------------------

const locationData: Record<string, LocationData> = Object.fromEntries(locations.map((loc) => [loc.slug, { city: loc.neighborhoods[0], slug: loc.slug, state: loc.state, phone: loc.phone, email: 'murphsturfcare@gmail.com', neighborhoods: loc.neighborhoods, testimonials: [], metaTitle: loc.metaTitle, metaDescription: loc.metaDescription, serviceAreaDescription: loc.serviceAreaDescription, climateNote: regionalCare[loc.slug].climate, formId: '', mapQuery: encodeURIComponent(loc.neighborhoods[0] + ', CA'), localContentHeading: 'Planning turf care across ' + loc.name, localContentIntro: regionalCare[loc.slug].intro, localChallenges: regionalCare[loc.slug].challenges, localWhyUs: 'Send your property address, approximate turf size, photos, and access details. We will review the requested cleaning, grooming, or waste pickup and confirm the scope before work begins.' }]));

// ---------------------------------------------------------------------------
// Static params & metadata
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return locations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = locationData[slug];
  if (!location) {
    return { title: 'Location Not Found' };
  }
  return {
    // metaTitle already contains the brand (e.g. "... | Murphy's Turf HQ").
    // Use `absolute` so the layout template does NOT append a second brand.
    title: { absolute: location.metaTitle },
    description: location.metaDescription,
    alternates: {
      canonical: `https://murphysturf.com/locations/${slug}`,
    },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      type: 'website',
      url: `https://murphysturf.com/locations/${slug}`,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: `Murphy's Turf - ${location.city}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: location.metaTitle,
      description: location.metaDescription,
      images: ['/images/og-image.png'],
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = locationData[slug];

  if (!location) {
    notFound();
  }

  // FAQPage JSON-LD for rich results and AI citations
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": locationFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://murphysturf.com" },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://murphysturf.com/locations" },
      { "@type": "ListItem", "position": 3, "name": location.city, "item": `https://murphysturf.com/locations/${slug}` },
    ],
  };

  return (
    <div className="scroll-smooth pb-20 lg:pb-0">
      {/* Service-area structured data; this page does not establish an office. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": `Artificial Turf Cleaning in ${location.city}`,
            "serviceType": "Artificial Turf Cleaning",
            "provider": { "@id": "https://murphysturf.com/#localbusiness" },
            "description": location.metaDescription,
            "url": `https://murphysturf.com/locations/${slug}`,
            "areaServed": location.neighborhoods.map(n => ({ "@type": "City", "name": n })),
            "image": "https://murphysturf.com/images/og-image.png",
          }).replace(/</g, '\\u003c'),
        }}
      />
      {/* FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />
      {/* BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />

      {/* ================================================================
          1. HERO WITH EMBEDDED LEAD FORM
          ================================================================ */}
      <section id="quote-form" className="relative overflow-hidden scroll-mt-20">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/about-turf-cleaning.png"
            alt={`Professional artificial turf cleaning service in ${location.city}, California`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-forest/85" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-sm font-body mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/locations" className="hover:text-white transition-colors">
              Locations
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{location.city}, {location.state}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: headline + phone */}
            <AnimateOnScroll direction="up">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-4 leading-tight">
                Turf Cleaning &amp; Maintenance
                <br />
                <span className="text-cream">
                  in {location.city}, CA
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 font-body mb-8">
                Cleaning, Grooming &amp; Care for Your Turf
              </p>
              <a
                href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
                className="inline-flex items-center gap-3 bg-white text-forest font-bold text-lg px-8 py-4 rounded-xl hover:bg-cream transition-colors font-body shadow-lg"
              >
                <Phone className="w-5 h-5" />
                {location.phone}
              </a>
            </AnimateOnScroll>

            {/* Right: Lead form */}
            <div className="w-full">
              <AnimateOnScroll direction="up">
                <LeadForm locationCity={location.city} locationSlug={location.slug} />
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. SERVICES
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up" className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading mb-4">
              Our Services in {location.city}
            </h2>
            <p className="text-lg text-charcoal-light font-body max-w-2xl mx-auto">
              Choose services for the condition and use of your property.
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group bg-cream hover:bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-sage/30 hover:shadow-xl transition-all duration-300 block"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-charcoal font-heading mb-2 group-hover:text-forest transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-charcoal-light font-body text-sm leading-relaxed mb-3">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 text-forest font-semibold font-body text-sm group-hover:text-forest transition-colors">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ================================================================
          3. ABOUT US
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <AnimateOnScroll direction="fade">
              <Image
                src="/images/gallery/about-turf-cleaning.png"
                alt="Murphy's Turf professional turf cleaning"
                width={500}
                height={400}
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </AnimateOnScroll>

            <AnimateOnScroll direction="up">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading mb-6">
                Reliable Turf Cleaning &amp; Maintenance
              </h2>
              <p className="text-charcoal-light font-body leading-relaxed text-base mb-8">
                We review your turf condition, pet use, and access needs to plan a clear service scope for {location.city} and surrounding communities.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: PawPrint, label: 'Care for Pet Yards' },
                  { icon: Leaf, label: 'Surface-Specific Care' },
                  { icon: ThumbsUp, label: 'Clear Service Scope' },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm border border-gray-100"
                  >
                    <badge.icon className="w-5 h-5 text-sage" />
                    <span className="text-charcoal font-body text-sm font-medium">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. THREE-STEP PROCESS
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up" className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading mb-4">
              Our Simple 3 Step Process
            </h2>
          </AnimateOnScroll>

          <StaggerContainer className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            {processSteps.map((step, idx) => (
              <StaggerItem key={step.title}>
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={256}
                      height={256}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-sage rounded-full flex items-center justify-center text-forest-dark font-bold font-heading text-sm shadow-md">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal font-heading mb-2">
                    {step.title}
                  </h3>
                  <p className="text-charcoal-light font-body">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mt-12">
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 bg-sage hover:bg-sage-light text-forest-dark font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md"
            >
              Get Free Quote
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          5. PHOTO GALLERY
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up" className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading">
              Turf Gallery
            </h2>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StaggerItem>
              <WorkClip
                src="/images/gallery/turf-grooming-clip.mp4"
                poster="/images/gallery/turf-grooming-poster.webp"
                label="Power brooming a residential artificial turf lawn"
                className="aspect-[5/4]"
              />
            </StaggerItem>
            {galleryImages.map((img, idx) => (
              <StaggerItem key={idx}>
                <div className="relative aspect-[5/4] rounded-xl overflow-hidden group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateOnScroll direction="fade" className="text-center mt-12">
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 bg-sage hover:bg-sage-light text-forest-dark font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md"
            >
              Get Your Free Quote
              <ArrowRight className="w-4 h-4" />
            </a>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ================================================================
          6.5 LOCAL CONTENT — unique per city for SEO
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up" className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-6">
              {location.localContentHeading}
            </h2>
            <p className="text-base sm:text-lg text-charcoal-light font-body leading-relaxed">
              {location.localContentIntro}
            </p>
          </AnimateOnScroll>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10">
            {location.localChallenges.map((challenge) => (
              <StaggerItem key={challenge.title}>
                <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 h-full">
                  <h3 className="text-lg sm:text-xl font-bold text-charcoal font-heading mb-3">
                    {challenge.title}
                  </h3>
                  <p className="text-charcoal-light font-body text-sm sm:text-base leading-relaxed">
                    {challenge.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateOnScroll direction="up">
            <div className="bg-sage/5 border-l-4 border-sage rounded-r-xl p-6 sm:p-8">
              <p className="text-charcoal-light font-body text-sm sm:text-base leading-relaxed">
                {location.localWhyUs}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ================================================================
          7. FAQ
          ================================================================ */}
      <FAQ items={locationFaqs} />

      {/* ================================================================
          8. NEIGHBORHOODS WE SERVE
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-6">
                Neighborhoods We Serve in {location.city}
              </h2>
              <p className="text-charcoal-light font-body leading-relaxed mb-8">
                {location.serviceAreaDescription}
              </p>
              <StaggerContainer staggerDelay={0.05} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {location.neighborhoods.map((neighborhood) => {
                  const citySlug = neighborhood.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  const neighborhoodPath = citySlug === location.slug
                    ? `/locations/${location.slug}`
                    : `/locations/${location.slug}/turf-cleaning-in-${citySlug}`;
                  return (
                    <StaggerItem key={neighborhood} direction="scale">
                      <Link
                        href={neighborhoodPath}
                        className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                        <span className="text-charcoal font-body text-sm font-medium">
                          {neighborhood}
                        </span>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>

              {/* Climate Note */}
              <div className="bg-sage/10 rounded-xl p-4 border border-sage/20 mt-6">
                <div className="flex items-start gap-3">
                  <Droplets className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-charcoal font-heading mb-1">Local Climate</h3>
                    <p className="text-charcoal-light font-body text-sm leading-relaxed">{location.climateNote}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <AnimateOnScroll direction="fade" className="w-full">
              <iframe
                src={location.mapEmbedUrl || `https://www.google.com/maps?q=${location.mapQuery}&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Murphy's Turf - ${location.city}`}
                className="rounded-xl shadow-lg"
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ================================================================
          9. BOTTOM CTA + LEAD FORM
          ================================================================ */}
      <section id="bottom-form" className="py-14 sm:py-20 bg-forest scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: CTA text + contact info */}
            <AnimateOnScroll direction="up">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-6">
                Ready for Fresh, Clean Turf in {location.city}?
              </h2>
              <p className="text-white/80 font-body text-lg mb-8">
                Request a free quote for your turf size, use, and condition. We will help identify
                the work and access arrangements for your property.
              </p>
              <div className="space-y-4">
                <a
                  href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center gap-3 text-white hover:text-sage-light transition-colors font-body text-lg"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  {location.phone}
                </a>
              </div>
            </AnimateOnScroll>

            {/* Right: Lead form */}
            <AnimateOnScroll direction="up" className="w-full">
              <LeadForm locationCity={location.city} locationSlug={location.slug} />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-forest shadow-[0_-4px_12px_rgba(0,0,0,0.15)]"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center justify-between px-4 pt-3">
          <a
            href="#quote-form"
            className="flex-1 mr-2 bg-sage hover:bg-sage-light text-forest-dark font-bold text-sm min-h-[44px] flex items-center justify-center px-4 rounded-lg text-center font-body transition-colors"
          >
            Get Free Quote
          </a>
          <a
            href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
            className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm min-h-[44px] px-4 rounded-lg font-body transition-colors whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
