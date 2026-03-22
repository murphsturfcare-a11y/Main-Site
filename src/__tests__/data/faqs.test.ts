import { faqs } from '@/data/faqs';
import { SERVICE_SLUGS, LOCATION_SLUGS } from '@/lib/seo/constants';

const VALID_CATEGORIES = ['general', 'pricing', 'services', 'scheduling', 'locations'] as const;

describe('faqs data', () => {
  describe('collection integrity', () => {
    it('has at least 20 FAQs', () => {
      expect(faqs.length).toBeGreaterThanOrEqual(20);
    });

    it('has exactly 26 FAQs', () => {
      expect(faqs).toHaveLength(26);
    });
  });

  describe('required fields', () => {
    it('every FAQ has a non-empty question, answer, and category string', () => {
      for (const faq of faqs) {
        expect(typeof faq.question).toBe('string');
        expect(faq.question).not.toBe('');

        expect(typeof faq.answer).toBe('string');
        expect(faq.answer).not.toBe('');

        expect(typeof faq.category).toBe('string');
        expect(faq.category).not.toBe('');
      }
    });
  });

  describe('category validation', () => {
    it('every FAQ category is one of the allowed values', () => {
      for (const faq of faqs) {
        expect(VALID_CATEGORIES).toContain(faq.category);
      }
    });
  });

  describe('optional slug cross-validation', () => {
    it('serviceSlug, when present, references a valid SERVICE_SLUG', () => {
      const withServiceSlug = faqs.filter((f) => f.serviceSlug !== undefined);
      expect(withServiceSlug.length).toBeGreaterThan(0);

      for (const faq of withServiceSlug) {
        expect(SERVICE_SLUGS).toContain(faq.serviceSlug);
      }
    });

    it('locationSlug, when present, references a valid LOCATION_SLUG', () => {
      const withLocationSlug = faqs.filter((f) => f.locationSlug !== undefined);
      expect(withLocationSlug.length).toBeGreaterThan(0);

      for (const faq of withLocationSlug) {
        expect(LOCATION_SLUGS).toContain(faq.locationSlug);
      }
    });
  });

  describe('uniqueness', () => {
    it('has no duplicate questions', () => {
      const questions = faqs.map((f) => f.question);
      expect(new Set(questions).size).toBe(questions.length);
    });
  });

  describe('question formatting', () => {
    it('every question ends with "?"', () => {
      for (const faq of faqs) {
        expect(faq.question).toMatch(/\?$/);
      }
    });
  });

  describe('no empty strings', () => {
    it('no FAQ has an empty question or answer', () => {
      for (const faq of faqs) {
        expect(faq.question.trim(), `question must not be blank: "${faq.question}"`).not.toBe('');
        expect(faq.answer.trim(), `answer must not be blank for: "${faq.question}"`).not.toBe('');
      }
    });
  });
});
