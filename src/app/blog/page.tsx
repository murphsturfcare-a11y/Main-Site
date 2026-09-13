import type { Metadata } from 'next';
import Link from 'next/link';
import BlogContent from './BlogContent';
import { blogSummaries } from '@/data/blog';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    "Expert artificial turf cleaning tips, pet care guides, and maintenance insights for California homeowners. Learn from Murphy's Turf professionals how to keep your synthetic turf clean, well maintained.",
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: "Blog | Murphy's Turf",
    description:
      'Expert artificial turf cleaning tips, pet care guides, and maintenance insights for California homeowners.',
  },
};

const blogPosts = blogSummaries;

const categories = ['All', 'Turf Cleaning', 'Pet Care', 'Maintenance Tips', 'Local Guides', 'Commercial'] as const;

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Turf Cleaning': { bg: 'bg-sage/15', text: 'text-forest' },
  'Pet Care': { bg: 'bg-amber-100', text: 'text-amber-700' },
  'Maintenance Tips': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  'Local Guides': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Commercial': { bg: 'bg-forest/10', text: 'text-forest' },
};

/* ----------------------- CATEGORY COUNTS ----------------------- */

const categoryCounts: Record<string, number> = {};
blogPosts.forEach((post) => {
  categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
});

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */

export default function BlogPage() {
  return (
    <>
      {/* ----------------- HERO ----------------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/95 via-forest/90 to-sage/80" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_25%_25%,white_1px,transparent_1px)] bg-[length:40px_40px]" />

        <AnimateOnScroll direction="up" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <span className="inline-block bg-sage/20 border border-sage/40 text-sage-light font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
            Insights &amp; Expertise
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Murphy&apos;s Turf Blog
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-gray-200 font-body leading-relaxed max-w-3xl mx-auto">
            Artificial Turf Cleaning Tips, Pet Care Guides &amp; Maintenance Insights for California Homeowners
          </p>
        </AnimateOnScroll>
      </section>

      {/* ----------------- BLOG CONTENT ----------------- */}
      <BlogContent
        posts={blogPosts}
        categories={[...categories]}
        categoryColors={categoryColors}
        categoryCounts={categoryCounts}
      />

      {/* ----------------- FULL ARTICLE INDEX ----------------- */}
      {/* Server-rendered directory so every post is reachable by a real link
          (the grid above paginates client-side and only exposes page one). */}
      <section className="bg-cream border-t border-gray-200 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-charcoal">
            All Articles
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {categories
              .filter((category) => category !== 'All')
              .map((category) => (
                <div key={category}>
                  <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-forest">
                    {category}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {blogPosts
                      .filter((post) => post.category === category)
                      .map((post) => (
                        <li key={post.slug}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="font-body text-sm leading-snug text-charcoal-light transition-colors hover:text-forest"
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
