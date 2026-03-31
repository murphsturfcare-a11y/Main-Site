import type { MetadataRoute } from "next";
import { SITE_URL, SERVICE_SLUGS, LOCATION_SLUGS, BLOG_SLUGS } from "@/lib/seo/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/locations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const locationPages: MetadataRoute.Sitemap = LOCATION_SLUGS.map((slug) => ({
    url: `${SITE_URL}/locations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Sub-location pages (turf-cleaning-in-{city})
  const subLocationMap: Record<string, string[]> = {
    'huntington-beach': ['newport-beach', 'costa-mesa', 'long-beach', 'seal-beach', 'irvine', 'fountain-valley', 'garden-grove', 'westminster', 'laguna-beach', 'dana-point', 'san-clemente', 'anaheim'],
    'murrieta': ['temecula', 'french-valley', 'menifee', 'lake-elsinore', 'hemet', 'perris', 'wildomar', 'canyon-lake', 'temescal-valley', 'winchester', 'corona', 'riverside', 'moreno-valley', 'san-jacinto', 'beaumont', 'eastvale', 'norco', 'fallbrook'],
    'martinez': ['concord', 'pleasant-hill', 'walnut-creek', 'antioch', 'brentwood', 'lafayette', 'danville', 'san-ramon', 'dublin', 'livermore', 'pleasanton', 'orinda', 'alamo', 'oakley'],
    'sacramento': ['elk-grove', 'roseville', 'folsom', 'rancho-cordova', 'citrus-heights', 'west-sacramento', 'carmichael', 'fair-oaks', 'rocklin', 'granite-bay', 'natomas', 'orangevale'],
  };

  const subLocationPages: MetadataRoute.Sitemap = Object.entries(subLocationMap).flatMap(
    ([parentSlug, subSlugs]) =>
      subSlugs.map((subSlug) => ({
        url: `${SITE_URL}/locations/${parentSlug}/turf-cleaning-in-${subSlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
  );

  return [...staticPages, ...servicePages, ...locationPages, ...subLocationPages, ...blogPages];
}
