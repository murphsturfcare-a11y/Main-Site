import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

const serviceLinks = [
  { name: 'Pet Hair & Debris Removal', href: '/services/pet-hair-debris' },
  { name: 'Blooming & De-Compacting', href: '/services/blooming-decompacting' },
  { name: 'Disinfect & Deodorize', href: '/services/disinfect-deodorize' },
  { name: 'Poop Scooping & Removal', href: '/services/poop-scooping' },
  { name: 'Powered By OxyTurf', href: '/services/oxyturf' },
];

const locationLinks = [
  { name: 'Huntington Beach / LA Area', href: '/locations/huntington-beach' },
  { name: 'Murrieta / Inland Empire', href: '/locations/murrieta' },
  { name: 'Martinez / Bay Area', href: '/locations/martinez' },
  { name: 'Greater Sacramento', href: '/locations/sacramento' },
];

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/murphysturfcare/', icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100090088264095', icon: Facebook },
  { name: 'YouTube', href: 'https://www.youtube.com/@murphysturfcare/featured', icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.png"
                alt="Murphy's Turf"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold font-heading text-white">
                Murphy&apos;s Turf
              </span>
            </Link>
            <p className="text-gray-400 font-body text-sm leading-relaxed mb-6">
              California&apos;s trusted artificial turf cleaning experts. Specializing in pet hair
              removal, turf deodorizing, and maintenance. Serving California since 1994.
            </p>
            <div className="space-y-3">
              <a href="tel:+19513313300" className="flex items-center gap-2 text-gray-300 hover:text-sage transition-colors text-sm font-body">
                <Phone className="w-4 h-4" />
                (951) 331-3300
              </a>
              <a href="mailto:info@murphysturf.com" className="flex items-center gap-2 text-gray-300 hover:text-sage transition-colors text-sm font-body">
                <Mail className="w-4 h-4" />
                info@murphysturf.com
              </a>
              <div className="flex items-center gap-2 text-gray-300 text-sm font-body">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                26323 Jefferson Avenue, Murrieta, CA 92562
              </div>
            </div>
            {/* Social Media Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-gray-400 hover:text-sage transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
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
              &copy; {new Date().getFullYear()} Murphy&apos;s Turf. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm font-body">
              100% Pet Friendly | Eco Friendly | Satisfaction Guaranteed
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
