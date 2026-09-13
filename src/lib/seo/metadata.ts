import type { Metadata } from "next";
import {
  SITE_URL,
  COMPANY_NAME,
  COMPANY_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "./constants";

export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  image?: string
): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return {
    // Plain string: the layout's title.template appends " | Murphy's Turf"
    // exactly once. Do NOT add the brand here or it doubles.
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      // OG titles are NOT templated, so the brand is added explicitly here.
      title: `${title} | ${COMPANY_NAME}`,
      description,
      url,
      siteName: COMPANY_NAME,
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${COMPANY_NAME}`,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`],
    },
  };
}

export function generateServiceMetadata(service: {
  name: string;
  slug: string;
  shortDescription: string;
}): Metadata {
  const title = `${service.name} | Artificial Turf Cleaning California`;
  const description = `${service.shortDescription} Professional ${service.name.toLowerCase()} by ${COMPANY_NAME}. Get a free quote today!`;

  return generatePageMetadata(title, description, `/services/${service.slug}`);
}

export function generateLocationMetadata(location: {
  name: string;
  slug: string;
  description: string;
  metaDescription?: string;
}): Metadata {
  const title = `Artificial Turf Cleaning in ${location.name}, CA`;
  const description = location.metaDescription || `Artificial turf cleaning in ${location.name}, CA. Pet hair removal, deep cleaning, deodorizing and maintenance from ${COMPANY_NAME}. Request a quote.`;

  return generatePageMetadata(
    title,
    description,
    `/locations/${location.slug}`
  );
}

export function generateCommercialMetadata(): Metadata {
  const title = "Commercial Artificial Turf Cleaning California";
  const description = `Commercial artificial turf cleaning for pet facilities, HOAs, schools, gyms and hospitality. Request a property-specific scope from ${COMPANY_NAME}.`;

  return generatePageMetadata(title, description, "/commercial-turf-cleaning");
}

export function generateCommercialLocationMetadata(location: {
  name: string;
  regionSlug: string;
  subSlug: string;
  phone?: string;
}): Metadata {
  const title = `Commercial Artificial Turf Cleaning in ${location.name}, CA`;
  const phone = location.phone ? ` Call ${location.phone}.` : "";
  const description = `Commercial artificial turf cleaning in ${location.name}, CA for pet areas, managed properties and recreation spaces. Request a service quote.${phone}`;

  return generatePageMetadata(
    title,
    description,
    `/commercial-turf-cleaning/${location.regionSlug}/${location.subSlug}`
  );
}

export function generateBlogMetadata(post: {
  title: string;
  slug: string;
  description: string;
  image?: string;
}): Metadata {
  const ogImage = post.image || DEFAULT_OG_IMAGE;

  return {
    // `absolute` keeps the "... | Murphy's Turf Blog" wording without the
    // layout template appending a second brand.
    title: { absolute: `${post.title} | ${COMPANY_NAME} Blog` },
    description: post.description,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: COMPANY_NAME,
      type: "article",
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`],
    },
  };
}

export function generateBlogIndexMetadata(): Metadata {
  return generatePageMetadata(
    "Artificial Turf Cleaning Blog — Tips & Guides",
    "Expert artificial turf cleaning tips, deep cleaning guides, and synthetic turf maintenance advice from Murphy's Turf. Practical guidance for property owners across our California service areas.",
    "/blog"
  );
}

export const DEFAULT_METADATA: Metadata = {
  title: {
    default: COMPANY_NAME,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: COMPANY_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "artificial turf cleaning",
    "synthetic turf cleaning",
    "turf sanitization",
    "pet turf cleaning",
    "turf odor removal",
    "turf deodorizing",
    "professional turf deep cleaning",
    "artificial grass cleaning California",
    "turf cleaning Huntington Beach",
    "turf cleaning Murrieta",
    "turf cleaning Martinez",
    "turf cleaning Sacramento",
    "turf cleaning Palm Desert",
    "Murphy's Turf",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: COMPANY_NAME,
    description: COMPANY_DESCRIPTION,
    url: SITE_URL,
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
        width: 1200,
        height: 630,
        alt: COMPANY_NAME,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: COMPANY_NAME,
    description: COMPANY_DESCRIPTION,
    images: [`${SITE_URL}${DEFAULT_OG_IMAGE}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
