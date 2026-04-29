# SEO Changes Summary

This document lists all SEO-related changes implemented across the project to satisfy the DEV_TEAM_SEO_HANDOVER_v2.md requirements and subsequent improvements.

- **Prerendering / SSG (Vite)**: Implemented Vite build + prerender flow using `scripts/prerender.mjs`. Generates static HTML for routes and writes files to `dist/<route>/index.html` so routes are discoverable by crawlers.

- **Substantive prerendered content**: `scripts/prerender.mjs` now injects meaningful route intros (≈300+ words) into each prerendered page so crawlers index substantive content for SEO.

- **Metadata management**:
  - Centralized route metadata in `src/App.tsx` and mirrored in `scripts/prerender.mjs`.
  - Implemented `upsertMeta(...)` to update `<title>` and meta tags on navigation and prerender.
  - Prerender updates meta tags per-route before writing static HTML.

- **Structured Data (JSON-LD)**:
  - Externalized JSON-LD files to `public/schema/` (e.g. `home.jsonld`, `services.jsonld`, `portfolio.jsonld`, etc.).
  - `index.html` and SPA load route JSON-LD via script tags with `src` (no inline JSON-LD) and `data-route-schema` attribute.
  - SPA runtime includes `upsertJsonLd(src)` in `src/App.tsx` to switch JSON-LD per route.
  - Prerender includes route-specific JSON-LD references in generated HTML.

- **Content Security Policy (CSP) and Security Headers**:
  - Hardened CSP in `vercel.json` (moved to Report-Only for staging): removed `unsafe-inline` for scripts where possible and enforced `script-src 'self'` + recommended sources.
  - Added COOP/COEP and `object-src 'none'` and HSTS headers in `vercel.json`.
  - Externalized inline scripts (JSON-LD) to comply with the stricter CSP.
  - Note: CSP reporting endpoint (`/_csp-report`) is referenced but not implemented — pending.

- **Sitemap / Robots / Discovery**:
  - `scripts/prerender.mjs` generates `sitemap.xml`, `robots.txt`, and `llms.txt` directly into `dist/` during prerender.
  - Routes in the sitemap match prerendered pages and use canonical-friendly directory `index.html` layout.

- **Lighthouse/SEO optimizations**:
  - Ensured a visible, crawlable `<main>` (prerender removes hiding styles via `makeVisibleMain()`), improving accessibility and indexability.
  - Added per-route descriptions and OG/Twitter meta placeholders in prerendered HTML (OG image update pending — see TODOs).

- **Images / Media**:
  - Added `scripts/optimize-images.mjs` using `sharp` to generate AVIF/WebP/PNG/JPEG responsive variants and wrote outputs to `public/assets/optimized/`.
  - Built optimized assets for hero and project imagery (`public/assets/optimized/*`), reducing LCP and improving performance.
  - Remaining: wire optimized images into components (`src/components/Hero.tsx`, `AllProjects.tsx`, `KineticVault.tsx`, etc.) using `<picture>` + `srcset`, set explicit `width`/`height`, and preload LCP image for the home hero.

- **Preloads & LCP**:
  - Prerender script supports adding preload hints; recommended to add a `<link rel="preload" as="image" href="/assets/optimized/<hero>-1200.webp">` for the LCP hero during prerender.
  - This is not yet added to all routes — prioritized for home hero.

- **Social / Open Graph**:
  - OG and Twitter meta tags are present in metadata flow; updating `og:image` to an optimized 1200×630 asset is pending (TODO).

- **Robots / LLMs / Security files**:
  - `llms.txt` exported in `dist/` to declare allowed/disallowed crawler behaviour per SEO handover.
  - `robots.txt` generated and includes references to `sitemap.xml`.

- **Build / CI changes**:
  - `npm run build` flow: `vite build` → `node scripts/prerender.mjs` (creates static routes and sitemap/robots/llms) → optimized assets are used from `public/`.

- **Code changes (high-level file list)**:
  - `scripts/prerender.mjs` — major changes: route meta injection, `makeVisibleMain`, `replaceMeta`, `replaceTag`, `generateRouteIntro`, writing `dist/<route>/index.html`, generating `sitemap.xml`, `robots.txt`, `llms.txt`.
  - `src/App.tsx` — added `ROUTE_META`, `ROUTE_SCHEMA` mapping, `upsertJsonLd(src)` and meta update logic for SPA navigation.
  - `index.html` — updated to reference external JSON-LD and improved base metadata scaffolding for prerender.
  - `public/schema/*.jsonld` — new route JSON-LD files (externalized structured data).
  - `scripts/optimize-images.mjs` — new image optimizer using `sharp`.
  - `public/assets/optimized/` — new optimized image variants written by the optimizer.
  - `vercel.json` — updated security headers (CSP, COOP, COEP, HSTS, object-src restrictions).

- **Bugs fixed during implementation**:
  - Fixed placeholder token bug in `generateRouteIntro` (removed literal `${subject}` insertion).
  - Fixed malformed file path logic to write directory `index.html` instead of single-file names.
  - Resolved syntax errors introduced during iterative edits to `scripts/prerender.mjs`.

- **Pending / Next Steps (SEO-related)**:
  - Wire `public/assets/optimized/` images into `src/components/*` using `<picture>`/`srcset`, add `width`/`height`, and lazy-load non-LCP images.
  - Produce and wire an optimized OG image (1200×630) and update `og:image`/`twitter:image` via prerender and SPA meta upserts.
  - Implement CSP reporting endpoint or external report receiver and monitor `Content-Security-Policy-Report-Only` logs before moving to enforced policy.
  - Run Schema.org JSON-LD validation and Google Rich Results test on deployed pages.
  - Submit `sitemap.xml` to Google Search Console once deployed.

- **Notes / Rationale**:
  - Moving JSON-LD external reduces CSP friction and enables removing `unsafe-inline` from `script-src`.
  - Prerendered, contentful pages improve discoverability for search engines while keeping the Vite SPA routing intact for client navigation.

