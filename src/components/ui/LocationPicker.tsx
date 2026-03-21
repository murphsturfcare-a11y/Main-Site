'use client';

import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

const locations = [
  { slug: 'huntington-beach', name: 'Huntington Beach / LA Area' },
  { slug: 'murrieta', name: 'Murrieta / Inland Empire' },
  { slug: 'martinez', name: 'Martinez / Bay Area' },
  { slug: 'sacramento', name: 'Greater Sacramento' },
];

interface LocationPickerProps {
  heading?: string;
  compact?: boolean;
  className?: string;
}

export default function LocationPicker({
  heading = 'Select Your Location for a Free Quote',
  compact = false,
  className = '',
}: LocationPickerProps) {
  if (compact) {
    return (
      <div className={`${className}`}>
        <p className="text-sm font-semibold text-charcoal font-body mb-3">{heading}</p>
        <div className="flex flex-wrap gap-2">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}#quote-form`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest text-white text-sm font-body font-medium rounded-lg hover:bg-sage transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              {loc.name.split(' /')[0]}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <h3 className="text-xl sm:text-2xl font-bold text-forest font-heading mb-6 text-center">
        {heading}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {locations.map((loc) => (
          <Link
            key={loc.slug}
            href={`/locations/${loc.slug}#quote-form`}
            className="group flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-sage/30 transition-all"
          >
            <div className="w-10 h-10 bg-sage/15 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-sage/25 transition-colors">
              <MapPin className="w-5 h-5 text-sage" />
            </div>
            <span className="font-semibold text-charcoal font-body group-hover:text-forest transition-colors flex-1">
              {loc.name}
            </span>
            <ArrowRight className="w-4 h-4 text-sage opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </div>
  );
}
