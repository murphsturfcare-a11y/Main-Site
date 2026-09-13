#!/usr/bin/env node
/** Optional text mirrors for readers/tools. The HTML articles remain canonical.
 * This is not a ranking requirement for Google or a promise of AI citations.
 * Uses the same editorial inventory as the visible blog and service-area pages.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SITE_URL = 'https://murphysturf.com';

// Load our data-only TypeScript modules without importing a Next route or
// maintaining a second content parser. TypeScript is already a build dependency.
const moduleCache = new Map();
function loadData(file) {
  if (moduleCache.has(file)) return moduleCache.get(file);
  const source = fs.readFileSync(file, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: file,
  });
  const dataModule = { exports: {} };
  moduleCache.set(file, dataModule.exports);
  const requireData = (specifier) => {
    const resolved = specifier.startsWith('@/')
      ? path.join(ROOT, 'src', specifier.slice(2))
      : path.resolve(path.dirname(file), specifier);
    if (!resolved.startsWith(path.join(ROOT, 'src', 'data') + path.sep)) {
      throw new Error(`Data generator cannot load non-data import ${specifier}`);
    }
    return loadData(`${resolved}.ts`);
  };
  vm.runInNewContext(outputText, { module: dataModule, exports: dataModule.exports, require: requireData }, { filename: file });
  return dataModule.exports;
}

export function htmlToMarkdown(html) {
  let md = html.replace(/\s+(?:class|id)="[^"]*"/g, '');
  md = md.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level, text) => `\n${'#'.repeat(Number(level))} ${text}\n`);
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, inner) => '\n' + inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n') + '\n');
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, inner) => {
    let index = 0;
    return '\n' + inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, text) => `${++index}. ${text}\n`) + '\n';
  });
  md = md.replace(/<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, '**$1**');
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => `[${text}](${href.startsWith('/') ? SITE_URL + href : href})`);
  md = md.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '');
  const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  md = md.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, code) => {
    if (code[0] !== '#') return entities[code.toLowerCase()] || entity;
    return String.fromCodePoint(code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10));
  });
  return md.replace(/^[ \t]+/gm, '').replace(/[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n').trim();
}

export function generatePostMarkdown(post) {
  return `# ${post.title}\n\n> ${post.metaDescription}\n\n**Category:** ${post.category}\n**Published:** ${post.publishDate}${post.updatedDate ? `\n**Updated:** ${post.updatedDate}` : ''}\n**Reading time:** ${post.readingTime}\n**Source:** ${SITE_URL}/blog/${post.slug}\n\n---\n\n${htmlToMarkdown(post.content)}\n`;
}

function main() {
  const { blogPosts } = loadData(path.join(ROOT, 'src/data/blog.ts'));
  const { locations } = loadData(path.join(ROOT, 'src/data/locations.ts'));
  const posts = Object.values(blogPosts);
  if (!posts.length) throw new Error('No published blog posts');
  const directory = path.join(PUBLIC_DIR, 'blog');
  fs.mkdirSync(directory, { recursive: true });
  const current = new Set(posts.map((post) => `${post.slug}.md`));
  // Only generated article mirrors in this dedicated directory are managed.
  for (const filename of fs.readdirSync(directory)) {
    if (filename.endsWith('.md') && !current.has(filename)) fs.unlinkSync(path.join(directory, filename));
  }
  for (const post of posts) fs.writeFileSync(path.join(directory, `${post.slug}.md`), generatePostMarkdown(post));
  const areaLinks = locations.map((location) => `- [${location.name}](${SITE_URL}/locations/${location.slug}): ${location.serviceAreaDescription}`).join('\n');
  const blogLinks = posts.map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.metaDescription} [Text mirror](${SITE_URL}/blog/${post.slug}.md)`).join('\n');
  const index = `# Murphy's Turf

> Professional artificial turf cleaning, debris removal, blooming, disinfecting and deodorizing in the California service areas listed below.

## About this file

This optional index points to the website's published pages. HTML source pages are the canonical versions. Service areas describe coverage, not additional offices. Confirm scheduling, treatment suitability and pricing with the team for the specific property.

## Services

- [Pet Hair & Debris Removal](${SITE_URL}/services/pet-hair-debris)
- [Blooming & De-Compacting](${SITE_URL}/services/blooming-decompacting)
- [Disinfect & Deodorize](${SITE_URL}/services/disinfect-deodorize)
- [Poop Scooping](${SITE_URL}/services/poop-scooping)
- [Commercial Turf Cleaning](${SITE_URL}/commercial-turf-cleaning): Maintenance for shared pet areas, hospitality, schools, gyms and property managers.

## Service Areas

${areaLinks}

## Articles

${blogLinks}

## Contact and complete articles

- [Service-area contact options](${SITE_URL}/locations)
- [Full article text](${SITE_URL}/llms-full.txt)
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), index);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), `# Murphy's Turf — Article Text\n\nCanonical site: ${SITE_URL}\n\nThis file mirrors the published articles. Use each article's Source URL for citation.\n\n---\n\n${posts.map(generatePostMarkdown).join('\n\n---\n\n')}`);
  console.log(`[llm-gen] Generated ${posts.length} article mirrors and both indexes from shared data.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
