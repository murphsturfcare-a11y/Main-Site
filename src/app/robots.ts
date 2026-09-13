import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // A single rule applies the same exclusions to search and AI crawlers.
    // More-specific allow-only groups would override the wildcard exclusions.
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/.netlify/functions/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
