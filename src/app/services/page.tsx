import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Trash2,
  Wind,
  Sprout,
  Droplets,
  Bug,
  CalendarDays,
  ArrowRight,
  Phone,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Professional Lawn Care Services',
  description:
    "Explore Murphy's Turf Care comprehensive lawn care services including lawn cleaning, aeration, seeding, fertilization, pest control, and seasonal maintenance across California.",
};

const services = [
  {
    name: 'Lawn Cleaning',
    slug: 'lawn-cleaning',
    icon: Trash2,
    price: 49,
    description:
      'Professional debris removal, dethatching, and deep cleaning to restore your lawn. We tackle debris, leaves, and built-up thatch so your turf can breathe and thrive again.',
  },
  {
    name: 'Aeration',
    slug: 'aeration',
    icon: Wind,
    price: 89,
    description:
      "Core aeration breaks through compacted soil, allowing water, oxygen, and nutrients to reach your lawn's root zone. Essential for maintaining a healthy, resilient lawn in California's climate.",
  },
  {
    name: 'Seeding',
    slug: 'seeding',
    icon: Sprout,
    price: 129,
    description:
      'Overseeding and new lawn establishment using drought-resistant, California-adapted grass varieties like Bermuda grass, tall fescue, and St. Augustine. Build a lush lawn engineered for our unique climate.',
  },
  {
    name: 'Fertilization',
    slug: 'fertilization',
    icon: Droplets,
    price: 59,
    description:
      "Custom nutrient programs designed specifically for California's varied soil conditions and extended growing season. Our slow-release formulas deliver sustained nutrition while protecting local waterways.",
  },
  {
    name: 'Pest Control',
    slug: 'pest-control',
    icon: Bug,
    price: 79,
    description:
      'Eco-friendly, integrated pest management for grubs, chinch bugs, sod webworms, and other common California lawn pests. Targeted treatments that eliminate threats without harming beneficial insects.',
  },
  {
    name: 'Seasonal Maintenance',
    slug: 'seasonal-maintenance',
    icon: CalendarDays,
    price: 199,
    priceLabel: '/month',
    description:
      'Year-round comprehensive lawn care covering spring cleanup, summer watering management, fall aeration and overseeding, and winter preparation. One program, four seasons of results.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest via-forest-light to-sage py-20 sm:py-28">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 tracking-tight">
            Our Professional Services
          </h1>
          <p className="text-lg sm:text-xl text-white/90 font-body max-w-3xl mx-auto leading-relaxed">
            Comprehensive lawn care solutions tailored for California&apos;s unique climate.
            From routine cleaning to full seasonal programs, we have the expertise and
            equipment to keep your turf looking its absolute best year-round.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.slug}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-sage/30 flex flex-col"
                >
                  <div className="p-8 flex-1 flex flex-col">
                    {/* Icon */}
                    <div className="w-14 h-14 bg-sage/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-sage/20 transition-colors">
                      <Icon className="w-7 h-7 text-forest" />
                    </div>

                    {/* Service Name */}
                    <h2 className="text-xl font-bold font-heading text-charcoal mb-3">
                      {service.name}
                    </h2>

                    {/* Description */}
                    <p className="text-charcoal-light font-body text-sm leading-relaxed mb-6 flex-1">
                      {service.description}
                    </p>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-charcoal-light font-body uppercase tracking-wide">
                          Starting at
                        </span>
                        <p className="text-2xl font-bold font-heading text-forest">
                          ${service.price}
                          {service.priceLabel && (
                            <span className="text-sm font-normal text-charcoal-light">
                              {service.priceLabel}
                            </span>
                          )}
                        </p>
                      </div>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-sage font-semibold font-body text-sm hover:text-forest transition-colors group/link"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-forest to-forest-dark rounded-3xl p-10 sm:p-14 shadow-xl">
            <HelpCircle className="w-12 h-12 text-sage mx-auto mb-5" />
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-lg text-white/85 font-body mb-8 max-w-2xl mx-auto leading-relaxed">
              Every lawn is different. Let our team assess your turf and recommend the
              perfect combination of services for your property. Free consultations
              available for all California homeowners.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md hover:shadow-lg"
              >
                Get a Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+19513313300"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body backdrop-blur-sm"
              >
                <Phone className="w-5 h-5" />
                (951) 331-3300
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
