# Murphy's Turf website

Next.js static website for Murphy's Turf at [murphysturf.com](https://murphysturf.com). The site covers Murrieta / Inland Empire, Huntington Beach / LA, Martinez / Bay Area, Sacramento, and Palm Desert with residential, commercial, service and guide pages.

## Develop and verify

```sh
npm install
npm run dev
npm test
npm run lint
npm run build
npx tsc --noEmit
```

The build checks `public` for internal tool/environment files, generates optional article/text mirrors from the shared content data, and exports the site to `out`. Keep private files outside `public`; everything in it can be published. The actual lead endpoint is `netlify/functions/lead.mts`, separate from the static export. Validate its bundle with `netlify functions:build` when changing the form or handler.

## Content and lead routing

- `src/data/locations.ts`, `palm-desert.ts` and `commercial.ts` define service coverage.
- `src/data/blog.ts` is the article source; `scripts/generate-llm-files.mjs` generates text mirrors.
- `src/components/forms/LeadForm.tsx` sends quote requests to the Netlify function.
- The handler uses server-only `GHL_API_KEY` and `GHL_LOCATION_ID`; see `.env.example` for configuration names. Never expose these as `NEXT_PUBLIC_*` values.
- Palm Desert requests carry `website-lead` and `location-palm-desert`. The service-area page city is validated separately from the visitor's property city. Account-side tag/routing setup is documented in the [Claude GHL handoff](docs/ghl-palm-desert-handoff.md).

## Release

The authorized repository is `murphsturfcare-a11y/Main-Site`, remote **`client`**, default branch **`main`**. The other remote's push URL is deliberately disabled and must not be used. `netlify.toml` specifies `npm run build` and publish directory `out`. A successful Git push is separate from a confirmed Netlify deployment; verify the live page identity, headers, routes and function after release.

Audit and QA evidence:

- [Final organic-lead SEO/AEO audit](docs/final-organic-lead-audit.md)
- [Expansion and complete audit](docs/seo-aeo-audit.md)
- [Quote attribution checks](docs/lead-attribution-qa.md)
- [Hero media checks](docs/hero-media-performance.md)

The audits distinguish local simulation, deployed behavior and account-level verification. Search rankings, real CRM receipt and workflow notifications require their own evidence.
