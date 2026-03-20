'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PawPrint,
  ShieldCheck,
  Leaf,
  Dog,
  Flower2,
  SprayCan,
  Trash2,
  Sparkles,
  Star,
  ChevronDown,
  Phone,
  MapPin,
  ArrowRight,
  Clock,
  CheckCircle2,
  DollarSign,
} from 'lucide-react';

/* --------------------------- DATA --------------------------- */

const stats = [
  { label: 'Years Experience', value: '30+' },
  { label: 'Happy Customers', value: '2,500+' },
  { label: 'Satisfaction Rate', value: '100%' },
  { label: 'Projects Completed', value: '10,000+' },
];

const trustBadges = [
  { icon: PawPrint, label: '100% Pet Friendly' },
  { icon: Leaf, label: 'Eco Friendly' },
  { icon: ShieldCheck, label: 'Satisfaction Guaranteed' },
];

const services = [
  {
    icon: Dog,
    name: 'Pet Hair & Debris Removal',
    slug: 'pet-hair-debris',
    description:
      'Thorough removal of pet hair, fur, and debris from your artificial turf to keep it clean and safe for your family and pets.',
  },
  {
    icon: Flower2,
    name: 'Blooming & De-Compacting',
    slug: 'blooming-decompacting',
    description:
      "Restore your turf's natural look and feel with our professional blooming and de-compacting service that revives flattened fibers.",
  },
  {
    icon: SprayCan,
    name: 'Disinfect & Deodorize',
    slug: 'disinfect-deodorize',
    description:
      'Eliminate bacteria, odors, and harmful pathogens with our eco-friendly disinfecting and deodorizing treatment.',
  },
  {
    icon: Trash2,
    name: 'Poop Scooping & Removal',
    slug: 'poop-scooping',
    description:
      'Regular pet waste cleanup and removal to maintain a hygienic outdoor space for your family.',
  },
  {
    icon: Sparkles,
    name: 'Powered By OxyTurf',
    slug: 'oxyturf',
    description:
      'Our premium OxyTurf-powered deep cleaning system delivers the most thorough turf cleaning available.',
  },
];

const benefits = [
  {
    icon: PawPrint,
    title: '100% Pet Friendly',
    description:
      "All our products and methods are completely safe for your furry friends. Your pets can enjoy the turf right after service.",
  },
  {
    icon: Leaf,
    title: 'Eco Friendly',
    description:
      'We use environmentally responsible, biodegradable products that are safe for your family, pets, and the planet.',
  },
  {
    icon: ShieldCheck,
    title: 'Satisfaction Guaranteed',
    description:
      "Not happy with our work? We'll come back and make it right. Your satisfaction is our top priority, guaranteed.",
  },
];

const testimonials = [
  {
    quote:
      "Murphy's Turf transformed our backyard turf from matted and smelly to looking and feeling like brand new. The team was professional, punctual, and the results speak for themselves. Best turf cleaning service in Murrieta!",
    name: 'Sarah M.',
    location: 'Murrieta, CA',
  },
  {
    quote:
      "After trying other companies, we finally found Murphy's Turf. Their OxyTurf deep cleaning treatment brought our artificial grass back to life. The pet odor is completely gone. Highly recommend!",
    name: 'James & Linda R.',
    location: 'Huntington Beach, CA',
  },
  {
    quote:
      "As a property manager, I need reliable service. Murphy's Turf has maintained all six of our properties for two years now. Consistent quality, fair pricing, and they always go the extra mile.",
    name: 'Michael T.',
    location: 'Sacramento, CA',
  },
];

const locations = [
  {
    name: 'Huntington Beach / LA Area',
    slug: 'huntington-beach',
    tagline: 'Professional turf cleaning for the Southern California coast.',
  },
  {
    name: 'Murrieta / Inland Empire',
    slug: 'murrieta',
    tagline: 'Our home base for premium artificial turf care.',
  },
  {
    name: 'Martinez / Bay Area',
    slug: 'martinez',
    tagline: 'Trusted turf cleaning for Bay Area families and businesses.',
  },
  {
    name: 'Greater Sacramento',
    slug: 'sacramento',
    tagline: 'Professional turf cleaning across the Sacramento region.',
  },
];

const faqs = [
  {
    question: 'How much does turf cleaning cost?',
    answer:
      'Our artificial turf cleaning services are competitively priced based on the size of your turf area and services needed. We offer free on-site estimates so you know exactly what to expect. Contact us at (951) 331-3300 for a personalized quote.',
  },
  {
    question: 'How often should I have my artificial turf cleaned?',
    answer:
      "We recommend professional cleaning every 3-6 months for residential properties. Homes with pets may benefit from more frequent service, especially for deodorizing and pet hair removal. We'll create a custom schedule based on your needs.",
  },
  {
    question: 'Is the cleaning process safe for pets and children?',
    answer:
      'Absolutely! All of our products are 100% pet-friendly and child-safe. Our eco-friendly cleaning solutions are biodegradable and non-toxic. Your family and pets can enjoy the turf shortly after service.',
  },
  {
    question: 'What is OxyTurf?',
    answer:
      'OxyTurf is our premium deep-cleaning system that uses oxygen-based cleaning technology to thoroughly sanitize and refresh your artificial turf. It eliminates bacteria, odors, and buildup at the deepest level for the most comprehensive clean available.',
  },
  {
    question: 'Do you offer free estimates?',
    answer:
      'Yes! We provide free, no-obligation estimates for all of our services. Simply fill out the quote form on this page or give us a call at (951) 331-3300. We\'ll assess your property and provide a detailed estimate.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      "We serve communities across California including Huntington Beach, the greater LA area, Murrieta, the Inland Empire, Martinez, the Bay Area, and Greater Sacramento. If you're unsure whether we service your area, just give us a call.",
  },
];

/* --------------------- FAQ ACCORDION ITEM --------------------- */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white transition-shadow hover:shadow-md">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-heading font-semibold text-charcoal hover:text-forest transition-colors"
        aria-expanded={open}
      >
        <span className="text-base sm:text-lg">{question}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-sage transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className="accordion-content"
        style={{ maxHeight: open ? '500px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="px-6 pb-5 text-charcoal-light font-body leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

/* --------------------- QUOTE FORM --------------------- */

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
        <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-sage" />
        </div>
        <h3 className="font-heading font-bold text-2xl text-charcoal mb-2">
          Thank You!
        </h3>
        <p className="font-body text-charcoal-light max-w-md mx-auto">
          We&apos;ve received your request and will get back to you within 24 hours
          with a personalized quote. In the meantime, feel free to call us at{' '}
          <a href="tel:+19513313300" className="text-forest font-semibold hover:underline">
            (951) 331-3300
          </a>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-6 sm:p-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold font-body text-charcoal mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="John Murphy"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal placeholder:text-gray-400 focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold font-body text-charcoal mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal placeholder:text-gray-400 focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold font-body text-charcoal mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="(951) 331-3300"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal placeholder:text-gray-400 focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition"
          />
        </div>

        {/* Service Dropdown */}
        <div>
          <label htmlFor="service" className="block text-sm font-semibold font-body text-charcoal mb-1.5">
            Service Needed <span className="text-red-500">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition appearance-none bg-white"
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-semibold font-body text-charcoal mb-1.5">
            Preferred Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-semibold font-body text-charcoal mb-1.5">
            Property Address <span className="text-red-500">*</span>
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            placeholder="123 Main St, Murrieta, CA"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal placeholder:text-gray-400 focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition"
          />
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-semibold font-body text-charcoal mb-1.5">
            Message / Special Requests
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us about your turf, any specific concerns, or questions you have..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal placeholder:text-gray-400 focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition resize-y"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full sm:w-auto bg-sage hover:bg-sage-dark text-white font-heading font-bold text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
      >
        Submit Free Quote Request
      </button>
    </form>
  );
}

/* ======================= MAIN PAGE ======================= */

export default function Home() {
  return (
    <>
      {/* ----------------- 1. HERO ----------------- */}
      <section className="relative overflow-hidden">
        {/* Hero background image */}
        <Image
          src="/images/hero.jpg"
          alt="Clean artificial turf"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/95 via-forest/90 to-forest-light/85" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_25%_25%,white_1px,transparent_1px)] bg-[length:40px_40px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <span className="inline-block bg-sage/20 border border-sage/40 text-sage-light font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
              California&apos;s Trusted Turf Cleaning Professionals
            </span>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight tracking-tight">
              When You Care About Clean Turf, Call{' '}
              <span className="text-sage-light">Murphy&apos;s Turf</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-200 font-body leading-relaxed max-w-2xl">
              Worried about your pets ruining your turf? Count on Murphy&apos;s to help
              bring your artificial grass back to life with a variety of services
              ranging from reblooming to debris removal &amp; deodorizing.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-sage hover:bg-sage-dark text-white font-heading font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+19513313300"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-heading font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-200"
              >
                <Phone className="w-5 h-5" />
                (951) 331-3300
              </a>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-5 py-5 text-center"
              >
                <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                  {stat.value}
                </div>
                <div className="mt-1 font-body text-sm sm:text-base text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 2. TRUST BADGES ----------------- */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="flex items-center justify-center gap-3 py-3"
                >
                  <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-sage" />
                  </div>
                  <span className="font-heading font-semibold text-sm sm:text-base text-charcoal">
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------- 3. SERVICES OVERVIEW ----------------- */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              What We Offer
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Our Turf Cleaning Services
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              Comprehensive artificial turf care solutions to keep your outdoor
              space clean, fresh, and beautiful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl border border-gray-100 hover:border-sage/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-forest/10 group-hover:bg-sage/20 rounded-xl flex items-center justify-center transition-colors duration-300">
                    <Icon className="w-7 h-7 text-forest group-hover:text-sage transition-colors duration-300" />
                  </div>
                  <h3 className="mt-5 font-heading font-bold text-xl text-charcoal group-hover:text-forest transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-2 font-body text-charcoal-light leading-relaxed text-[15px]">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-body font-semibold text-sage group-hover:text-sage-dark transition-colors text-sm">
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------- 4. WHY CHOOSE US ----------------- */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              The Murphy&apos;s Difference
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Why Choose Murphy&apos;s Turf
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              We combine 30+ years of expertise with a genuine commitment to quality
              that sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="flex gap-5 bg-cream/60 rounded-2xl p-7 border border-gray-100 hover:border-sage/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-sage/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-charcoal">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 font-body text-charcoal-light leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------- 5. BEFORE / AFTER ----------------- */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              Real Results
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              See the Difference
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              Real results from real Murphy&apos;s Turf projects across California.
            </p>
          </div>

          <Image
            src="/images/before-after.png"
            alt="Before and after turf cleaning"
            width={1200}
            height={600}
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* ----------------- 6. TESTIMONIALS ----------------- */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              Customer Reviews
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              What Our Customers Say
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              Don&apos;t just take our word for it. Here&apos;s what homeowners and property
              managers across California have to say about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-cream/60 rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="font-body text-charcoal-light leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
                    <span className="font-heading font-bold text-forest text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-charcoal text-sm">
                      {t.name}
                    </p>
                    <p className="font-body text-charcoal-light text-xs">
                      {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 7. CTA BANNER ----------------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest to-forest-light" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_75%_50%,white_1px,transparent_1px)] bg-[length:32px_32px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
            Ready for Clean, Fresh Turf?
          </h2>
          <p className="mt-4 font-body text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Join thousands of happy customers across California. Get a
            personalized quote today and see why Murphy&apos;s Turf is the name
            California trusts.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-sage hover:bg-sage-dark text-white font-heading font-bold text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+19513313300"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-heading font-semibold text-lg px-10 py-4 rounded-xl transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              Call (951) 331-3300
            </a>
          </div>
        </div>
      </section>

      {/* ----------------- 8. SERVICE AREAS ----------------- */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              Where We Work
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Serving California Communities
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              Professional artificial turf cleaning in your neighborhood
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-sage/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-forest/10 group-hover:bg-sage/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-forest group-hover:text-sage transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-charcoal group-hover:text-forest transition-colors">
                      {loc.name}
                    </h3>
                    <p className="mt-1 font-body text-charcoal-light text-sm leading-relaxed">
                      {loc.tagline}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 font-body font-semibold text-sage group-hover:text-sage-dark transition-colors text-sm">
                      View Services
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 9. FAQ ACCORDION ----------------- */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              Got Questions?
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              Everything you need to know about our services. Can&apos;t find your
              answer?{' '}
              <Link href="/contact" className="text-sage hover:text-sage-dark font-semibold underline underline-offset-2">
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

      {/* ----------------- 10. QUOTE FORM ----------------- */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              Free Estimate
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Request Your Free Quote
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed max-w-2xl mx-auto">
              Fill out the form below and one of our turf care specialists will get
              back to you within 24 hours with a personalized quote.
            </p>
            <div className="flex items-center justify-center gap-6 mt-5 text-sm font-body text-charcoal-light">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sage" />
                No Obligation
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sage" />
                Response in 24hrs
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-sage" />
                No Hidden Fees
              </span>
            </div>
          </div>

          <QuoteForm />
        </div>
      </section>
    </>
  );
}
