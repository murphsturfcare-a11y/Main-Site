import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Award,
  Heart,
  Leaf,
  Users,
  Shield,
  Phone,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  Sprout,
  Handshake,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about Murphy's Turf Care — California's trusted lawn care partner since 2018. Family-owned, community-driven, and committed to delivering exceptional lawn care across California.",
  openGraph: {
    title: "About Murphy's Turf Care | California's Trusted Lawn Care Partner",
    description:
      "Founded in 2018 by Patrick Murphy, Murphy's Turf Care has grown from a one-truck operation to a team of 25+ trained professionals serving California communities.",
  },
};

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description:
      'Every job done right, every time. We never cut corners — from the first pass of the mower to the final walkthrough, our team holds itself to the highest standard.',
  },
  {
    icon: Leaf,
    title: 'Eco-Conscious',
    description:
      'We use environmentally responsible products and sustainable practices that protect your family, pets, and the California landscape we all share.',
  },
  {
    icon: Heart,
    title: 'Customer Focused',
    description:
      'Your satisfaction drives everything we do. We listen, communicate clearly, and go the extra mile to ensure every customer feels valued and heard.',
  },
  {
    icon: Handshake,
    title: 'Community Roots',
    description:
      'Proud to serve and give back to the California communities that made us who we are. We sponsor local youth sports and participate in neighborhood beautification.',
  },
];

const stats = [
  { value: '8+', label: 'Years in Business' },
  { value: '25+', label: 'Team Members' },
  { value: '2,500+', label: 'Happy Customers' },
  { value: '10,000+', label: 'Projects Completed' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '4', label: 'Service Areas' },
];

const certifications = [
  {
    icon: Shield,
    name: 'California Department of Pesticide Regulation Licensed',
    description: 'Fully licensed for commercial and residential lawn care applications across the state of California.',
  },
  {
    icon: Users,
    name: 'National Association of Landscape Professionals',
    description: 'Active member committed to industry best practices and continuing professional education.',
  },
  {
    icon: Sprout,
    name: 'EPA WaterSense Partner',
    description: 'Recognized for water-efficient landscaping practices that conserve California\'s precious water resources.',
  },
  {
    icon: Star,
    name: 'BBB Accredited — A+ Rating',
    description: 'Accredited by the Better Business Bureau with their highest rating for trust and customer service.',
  },
  {
    icon: CheckCircle,
    name: 'California Landscape Contractors Association Member',
    description: 'Member of CLCA for excellence in sustainable landscape management and environmental stewardship.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest via-forest-light to-sage py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-sage rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 tracking-tight">
            About Murphy&apos;s Turf Care
          </h1>
          <p className="text-lg sm:text-xl text-white/90 font-body max-w-3xl mx-auto leading-relaxed">
            California&apos;s trusted lawn care partner since 2018. Family-owned, community-driven,
            and committed to making every yard in California the best it can be.
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-1 bg-sage rounded-full" />
              <span className="text-sage-dark font-semibold font-body text-sm uppercase tracking-wider">
                Our Story
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-charcoal mb-10">
              From One Truck to Serving California
            </h2>

            <div className="space-y-6 text-charcoal-light font-body text-lg leading-relaxed">
              <p>
                Murphy&apos;s Turf Care was born in 2018 out of a simple belief: that every homeowner
                deserves a lawn care partner who genuinely cares about the work. Founder Patrick Murphy
                grew up in Murrieta, California, spending summers alongside his grandfather and father
                — both professional landscapers who taught him that a well-kept lawn is more than
                just grass. It&apos;s the place where families gather for barbecues, kids play catch
                after school, and neighbors come together. Patrick started with a single truck, a
                commercial mower, and a determination to bring that third-generation craftsmanship to
                every property he touched. Word spread quickly. Within the first year, referrals alone
                had him booked solid across three neighborhoods in the Inland Empire.
              </p>
              <p>
                What began as a solo operation has grown into a team of over 25 trained professionals
                who share Patrick&apos;s passion for doing things the right way. We invested early in
                training and certification because we know that California&apos;s unique climate —
                the hot summers, water conservation demands, and varied soil conditions — demands more than a
                one-size-fits-all approach. Every technician on our crew understands the science
                behind healthy turf and receives ongoing education in sustainable lawn care practices.
                That investment shows up in the results: lawns that stay greener longer, root systems
                that withstand drought, and customers who stay with us season after season. Today, we
                proudly serve four communities across California, from Los Angeles to Sacramento.
              </p>
              <p>
                Even as we&apos;ve grown, we&apos;ve never lost the values that got us here.
                Murphy&apos;s Turf Care is still family-owned and operated, and Patrick is still out on
                properties every week, checking on jobs and talking with customers. We treat every
                lawn as if it were our own — because at the end of the day, our reputation is built
                one yard at a time. We are not a franchise and we are not backed by a national
                corporation. We are your neighbors, and we take real pride in the communities we
                serve. That personal accountability is something no big company can replicate, and
                it&apos;s something we will never compromise on as we continue to grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-4xl mx-auto bg-gradient-to-br from-forest to-forest-light rounded-2xl p-10 sm:p-14 text-center shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sage/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 rounded-full mb-6">
                <Leaf className="w-8 h-8 text-sage-light" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg sm:text-xl text-white/90 font-body leading-relaxed max-w-3xl mx-auto">
                To deliver exceptional lawn care services that enhance the beauty and health of
                California&apos;s outdoor spaces, using sustainable practices and building lasting
                relationships with our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-1 bg-sage rounded-full" />
              <span className="text-sage-dark font-semibold font-body text-sm uppercase tracking-wider">
                What We Stand For
              </span>
              <div className="w-12 h-1 bg-sage rounded-full" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-charcoal">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sage/10 rounded-2xl mb-6 group-hover:bg-sage/20 transition-colors">
                  <value.icon className="w-8 h-8 text-forest" />
                </div>
                <h3 className="text-xl font-bold font-heading text-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-charcoal-light font-body text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By the Numbers Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-forest-dark via-forest to-forest-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
              By the Numbers
            </h2>
            <p className="text-white/80 font-body text-lg max-w-2xl mx-auto">
              The results speak for themselves. Here&apos;s a snapshot of what we&apos;ve
              built over the past eight years.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold font-heading text-sage mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80 font-body text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Memberships Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-1 bg-sage rounded-full" />
              <span className="text-sage-dark font-semibold font-body text-sm uppercase tracking-wider">
                Trusted & Verified
              </span>
              <div className="w-12 h-1 bg-sage rounded-full" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-charcoal mb-4">
              Certifications & Memberships
            </h2>
            <p className="text-charcoal-light font-body text-lg max-w-2xl mx-auto">
              We hold ourselves to the highest industry standards. These certifications reflect
              our commitment to quality, safety, and environmental responsibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-start gap-4 bg-cream rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center">
                  <cert.icon className="w-6 h-6 text-forest" />
                </div>
                <div>
                  <h3 className="font-bold font-heading text-charcoal text-sm mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-charcoal-light font-body text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-charcoal mb-6">
            Ready to Experience the Murphy&apos;s Turf Care Difference?
          </h2>
          <p className="text-charcoal-light font-body text-lg max-w-2xl mx-auto mb-10">
            Join over 2,500 happy homeowners across California. Get your free, no-obligation
            quote today and see why California trusts Murphy&apos;s Turf Care.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors font-body shadow-md hover:shadow-lg text-lg"
            >
              Get Your Free Quote
            </Link>
            <a
              href="tel:+19513313300"
              className="inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-light text-white font-semibold px-8 py-4 rounded-lg transition-colors font-body shadow-md hover:shadow-lg text-lg"
            >
              <Phone className="w-5 h-5" />
              (951) 331-3300
            </a>
          </div>
          <p className="mt-6 text-charcoal-light font-body text-sm flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            Mon&ndash;Fri 7 AM&ndash;6 PM &middot; Sat 8 AM&ndash;4 PM
            <span className="mx-1">&middot;</span>
            <MapPin className="w-4 h-4" />
            Serving 4 California Communities
          </p>
        </div>
      </section>
    </>
  );
}
