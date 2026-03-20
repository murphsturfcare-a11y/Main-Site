import Link from 'next/link';
import { Leaf, Phone, Mail, MapPin } from 'lucide-react';

const serviceLinks = [
  { name: 'Lawn Cleaning', href: '/services/lawn-cleaning' },
  { name: 'Aeration', href: '/services/aeration' },
  { name: 'Seeding', href: '/services/seeding' },
  { name: 'Fertilization', href: '/services/fertilization' },
  { name: 'Pest Control', href: '/services/pest-control' },
  { name: 'Seasonal Maintenance', href: '/services/seasonal-maintenance' },
];

const locationLinks = [
  { name: 'Los Angeles', href: '/locations/los-angeles' },
  { name: 'Murrieta', href: '/locations/murrieta' },
  { name: 'Martinez', href: '/locations/martinez' },
  { name: 'Sacramento', href: '/locations/sacramento' },
];

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold font-heading text-white">
                Murphy&apos;s Turf Care
              </span>
            </Link>
            <p className="text-gray-400 font-body text-sm leading-relaxed mb-6">
              California&apos;s trusted turf cleaning and lawn care experts. Family-owned since 2018,
              serving California communities with pride and professionalism.
            </p>
            <div className="space-y-3">
              <a href="tel:+19513313300" className="flex items-center gap-2 text-gray-300 hover:text-sage transition-colors text-sm font-body">
                <Phone className="w-4 h-4" />
                (951) 331-3300
              </a>
              <a href="mailto:info@murphysturfcare.com" className="flex items-center gap-2 text-gray-300 hover:text-sage transition-colors text-sm font-body">
                <Mail className="w-4 h-4" />
                info@murphysturfcare.com
              </a>
              <div className="flex items-center gap-2 text-gray-300 text-sm font-body">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                26323 Jefferson Avenue, Murrieta, CA 92562
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-4">Our Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-sage transition-colors text-sm font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Column */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {locationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-sage transition-colors text-sm font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-sage transition-colors text-sm font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold font-heading mb-2">Business Hours</h4>
              <div className="text-gray-400 text-sm font-body space-y-1">
                <p>Mon - Fri: 7:00 AM - 6:00 PM</p>
                <p>Saturday: 8:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm font-body">
              &copy; {new Date().getFullYear()} Murphy&apos;s Turf Care. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm font-body">
              Licensed & Insured | Serving California
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
