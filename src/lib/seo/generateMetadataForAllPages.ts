import { seoMetadata } from '@/data/seo';
import { services } from '@/data/services';
import { locations } from '@/data/locations';
import { blogPosts } from '@/data/blog';
import { COMPANY_NAME } from './constants';
import { generatePageMetadata, generateBlogMetadata } from './metadata';

// Preserve the existing exports for callers while taking all copy and route
// inventories from the same reviewed data used by the pages.
function pageMetadata(title: string, description: string, path: string) {
  // Shared editorial titles include the brand; the layout and social metadata
  // helper apply it themselves, so remove only the exact boundary decoration.
  const prefix = `${COMPANY_NAME} | `;
  const suffix = ` | ${COMPANY_NAME}`;
  const withoutPrefix = title.startsWith(prefix) ? title.slice(prefix.length) : title;
  const pageTitle = withoutPrefix.endsWith(suffix) ? withoutPrefix.slice(0, -suffix.length) : withoutPrefix;
  return generatePageMetadata(pageTitle, description, path);
}

export const homeMetadata = pageMetadata(seoMetadata.home.title, seoMetadata.home.description, '/');
export const servicesMetadata = pageMetadata(seoMetadata.services.title, seoMetadata.services.description, '/services');
export const locationsMetadata = pageMetadata(seoMetadata.locations.title, seoMetadata.locations.description, '/locations');
export const blogIndexMetadata = pageMetadata(seoMetadata.blog.title, seoMetadata.blog.description, '/blog');

export const serviceMetadata = Object.fromEntries(services.map((service) => [
  service.slug,
  pageMetadata(service.metaTitle, service.metaDescription, `/services/${service.slug}`),
]));

export const locationMetadata = Object.fromEntries(locations.map((location) => [
  location.slug,
  pageMetadata(location.metaTitle, location.metaDescription, `/locations/${location.slug}`),
]));

export const blogMetadata = Object.fromEntries(Object.values(blogPosts).map((post) => [
  post.slug,
  generateBlogMetadata({ title: post.title, slug: post.slug, description: post.metaDescription }),
]));
