import sitemap from "@/app/sitemap";
import { locations } from '@/data/locations';
import { SITE_URL } from "@/lib/seo/constants";
import {
  generateCommercialMetadata,
  generateCommercialLocationMetadata,
} from "@/lib/seo/metadata";
import {
  commercialRegions,
  commercialSegments,
  commercialOverview,
  commercialSubLocationParams,
  findCommercialRegion,
  findCommercialSubLocation,
  toCommercialSubSlug,
} from "@/data/commercial";

describe("commercial data layer", () => {
  it("derives every service region from locations", () => {
    expect(commercialRegions.map((region) => region.slug)).toEqual(locations.map((location) => location.slug));
    for (const region of commercialRegions) {
      expect(region.slug).toBeTruthy();
      expect(region.region).toBeTruthy();
      expect(region.subLocations.length).toBeGreaterThan(0);
    }
  });

  it("covers all four commercial segments", () => {
    const slugs = commercialSegments.map((s) => s.slug);
    expect(slugs).toEqual(
      expect.arrayContaining([
        "dog-daycare",
        "hoa-property-management",
        "schools-childcare",
        "gyms-hospitality-sports",
      ]),
    );
    expect(commercialSegments).toHaveLength(4);
  });

  it("builds commercial sub-slugs with the commercial prefix", () => {
    expect(toCommercialSubSlug("Temecula")).toBe(
      "commercial-turf-cleaning-in-temecula",
    );
    expect(toCommercialSubSlug("French Valley")).toBe(
      "commercial-turf-cleaning-in-french-valley",
    );
  });

  it("never collides a sub-location slug with its parent region slug", () => {
    for (const region of commercialRegions) {
      for (const sub of region.subLocations) {
        expect(sub.slug).not.toBe(region.slug);
        expect(sub.slug.startsWith("commercial-turf-cleaning-in-")).toBe(true);
      }
    }
  });

  it("resolves regions and sub-locations via finders", () => {
    const region = findCommercialRegion("murrieta");
    expect(region).not.toBeNull();
    const sub = region!.subLocations[0];
    const found = findCommercialSubLocation("murrieta", sub.slug);
    expect(found).not.toBeNull();
    expect(found!.sub.slug).toBe(sub.slug);
  });

  it("returns null for unknown region/sub-location", () => {
    expect(findCommercialRegion("nope")).toBeNull();
    expect(findCommercialSubLocation("murrieta", "nope")).toBeNull();
  });

  it("exposes static params keyed for the [location]/[subLocation] route", () => {
    const params = commercialSubLocationParams();
    expect(params.length).toBeGreaterThan(40);
    for (const p of params) {
      expect(p).toHaveProperty("location");
      expect(p).toHaveProperty("subLocation");
    }
  });

  it("ships overview content for the hub page", () => {
    expect(commercialOverview.descriptionParagraphs.length).toBeGreaterThan(0);
    expect(commercialOverview.whatIncludes.length).toBeGreaterThan(0);
    expect(commercialOverview.benefits.length).toBeGreaterThan(0);
    expect(commercialOverview.faqs.length).toBeGreaterThan(0);
  });
});

describe("commercial metadata", () => {
  it("generates canonical hub metadata", () => {
    const meta = generateCommercialMetadata();
    expect(meta.alternates?.canonical).toBe(
      `${SITE_URL}/commercial-turf-cleaning`,
    );
    expect(String(meta.title)).toMatch(/Commercial/i);
  });

  it("generates city metadata with the correct canonical path", () => {
    const meta = generateCommercialLocationMetadata({
      name: "Temecula",
      regionSlug: "murrieta",
      subSlug: "commercial-turf-cleaning-in-temecula",
      phone: "(951) 331-3300",
    });
    expect(meta.alternates?.canonical).toBe(
      `${SITE_URL}/commercial-turf-cleaning/murrieta/commercial-turf-cleaning-in-temecula`,
    );
    expect(String(meta.title)).toMatch(/Temecula/);
  });
});

describe("commercial sitemap entries", () => {
  const entries = sitemap();

  it("includes the commercial hub", () => {
    const hub = entries.find(
      (e) => e.url === `${SITE_URL}/commercial-turf-cleaning`,
    );
    expect(hub).toBeDefined();
  });

  it("includes all commercial region pages", () => {
    for (const region of commercialRegions) {
      const entry = entries.find(
        (e) => e.url === `${SITE_URL}/commercial-turf-cleaning/${region.slug}`,
      );
      expect(
        entry,
        `expected commercial region ${region.slug} in sitemap`,
      ).toBeDefined();
    }
  });

  it("includes every commercial city page with no duplicates", () => {
    const params = commercialSubLocationParams();
    for (const { location, subLocation } of params) {
      const url = `${SITE_URL}/commercial-turf-cleaning/${location}/${subLocation}`;
      const matches = entries.filter((e) => e.url === url);
      expect(matches.length, `expected exactly one entry for ${url}`).toBe(1);
    }
  });
});
