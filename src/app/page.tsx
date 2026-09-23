import Link from 'next/link';
import Image from 'next/image';
import { turfGalleryPhotos } from '@/data/gallery';
import HeroMedia from '@/components/sections/HeroMedia';
import { locations } from '@/data/locations';
import { homeFaqs as faqs } from '@/data/home-faqs';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateWebsiteSchema } from '@/lib/seo/schema';
import {
  ChevronDown,
  MapPin,
  ArrowRight,
  PawPrint,
  Leaf,
  ThumbsUp,
} from 'lucide-react';

/* ========================== DATA ========================== */

const services = [
  {
    name: 'Pet Hair & Debris Removal',
    slug: 'pet-hair-debris',
    description:
      'We remove pet hair, waste, leaves, branches, and run a magnet for metal objects while de-weeding edges and seams as part of the agreed cleaning scope.',
    image: '/images/gallery/service-pet-hair-debris.jpeg',
  },
  {
    name: 'Blooming & De-Compacting',
    slug: 'blooming-decompacting',
    description:
      'We assess flattened fibers and compacted areas for suitable grooming. Results depend on the condition of the installed turf.',
    image: '/images/gallery/service-turf-blooming-v2.png',
  },
  {
    name: 'Disinfect & Deodorize',
    slug: 'disinfect-deodorize',
    description:
      'We treat odor-prone turf and explain the product-specific precautions, drying time, and next steps before your family returns to the yard.',
    image: '/images/gallery/service-turf-disinfecting-v2.jpeg',
  },
  {
    name: 'Poop Scooping & Removal',
    slug: 'poop-scooping',
    description:
      'Convenient pet waste removal plans designed to keep your yard fresh, clean, and ready for your family to enjoy every day.',
    image: '/images/gallery/service-turf-deodorizing.png',
  },
];





const processSteps = [
  {
    image: '/images/gallery/process-contact-us.png',
    title: 'Contact Us',
    description: 'Get a free quote for your turf cleaning needs',
  },
  {
    image: '/images/gallery/process-schedule-estimate.png',
    title: 'Get Your Fast Online Quote',
    description: 'Share measurements and photos so we can review the scope and advise whether a visit is needed',
  },
  {
    image: '/images/gallery/process-get-job-done.png',
    title: 'Get The Job Done',
    description: 'Sit back and enjoy your fresh, clean turf',
  },
];

const galleryImages = turfGalleryPhotos;

/* ===================== FAQ ACCORDION ITEM ===================== */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border border-gray-200 rounded-xl bg-white open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-heading font-semibold text-charcoal hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest [&::-webkit-details-marker]:hidden">
        <span className="text-base sm:text-lg">{question}</span>
        <ChevronDown aria-hidden="true" className="w-5 h-5 shrink-0 text-forest transition-transform group-open:rotate-180" />
      </summary>
      <p className="px-6 pb-5 text-charcoal-light font-body leading-relaxed">{answer}</p>
    </details>
  );
}

/* =================== LOCATION SELECTOR =================== */

function LocationSelector({ dark }: { dark?: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {locations.map((loc, index) => (
        <Link
          key={loc.slug}
          href={`/locations/${loc.slug}`}
          className={`group flex items-center gap-3 px-5 py-4 rounded-xl font-heading font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-light ${index === locations.length - 1 && locations.length % 2 !== 0 ? 'sm:col-span-2' : ''} ${
            dark
              ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
              : 'bg-white border border-gray-200 text-charcoal hover:border-sage/40 hover:shadow-lg'
          }`}
        >
          <MapPin className={`w-5 h-5 flex-shrink-0 ${dark ? 'text-sage-light' : 'text-sage'}`} />
          <span className="min-w-0">
            <span className="block text-sm sm:text-base">{loc.name}</span>
          </span>
          <ArrowRight className={`w-4 h-4 ml-auto transition-transform group-hover:translate-x-1 ${dark ? 'text-sage-light' : 'text-sage'}`} />
        </Link>
      ))}
    </div>
  );
}

/* ==================== MAIN PAGE ==================== */

export default function Home() {
  return (
    <>
      {/* ────────────────── 1. HERO SECTION ────────────────── */}
      <section className="relative overflow-hidden">
        <HeroMedia />
        {/* Dark overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-forest-dark/95 via-forest/85 to-forest-dark/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-48 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: headline */}
            <div>
              <span className="inline-block bg-sage/20 border border-sage/40 text-sage-light font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
                Professional Artificial Turf Cleaning
              </span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
                Clean Turf,{' '}
                <span className="text-sage-light">Less Upkeep.</span>
              </h1>
              <p className="mt-5 text-lg sm:text-xl text-gray-200 font-body leading-relaxed max-w-xl">
                Artificial turf cleaning, pet odor treatment, and maintenance for California homes and businesses.
              </p>
            </div>

            {/* Right: location selector CTA */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white mb-5">
                Select Your Area to Get a Free Quote
              </h2>
              <LocationSelector dark />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 2. SERVICES SECTION ────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block font-body font-semibold text-forest text-sm uppercase tracking-widest mb-3">
              What We Offer
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-sage/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="aspect-[5/4] relative overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    loading={index === 0 ? 'eager' : undefined}
                    fetchPriority={index === 0 ? 'high' : undefined}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-lg text-charcoal group-hover:text-forest transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-2 font-body text-charcoal-light leading-relaxed text-sm flex-1">
                    {service.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 font-body font-semibold text-forest group-hover:text-forest-dark transition-colors text-sm">
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 3. ABOUT US SECTION ────────────────── */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative aspect-[5/4] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/gallery/about-turf-cleaning.png"
                alt="Murphy's Turf professional cleaning team"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <span className="inline-block font-body font-semibold text-forest text-sm uppercase tracking-widest mb-3">
                About Us
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
                Reliable Turf Cleaning &amp; Maintenance
              </h2>
              <p className="mt-5 font-body text-charcoal-light text-lg leading-relaxed">
                We help homeowners and property managers address debris, pet odor, and matted turf. Your quote confirms the areas and services included, with care instructions suited to your installation.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  { icon: PawPrint, label: 'Care for Pet Yards' },
                  { icon: Leaf, label: 'Surface-Specific Care' },
                  { icon: ThumbsUp, label: 'Clear Service Scope' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sage/15 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-forest" />
                      </div>
                      <span className="font-heading font-semibold text-charcoal">{item.label}</span>
                    </li>
                  );
                })}
              </ul>
              <a
                href="#get-quote"
                className="mt-8 inline-flex items-center justify-center gap-2 bg-sage hover:bg-sage-light text-forest-dark font-heading font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 4. THREE-STEP PROCESS ────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block font-body font-semibold text-forest text-sm uppercase tracking-widest mb-3">
              How It Works
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Our Simple 3 Step Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {processSteps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-5">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-sage text-forest-dark rounded-full flex items-center justify-center font-heading font-bold text-sm shadow-md">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-heading font-bold text-xl text-charcoal">{step.title}</h3>
                <p className="mt-2 font-body text-charcoal-light leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#get-quote"
              className="inline-flex items-center justify-center gap-2 bg-sage hover:bg-sage-light text-forest-dark font-heading font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ────────────────── 5. PHOTO GALLERY ────────────────── */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block font-body font-semibold text-forest text-sm uppercase tracking-widest mb-3">
              Turf Gallery
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Outdoor Turf Spaces
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {galleryImages.map((img) => (
              <div
                key={img.src}
                className="relative aspect-[5/4] rounded-xl overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-forest-dark/0 group-hover:bg-forest-dark/20 transition-colors duration-300" />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#get-quote"
              className="inline-flex items-center justify-center gap-2 bg-sage hover:bg-sage-light text-forest-dark font-heading font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ────────────────── 7. FAQ ACCORDION ────────────────── */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block font-body font-semibold text-forest text-sm uppercase tracking-widest mb-3">
              Got Questions?
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              Can&apos;t find your answer?{' '}
              <Link
                href="/locations"
                className="text-forest hover:text-forest-dark font-semibold underline underline-offset-2"
              >
                Contact us directly
              </Link>.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      <JsonLd schema={generateWebsiteSchema()} />

      {/* FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          }),
        }}
      />

      {/* ────────────────── 8. BOTTOM CTA SECTION ────────────────── */}
      <section id="get-quote" className="relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark via-forest to-forest-light" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_75%_50%,white_1px,transparent_1px)] bg-[length:32px_32px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
            Ready for Fresh, Clean Turf?
          </h2>
          <p className="mt-4 font-body text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Select your area below for a free, no-obligation quote.
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <LocationSelector dark />
          </div>
        </div>
      </section>
    </>
  );
}
