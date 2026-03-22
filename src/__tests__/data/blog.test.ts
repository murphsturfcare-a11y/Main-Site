import { blogPosts } from '@/data/blog';
import { BLOG_SLUGS } from '@/lib/seo/constants';

describe('blog data', () => {
  describe('collection integrity', () => {
    it('exports exactly 12 blog posts', () => {
      expect(blogPosts).toHaveLength(12);
    });

    it('has all unique slugs', () => {
      const slugs = blogPosts.map((p) => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe('slug alignment with BLOG_SLUGS constants', () => {
    it('every BLOG_SLUG is a substring of at least one blog post slug', () => {
      for (const expected of BLOG_SLUGS) {
        const match = blogPosts.find((p) => p.slug.includes(expected));
        expect(match, `No blog post slug contains "${expected}"`).toBeDefined();
      }
    });

    it('every blog post slug contains at least one BLOG_SLUG as a substring', () => {
      for (const post of blogPosts) {
        const match = BLOG_SLUGS.some((s) => post.slug.includes(s));
        expect(match, `Blog post slug "${post.slug}" does not contain any BLOG_SLUG`).toBe(true);
      }
    });
  });

  describe('required fields', () => {
    const requiredStringFields = [
      'slug',
      'title',
      'excerpt',
      'content',
      'author',
      'publishedDate',
      'category',
      'metaTitle',
      'metaDescription',
      'featuredImage',
    ] as const;

    for (const field of requiredStringFields) {
      it(`every blog post has a non-empty "${field}" string`, () => {
        for (const post of blogPosts) {
          expect(typeof post[field]).toBe('string');
          expect(post[field], `${post.slug}.${field} must not be empty`).not.toBe('');
        }
      });
    }

    it('every blog post has a non-empty tags array', () => {
      for (const post of blogPosts) {
        expect(Array.isArray(post.tags)).toBe(true);
        expect(post.tags.length, `${post.slug}.tags must not be empty`).toBeGreaterThan(0);
      }
    });
  });

  describe('field format validation', () => {
    it('every featuredImage starts with /images/', () => {
      for (const post of blogPosts) {
        expect(
          post.featuredImage,
          `${post.slug}.featuredImage must start with /images/`,
        ).toMatch(/^\/images\//);
      }
    });

    it('every publishedDate matches YYYY-MM-DD format', () => {
      for (const post of blogPosts) {
        expect(
          post.publishedDate,
          `${post.slug}.publishedDate must match YYYY-MM-DD`,
        ).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });
  });

  describe('no empty strings in required string fields', () => {
    it('no blog post contains an empty string for any required field', () => {
      const fields = [
        'slug',
        'title',
        'excerpt',
        'content',
        'author',
        'publishedDate',
        'category',
        'metaTitle',
        'metaDescription',
        'featuredImage',
      ] as const;

      for (const post of blogPosts) {
        for (const field of fields) {
          expect(post[field], `${post.slug}.${field} must not be empty`).not.toBe('');
        }
      }
    });
  });

  describe('tags validation', () => {
    it('every tag is a non-empty string', () => {
      for (const post of blogPosts) {
        for (const tag of post.tags) {
          expect(typeof tag).toBe('string');
          expect(tag, `Tag in ${post.slug} must not be empty`).not.toBe('');
        }
      }
    });
  });

  describe('optional location field', () => {
    it('location is either undefined or a non-empty string', () => {
      for (const post of blogPosts) {
        if (post.location !== undefined) {
          expect(typeof post.location).toBe('string');
          expect(post.location, `${post.slug}.location must not be empty if present`).not.toBe('');
        }
      }
    });
  });
});
