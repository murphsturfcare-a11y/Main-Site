import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  CheckCircle,
  Phone,
  MapPin,
  PawPrint,
  Building2,
  GraduationCap,
  Dumbbell,
  ShieldCheck,
  CalendarClock,
  FileText,
  type LucideIcon,
} from 'lucide-react';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';
import { generateCommercialMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SITE_URL, COMPANY_NAME } from '@/lib/seo/constants';
import {
  commercialOverview,
  commercialSegments,
  commercialRegions,
} from '@/data/commercial';

export const metadata: Metadata = generateCommercialMetadata();

const iconMap: Record<string, LucideIcon> = {
  PawPrint,
  Building2,
  GraduationCap,
  Dumbbell,
  ShieldCheck,
  CalendarClock,
  FileText,
};

const PAGE_URL = `${SITE_URL}/commercial-turf-cleaning`;

export default function CommercialHubPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Commercial Artificial Turf Cleaning',
    name: 'Commercial Artificial Turf Cleaning',
    description: commercialOverview.descriptionParagraphs[0],
    url: PAGE_URL,
    provider: {
      '@type': 'LocalBusiness',
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    areaServed: { '@type': 'State', name: 'California' },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
    },
  };

  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Commercial Turf Cleaning', url: PAGE_URL },
  ]);

  const faqJsonLd = generateFAQSchema(commercialOverview.faqs);

  return (
    <div className="scroll-smooth">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-forest via-forest-light to-sage py-14 sm:py-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-white/60 text-sm font-body mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Commercial Turf Cleaning</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 tracking-tight">
              Commercial Artificial Turf Cleaning in California
            </h1>
            <p className="text-lg sm:text-xl text-white/90 font-body leading-relaxed mb-8">
              {commercialOverview.tagline}{' '}
              Dog daycares, HOAs, schools, gyms, hotels &amp; sports
              venues — we keep your turf presentable, sanitized, and odor-free with recurring,
              pet-safe service backed by 30+ years of experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#service-areas"
                className="btn-hover inline-flex items-center justify-center gap-2 bg-white text-forest font-bold px-8 py-3.5 rounded-lg hover:bg-cream transition-colors font-body shadow-md"
              >
                Find Your Area <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/locations"
                className="btn-hover inline-flex items-center justify-center gap-2 bg-sage text-white font-bold px-8 py-3.5 rounded-lg hover:bg-sage-dark transition-colors font-body shadow-md"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-6">
            Professional Turf Cleaning Built for Commercial Properties
          </h2>
          <div className="space-y-4 text-charcoal-light font-body leading-relaxed">
            {commercialOverview.descriptionParagraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* SEGMENTS */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-4">
              Commercial Turf Cleaning for Every Kind of Business
            </h2>
            <p className="text-lg text-charcoal-light font-body max-w-2xl mx-auto">
              From a single play yard to a property portfolio, we tailor service to your facility.
            </p>
          </div>
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commercialSegments.map((segment) => {
              const Icon = iconMap[segment.iconName] ?? Building2;
              return (
                <StaggerItem key={segment.slug}>
                  <div className="bg-cream rounded-2xl p-8 border border-gray-100 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-sage" />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-charcoal mb-3">{segment.name}</h3>
                    <p className="text-charcoal-light font-body text-sm leading-relaxed mb-4">{segment.blurb}</p>
                    <ul className="space-y-2 mt-auto">
                      {segment.painPoints.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-charcoal-light font-body text-sm">
                          <CheckCircle className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* WHAT'S INCLUDED + BENEFITS */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-6">What Every Commercial Clean Includes</h2>
            <ul className="space-y-3">
              {commercialOverview.whatIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-charcoal-light font-body">
                  <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-6">Why Businesses Choose Murphy&apos;s Turf</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {commercialOverview.benefits.map((benefit) => {
                const Icon = iconMap[benefit.iconName] ?? ShieldCheck;
                return (
                  <div key={benefit.title} className="bg-white rounded-xl p-5 shadow-sm">
                    <Icon className="w-6 h-6 text-sage mb-3" />
                    <h3 className="font-heading font-bold text-charcoal mb-1">{benefit.title}</h3>
                    <p className="text-charcoal-light font-body text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section id="service-areas" className="py-14 sm:py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-4">Commercial Service Areas Across California</h2>
            <p className="text-lg text-charcoal-light font-body max-w-2xl mx-auto">
              Choose your region for commercial turf cleaning in your city.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commercialRegions.map((region) => (
              <Link
                key={region.slug}
                href={`/commercial-turf-cleaning/${region.slug}`}
                className="group bg-cream rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <MapPin className="w-6 h-6 text-sage mb-3" />
                <h3 className="font-heading font-bold text-charcoal text-lg mb-2">{region.region}</h3>
                <p className="text-charcoal-light font-body text-sm mb-3 flex-1">
                  Serving {region.subLocations.length}+ cities including {region.subLocations.slice(0, 3).map((s) => s.name).join(', ')}.
                </p>
                <span className="text-sage font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Area <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-8 text-center">Commercial Turf Cleaning FAQs</h2>
          <div className="space-y-4">
            {commercialOverview.faqs.map((faq) => (
              <details key={faq.question} className="group bg-white rounded-xl border border-charcoal/10">
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

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-forest">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mb-4">Get a Commercial Turf Cleaning Quote</h2>
          <p className="text-lg text-white/80 font-body mb-8 max-w-2xl mx-auto">
            Tell us about your property and we&apos;ll build a recurring plan that fits your hours and budget.
          </p>
          <Link
            href="/locations"
            className="inline-flex items-center justify-center gap-3 bg-white text-forest font-bold text-lg px-8 py-4 rounded-xl hover:bg-cream transition-colors font-body shadow-lg"
          >
            <Phone className="w-5 h-5" /> Get Your Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
