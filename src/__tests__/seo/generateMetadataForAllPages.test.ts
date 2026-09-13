import { describe, expect, it } from 'vitest';
import {
  homeMetadata, servicesMetadata, locationsMetadata, serviceMetadata,
  locationMetadata, blogIndexMetadata, blogMetadata,
} from '@/lib/seo/generateMetadataForAllPages';
import { services } from '@/data/services';
import { locations } from '@/data/locations';
import { blogPosts } from '@/data/blog';
import { seoMetadata } from '@/data/seo';
import { COMPANY_NAME, SITE_URL } from '@/lib/seo/constants';

describe('shared page metadata inventory', () => {
  it('takes static page descriptions from reviewed metadata', () => {
    for (const [metadata, key, path] of [
      [homeMetadata, 'home', '/'],
      [servicesMetadata, 'services', '/services'],
      [locationsMetadata, 'locations', '/locations'],
      [blogIndexMetadata, 'blog', '/blog'],
    ] as const) {
      expect(metadata.description).toBe(seoMetadata[key].description);
      expect(metadata.alternates?.canonical).toBe(`${SITE_URL}${path}`);
    }
  });

  it('covers exactly the published service inventory', () => {
    expect(Object.keys(serviceMetadata).sort()).toEqual(services.map((service) => service.slug).sort());
    for (const service of services) {
      expect(serviceMetadata[service.slug].description).toBe(service.metaDescription);
      expect(serviceMetadata[service.slug].alternates?.canonical).toBe(`${SITE_URL}/services/${service.slug}`);
    }
  });

  it('includes Palm Desert and future locations through the shared inventory', () => {
    expect(Object.keys(locationMetadata).sort()).toEqual(locations.map((location) => location.slug).sort());
    expect(locationMetadata).toHaveProperty('palm-desert');
    for (const location of locations) {
      expect(locationMetadata[location.slug].description).toBe(location.metaDescription);
      expect(locationMetadata[location.slug].alternates?.canonical).toBe(`${SITE_URL}/locations/${location.slug}`);
    }
  });

  it('covers all current articles and excludes retired redirect slugs', () => {
    expect(Object.keys(blogMetadata).sort()).toEqual(Object.keys(blogPosts).sort());
    expect(blogMetadata).toHaveProperty('artificial-turf-cleaning-palm-desert');
    expect(blogMetadata).not.toHaveProperty('professional-turf-cleaning-huntington-beach');
    expect(blogMetadata).not.toHaveProperty('removing-pet-odors-murrieta');
    for (const post of Object.values(blogPosts)) {
      expect(blogMetadata[post.slug].description).toBe(post.metaDescription);
      expect(blogMetadata[post.slug].alternates?.canonical).toBe(`${SITE_URL}/blog/${post.slug}`);
    }
  });

  it('does not double the brand when adapting shared editorial titles', () => {
    const metadata = [homeMetadata, servicesMetadata, locationsMetadata, blogIndexMetadata, ...Object.values(serviceMetadata), ...Object.values(locationMetadata)];
    for (const entry of metadata) {
      expect(entry.title).not.toContain(COMPANY_NAME);
      expect(String(entry.openGraph?.title).split(COMPANY_NAME)).toHaveLength(2);
    }
  });
});
