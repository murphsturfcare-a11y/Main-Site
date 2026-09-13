import { render, screen, within, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import BlogPostPage, { generateMetadata, generateStaticParams } from '@/app/blog/[slug]/page';
import { blogPosts, blogSummaries, getBlogHeadings } from '@/data/blog';
import sitemap from '@/app/sitemap';

vi.mock('next/navigation', () => ({
  notFound: () => { throw new Error('NEXT_NOT_FOUND'); },
}));

afterEach(cleanup);

describe('Blog content inventory', () => {
  it('makes every published article reachable through static generation and the listing', () => {
    const slugs = Object.keys(blogPosts).sort();
    expect(generateStaticParams().map(({ slug }) => slug).sort()).toEqual(slugs);
    expect(blogSummaries.map(({ slug }) => slug).sort()).toEqual(slugs);
    expect(blogSummaries[0].date).toBe('2026-09-12');
  });

  it('resolves every related article and inline blog link', () => {
    for (const post of Object.values(blogPosts)) {
      const inline = Array.from(post.content.matchAll(/href="\/blog\/([^"#]+)"/g), ([, slug]) => slug);
      for (const slug of [...post.relatedSlugs, ...inline]) {
        expect(blogPosts[slug], `${post.slug} links to missing ${slug}`).toBeDefined();
      }
    }
  });

  it('links only to real local pages throughout every article', () => {
    const routes = new Set(sitemap().map(({ url }) => new URL(url).pathname.replace(/\/$/, '') || '/'));
    for (const post of Object.values(blogPosts)) {
      if (post.servicePath) {
        expect(routes.has(post.servicePath), `${post.slug} has a missing service destination`).toBe(true);
        expect(post.content, `${post.slug} CTA should match an in-article service`).toContain(`href="${post.servicePath}"`);
      }
      if (post.category === 'Commercial') {
        expect(post.servicePath, `${post.slug} should send its quote request to commercial service`).toMatch(/^\/commercial-turf-cleaning(?:\/|$)/);
      }
      for (const [, href] of post.content.matchAll(/href="(\/[^"#]*)/g)) {
        const path = new URL(href, 'https://murphysturf.com').pathname.replace(/\/$/, '') || '/';
        expect(routes.has(path), `${post.slug} links to missing ${path}`).toBe(true);
      }
    }
  });

  it('renders editorial headings as headings rather than swallowing their following prose', () => {
    for (const post of Object.values(blogPosts)) {
      const parsed = new DOMParser().parseFromString(post.content, 'text/html');
      expect(parsed.body.textContent, post.slug).not.toMatch(/(^|\s)#{2,3}\s/);
      for (const heading of parsed.querySelectorAll('h2, h3')) {
        expect(heading.textContent, post.slug).not.toContain('\n');
        expect(heading.textContent!.length, `${post.slug}: ${heading.textContent}`).toBeLessThan(120);
        expect(heading.querySelector('p, ul, ol, h2, h3')).toBeNull();
      }
    }
  });

  it('records the substantive review date and calculated reading time on every legacy article', () => {
    const legacy = Object.values(blogPosts).filter((post) => !post.serviceArea);
    expect(legacy).toHaveLength(41);
    for (const post of legacy) {
      expect(post.updatedDate, post.slug).toBe('September 12, 2026');
      const words = post.content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
      expect(post.readingTime, post.slug).toBe(`${Math.ceil(words / 200)} min read`);
      expect(post.content, post.slug).not.toMatch(/safe (?:once dry|to use as soon as it dries)|no harmful residue|zero toxic buildup|independent testing shows|does not contaminate groundwater|100% pet|99\.9%/i);
    }
  });

  it('retains real unique anchor IDs even when a heading contains apostrophes', () => {
    for (const post of Object.values(blogPosts)) {
      const parsed = new DOMParser().parseFromString(post.content, 'text/html');
      const headings = getBlogHeadings(post.content);
      expect(headings.length).toBeGreaterThan(0);
      expect(new Set(headings.map(({ id }) => id)).size).toBe(headings.length);
      for (const { id, title } of headings) {
        expect(parsed.getElementById(id)?.textContent).toBe(title);
      }
    }
  });
});

describe('Palm Desert article pages', () => {
  const desertPosts = Object.values(blogPosts).filter((post) => post.serviceArea === 'palm-desert');

  it.each(desertPosts)('renders $slug with crawlable guidance, sources, and local service links', async (post) => {
    const { container } = render(await BlogPostPage({ params: Promise.resolve({ slug: post.slug }) }));
    expect(screen.getByRole('heading', { level: 1, name: post.title })).toBeInTheDocument();
    const article = container.querySelector('article')!;
    expect(article.textContent!.trim().split(/\s+/).length).toBeGreaterThan(700);
    expect(article.querySelector('a[href^="https://"]')).not.toBeNull();
    expect(article.querySelector('a[href="/locations/palm-desert"]')).not.toBeNull();
    expect(article.querySelector('p > strong')).not.toBeNull();
    const toc = screen.getByRole('navigation', { name: 'Table of contents' });
    for (const link of within(toc).getAllByRole('link')) {
      const target = decodeURIComponent(link.getAttribute('href')!.slice(1));
      expect(container.querySelector(`[id="${target}"]`)).not.toBeNull();
    }
    expect(container.querySelector('a[href="#"]')).toBeNull();
    expect(screen.queryByText('Featured Image')).not.toBeInTheDocument();
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: post.slug }) });
    expect(metadata.alternates?.canonical).toBe(`https://murphysturf.com/blog/${post.slug}`);
    expect(metadata.description).toBe(post.metaDescription);
  });

  it('rejects an unknown article route', async () => {
    await expect(BlogPostPage({ params: Promise.resolve({ slug: 'not-a-real-post' }) }))
      .rejects.toThrow('NEXT_NOT_FOUND');
  });
});


describe('Article quote destinations', () => {
  it.each([
    ['seasonal-home-commercial-turf-palm-desert', '/commercial-turf-cleaning/palm-desert#quote-form'],
    ['dog-daycare-turf-cleaning-irvine', '/commercial-turf-cleaning/huntington-beach/commercial-turf-cleaning-in-irvine#quote-form'],
    ['artificial-turf-cleaning-riverside', '/locations/murrieta/turf-cleaning-in-riverside#quote-form'],
    ['artificial-turf-cleaning-palm-desert', '/locations/palm-desert#quote-form'],
    ['hoa-artificial-turf-maintenance-guide', '/commercial-turf-cleaning#service-areas'],
    ['artificial-turf-cleaning-san-diego', '/locations'],
    ['how-to-clean-artificial-turf', '/locations'],
  ])('routes %s to the appropriate quote path', async (slug, expected) => {
    render(await BlogPostPage({ params: Promise.resolve({ slug }) }));
    expect(screen.getByRole('link', { name: 'Request a Free Quote' })).toHaveAttribute('href', expected);
    expect(screen.getByRole('link', { name: 'Get a Free Quote' })).toHaveAttribute('href', expected);
  });
});
