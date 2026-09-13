import TestimonialCard from '@/components/cards/TestimonialCard';
import { testimonials } from '@/data/testimonials';

export default function TestimonialSection() {
  if (testimonials.length === 0) return null;
  return <section className="py-16 bg-cream"><div className="max-w-6xl mx-auto px-4"><h2 className="text-center font-heading text-3xl font-bold text-charcoal">Customer Reviews</h2><div className="grid md:grid-cols-3 gap-8 mt-12">{testimonials.map((review) => <TestimonialCard key={review.customerName} rating={review.rating} quote={review.reviewText} name={review.customerName} location={review.customerLocation} />)}</div></div></section>;
}
