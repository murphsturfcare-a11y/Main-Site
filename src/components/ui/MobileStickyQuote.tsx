'use client';

import { useEffect, useRef, useState } from 'react';
import { locations } from '@/data/locations';
import Link from 'next/link';
import { Phone, ArrowRight, MapPin, X } from 'lucide-react';



export default function MobileStickyQuote() {
  const pickerRef = useRef<HTMLDivElement>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerMode, setPickerMode] = useState<'call' | 'quote'>('call');

  useEffect(() => {
    if (!pickerOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    pickerRef.current?.querySelector('button')?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [pickerOpen]);

  function openPicker(mode: 'call' | 'quote') {
    setPickerMode(mode);
    setPickerOpen(true);
  }

  return (
    <>
      {/* Location picker overlay */}
      {pickerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden flex items-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setPickerOpen(false)}
          />
          <div
            ref={pickerRef}
            role="dialog"
            aria-modal="true"
            aria-label={pickerMode === 'call' ? 'Call Your Regional Team' : 'Select Your Area'}
            className="relative w-full max-h-[85dvh] overflow-y-auto bg-white rounded-t-2xl shadow-xl p-5 pb-8 animate-slide-up"
            onKeyDown={(event) => {
              if (event.key === 'Escape') setPickerOpen(false);
              if (event.key !== 'Tab') return;
              const controls = pickerRef.current?.querySelectorAll<HTMLElement>('button, a[href]');
              if (!controls?.length) return;
              const first = controls[0];
              const last = controls[controls.length - 1];
              if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
              else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-forest font-heading">
                {pickerMode === 'call' ? 'Call Your Regional Team' : 'Select Your Area'}
              </h3>
              <button
                type="button"
                onClick={() => setPickerOpen(false)}
                className="p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-charcoal-light hover:text-charcoal transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {locations.map((loc) => (
                pickerMode === 'call' ? (
                  <a
                    key={loc.slug}
                    href={`tel:${loc.phone.replace(/\D/g, '')}`}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-sage/30 hover:bg-cream transition-all"
                    onClick={() => setPickerOpen(false)}
                  >
                    <div className="w-10 h-10 bg-sage/15 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-sage" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block font-semibold text-charcoal font-body text-sm">
                        {loc.name}
                      </span>
                      <span className="block text-forest font-bold font-body text-sm">
                        {loc.phone}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-sage shrink-0" />
                  </a>
                ) : (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}#quote-form`}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-sage/30 hover:bg-cream transition-all"
                    onClick={() => setPickerOpen(false)}
                  >
                    <div className="w-10 h-10 bg-sage/15 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-sage" />
                    </div>
                    <span className="font-semibold text-charcoal font-body text-sm flex-1">
                      {loc.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-sage shrink-0" />
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-forest py-2 px-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => openPicker('call')}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-forest py-3 rounded-lg font-semibold font-body text-sm min-h-[44px] transition-colors hover:bg-cream"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </button>
          <button
            type="button"
            onClick={() => openPicker('quote')}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-sage text-forest-dark py-3 rounded-lg font-semibold font-body text-sm min-h-[44px] transition-colors hover:bg-sage-light"
          >
            Get Free Quote
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
