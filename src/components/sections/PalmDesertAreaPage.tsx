import Link from 'next/link';
import { ArrowRight, CheckCircle, ChevronRight, MapPin, Phone } from 'lucide-react';
import LeadForm from '@/components/forms/LeadForm';
import {
  PALM_DESERT_PHONE,
  palmDesertAreas,
  palmDesertPath,
  type PalmDesertArea,
} from '@/data/palm-desert';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/schema';
import { COMPANY_NAME, SITE_URL } from '@/lib/seo/constants';

const services = [
  { slug: 'pet-hair-debris', name: 'Pet hair & debris removal', description: 'Remove loose and embedded debris as appropriate for the installed turf.' },
  { slug: 'blooming-decompacting', name: 'Blooming & de-compacting', description: 'Assess flattened fibers and compacted areas for suitable grooming.' },
  { slug: 'disinfect-deodorize', name: 'Disinfecting & deodorizing', description: 'Discuss odor concerns, product suitability, and treatment instructions.' },
  { slug: 'poop-scooping', name: 'Pet waste removal', description: 'Ask about waste pickup and upkeep between deeper cleaning visits.' },
];

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

      <section id="quote-form" className="bg-gradient-to-br from-forest via-forest-light to-sage py-12 sm:py-16 lg:py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-white/70 font-body mb-8">
            {crumbs.map((crumb, index) => (
              <span key={crumb.url} className="inline-flex items-center gap-2">
                {index > 0 && <ChevronRight aria-hidden="true" className="w-4 h-4" />}
                {index === crumbs.length - 1 ? <span aria-current="page" className="text-white">{crumb.name}</span> : <Link href={crumb.url.replace(SITE_URL, '') || '/'} className="hover:text-white underline-offset-4 hover:underline">{crumb.name}</Link>}
              </span>
            ))}
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="lg:pt-6">
              <p className="text-cream font-body text-sm font-semibold tracking-wider uppercase mb-4">Palm Desert service area</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight font-heading font-bold text-white mb-6">
                {commercial ? 'Commercial' : 'Artificial'} Turf Cleaning <span className="text-cream">in {area.name}</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-body mb-8">{content.summary}</p>
              <a href={`tel:${PALM_DESERT_PHONE}`} className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 text-forest text-lg font-body font-bold hover:bg-cream transition-colors">
                <Phone className="w-5 h-5" aria-hidden="true" /> {PALM_DESERT_PHONE}
              </a>
              <p className="mt-4 text-white/75 text-sm font-body">Free quote · Service at your property · Address-based coverage confirmation</p>
            </div>
            <LeadForm locationCity={area.name} locationSlug="palm-desert" />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-9">
            <p className="text-forest font-body font-semibold mb-2">Care built around your property</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-charcoal">{commercial ? `Planning commercial turf care in ${area.name}` : `What matters for turf cleaning in ${area.name}`}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {content.sections.map((section) => (
              <article key={section.title} className="rounded-2xl bg-white p-6 sm:p-7 border border-sage/10">
                <h3 className="text-xl font-heading font-bold text-charcoal mb-4">{section.title}</h3>
                <p className="text-charcoal-light font-body leading-relaxed">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-5">
            <MapPin className="w-8 h-8 text-sage shrink-0" aria-hidden="true" />
            <h2 className="text-3xl font-heading font-bold text-charcoal">{isHub ? 'Palm Desert and nearby service communities' : `${area.name} neighborhoods we cover`}</h2>
          </div>
          <p className="text-charcoal-light leading-relaxed font-body mb-6">{area.coverage}</p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {area.neighborhoods.map((name) => <li key={name} className="flex items-start gap-2 rounded-lg bg-cream p-4 text-charcoal font-body"><CheckCircle className="w-4 h-4 text-sage shrink-0 mt-1" aria-hidden="true" />{name}</li>)}
          </ul>
          <p className="text-sm text-charcoal-light font-body">Coverage includes other neighborhoods within the service area. For gated properties, include the approved entrance and an access contact when requesting your quote.</p>
          <div className="mt-8 border-t border-sage/20 pt-8">
            <h3 className="text-xl font-heading font-bold text-charcoal mb-4">{isHub ? 'Explore city-specific service information' : 'Nearby service communities'}</h3>
            <div className="flex flex-wrap gap-3">
              {palmDesertAreas.filter((place) => place.slug !== area.slug).map((place) => (
                <Link key={place.slug} href={palmDesertPath(place, commercial)} className="inline-flex items-center gap-2 border border-sage/25 rounded-lg px-4 py-3 text-forest font-body font-semibold hover:bg-cream transition-colors">{place.name}<ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-charcoal mb-4">Choose the help your turf needs</h2>
          <p className="text-charcoal-light font-body leading-relaxed max-w-3xl mb-8">A quote should identify the surface, affected areas, and agreed work. Share photos, approximate measurements, pet use, access details, and any manufacturer care instructions. Cleaning addresses turf upkeep; damaged seams, a failed base, or permanent wear may need a separate repair.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group rounded-xl bg-white p-6 border border-sage/10 hover:border-sage/40 transition-colors">
                <h3 className="text-lg font-heading font-bold text-charcoal mb-3">{service.name}</h3>
                <p className="text-sm font-body text-charcoal-light leading-relaxed mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-forest font-body text-sm font-semibold">Service details <ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
          <Link href={palmDesertPath(area, !commercial)} className="mt-8 inline-flex items-center gap-2 font-body font-semibold text-forest underline underline-offset-4">{commercial ? `Residential turf cleaning in ${area.name}` : `Commercial turf cleaning in ${area.name}`}<ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-charcoal mb-8">{area.name} turf cleaning questions</h2>
          <div className="space-y-4">
            {content.faqs.map((faq) => (
              <details key={faq.question} className="rounded-xl border border-sage/20 p-5 sm:p-6 bg-cream">
                <summary className="cursor-pointer font-heading font-bold text-charcoal leading-relaxed">{faq.question}</summary>
                <p className="mt-4 font-body text-charcoal-light leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
          <h3 className="text-2xl font-heading font-bold text-charcoal mt-12 mb-5">Practical desert turf care guides</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {guides.map((guide) => <Link key={guide.slug} href={`/blog/${guide.slug}`} className="flex items-start justify-between gap-4 font-body text-forest font-semibold rounded-lg border border-sage/20 p-4 hover:bg-cream">{guide.title}<ArrowRight className="w-4 h-4 shrink-0 mt-1" aria-hidden="true" /></Link>)}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-forest text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-5">Get a turf cleaning quote for {area.name}</h2>
          <p className="font-body text-lg text-white/85 leading-relaxed mb-8">Tell {COMPANY_NAME} where the property is and what needs attention. We’ll review your service request and help confirm the scope and access details.</p>
          <a href="#quote-form" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-forest font-body font-bold hover:bg-cream transition-colors">Request a free quote<ArrowRight className="w-5 h-5" aria-hidden="true" /></a>
        </div>
      </section>
    </div>
  );
}
