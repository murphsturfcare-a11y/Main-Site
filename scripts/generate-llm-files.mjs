#!/usr/bin/env node
/**
 * Generate LLM-friendly files for AI search engines (ChatGPT, Claude, Perplexity, etc.)
 *
 * Outputs to public/:
 *   - llms.txt              Curated markdown index of the entire site
 *   - llms-full.txt         Full markdown content of all blog posts concatenated
 *   - blog/{slug}.md        Per-post markdown mirror of every blog post
 *
 * Runs as a prebuild step (see package.json). Reads the blog source file
 * directly and strips HTML down to clean markdown so LLMs can ingest it.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const BLOG_SOURCE = path.join(ROOT, 'src/app/blog/[slug]/page.tsx');
const LOCATIONS_SOURCE = path.join(ROOT, 'src/app/locations/[slug]/page.tsx');
const PUBLIC_DIR = path.join(ROOT, 'public');
const PUBLIC_BLOG_DIR = path.join(PUBLIC_DIR, 'blog');

const SITE_URL = 'https://murphysturf.com';

// ---------------------------------------------------------------------------
// HTML → Markdown conversion
// ---------------------------------------------------------------------------

function htmlToMarkdown(html) {
  let md = html;

  // Remove class attributes and other noise
  md = md.replace(/\s+class="[^"]*"/g, '');
  md = md.replace(/\s+id="[^"]*"/g, '');

  // Headings
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n');
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n');

  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');

  // Lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, inner) => {
    return '\n' + inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n') + '\n';
  });
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, inner) => {
    let i = 0;
    return '\n' + inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, () => `${++i}. $1\n`) + '\n';
  });

  // Strong/bold
  md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');

  // Links — make them absolute
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
    const absHref = href.startsWith('/') ? `${SITE_URL}${href}` : href;
    return `[${text}](${absHref})`;
  });

  // Remove remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode common HTML entities
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#x27;/g, "'");
  md = md.replace(/&apos;/g, "'");
  md = md.replace(/&nbsp;/g, ' ');

  // Normalize whitespace
  md = md.replace(/^[ \t]+/gm, ''); // strip leading whitespace from template indentation
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.replace(/[ \t]+$/gm, '');
  md = md.trim();

  return md;
}

// ---------------------------------------------------------------------------
// Parse blogPosts object from [slug]/page.tsx
// ---------------------------------------------------------------------------

function parseBlogPosts() {
  const source = fs.readFileSync(BLOG_SOURCE, 'utf8');
  const posts = [];

  // Match each post entry: 'slug-name': { ... },
  // Use a state machine to track brace depth and string boundaries
  const startMarker = /const blogPosts: Record<string, BlogPost> = \{/;
  const startMatch = source.match(startMarker);
  if (!startMatch) throw new Error('Could not find blogPosts object');

  const objectStart = startMatch.index + startMatch[0].length;

  // Find each top-level entry by matching the pattern: 'slug': {
  const entryRegex = /'([a-z0-9-]+)':\s*\{/g;
  entryRegex.lastIndex = objectStart;

  const entries = [];
  let m;
  while ((m = entryRegex.exec(source)) !== null) {
    entries.push({ slug: m[1], start: m.index + m[0].length });
  }

  // For each entry, find the matching closing brace
  for (const entry of entries) {
    let depth = 1;
    let inString = false;
    let stringChar = null;
    let inTemplate = false;
    let i = entry.start;

    while (i < source.length && depth > 0) {
      const ch = source[i];
      const prev = source[i - 1];

      if (inTemplate) {
        if (ch === '`' && prev !== '\\') inTemplate = false;
      } else if (inString) {
        if (ch === stringChar && prev !== '\\') inString = false;
      } else {
        if (ch === '`') inTemplate = true;
        else if (ch === '"' || ch === "'") {
          inString = true;
          stringChar = ch;
        } else if (ch === '{') depth++;
        else if (ch === '}') depth--;
      }
      i++;
    }

    const body = source.slice(entry.start, i - 1);
    const post = parsePostBody(entry.slug, body);
    if (post) posts.push(post);
  }

  return posts;
}

function parsePostBody(slug, body) {
  const getField = (name) => {
    const re = new RegExp(`${name}:\\s*(['"\`])([\\s\\S]*?)\\1,`, 'm');
    const match = body.match(re);
    return match ? match[2] : null;
  };

  const getTemplateField = (name) => {
    const re = new RegExp(`${name}:\\s*\`([\\s\\S]*?)\`,`, 'm');
    const match = body.match(re);
    return match ? match[1] : null;
  };

  const title = getField('title');
  const metaDescription = getField('metaDescription');
  const category = getField('category');
  const publishDate = getField('publishDate');
  const readingTime = getField('readingTime');
  const content = getTemplateField('content');

  if (!title || !content) return null;

  return {
    slug,
    title,
    metaDescription: metaDescription || '',
    category: category || '',
    publishDate: publishDate || '',
    readingTime: readingTime || '',
    content,
  };
}

// ---------------------------------------------------------------------------
// Generate per-post markdown file
// ---------------------------------------------------------------------------

function generatePostMarkdown(post) {
  const md = htmlToMarkdown(post.content);
  return `# ${post.title}

> ${post.metaDescription}

**Category:** ${post.category}
**Published:** ${post.publishDate}
**Reading time:** ${post.readingTime}
**Source:** ${SITE_URL}/blog/${post.slug}

---

${md}

---

*This article was published by Murphy's Turf, California's professional artificial turf cleaning company. We serve Huntington Beach, Murrieta, Martinez, Sacramento, and the entire state with pet-safe, chlorine-based cleaning treatments. Contact us at ${SITE_URL} for a free quote.*
`;
}

// ---------------------------------------------------------------------------
// Generate llms.txt (curated index)
// ---------------------------------------------------------------------------

function generateLlmsTxt(posts) {
  const blogLinks = posts
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}.md): ${p.metaDescription}`)
    .join('\n');

  return `# Murphy's Turf

> California's professional artificial turf cleaning company. We deep clean, disinfect, and deodorize synthetic turf for homeowners and businesses across the state. 30+ years of experience. Pet-safe chlorine-based cleaning process. Serving Huntington Beach, Murrieta, Martinez, Sacramento, and every city in between.

## About

Murphy's Turf is headquartered in Murrieta, California, with additional offices in Huntington Beach, Martinez, and Sacramento. We specialize in professional artificial turf cleaning, pet odor removal, blooming and de-compacting, disinfecting and deodorizing, and poop scooping services. Our process uses a professional-grade chlorine-based cleaning solution that is safe for pets, children, and the environment — while eliminating the bacteria and odor-causing compounds that build up in synthetic turf over time.

We serve every major region of California including Los Angeles, Orange County, the Inland Empire, San Diego, the San Francisco Bay Area, the East Bay, Sacramento, and the Central Valley.

## Services

- [Pet Hair & Debris Removal](${SITE_URL}/services/pet-hair-debris): Commercial-grade extraction of pet hair, leaves, dirt, and embedded debris from turf fibers and infill.
- [Blooming & De-Compacting](${SITE_URL}/services/blooming-decompacting): Power brushing to lift matted fibers and restore proper infill drainage.
- [Disinfect & Deodorize](${SITE_URL}/services/disinfect-deodorize): Professional chlorine-based sanitization that eliminates bacteria and neutralizes odors at the source.
- [Poop Scooping](${SITE_URL}/services/poop-scooping): Thorough pet waste removal as a standalone service or part of recurring maintenance plans.

## Service Locations

- [Huntington Beach / LA Coastal Corridor](${SITE_URL}/locations/huntington-beach): Serving Huntington Beach, Newport Beach, Costa Mesa, Long Beach, Seal Beach, Irvine, Fountain Valley, Garden Grove, Westminster, Laguna Beach, Dana Point, San Clemente, and Anaheim.
- [Murrieta / Inland Empire HQ](${SITE_URL}/locations/murrieta): Serving Murrieta, Temecula, French Valley, Menifee, Lake Elsinore, Hemet, Perris, Wildomar, Canyon Lake, Winchester, Corona, Riverside, Moreno Valley, Eastvale, Norco, and Fallbrook.
- [Martinez / East Bay](${SITE_URL}/locations/martinez): Serving Martinez, Concord, Pleasant Hill, Walnut Creek, Antioch, Brentwood, Lafayette, Danville, San Ramon, Dublin, Livermore, Pleasanton, Orinda, Alamo, and Oakley.
- [Sacramento / Central Valley](${SITE_URL}/locations/sacramento): Serving Sacramento, Elk Grove, Roseville, Folsom, Rancho Cordova, Citrus Heights, West Sacramento, Carmichael, Fair Oaks, Rocklin, Granite Bay, Natomas, and Orangevale.

## Blog Articles

${blogLinks}

## Key Facts

- **Founded:** Headquartered in Murrieta, CA with 30+ years of cleaning expertise
- **Cleaning method:** Chlorine-based professional-grade sanitization (NOT bleach, NOT ammonia, NOT hydrogen peroxide)
- **Pet safety:** All treatments are safe for pets and children once dry
- **Service areas:** Huntington Beach, Murrieta, Martinez, Sacramento, and surrounding California communities
- **Recommended frequency:** Every 4-8 weeks for homes with pets, every 3-6 months without pets
- **Contact:** ${SITE_URL}

## Full Content

For LLMs that want the complete content in one file, see [llms-full.txt](${SITE_URL}/llms-full.txt).
`;
}

// ---------------------------------------------------------------------------
// Generate llms-full.txt (full content concat)
// ---------------------------------------------------------------------------

function generateLlmsFullTxt(posts) {
  const header = `# Murphy's Turf — Full Content Export for LLMs

This file contains the full content of every blog article published by Murphy's Turf, California's professional artificial turf cleaning company. Each article is separated by a divider. Source URLs are provided for citation.

Site: ${SITE_URL}
Service areas: Huntington Beach, Murrieta, Martinez, Sacramento, and all surrounding California communities.

---

`;

  const articles = posts
    .map((post) => {
      const md = htmlToMarkdown(post.content);
      return `# ${post.title}

**URL:** ${SITE_URL}/blog/${post.slug}
**Category:** ${post.category}
**Published:** ${post.publishDate}

> ${post.metaDescription}

${md}

---
`;
    })
    .join('\n');

  return header + articles;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('[llm-gen] Parsing blog posts from source...');
  const posts = parseBlogPosts();
  console.log(`[llm-gen] Found ${posts.length} blog posts`);

  if (posts.length === 0) {
    throw new Error('No blog posts parsed — check regex and source file');
  }

  // Ensure output dirs exist
  fs.mkdirSync(PUBLIC_BLOG_DIR, { recursive: true });

  // Write per-post markdown files
  for (const post of posts) {
    const mdPath = path.join(PUBLIC_BLOG_DIR, `${post.slug}.md`);
    fs.writeFileSync(mdPath, generatePostMarkdown(post));
  }
  console.log(`[llm-gen] Wrote ${posts.length} per-post .md files to public/blog/`);

  // Write llms.txt
  const llmsTxt = generateLlmsTxt(posts);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), llmsTxt);
  console.log('[llm-gen] Wrote public/llms.txt');

  // Write llms-full.txt
  const llmsFullTxt = generateLlmsFullTxt(posts);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), llmsFullTxt);
  console.log(`[llm-gen] Wrote public/llms-full.txt (${(llmsFullTxt.length / 1024).toFixed(1)} KB)`);

  console.log('[llm-gen] Done');
}

main();
