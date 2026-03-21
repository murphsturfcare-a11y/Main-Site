'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Locations', href: '/locations' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo.png"
              alt="Murphy's Turf"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
            <span className="text-xl font-bold text-forest font-heading tracking-tight">
              Murphy&apos;s Turf
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-charcoal hover:text-forest font-medium font-body transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sage after:transition-all hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+19513313300"
              className="flex items-center gap-2 text-forest font-semibold font-body hover:text-forest-light transition-colors"
            >
              <Phone className="w-4 h-4" />
              (951) 331-3300
            </a>
            <Link
              href="/contact"
              className="bg-sage hover:bg-sage-dark text-white font-semibold px-6 py-2.5 rounded-lg transition-colors font-body shadow-sm hover:shadow-md"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-charcoal hover:text-forest transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-charcoal hover:bg-cream rounded-lg font-medium font-body transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <a
                href="tel:+19513313300"
                className="flex items-center gap-2 px-4 py-2 text-forest font-semibold font-body"
              >
                <Phone className="w-4 h-4" />
                (951) 331-3300
              </a>
              <Link
                href="/contact"
                className="block text-center bg-sage hover:bg-sage-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors font-body"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
