import { PawPrint, Leaf, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: PawPrint,
    title: 'Care for Pet Yards',
    description:
      'Plan around pet use and follow the treatment instructions before pets return to the yard.',
  },
  {
    icon: Leaf,
    title: 'Surface-Specific Care',
    description:
      'Share your turf and infill information so the cleaning method can suit the installed surface.',
  },
  {
    icon: ShieldCheck,
    title: 'Clear Service Scope',
    description:
      'Confirm the areas, work, and access details in your quote, and contact the team with questions about the visit.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center font-heading text-3xl md:text-4xl font-bold text-charcoal">
          Why Choose Murphy&apos;s Turf
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-12">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="text-center">
                <div className="bg-forest/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Icon size={28} className="text-forest" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-semibold text-charcoal mt-4">
                  {benefit.title}
                </h3>
                <p className="text-charcoal-light mt-2 font-body text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
