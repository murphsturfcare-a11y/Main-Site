'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const learnMoreItems = [
  { label: 'Turf Maintenance', href: '/learn-more/turf-maintenance' },
  { label: 'Turf Deodorizing', href: '/learn-more/turf-deodorizing' },
  { label: 'Turf Cleaning', href: '/learn-more/turf-cleaning' },
];

/* ------------------------------------------------------------------ */
/*  Desktop dropdown                                                   */
/* ------------------------------------------------------------------ */

interface DropdownProps {
  label: string;
  items: { label: string; href: string }[];
  scrolled: boolean;
}

function DesktopDropdown({ label, items, scrolled }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  // Close when focus leaves the container entirely
  const handleBlur = (e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1 font-body text-sm font-medium transition-colors duration-300 hover:text-sage ${
          scrolled ? 'text-charcoal' : 'text-white'
        }`}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`absolute left-1/2 top-full z-50 mt-2 w-52 -translate-x-1/2 origin-top rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5 transition-all duration-200 ${
          open
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        }`}
        role="menu"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            className="block px-4 py-2 text-sm font-body text-charcoal transition-colors hover:bg-cream hover:text-forest"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile collapsible section                                         */
/* ------------------------------------------------------------------ */

interface CollapsibleProps {
  label: string;
  items: { label: string; href: string }[];
  onNavigate: () => void;
}

function MobileCollapsible({ label, items, onNavigate }: CollapsibleProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between py-3 font-body text-base font-medium text-charcoal"
      >
        {label}
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-200 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="ml-4 border-l-2 border-sage/30 pl-4 pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="block py-2 text-sm font-body text-charcoal-light transition-colors hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* Track scroll position */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll(); // initialise on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const linkClass = `font-body text-sm font-medium transition-colors duration-300 hover:text-sage ${
    scrolled ? 'text-charcoal' : 'text-white'
  }`;

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        {/* ---- Logo ---- */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-colors duration-300"
          aria-label="Murphy's Turf — Home"
        >
          <Image
            src="/images/logo.png"
            alt="Murphy's Turf"
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
          />
          <span
            className={`font-heading text-xl font-bold transition-colors duration-300 ${
              scrolled ? 'text-forest' : 'text-white'
            }`}
          >
            Murphy&apos;s Turf
          </span>
        </Link>

        {/* ---- Desktop nav ---- */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          <Link href="/" className={linkClass}>
            Home
          </Link>

          <DesktopDropdown
            label="Learn More"
            items={learnMoreItems}
            scrolled={scrolled}
          />

          <Link href="/about" className={linkClass}>
            About
          </Link>

          <Link href="/services" className={linkClass}>
            Services
          </Link>

          <Link href="/contact" className={linkClass}>
            Pricing
          </Link>

          <Link href="/contact" className={linkClass}>
            Contact
          </Link>

          <Link href="/blog" className={linkClass}>
            Blog
          </Link>
        </div>

        {/* ---- Desktop CTA ---- */}
        <Link
          href="/contact"
          className="hidden lg:inline-flex bg-sage text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-forest transition-colors duration-200"
        >
          Get Free Quote
        </Link>

        {/* ---- Mobile hamburger ---- */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className={`lg:hidden transition-colors duration-300 ${
            scrolled ? 'text-charcoal' : 'text-white'
          }`}
          aria-label="Open menu"
        >
          <Menu className="h-7 w-7" />
        </button>
      </nav>

      {/* ================================================================ */}
      {/*  Mobile drawer                                                    */}
      {/* ================================================================ */}

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          drawerOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={closeDrawer}
      />

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <Link
            href="/"
            onClick={closeDrawer}
            className="flex items-center gap-2 text-forest"
            aria-label="Murphy's Turf — Home"
          >
            <Image
              src="/images/logo.png"
              alt="Murphy's Turf"
              width={48}
              height={48}
              className="w-10 h-10 object-contain"
            />
            <span className="font-heading text-lg font-bold">
              Murphy&apos;s Turf
            </span>
          </Link>

          <button
            type="button"
            onClick={closeDrawer}
            className="text-charcoal-light hover:text-charcoal transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Drawer body */}
        <div className="overflow-y-auto h-[calc(100%-73px)] px-5 py-4">
          <Link
            href="/"
            onClick={closeDrawer}
            className="block py-3 font-body text-base font-medium text-charcoal transition-colors hover:text-forest"
          >
            Home
          </Link>

          <MobileCollapsible
            label="Learn More"
            items={learnMoreItems}
            onNavigate={closeDrawer}
          />

          <Link
            href="/about"
            onClick={closeDrawer}
            className="block py-3 font-body text-base font-medium text-charcoal transition-colors hover:text-forest"
          >
            About
          </Link>

          <Link
            href="/services"
            onClick={closeDrawer}
            className="block py-3 font-body text-base font-medium text-charcoal transition-colors hover:text-forest"
          >
            Services
          </Link>

          <Link
            href="/contact"
            onClick={closeDrawer}
            className="block py-3 font-body text-base font-medium text-charcoal transition-colors hover:text-forest"
          >
            Pricing
          </Link>

          <Link
            href="/contact"
            onClick={closeDrawer}
            className="block py-3 font-body text-base font-medium text-charcoal transition-colors hover:text-forest"
          >
            Contact
          </Link>

          <Link
            href="/blog"
            onClick={closeDrawer}
            className="block py-3 font-body text-base font-medium text-charcoal transition-colors hover:text-forest"
          >
            Blog
          </Link>

          {/* CTA */}
          <Link
            href="/contact"
            onClick={closeDrawer}
            className="mt-6 block text-center bg-sage text-white px-5 py-3 rounded-lg font-semibold hover:bg-forest transition-colors duration-200"
          >
            Get Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
