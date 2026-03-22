import { testimonials } from '@/data/testimonials';
import { services } from '@/data/services';
import { locations } from '@/data/locations';

const REQUIRED_STRING_FIELDS = [
  'customerName',
  'customerLocation',
  'reviewText',
  'serviceType',
] as const;

describe('testimonials data', () => {
  it('contains exactly 10 testimonials', () => {
    expect(testimonials).toHaveLength(10);
  });

  it('each testimonial has all required fields with non-empty string values', () => {
    for (const testimonial of testimonials) {
      for (const field of REQUIRED_STRING_FIELDS) {
        expect(testimonial[field]).toBeDefined();
        expect(typeof testimonial[field]).toBe('string');
        expect(testimonial[field].trim()).not.toBe('');
      }
      expect(testimonial.rating).toBeDefined();
      expect(typeof testimonial.rating).toBe('number');
    }
  });

  it('all ratings are integers between 1 and 5', () => {
    for (const testimonial of testimonials) {
      expect(Number.isInteger(testimonial.rating)).toBe(true);
      expect(testimonial.rating).toBeGreaterThanOrEqual(1);
      expect(testimonial.rating).toBeLessThanOrEqual(5);
    }
  });

  it('each serviceType matches a valid service slug', () => {
    const validSlugs = services.map((s) => s.slug);

    for (const testimonial of testimonials) {
      expect(validSlugs).toContain(testimonial.serviceType);
    }
  });

  it('each customerLocation matches part of a location name from locations data', () => {
    const locationNames = locations.map((l) => l.name);

    for (const testimonial of testimonials) {
      const matches = locationNames.some((name) =>
        name.includes(testimonial.customerLocation),
      );
      expect(matches).toBe(true);
    }
  });

  it('no string field contains an empty string', () => {
    for (const testimonial of testimonials) {
      for (const field of REQUIRED_STRING_FIELDS) {
        expect(testimonial[field]).not.toBe('');
        expect(testimonial[field].trim().length).toBeGreaterThan(0);
      }
    }
  });
});
