import sitemap from "@/app/sitemap";
import {
  SITE_URL,
  SERVICE_SLUGS,
  LOCATION_SLUGS,
  BLOG_SLUGS,
} from "@/lib/seo/constants";

describe("sitemap()", () => {
  const entries = sitemap();

  it("returns an array of URL entries", () => {
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
  });

  it("includes the homepage", () => {
    const homepage = entries.find((e) => e.url === SITE_URL);
    expect(homepage).toBeDefined();
    expect(homepage!.priority).toBe(1.0);
  });

  it("includes all static pages", () => {
    const staticPaths = [
      "/about",
      "/services",
      "/locations",
      "/blog",
      "/privacy-policy",
      "/terms-of-service",
    ];

    for (const path of staticPaths) {
      const entry = entries.find((e) => e.url === `${SITE_URL}${path}`);
      expect(entry, `expected static page ${path} to be in sitemap`).toBeDefined();
    }
  });

  it("includes all 5 service pages", () => {
    expect(SERVICE_SLUGS).toHaveLength(5);

    for (const slug of SERVICE_SLUGS) {
      const entry = entries.find((e) => e.url === `${SITE_URL}/services/${slug}`);
      expect(entry, `expected service page /services/${slug} to be in sitemap`).toBeDefined();
    }
  });

  it("includes all 4 location pages", () => {
    expect(LOCATION_SLUGS).toHaveLength(4);

    for (const slug of LOCATION_SLUGS) {
      const entry = entries.find((e) => e.url === `${SITE_URL}/locations/${slug}`);
      expect(entry, `expected location page /locations/${slug} to be in sitemap`).toBeDefined();
    }
  });

  it("includes all 12 blog pages", () => {
    expect(BLOG_SLUGS).toHaveLength(12);

    for (const slug of BLOG_SLUGS) {
      const entry = entries.find((e) => e.url === `${SITE_URL}/blog/${slug}`);
      expect(entry, `expected blog page /blog/${slug} to be in sitemap`).toBeDefined();
    }
  });

  it("every entry has url and lastModified fields", () => {
    for (const entry of entries) {
      expect(entry.url).toBeDefined();
      expect(typeof entry.url).toBe("string");
      expect(entry.lastModified).toBeDefined();
      expect(entry.lastModified).toBeInstanceOf(Date);
    }
  });

  it("all URLs use the base URL https://murphysturf.com", () => {
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/murphysturf\.com/);
    }
  });
});
