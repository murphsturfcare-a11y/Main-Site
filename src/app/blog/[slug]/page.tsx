import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  ArrowRight,
  MapPin,
  Calendar,
  Clock,
  User,
  Facebook,
  Twitter,
  Linkedin,
  Tag,
  List,
} from 'lucide-react';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';

import { blogPosts, getBlogHeadings } from '@/data/blog';

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: {
      canonical: `https://murphysturf.com/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Murphy's Turf Blog`,
      description: post.metaDescription,
      type: 'article',
      url: `https://murphysturf.com/blog/${slug}`,
      publishedTime: new Date(post.publishDate).toISOString(),
      modifiedTime: new Date(post.updatedDate ?? post.publishDate).toISOString(),
      authors: [post.author.name],
      section: post.category,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: `Murphy's Turf Blog - ${post.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: ['/images/og-image.png'],
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  // Build related posts
  const relatedPosts = post.relatedSlugs
    .map((s) => blogPosts[s])
    .filter(Boolean);

  // Category color mapping
  const categoryColors: Record<string, string> = {
    'Turf Cleaning': 'bg-sage/15 text-forest',
    'Pet Care': 'bg-amber-100 text-amber-700',
    'Maintenance Tips': 'bg-emerald-100 text-emerald-700',
    'Local Guides': 'bg-blue-100 text-blue-700',
    'Commercial': 'bg-forest/10 text-forest',
  };

  const tableOfContents = getBlogHeadings(post.content);
  const articleUrl = `https://murphysturf.com/blog/${slug}`;
  const localServiceUrl = post.servicePath ?? (post.serviceArea ? `/locations/${post.serviceArea}` : '/locations');
  const hasLocalQuoteForm = /^\/(?:locations|commercial-turf-cleaning)\//.test(localServiceUrl);
  const quoteUrl = hasLocalQuoteForm
    ? `${localServiceUrl}#quote-form`
    : localServiceUrl === '/commercial-turf-cleaning'
      ? `${localServiceUrl}#service-areas`
      : localServiceUrl;
  const serviceLinkLabel = hasLocalQuoteForm ? 'View Local Service Details' : 'View Service Areas';

  const categoryColor =
    categoryColors[post.category] || 'bg-sage/15 text-forest';

  // ISO 8601 dates for structured data
  const publishDateIso = new Date(post.publishDate).toISOString();

  // BlogPosting JSON-LD
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    url: `https://murphysturf.com/blog/${slug}`,
    datePublished: publishDateIso,
    dateModified: new Date(post.updatedDate ?? post.publishDate).toISOString(),
    author: {
      '@type': 'Organization',
      name: post.author.name,
      url: 'https://murphysturf.com',
    },
    publisher: {
      '@type': 'Organization',
      name: "Murphy's Turf",
      url: 'https://murphysturf.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://murphysturf.com/images/logo.png',
      },
    },
    image: 'https://murphysturf.com/images/og-image.png',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://murphysturf.com/blog/${slug}`,
    },
    articleSection: post.category,
    inLanguage: 'en-US',
  };

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://murphysturf.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://murphysturf.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://murphysturf.com/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured data for AI & search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />

      {/* ----------------------------------------------------------------- */}
      {/* Breadcrumb */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-cream border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-charcoal-light font-body">
            <Link
              href="/"
              className="hover:text-forest transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              href="/blog"
              className="hover:text-forest transition-colors"
            >
              Blog
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-charcoal font-medium truncate max-w-[250px] sm:max-w-none">
              {post.title}
            </span>
          </nav>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Article Header */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-white border-b border-gray-100">
        <AnimateOnScroll direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-body ${categoryColor}`}
            >
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-charcoal leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-charcoal-light font-body">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-sage" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sage" />
              <time dateTime={publishDateIso}>{post.publishDate}</time>
              {post.updatedDate && (
                <span>
                  Updated <time dateTime={new Date(post.updatedDate).toISOString()}>{post.updatedDate}</time>
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sage" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Decorative divider; articles do not claim to have a featured photo. */}
      <div aria-hidden="true" className={`h-2 bg-gradient-to-r ${post.featuredGradient}`} />

      {/* ----------------------------------------------------------------- */}
      {/* Two-Column Layout: Article + Sidebar */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-14">
            {/* LEFT: Article Content */}
            <article
              className="min-w-0 [&_h2]:scroll-mt-36 [&_h3]:scroll-mt-36"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* RIGHT: Sidebar (Desktop Only) */}
            <div className="hidden lg:block">
              <div className="sticky top-36 space-y-8">
                {/* Table of Contents */}
                <div className="bg-cream rounded-2xl p-6 border border-gray-100">
                  <h3 className="flex items-center gap-2 text-sm font-bold font-heading text-charcoal uppercase tracking-wider mb-4">
                    <List className="w-4 h-4 text-sage" />
                    Table of Contents
                  </h3>
                  <nav aria-label="Table of contents">
                    <ul className="space-y-2">
                      {tableOfContents.map(({ id, title }) => (
                        <li key={id}>
                          <a
                            href={`#${id}`}
                            className="text-sm text-charcoal-light font-body hover:text-forest transition-colors leading-snug block py-1"
                          >
                            {title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-forest to-forest-dark rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold font-heading mb-2">
                    Need Professional Turf Cleaning?
                  </h3>
                  <p className="text-white/80 text-sm font-body leading-relaxed mb-5">
                    Murphy&apos;s Turf serves communities across
                    California. Get a free, no-obligation quote today.
                  </p>
                  <Link
                    href={quoteUrl}
                    className="inline-flex items-center gap-2 bg-sage hover:bg-sage-light text-forest-dark font-semibold px-5 py-2.5 rounded-lg transition-colors font-body text-sm w-full justify-center"
                  >
                    Get a Free Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href={localServiceUrl}
                    className="flex items-center justify-center gap-2 text-white/80 hover:text-white font-body text-sm mt-3 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    {serviceLinkLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Share Buttons */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-cream border-t border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold font-heading text-charcoal">
              Share this article:
            </span>
            <div className="flex items-center gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook (opens in a new tab)"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-charcoal-light hover:text-forest hover:border-forest/30 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter (opens in a new tab)"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-charcoal-light hover:text-forest hover:border-forest/30 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn (opens in a new tab)"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-charcoal-light hover:text-forest hover:border-forest/30 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Author Bio Card */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-white py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream rounded-2xl p-6 sm:p-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-forest to-sage flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xs font-body text-charcoal-light uppercase tracking-wider mb-1">
                  Written by
                </p>
                <h3 className="text-xl font-bold font-heading text-charcoal mb-1">
                  {post.author.name}
                </h3>
                <p className="text-sm font-body text-forest font-semibold mb-3">
                  {post.author.role}
                </p>
                <p className="text-sm text-charcoal-light font-body leading-relaxed">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Related Posts */}
      {/* ----------------------------------------------------------------- */}
      {relatedPosts.length > 0 && (
        <section className="bg-cream py-12 sm:py-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-8 text-center">
              Related Articles
            </h2>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => {
                const relatedCategoryColor =
                  categoryColors[related.category] ||
                  'bg-sage/15 text-forest';
                return (
                  <StaggerItem key={related.slug}>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-sage/30 hover:shadow-lg transition-all card-hover block"
                    >
                      <div
                        className={`h-36 bg-gradient-to-r ${related.featuredGradient} relative`}
                      >
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                      </div>
                      <div className="p-5">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold font-body mb-3 ${relatedCategoryColor}`}
                        >
                          {related.category}
                        </span>
                        <h3 className="font-bold font-heading text-charcoal group-hover:text-forest transition-colors mb-2 leading-snug">
                          {related.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-charcoal-light font-body">
                          <span>{related.author.name}</span>
                          <span className="text-gray-300">|</span>
                          <span>{related.readingTime}</span>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* CTA Banner */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-forest to-forest-dark">
        <AnimateOnScroll direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
            Ready for Cleaner, Fresher Turf?
          </h2>
          <p className="text-lg text-white/85 font-body mb-8 max-w-2xl mx-auto leading-relaxed">
            Share the property address, approximate turf size, the condition you
            want addressed, and access details. We&apos;ll review the cleaning
            scope for your home, business, or managed property.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={quoteUrl}
              className="inline-flex items-center gap-2 bg-sage hover:bg-sage-light text-forest-dark font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md hover:shadow-lg"
            >
              Request a Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={localServiceUrl}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body backdrop-blur-sm"
            >
              <MapPin className="w-5 h-5" />
              {serviceLinkLabel}
            </Link>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
