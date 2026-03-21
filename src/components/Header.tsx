'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const learnMoreItems = [
  { label: 'Turf Maintenance', href: '/learn-more/turf-maintenance' },
  { label: 'Turf Deodorizing', href: '/learn-more/turf-deodorizing' },
  { label: 'Turf Cleaning', href: '/learn-more/turf-cleaning' },
];

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Learn More', href: '#', dropdown: true },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/contact' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);
  const [mobileLearnMoreOpen, setMobileLearnMoreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
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
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) =>
              item.dropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setLearnMoreOpen(true)}
                  onMouseLeave={() => setLearnMoreOpen(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 text-charcoal hover:text-forest font-medium font-body transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sage after:transition-all hover:after:w-full"
                    onClick={() => setLearnMoreOpen((prev) => !prev)}
                  >
                    {item.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${learnMoreOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div
                    className={`absolute left-1/2 top-full z-50 mt-2 w-52 -translate-x-1/2 origin-top rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5 transition-all duration-200 ${
                      learnMoreOpen
                        ? 'pointer-events-auto scale-100 opacity-100'
                        : 'pointer-events-none scale-95 opacity-0'
                    }`}
                    role="menu"
                  >
                    {learnMoreItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        role="menuitem"
                        className="block px-4 py-2 text-sm font-body text-charcoal transition-colors hover:bg-cream hover:text-forest"
                        onClick={() => setLearnMoreOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-charcoal hover:text-forest font-medium font-body transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sage after:transition-all hover:after:w-full"
                >
                  {item.name}
                </Link>
              )
            )}
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) =>
                item.dropdown ? (
                  <div key={item.name}>
                    <button
                      type="button"
                      onClick={() => setMobileLearnMoreOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between px-4 py-3 text-charcoal hover:bg-cream rounded-lg font-medium font-body transition-colors"
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${
                          mobileLearnMoreOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        mobileLearnMoreOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="ml-4 border-l-2 border-sage/30 pl-4 pb-2">
                        {learnMoreItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block py-2 text-sm font-body text-charcoal-light transition-colors hover:text-forest"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-charcoal hover:bg-cream rounded-lg font-medium font-body transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
