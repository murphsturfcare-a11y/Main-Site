import sitemap from '@/app/sitemap';
import { SITE_URL, SERVICE_SLUGS, LOCATION_SLUGS, BLOG_SLUGS } from '@/lib/seo/constants';
import { blogPosts } from '@/data/blog';
import { residentialLocationParams } from '@/data/locations';
import { commercialSubLocationParams } from '@/data/commercial';

describe('sitemap()', () => {
  const entries = sitemap();
  const urls = new Set(entries.map((entry) => entry.url));

  it('includes every published canonical page exactly once', () => {
    expect(urls.size).toBe(entries.length);
    for (const path of ['', '/services', '/locations', '/blog', '/privacy-policy', '/terms-of-service', '/commercial-turf-cleaning']) expect(urls.has(`${SITE_URL}${path}`)).toBe(true);
    for (const slug of SERVICE_SLUGS) expect(urls.has(`${SITE_URL}/services/${slug}`)).toBe(true);
    for (const slug of LOCATION_SLUGS) expect(urls.has(`${SITE_URL}/locations/${slug}`)).toBe(true);
    for (const slug of BLOG_SLUGS) expect(urls.has(`${SITE_URL}/blog/${slug}`)).toBe(true);
    for (const { slug, subLocation } of residentialLocationParams()) expect(urls.has(`${SITE_URL}/locations/${slug}/${subLocation}`)).toBe(true);
    for (const { location, subLocation } of commercialSubLocationParams()) expect(urls.has(`${SITE_URL}/commercial-turf-cleaning/${location}/${subLocation}`)).toBe(true);
  });

  it('uses actual article dates and never substitutes the build time', () => {
    for (const post of Object.values(blogPosts)) {
      expect(entries.find((entry) => entry.url === `${SITE_URL}/blog/${post.slug}`)?.lastModified).toBe(new Date(post.updatedDate || post.publishDate).toISOString().slice(0, 10));
    }
    expect(entries.find((entry) => entry.url === SITE_URL)).not.toHaveProperty('lastModified');
    expect(sitemap()).toEqual(entries);
  });

  it('excludes duplicate text mirrors, redirects and unknown city pages', () => {
    for (const entry of entries) {
      expect(entry.url.startsWith(`${SITE_URL}`)).toBe(true);
      expect(entry.url).not.toMatch(/\.(?:md|txt)$/);
    }
    expect(urls.has(`${SITE_URL}/contact`)).toBe(false);
    expect(urls.has(`${SITE_URL}/locations/huntington-beach/turf-cleaning-in-huntington-beach`)).toBe(false);
  });
});
