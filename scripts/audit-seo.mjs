#!/usr/bin/env node
// Read-only crawl of every sitemap URL and same-origin linked page/asset.
// Usage: node scripts/audit-seo.mjs [base URL] [JSON report path]
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
const base = (process.argv[2] || 'https://murphysturf.com').replace(/\/$/, '');
const reportPath = process.argv[3] || '/tmp/murphys-seo-audit.json';
const origin = new URL(base).origin;
const canonicalOrigin = 'https://murphysturf.com';
const normalize = (url) => new URL(url).pathname.replace(/\/$/, '') || '/';
const request = async (url) => {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  return { status: response.status, finalUrl: response.url, type: response.headers.get('content-type') || '', xRobotsTag: response.headers.get('x-robots-tag') || '', text: await response.text() };
};
const sitemap = await request(`${base}/sitemap.xml`);
const urls = [...sitemap.text.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
if (sitemap.status !== 200 || !urls.length) throw new Error('Missing or empty sitemap');
const issues = [], pages = [], linked = new Map(), pageIds = new Map();
const queue = [...urls];
const add = (url, issue) => issues.push({ url, issue });
async function worker() {
  while (queue.length) {
    const declared = queue.shift(), url = `${base}${new URL(declared).pathname}`;
    try {
      const result = await request(url);
      const record = { url: declared, status: result.status, finalUrl: result.finalUrl, type: result.type, xRobotsTag: result.xRobotsTag };
      pages.push(record);
      if (result.status !== 200) add(declared, `HTTP ${result.status}`);
      if (normalize(result.finalUrl) !== normalize(declared)) add(declared, `redirected to ${result.finalUrl}`);
      if (!result.type.includes('text/html')) continue;
      const dom = new JSDOM(result.text), doc = dom.window.document;
      const all = (selector) => [...doc.querySelectorAll(selector)];
      record.title = doc.title;
      record.description = doc.querySelector('meta[name="description"]')?.content || '';
      record.canonical = doc.querySelector('link[rel="canonical"]')?.href || '';
      record.h1 = all('h1').map((e) => e.textContent.trim());
      record.mainWords = (doc.querySelector('main')?.textContent || '').trim().split(/\s+/).length;
      if (!record.title) add(declared, 'missing title');
      if ((record.title.match(/Murphy.s Turf/g) || []).length > 1) add(declared, 'duplicate brand in title');
      if (!record.description) add(declared, 'missing meta description');
      if (all('link[rel="canonical"]').length !== 1 || normalize(record.canonical || origin) !== normalize(declared) || new URL(record.canonical || origin).origin !== canonicalOrigin) add(declared, `invalid canonical ${record.canonical}`);
      if (record.h1.length !== 1) add(declared, `${record.h1.length} H1 headings`);
      if (/noindex/i.test(all('meta[name="robots"],meta[name="googlebot"]').map((e) => e.content).join(' '))) add(declared, 'sitemap page is noindex');
      if (/\b(noindex|none)\b/i.test(result.xRobotsTag)) add(declared, 'sitemap page has a noindex HTTP header');
      const schemas = all('script[type="application/ld+json"]');
      const visibleBody = doc.body.cloneNode(true);
      visibleBody.querySelectorAll('script,style,template').forEach((element) => element.remove());
      const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();
      const bodyText = normalizeText(visibleBody.textContent || '');
      record.schemaTypes = [];
      for (const schema of schemas) {
        try {
          const data = JSON.parse(schema.textContent);
          record.schemaTypes.push(data['@type'] || '@graph');
          const nodes = Array.isArray(data) ? data : [data, ...(data['@graph'] || [])];
          for (const node of nodes.filter((node) => node['@type'] === 'FAQPage')) {
            for (const question of node.mainEntity || []) {
              if (!bodyText.includes(normalizeText(question.name || ''))) add(declared, `FAQ schema question missing from page content: ${question.name}`);
              const answer = JSDOM.fragment(question.acceptedAnswer?.text || '').textContent || '';
              if (!bodyText.includes(normalizeText(answer))) add(declared, `FAQ schema answer missing from page content: ${question.name}`);
            }
          }
        }
        catch { add(declared, 'invalid JSON-LD'); }
      }
      const ids = all('[id]').map((element) => element.id);
      const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
      if (duplicateIds.length) add(declared, `duplicate element IDs: ${duplicateIds.join(', ')}`);
      pageIds.set(normalize(declared), new Set(ids));
      for (const element of all('a[href],img[src],link[rel="manifest"],meta[property="og:image"]')) {
        const value = element.getAttribute('href') || element.getAttribute('src') || element.getAttribute('content');
        if (!value || /^(tel:|mailto:|javascript:)/.test(value)) continue;
        let target; try { target = new URL(value, declared); } catch { continue; }
        if (target.origin !== canonicalOrigin && target.origin !== origin) continue;
        const key = target.pathname + target.search;
        if (!linked.has(key)) linked.set(key, { source: declared, hashes: [] });
        if (target.hash) linked.get(key).hashes.push({ source: declared, hash: decodeURIComponent(target.hash.slice(1)) });
      }
      dom.window.close();
    } catch (error) { add(declared, error.message); }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
const known = new Set(urls.map(normalize));
let checkedLinks = 0;
const linkQueue = [...linked.entries()];
await Promise.all(Array.from({ length: 6 }, async () => {
  while (linkQueue.length) {
    const [target, info] = linkQueue.shift();
    if (!known.has(normalize(`${base}${target}`))) {
      try {
        const response = await request(`${base}${target}`); checkedLinks++;
        if (response.status >= 400) add(info.source, `broken internal resource ${target}: HTTP ${response.status}`);
        if (response.type.includes('text/html')) {
          const dom = new JSDOM(response.text);
          pageIds.set(normalize(`${base}${target}`), new Set([...dom.window.document.querySelectorAll('[id]')].map((e) => e.id)));
          dom.window.close();
        }
      } catch (error) { add(info.source, `failed resource ${target}: ${error.message}`); }
    }
    for (const { source, hash } of info.hashes) {
      const ids = pageIds.get(normalize(`${base}${target}`));
      if (ids && !ids.has(hash)) add(source, `missing anchor ${target}#${hash}`);
    }
  }
}));
for (const field of ['title', 'description']) {
  const grouped = new Map();
  for (const page of pages.filter((p) => p[field])) grouped.set(page[field], [...(grouped.get(page[field]) || []), page.url]);
  for (const [value, group] of grouped) if (group.length > 1) issues.push({ urls: group, issue: `duplicate ${field}: ${value}` });
}
const probes = [];
for (const pathname of ['/seo-audit-does-not-exist', '/locations/not-a-location', '/blog/not-an-article', '/robots.txt', '/llms.txt', '/llms-full.txt', '/contact', '/blog/hydrogen-peroxide-turf-cleaning']) {
  try {
    const { text, ...result } = await request(`${base}${pathname}`);
    probes.push({ pathname, ...result, noindex: /name="robots"[^>]+noindex/.test(text) || /\b(noindex|none)\b/i.test(result.xRobotsTag) });
    const expectedStatus = ['/seo-audit-does-not-exist', '/locations/not-a-location', '/blog/not-an-article'].includes(pathname) ? 404 : 200;
    if (result.status !== expectedStatus) add(`${base}${pathname}`, `probe expected HTTP ${expectedStatus}, received ${result.status}`);
    const destination = { '/contact': '/locations', '/blog/hydrogen-peroxide-turf-cleaning': '/blog/chlorine-based-turf-cleaning' }[pathname];
    if (destination && normalize(result.finalUrl) !== destination) add(`${base}${pathname}`, `unexpected redirect destination ${result.finalUrl}`);
  } catch (error) { probes.push({ pathname, error: error.message }); add(`${base}${pathname}`, `probe failed: ${error.message}`); }
}
const report = { checkedAt: new Date().toISOString(), base, sitemapEntries: urls.length, htmlPages: pages.filter((p) => p.type.includes('text/html')).length, linkedResources: linked.size, additionalResourcesChecked: checkedLinks, issues, probes, pages };
fs.mkdirSync(path.dirname(reportPath), { recursive: true }); fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ report: reportPath, ...report, pages: undefined, issues: issues.slice(0, 20) }, null, 2));
process.exitCode = issues.length ? 1 : 0;
