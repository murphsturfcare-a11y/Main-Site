import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { homeFaqs } from '@/data/home-faqs';

interface FAQItem {
  question: string;
  answer: string;
}

const defaultItems: FAQItem[] = homeFaqs;

interface FAQProps {
  items?: FAQItem[];
}

export default function FAQ({ items = defaultItems }: FAQProps) {
  const groupId = useId();

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal text-center">
          Frequently Asked Questions
        </h2>

        <div className="mt-12">
          {items.map((item, index) => (
            <details key={index} name={groupId} className="group border-b border-gray-200">
              <summary className="flex justify-between items-center py-5 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-sage focus-visible:outline-offset-2">
                <span className="font-medium text-charcoal font-body pr-4">{item.question}</span>
                <ChevronDown aria-hidden="true" className="w-5 h-5 text-charcoal-light shrink-0 transition-transform motion-reduce:transition-none group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-charcoal-light font-body">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
