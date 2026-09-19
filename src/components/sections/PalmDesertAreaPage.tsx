import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, ChevronRight, MapPin, Phone } from 'lucide-react';
import LeadForm from '@/components/forms/LeadForm';
import {
  PALM_DESERT_PHONE,
  palmDesertAreas,
  palmDesertPath,
  type PalmDesertArea,
} from '@/data/palm-desert';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/schema';
import { services as sharedServices } from '@/data/services';
import { SITE_URL } from '@/lib/seo/constants';

const serviceSummaries: Record<string, string> = {
  'pet-hair-debris': 'Clear pet hair, leaves, and loose debris.',
  'blooming-decompacting': 'Groom flattened fibers and compacted areas.',
  'disinfect-deodorize': 'Treat pet odors with turf-appropriate care.',
  'poop-scooping': 'Keep pet areas clear of waste.',
};

const guides = [
  { slug: 'artificial-turf-cleaning-palm-desert', title: 'A Palm Desert turf maintenance routine' },
  { slug: 'pet-turf-odor-palm-desert', title: 'What to check when pet odor keeps returning' },
  { slug: 'desert-turf-dust-drainage-coachella-valley', title: 'Desert debris, infill, and drainage problems' },
  { slug: 'seasonal-home-commercial-turf-palm-desert', title: 'Planning turf care for seasonal and managed properties' },
];

export default function PalmDesertAreaPage({ area, commercial = false }: { area: PalmDesertArea; commercial?: boolean }) {
  const content = commercial ? area.commercial : area.residential;
  const isHub = area.slug === 'palm-desert';
  const hub = palmDesertAreas[0];
  const path = palmDesertPath(area, commercial);
  const title = `${commercial ? 'Commercial' : 'Artificial'} Turf Cleaning in ${area.name}, CA`;
  const crumbs = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: commercial ? 'Commercial Turf Cleaning' : 'Service Areas', url: `${SITE_URL}${commercial ? '/commercial-turf-cleaning' : '/locations'}` },
    ...(!isHub ? [{ name: 'Palm Desert Area', url: `${SITE_URL}${palmDesertPath(hub, commercial)}` }] : []),
    { name: area.name, url: `${SITE_URL}${path}` },
  ];
  const servedAreas = isHub
    ? [...palmDesertAreas.map((place) => ({ '@type': place.placeType, name: place.name })), { '@type': 'Place', name: 'Desert Palms / Sun City Palm Desert' }]
    : [{ '@type': area.placeType, name: area.name }];
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SITE_URL}${path}#service`,
      name: title,
      serviceType: commercial ? 'Commercial Artificial Turf Cleaning' : 'Artificial Turf Cleaning',
      description: content.summary,
      url: `${SITE_URL}${path}`,
      provider: { '@id': `${SITE_URL}/#localbusiness` },
      areaServed: servedAreas,
    },
    generateBreadcrumbSchema(crumbs),
    generateFAQSchema(content.faqs),
  ];

  return (
    <div className="pb-20 lg:pb-0">
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      ))}

      <section className="relative bg-forest py-6 sm:py-10 lg:py-14">
        <div className="absolute inset-0">
          <Image src="/images/gallery/about-turf-cleaning.png" alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-forest/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/80 font-body mb-4 lg:mb-6">
            {crumbs.map((crumb, index) => (
              <span key={crumb.url} className="inline-flex items-center gap-2">
                {index > 0 && <ChevronRight aria-hidden="true" className="w-4 h-4" />}
                {index === crumbs.length - 1 ? <span aria-current="page" className="text-white">{crumb.name}</span> : <Link href={crumb.url.replace(SITE_URL, '') || '/'} className="hover:text-white underline-offset-4 hover:underline">{crumb.name}</Link>}
              </span>
            ))}
          </nav>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-start">
            <div className="lg:pt-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-heading font-bold text-white mb-3">
                {commercial ? 'Commercial Turf Cleaning' : 'Turf Cleaning & Maintenance'}
                <br /><span className="text-cream">in {area.name}, CA</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 font-body mb-5">
                {commercial ? 'Turf care for businesses & managed properties.' : 'Cleaning, grooming & pet odor care.'}
              </p>
              <a href={`tel:${PALM_DESERT_PHONE}`} className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-3 text-forest text-lg font-body font-bold hover:bg-cream transition-colors">
                <Phone className="w-5 h-5" aria-hidden="true" /> {PALM_DESERT_PHONE}
              </a>
            </div>
            <div id="quote-form" className="w-full scroll-mt-32">
              <LeadForm locationCity={area.name} locationSlug="palm-desert" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-charcoal mb-6">Our services in {area.name}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {sharedServices.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group rounded-xl overflow-hidden bg-cream border border-sage/10 hover:border-sage/40 transition-colors">
                <div className="relative aspect-[4/3]">
                  <Image src={service.image} alt={service.name} fill sizes="(min-width: 1024px) 280px, 50vw" className="object-cover" />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-heading font-bold text-charcoal mb-2">{service.name}</h3>
                  <p className="text-sm font-body text-charcoal-light leading-relaxed">{serviceSummaries[service.slug] ?? service.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link href="#quote-form" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-forest text-white px-6 py-3 font-body font-bold hover:bg-forest-dark transition-colors">Get a free quote<ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-charcoal mb-3">{commercial ? 'Care for your property' : 'Care for your turf'}</h2>
          <p className="max-w-3xl text-charcoal-light font-body leading-relaxed mb-6">{content.summary}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {content.sections.map((section) => (
              <div key={section.title}>
                <h3 className="flex items-start gap-2 text-lg font-heading font-bold text-charcoal mb-2"><CheckCircle className="w-5 h-5 text-forest shrink-0 mt-1" aria-hidden="true" />{section.title}</h3>
                <p className="text-sm text-charcoal-light font-body leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
          <Link href={palmDesertPath(area, !commercial)} className="mt-6 inline-flex items-center gap-2 font-body font-semibold text-forest underline underline-offset-4">{commercial ? `Residential turf cleaning in ${area.name}` : `Commercial turf cleaning in ${area.name}`}<ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h2 className="flex items-start gap-3 text-2xl font-heading font-bold text-charcoal mb-4"><MapPin className="w-6 h-6 text-forest shrink-0 mt-1" aria-hidden="true" />{isHub ? 'Palm Desert & nearby cities' : `Serving ${area.name}`}</h2>
            <p className="text-sm text-charcoal-light leading-relaxed font-body mb-4">{area.coverage}</p>
            <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mb-6 text-sm text-charcoal font-body">
              {area.neighborhoods.map((name) => <li key={name}>{name}</li>)}
            </ul>
            <nav aria-label="Nearby service areas" className="flex flex-wrap gap-x-4 gap-y-3">
              {palmDesertAreas.filter((place) => place.slug !== area.slug).map((place) => (
                <Link key={place.slug} href={palmDesertPath(place, commercial)} className="text-forest font-body text-sm font-semibold underline underline-offset-4">{place.name}</Link>
              ))}
            </nav>
          </div>
          <div>
            <h2 className="text-2xl font-heading font-bold text-charcoal mb-4">Common questions</h2>
            <div className="divide-y divide-sage/20 border-y border-sage/20">
              {content.faqs.map((faq) => (
                <details key={faq.question} className="py-4">
                  <summary className="cursor-pointer font-heading font-bold text-charcoal leading-relaxed">{faq.question}</summary>
                  <p className="mt-3 text-sm font-body text-charcoal-light leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
            <nav aria-label="Turf care guides" className="mt-6 flex flex-col gap-3">
              {guides.map((guide) => <Link key={guide.slug} href={`/blog/${guide.slug}`} className="text-sm font-body text-forest underline underline-offset-4">{guide.title}</Link>)}
            </nav>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-forest text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-6">Ready for cleaner turf?</h2>
          <a href="#quote-form" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-forest font-body font-bold hover:bg-cream transition-colors">Get a free quote<ArrowRight className="w-5 h-5" aria-hidden="true" /></a>
        </div>
      </section>
    </div>
  );
}
