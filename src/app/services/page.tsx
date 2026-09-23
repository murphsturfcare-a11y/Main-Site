import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, HelpCircle } from 'lucide-react';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';

export const metadata: Metadata = {
  title: 'Artificial Turf Cleaning Services',
  description:
    "Professional artificial turf cleaning and maintenance services across our California service areas. Pet hair removal, blooming, disinfecting, deodorizing, and poop scooping. Get a free quote today.",
  alternates: {
    canonical: '/services',
  },
};

const services = [
  {
    name: 'Pet Hair & Debris Removal',
    slug: 'pet-hair-debris',
    href: '/services/pet-hair-debris',
    image: '/images/services/debris-removal.png',
    description:
      'All of our turf services begin with removing pet hair and waste along with any other debris such as leaves and branches. We also run a magnet over the turf to remove any metal objects and use a de-weeding tool to clear weeds from edges and seams.',
  },
  {
    name: 'Blooming & De-Compacting',
    slug: 'blooming-decompacting',
    href: '/services/blooming-decompacting',
    image: '/images/services/blooming.png',
    description:
      'Over time, frequent foot traffic causes turf blades to become matted down. Our blooming process uses commercial-grade machines to remove caked debris from the fibers and fluff the blades back to life, standing upright like natural grass.',
  },
  {
    name: 'Disinfect & Deodorize',
    slug: 'disinfect-deodorize',
    href: '/services/disinfect-deodorize',
    image: '/images/gallery/service-turf-disinfecting-v2.jpeg',
    description:
      'We remove debris, assess odor-prone areas, and plan treatment for your turf. Your technician explains the product, application precautions, and return-to-use instructions.',
  },
  {
    name: 'Poop Scooping & Removal',
    slug: 'poop-scooping',
    href: '/services/poop-scooping',
    image: '/images/services/poop-scooping.jpg',
    description:
      'Request pet waste pickup for the agreed turf areas, with access, disposal, and visit frequency confirmed in your quote.',
  },
  {
    name: 'Commercial Turf Cleaning',
    slug: 'commercial-turf-cleaning',
    href: '/commercial-turf-cleaning',
    image: '/images/gallery/service-turf-cleaning.png',
    description:
      'Commercial turf care for pet facilities, HOAs, schools, gyms, and hospitality spaces. Discuss surface requirements, access windows, and a maintenance scope for your property.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest via-forest-light to-sage py-12 sm:py-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <AnimateOnScroll direction="up" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 tracking-tight">
            Our Services
          </h1>
          <p className="text-lg sm:text-xl text-white/90 font-body max-w-3xl mx-auto leading-relaxed">
            Artificial turf cleaning and maintenance across our California service areas. Choose help with debris, matted fibers, pet odor, or waste pickup.
          </p>
        </AnimateOnScroll>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <StaggerItem key={service.slug}>
                <div
                  className="card-hover group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-sage/30 flex flex-col h-full"
                >
                  {/* Service image */}
                  <div className="img-zoom aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      loading={index === 0 ? 'eager' : undefined}
                      fetchPriority={index === 0 ? 'high' : undefined}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    {/* Service Name */}
                    <h2 className="text-xl font-bold font-heading text-charcoal mb-3">
                      {service.name}
                    </h2>

                    {/* Description */}
                    <p className="text-charcoal-light font-body text-sm leading-relaxed mb-6 flex-1">
                      {service.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Link
                        href="/locations"
                        className="text-sm font-semibold font-body text-forest hover:text-forest-dark transition-colors"
                      >
                        Get a Quote
                      </Link>
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-1.5 text-forest font-semibold font-body text-sm hover:text-forest-dark transition-colors group/link"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-white">
        <AnimateOnScroll direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-forest to-forest-dark rounded-3xl p-10 sm:p-14 shadow-xl">
            <HelpCircle className="w-12 h-12 text-sage mx-auto mb-5" />
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
              Not Sure What Your Turf Needs?
            </h2>
            <p className="text-lg text-white/85 font-body mb-8 max-w-2xl mx-auto leading-relaxed">
              Every yard is different. Share the condition of your turf, approximate size, and access details so we can discuss a suitable service scope and free quote.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/locations"
                className="btn-hover inline-flex items-center gap-2 bg-sage hover:bg-sage-light text-forest-dark font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md hover:shadow-lg"
              >
                Get a Free Quote
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
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
