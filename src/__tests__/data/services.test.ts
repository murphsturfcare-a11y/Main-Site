import { services } from '@/data/services';
import { SERVICE_SLUGS } from '@/lib/seo/constants';

describe('services data', () => {
  describe('collection integrity', () => {
    it('exports exactly 5 services', () => {
      expect(services).toHaveLength(5);
    });

    it('has all unique slugs', () => {
      const slugs = services.map((s) => s.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe('slug alignment with SERVICE_SLUGS constants', () => {
    it('every service slug exists in SERVICE_SLUGS', () => {
      for (const service of services) {
        expect(SERVICE_SLUGS).toContain(service.slug);
      }
    });

    it('every SERVICE_SLUGS entry has a matching service', () => {
      const slugs = services.map((s) => s.slug);
      for (const expected of SERVICE_SLUGS) {
        expect(slugs).toContain(expected);
      }
    });
  });

  describe('required fields', () => {
    const requiredStringFields = [
      'slug',
      'name',
      'shortDescription',
      'fullDescription',
      'iconName',
      'image',
      'metaTitle',
      'metaDescription',
    ] as const;

    const requiredArrayFields = ['benefits', 'whatIncludes', 'faqs'] as const;

    for (const field of requiredStringFields) {
      it(`every service has a non-empty "${field}" string`, () => {
        for (const service of services) {
          expect(typeof service[field]).toBe('string');
          expect(service[field]).not.toBe('');
        }
      });
    }

    for (const field of requiredArrayFields) {
      it(`every service has a non-empty "${field}" array`, () => {
        for (const service of services) {
          expect(Array.isArray(service[field])).toBe(true);
          expect(service[field].length).toBeGreaterThan(0);
        }
      });
    }
  });

  describe('FAQ entries', () => {
    it('every FAQ has a non-empty question and answer', () => {
      for (const service of services) {
        for (const faq of service.faqs) {
          expect(typeof faq.question).toBe('string');
          expect(faq.question).not.toBe('');
          expect(typeof faq.answer).toBe('string');
          expect(faq.answer).not.toBe('');
        }
      }
    });
  });

  describe('startingPrice validation', () => {
    it('startingPrice is null or a positive number', () => {
      for (const service of services) {
        if (service.startingPrice !== null) {
          expect(typeof service.startingPrice).toBe('number');
          expect(service.startingPrice).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('no empty strings in any string field', () => {
    const allStringFields = [
      'slug',
      'name',
      'shortDescription',
      'fullDescription',
      'iconName',
      'image',
      'metaTitle',
      'metaDescription',
    ] as const;

    it('no service contains an empty string for any string field', () => {
      for (const service of services) {
        for (const field of allStringFields) {
          expect(service[field], `${service.slug}.${field} must not be empty`).not.toBe('');
        }
      }
    });
  });

  describe('image paths', () => {
    it('every image path starts with /images/', () => {
      for (const service of services) {
        expect(service.image).toMatch(/^\/images\//);
      }
    });
  });

  describe('metaTitle branding', () => {
    it('every metaTitle contains "Murphy\'s Turf"', () => {
      for (const service of services) {
        expect(service.metaTitle).toContain("Murphy's Turf");
      }
    });
  });
});
