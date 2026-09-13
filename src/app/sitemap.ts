import type { MetadataRoute } from 'next';
import { SITE_URL, SERVICE_SLUGS, LOCATION_SLUGS } from '@/lib/seo/constants';
import { blogPosts } from '@/data/blog';
import { residentialLocationParams } from '@/data/locations';
import { commercialRegions, commercialSubLocationParams } from '@/data/commercial';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // Only canonical HTML pages belong here. Optional text mirrors remain
  // discoverable through llms.txt without competing with their HTML originals.
  const staticPaths = ['', '/services', '/locations', '/blog', '/privacy-policy', '/terms-of-service', '/commercial-turf-cleaning'];
  const pages: MetadataRoute.Sitemap = [
    ...staticPaths.map((path) => ({ url: `${SITE_URL}${path}`, priority: path ? 0.7 : 1 })),
    ...SERVICE_SLUGS.map((slug) => ({ url: `${SITE_URL}/services/${slug}` })),
    ...LOCATION_SLUGS.map((slug) => ({ url: `${SITE_URL}/locations/${slug}` })),
    ...residentialLocationParams().map(({ slug, subLocation }) => ({ url: `${SITE_URL}/locations/${slug}/${subLocation}` })),
    ...commercialRegions.map((region) => ({ url: `${SITE_URL}/commercial-turf-cleaning/${region.slug}` })),
    ...commercialSubLocationParams().map(({ location, subLocation }) => ({ url: `${SITE_URL}/commercial-turf-cleaning/${location}/${subLocation}` })),
    ...Object.values(blogPosts).map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      // Editorial date, never the time a build happened. Other pages omit
      // lastmod until a meaningful content-maintenance date is recorded.
      lastModified: new Date(post.updatedDate || post.publishDate).toISOString().slice(0, 10),
    })),
  ];
  return pages;
}
