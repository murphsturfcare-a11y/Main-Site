# Murphy's Turf: technical SEO and AEO audit

Audit date: September 12, 2026. Scope: source and read-only production checks at https://murphysturf.com. Changes described as repaired are local source changes until a deployment is explicitly authorized and verified.

## Live baseline

The full sitemap crawl checked **215 URLs: 172 HTML pages and 43 text files**. All returned HTTP 200. Every HTML page had one H1, a unique title and meta description, one self-referencing production canonical, and no `noindex` directive. JSON-LD blocks present in the returned HTML parsed successfully. The crawl also checked 25 additional linked resources, including images and manifest files, from 197 distinct internal resource targets.

The crawl found **18 link defects**: 17 article table-of-contents anchors whose apostrophe normalization did not match their heading IDs, and one Huntington Beach hub link to a nonexistent `turf-cleaning-in-huntington-beach` child page. Those fixes are implemented in the article and regional templates.

Three unknown-route probes (root, blog, and location) returned real HTTP 404 and `noindex`, rather than a homepage fallback with HTTP 200. `/contact` and the legacy hydrogen-peroxide article path resolved to their intended current destinations. Live `robots.txt`, `llms.txt`, and `llms-full.txt` all returned 200. No forms were submitted.

Evidence: [complete live baseline](audits/2026-09-12-live-seo-baseline.json). Re-run using `node scripts/audit-seo.mjs https://murphysturf.com /tmp/murphys-live-seo.json` after an authorized release. The script checks every sitemap page and same-origin linked resources; it does not execute JavaScript or measure field Core Web Vitals.

## Technical repairs

| Finding | Repair | Why it matters |
| --- | --- | --- |
| Every sitemap URL used the build timestamp as `lastmod`; city and article URL lists were duplicated across files. | Sitemap derives residential and commercial URLs from shared inventories and article URLs/dates from the published blog data. Only recorded article editorial dates receive `lastmod`; other pages omit it. | Search engines can trust modification dates and discover new pages without a second hand-maintained URL list drifting. |
| Sitemap included 41 Markdown article duplicates plus two index/full-text files. | Sitemap now contains canonical HTML pages only. Optional text mirrors remain available through `llms.txt`; Netlify configuration applies `X-Robots-Tag: noindex` to these duplicate text representations. | Keeps one indexable article representation while retaining optional text access. |
| Allow-only groups for specific AI and search crawlers bypassed the default private-path exclusions. | One wildcard group consistently allows public content and excludes `/admin/`, `/api/`, and Netlify function paths. | Same crawl policy across crawlers. Robots is not access control. |
| Sitewide business JSON-LD used `next/script`, separate from the shared business schema. It included precise coordinates/hours in helper data without visible source confirmation. | Render the shared business schema directly in server HTML. Use one provider identity, regional contact points and actual service-area data; omit unverified geo/hours. | Makes entity information available without waiting for hydration and avoids inconsistent business facts. |
| Residential city templates represented service areas as local businesses/addresses. | Regional pages describe a `Service` supplied by the existing business; the new area does not invent a physical branch, street address or local reviews. | Coverage is distinct from a staffed location. |
| Custom AI meta tags asserted `human-authored` and special AI readability. | Removed unsupported authorship/readability declarations. | These tags are not a substitute for reliable visible content. |
| Text generator re-parsed a page component and supplied its own claims about extra offices, every California city, chemistry and automatic safety after drying. Its ordered-list replacement printed literal `$1`. | Generator loads shared article/location data, preserves ordered-list text, writes absolute source links and removes independent business/safety claims. | Optional text answers now follow published page content and do not introduce new claims. All article content has also completed the editorial review below. |
| Manifest existed in two forms. | Layout references the generated `manifest.webmanifest`, with the actual 192/512 pixel app icons. | Uses one maintained manifest declaration. The former JSON manifest was live and was not a 404. |
| Error page inherited the root canonical. | Error metadata explicitly opts out of indexing and clears the canonical. | Prevents the error document from claiming to be the homepage. |
| Cookie acceptance hid the banner on later visits, but Analytics reset consent to denied; clicks before `gtag` existed were dropped. | A root initializer sets consent before tag loading. Only exact stored acceptance restores grants; missing, invalid or inaccessible storage defaults to denied. Banner decisions are queued before Analytics loads, and subsequent bootstrap cannot overwrite them. Declines update all four existing consent categories, including a choice changed in another tab. | Honors the saved choice and preserves the command order without changing account configuration. |

The article template also now uses actual heading IDs for navigation, working share URLs, shared article inventory, and optional editorial update dates in visible text and metadata. The homepage FAQ is rendered as text and matching structured data. Palm Desert's residential, commercial and supporting guide content is authored around different practical needs instead of creating a page for every subdivision name.

A bounded release follow-up found a remaining inherited Open Graph description claiming statewide coverage, an unsupported `$$` price tier, and a commercial `InStock` offer. The shared social description now uses the reviewed company copy; organization, business and general-service schema derive coverage from the five published regions. The commercial index uses the same regions. Unsupported price and availability fields were removed; `containedInPlace: California` remains accurate geographic context. These repairs were included in the final integration build and export.

The same follow-up checked the existing export's link graph: **all 188 sitemap pages are reachable from the homepage**, with no orphan or zero-incoming pages. The only exported HTML outside the sitemap is `/404` and `/_not-found`, both `noindex`. This used local files instead of repeating the passed HTTP crawl. [Discovery evidence and pre-repair schema samples](audits/2026-09-12-release-discovery-review.json).

## Non-blog editorial remediation completed

The follow-up reviewed the active non-blog content, including all service routes, four original regional hubs and their residential/commercial city templates, homepage sections, global FAQs, company data, metadata registries, footer, and manifest. The service route now consumes the same reviewed service inventory as the rest of the site, removing the independent duplicate copy that previously reintroduced stronger claims.

Removed unsupported universal chemical, efficacy, health, environmental, reopening, and lifespan claims. Removed the EPA oil/toxic-waste comparison, exact experience/customer/satisfaction/project metrics, an unverified founding year and credential list, unsourced homepage/regional reviews and rating summaries, and the invented regional street-address narrative. Service schema retains the existing provider identity and does not manufacture a business branch or customer evidence.

The old repeated before/after asset was shown as several different transformations. Those claims were removed. The service, home, and regional galleries now share two existing photographs inspected during this task and captioned by their visible contents, without fabricated pairings, locations, or measured outcomes.

The legacy regional content now distinguishes coastal versus inland Southern California, Inland Empire access and runoff considerations, Contra Costa versus Tri-Valley routing, and Greater Sacramento city/community address handling. Every retained legacy residential child route has an explicit regional care context; commercial pages add facility access, surface specifications, approval, closure, and reopening decisions. Arbitrary commercial-segment rotation by city index was removed. Shared descriptions of the same service remain shared rather than being rewritten solely to create artificial uniqueness. All URLs and regional phone numbers are preserved.

Verification at this stage: **433 targeted tests passed across 28 files**, including server-rendered checks for shared service copy, matching visible/schema FAQ answers, regional guidance, preserved phone links, omitted unsourced metrics/reviews, and coverage of every legacy child-route context. TypeScript passed. Root-level final checks supersede this intermediate count.

## External measurement and policy limits

- All 41 older articles were rewritten and reviewed, and the four new guides retained. Unsupported product, health, environmental, legal and company-specific assertions were removed. The revised articles explain how to identify the actual surface, treatment instructions and responsible decision-maker for a job. See the completed [editorial audit](seo-aeo-editorial-audit.md).
- Marketing proof claims without source evidence were removed rather than left published pending approval. Future reviews or credentials should be supported before publication. Contractual business-policy terms are a separate owner review; this content cleanup does not invent replacement refund, cancellation, or legal terms.
- This audit verifies public crawlability, source structure and link behavior. Search Console/Bing Webmaster indexing coverage, submitted sitemap state, manual actions, query performance, Google Business Profile service-area configuration, real AI citations, field Core Web Vitals and lead attribution were not accessible/verified in this task.
- After release, check the production sitemap and headers again, inspect representative Palm Desert HTML in Search Console, and review whether the new content is indexed and earning relevant inquiries. Local source success does not establish production deployment or rankings.

## Guidance applied

Google says AI Overviews/AI Mode use the same foundational SEO practices: crawlable/indexable pages, useful visible text, internal links and structured data consistent with the page; special AI text files or schema are not required. The optional text files are therefore a convenience rather than a ranking promise. [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)

Modification dates should reflect meaningful page changes, and can be omitted when no reliable date is available. [Google: sitemap lastmod guidance](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping)

Structured data should represent visible content and avoid misleading identities or invented reviews. [Google: structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

Generating pages without added value can create scaled-content problems; the important editorial test is usefulness and accuracy, including metadata. [Google: generative content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)

Bing similarly emphasizes canonical URL consistency, reliable rendering, clear removal status and crawl/index controls for Search and Copilot grounding. [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)

Google requires consent defaults before measurement commands and explains that consent mode does not itself persist choices. The local repair stores the existing choices, restores explicit acceptance on subsequent loads, and updates consent when the visitor acts. [Google: consent mode setup](https://developers.google.com/tag-platform/security/guides/consent)

## Verification

Final integration: **859 tests passed across 72 files, no TODOs; full repository lint, TypeScript and production build passed.** All **188 exported HTML sitemap pages** returned 200 with zero detected audit issues, including FAQ-schema questions/answers verified against page text after removing JSON-LD scripts. Four older commercial hubs were corrected to display their schema FAQs. Redirect and real-404 probes passed; optional text noindex headers were checked in the local Netlify-style export server.

Browser checks passed at 320/360/390/768/1440 pixels, all 16 new routes, intercepted form error/retry/success, old and new no-JavaScript content, native FAQs and disabled pre-hydration submission. Seven hero media scenarios passed against the final export. No production deployment, real form submission or account-level analytics verification occurred. Final evidence and scope are in the [main audit](seo-aeo-audit.md).

- Consent regression checks: **29 tests passed across four files**, covering actual initialization snippets, saved acceptance after reload, early acceptance before bootstrap, declined/invalid/inaccessible storage, failed persistence, cross-tab decline, and one initial pageview followed by client-navigation pageviews. Scoped ESLint and TypeScript passed. No live analytics account or delivery test was performed.
- Technical scoped ESLint passed for the new audit/generator scripts, SEO helpers, layout metadata/schema, robots, sitemap, manifest, error page and focused tests.
- Final service-scope follow-up: **111 tests passed across four focused files**, including the rendered commercial index and inherited layout Open Graph metadata. Scoped ESLint and `git diff --check` passed. The integration build, Netlify function bundle, full TypeScript and lint checks also passed; the complete suite now passes 859 tests across 72 files.
- The generator executed successfully against all 45 articles and current service-area data.
- Technical regression run: 202 tests passed across 11 files, including sitemap inventory, article dates, crawl exclusions, metadata, service-area schema and ordered-list export. This intermediate technical count is superseded by the final integration results above.
