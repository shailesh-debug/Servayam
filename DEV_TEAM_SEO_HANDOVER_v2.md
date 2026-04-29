
# Servayam SEO Handover for Development Team — v2

Audit date: 2026-04-25  
Revised: 2026-04-29  
Site audited: https://servayam.com/  
Current SEO health score: **42 / 100**  
Projected score after full implementation: **90–95 / 100**  
Primary risk: The site is a client-rendered single-page app whose initial HTML contains almost no crawlable body content.

---

## Executive Summary

The site is live, HTTPS is working, and the homepage has a title and meta description. The major SEO problem is that search engines receive a mostly empty HTML shell:

```html
<body>
  <div id="root"></div>
</body>
```

All real page content — navigation, hero copy, portfolio sections, services, FAQ, privacy policy, and project views — is rendered through JavaScript. Google can render JavaScript, but this setup weakens indexing reliability, delays content discovery, and leaves non-JS crawlers and AI crawlers with almost no useful content.

The following table summarises every gap found, its current state, and target state. Detailed implementation guidance for each item follows.

| # | Area | Current state | Target state | Priority |
|---|---|---|---|---|
| 1 | Server-rendered content | Empty `<div id="root">` | 800+ words of crawlable HTML | Critical |
| 2 | Real URL routes | Homepage only | 10+ indexable routes | Critical |
| 3 | `robots.txt` | 404 | 200, references sitemap | High |
| 4 | Canonical tags | Missing | Present on every route | High |
| 5 | Structured data (JSON-LD) | None | Organization + WebSite + Service + CreativeWork + VideoObject | High |
| 6 | Sitemap coverage | Homepage only | All routes, with `<lastmod>` and `<priority>` | High |
| 7 | Image and video optimisation | Multi-MB PNGs/JPGs | WebP/AVIF with `srcset`, under 250 KB above fold | High |
| 8 | Social metadata | Partial OG, no Twitter | Full OG + Twitter Card | Medium |
| 9 | `llms.txt` | 404 | 200, accurate content inventory | Medium |
| 10 | Security headers | HSTS only | Full header set | Medium |
| 11 | Meta keywords | Present but useless | Remove | Low |

---

## Audit Evidence

Observed homepage response:

- URL: `https://servayam.com/`
- Status: `200`
- Content type: `text/html; charset=utf-8`
- Server: `Vercel`
- HSTS: `max-age=63072000`
- Cache-Control: `public, max-age=0, must-revalidate`
- Initial HTML title: `Servayam | Creative Studio`
- Initial meta description: `Servayam is a creative studio specializing in design, animation, and digital experiences.`
- Initial crawlable H1 count: `0`
- Initial crawlable H2 count: `0`
- Initial crawlable H3 count: `0`
- Initial crawlable internal links: `0`
- Initial crawlable images: `0`
- Initial crawlable word count (after shell parsing): `3`
- JSON-LD schema blocks: `0`
- Canonical tag: missing

Other endpoint checks:

- `https://servayam.com/robots.txt` → `404`
- `https://servayam.com/sitemap.xml` → `200`, lists homepage only
- `https://servayam.com/sitemap_index.xml` → `404`
- `https://servayam.com/llms.txt` → `404`
- `http://servayam.com/` → `308` redirect to `https://servayam.com/` ✓
- `https://www.servayam.com/` → `308` redirect to `https://servayam.com/` ✓
- `http://www.servayam.com/` → `308` to `https://www.servayam.com/` → `308` to root domain ✓

PageSpeed Insights could not be completed (Google's public endpoint returned a quota error). Performance notes are based on direct asset inspection.

---

## Critical — Workstream 1: Make Content Server-Rendered

**Owner:** Frontend / platform  
**Impact:** Indexing, rankings, AI crawler understanding, snippet quality, Lighthouse SEO score

### Problem

The server-rendered HTML exposes no visible site content. The JavaScript bundle contains the real content, including:

- Navigation: Portfolio, Services, Originals, Why Us, FAQ
- Homepage hero: `WE BRING STORY TO LIFE`
- Brand positioning copy
- Portfolio section: The Kinetic Vault
- Project categories: Interior, Exterior, 3D Models, Originals
- Named projects: Neon Drift, Ves Book, Cyber Shell, Modern Loft, Luxury Residence, Minimalist Studio, Industrial Space, Urban Facade, Landscape Flow, Architectural Marvel, Scenic Route, Character Design A/B, Environment Model, Prop Collection
- Privacy policy, contact form, and FAQ content

None of this appears in the initial HTML response.

### Required Approach

Choose one of the following in priority order:

1. **Preferred — SSR or SSG:** Migrate to Next.js, Remix, Astro, or Vite prerender. Every route renders its full HTML at build time or on the server.
2. **Acceptable short-term fix:** Prerender the homepage and key route states to static HTML at build time using `vite-plugin-prerender` or a similar tool.
3. **Minimum fallback:** Inject a static crawlable HTML content layer inside `<div id="root">` before hydration, which React replaces on load. This is the least durable option.

### Required Initial HTML Content

The initial HTML for `https://servayam.com/` must contain:

- Exactly one descriptive `<h1>`
- At minimum 800 words of useful homepage copy
- Crawlable `<a>` links to all main sections and route pages
- Service descriptions
- Portfolio / project summaries
- FAQ text (plain HTML, not just JS-toggled panels)
- Organisation and contact details
- `<img>` tags with descriptive `alt` attributes

### Suggested H1

```html
<h1>3D Animation Studio for Brands, Interiors, Architecture, and Original Content</h1>
```

### Suggested Crawlable Homepage Structure

```html
<main>
  <section id="hero">
    <h1>3D Animation Studio for Brands, Interiors, Architecture, and Original Content</h1>
    <p>Servayam is an India-based 3D animation and creative studio producing cinematic animations, architectural visualisations, product visuals, character models, and original animated content for brands that refuse to blend in.</p>
  </section>

  <section id="services">
    <h2>Animation and 3D Creative Services</h2>
    <p>We offer end-to-end 3D animation production, from concept and modelling through rendering and delivery. Our core service lines include cinematic brand films, architectural walkthrough animations, interior and exterior visualisations, character and prop modelling, and original animated storytelling.</p>
    <ul>
      <li><a href="/services/">View all services</a></li>
    </ul>
  </section>

  <section id="portfolio">
    <h2>Animation Portfolio — The Kinetic Vault</h2>
    <p>Our portfolio spans residential and commercial architecture, branded 3D animations, character-driven original content, and environment models.</p>
    <ul>
      <li><a href="/projects/interior/">Interior animation projects</a></li>
      <li><a href="/projects/exterior/">Exterior visualisation projects</a></li>
      <li><a href="/projects/3d-models/">3D modelling projects</a></li>
      <li><a href="/originals/">Original animated content</a></li>
    </ul>
  </section>

  <section id="why-us">
    <h2>Why Servayam</h2>
    <p>We combine kinetic design sensibility with production discipline. Our work is built for brands, studios, and architects who want animation that feels alive.</p>
  </section>

  <section id="faq">
    <h2>Frequently Asked Questions</h2>
    <!-- Expand with actual FAQ Q&A pairs -->
  </section>

  <section id="contact">
    <h2>Work With Us</h2>
    <p>To discuss a project, reach us via the <a href="/contact/">contact page</a>.</p>
  </section>
</main>
```

### Acceptance Criteria

- Viewing page source (not inspected DOM) shows the H1 and meaningful copy.
- Initial HTML contains at least 800 words of useful homepage content.
- Initial HTML contains crawlable links to all main sections.
- `curl https://servayam.com/` returns headings, body copy, and links.
- Lighthouse SEO no longer flags missing crawlable content.

---

## Critical — Workstream 2: Create Real URL Routes

**Owner:** Frontend / platform  
**Impact:** Crawlability, sitemap depth, link equity, shareability, per-page keyword targeting

### Problem

The sitemap lists only one URL. All content views are controlled by React state or modal toggles rather than addressable URLs. Search engines cannot independently index services, portfolio categories, individual project pages, originals, privacy policy, or contact information.

### Required Routes

| Route | Notes |
|---|---|
| `/` | Homepage |
| `/services/` | Service overview |
| `/portfolio/` | Portfolio index |
| `/projects/interior/` | Interior animation category |
| `/projects/exterior/` | Exterior visualisation category |
| `/projects/3d-models/` | 3D modelling category |
| `/originals/` | Originals / Giggle Filmz |
| `/about/` | Studio story and team |
| `/contact/` | Enquiry page |
| `/privacy-policy/` | Legal |

**Optional future routes** (implement when content is ready):

- `/projects/neon-drift/`
- `/projects/ves-book/`
- `/projects/cyber-shell/`
- `/projects/modern-loft/`
- `/projects/luxury-residence/`
- `/projects/minimalist-studio/`
- `/projects/urban-facade/`

### Acceptance Criteria

- Each route returns a direct `200` with no redirect chain.
- Each route has a unique `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<h1>`, and at least 300 words of body copy.
- The sitemap includes every indexable route.
- Navigation uses standard `<a href="…">` anchors, not only JavaScript click handlers.
- Stateful modals and overlays may still exist, but core content is also accessible via direct URL.

---

## High Priority — Add `robots.txt`

**Owner:** Platform  
**Impact:** Crawl budget guidance, sitemap discovery

Current result: `https://servayam.com/robots.txt` returns `404`.

Create this file at the public root:

```txt
User-agent: *
Allow: /

Sitemap: https://servayam.com/sitemap.xml
```

If you later add routes that should not be indexed (e.g. staging preview paths, API endpoints), add explicit `Disallow` rules before deploying.

### Acceptance Criteria

- `https://servayam.com/robots.txt` returns `200`
- Content type is `text/plain`
- File references `https://servayam.com/sitemap.xml`
- No public indexable routes are accidentally blocked

---

## High Priority — Add Canonical Tags

**Owner:** Frontend / platform  
**Impact:** Duplicate content prevention, link signal consolidation

Current result: canonical tag is missing from the homepage and all routes.

Add a route-specific canonical to every `<head>`:

```html
<!-- Homepage -->
<link rel="canonical" href="https://servayam.com/" />

<!-- Example route page -->
<link rel="canonical" href="https://servayam.com/services/" />
```

If using a meta framework such as Next.js, set this in the `metadata` export for each page:

```js
export const metadata = {
  alternates: {
    canonical: "https://servayam.com/services/",
  },
};
```

### Acceptance Criteria

- Every indexable route has exactly one canonical tag.
- Canonical URLs use HTTPS and the non-www root domain.
- Canonical URLs match the final redirect destination with no trailing-slash inconsistency.

---

## High Priority — Add Structured Data (JSON-LD)

**Owner:** Frontend / platform with marketing input  
**Impact:** Entity clarity, rich result eligibility, AI search readiness, Google Knowledge Panel signals

Current result: zero JSON-LD schema blocks found.

Add all blocks below to the initial HTML, not injected after hydration. Marketing must confirm the official logo URL, full address or service area, and contact email before the `Organization` block goes live.

### Organization Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Servayam",
  "url": "https://servayam.com/",
  "logo": "https://servayam.com/logo.png",
  "description": "Servayam is an India-based 3D animation and creative studio producing cinematic animations, architectural visualisations, product visuals, character models, and original animated content.",
  "foundingLocation": {
    "@type": "Place",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.instagram.com/gigglefilmz/",
    "https://www.youtube.com/@GiggleFilmz"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "availableLanguage": ["English", "Hindi"]
  }
}
</script>
```

### WebSite Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Servayam",
  "url": "https://servayam.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://servayam.com/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
```

> Remove `potentialAction` if the site has no search feature. Include it if a search bar is added later.

### Service Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "3D Animation and Creative Production",
  "provider": {
    "@type": "Organization",
    "name": "Servayam",
    "url": "https://servayam.com/"
  },
  "serviceType": [
    "3D animation",
    "Architectural visualisation",
    "Interior animation",
    "Exterior visualisation",
    "3D modelling",
    "Animated brand content",
    "Original animated storytelling"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "url": "https://servayam.com/services/"
}
</script>
```

### CreativeWork / VideoObject Schema (per project page)

Add to each portfolio project page. Replace placeholder values with real data.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Neon Drift — 3D Animation",
  "description": "A kinetic 3D animation produced by Servayam for the Neon Drift project.",
  "thumbnailUrl": "https://servayam.com/assets/neon-drift-thumb.webp",
  "uploadDate": "2025-01-01",
  "creator": {
    "@type": "Organization",
    "name": "Servayam",
    "url": "https://servayam.com/"
  }
}
</script>
```

For image-only portfolio entries use `"@type": "ImageObject"` with `"contentUrl"` and `"description"` fields.

### Acceptance Criteria

- All JSON-LD validates without errors in the [Schema.org Validator](https://validator.schema.org/).
- No placeholder values (`"logo.png"`, `"contact email"`, etc.) remain.
- Schema appears in the initial HTML, not only after JavaScript hydration.
- Route-level pages include contextually appropriate schema types (`WebPage`, `Service`, `VideoObject`, `ImageObject`).

---

## High Priority — Improve Sitemap Coverage

**Owner:** Platform  
**Impact:** Route discovery, crawl prioritisation, Search Console insight

Current sitemap contains one URL with no `<lastmod>` or `<priority>` attributes.

### Target Sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://servayam.com/</loc>
    <lastmod>2026-04-25</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://servayam.com/services/</loc>
    <lastmod>2026-04-25</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://servayam.com/portfolio/</loc>
    <lastmod>2026-04-25</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://servayam.com/projects/interior/</loc>
    <lastmod>2026-04-25</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://servayam.com/projects/exterior/</loc>
    <lastmod>2026-04-25</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://servayam.com/projects/3d-models/</loc>
    <lastmod>2026-04-25</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://servayam.com/originals/</loc>
    <lastmod>2026-04-25</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://servayam.com/about/</loc>
    <lastmod>2026-04-25</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://servayam.com/contact/</loc>
    <lastmod>2026-04-25</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://servayam.com/privacy-policy/</loc>
    <lastmod>2026-04-25</lastmod>
    <priority>0.3</priority>
  </url>
</urlset>
```

Update `<lastmod>` values programmatically at build time. Do not hardcode stale dates.

### Acceptance Criteria

- Sitemap returns `200` with content type `application/xml` or `text/xml`
- Every listed URL returns `200` with no redirect
- No blocked, canonically redirected, or `noindex` URLs appear in the sitemap
- `robots.txt` references the sitemap URL
- After deployment, submit the sitemap in Google Search Console and request indexing for the homepage

---

## High Priority — Optimise Image and Video Assets

**Owner:** Frontend / media pipeline  
**Impact:** LCP, Core Web Vitals, mobile bandwidth, user experience

Large assets found via bundle inspection:

| Asset | Type | Current size |
|---|---:|---:|
| `assets/A (3).png` | PNG | 7.2 MB |
| `assets/View (19).png` | PNG | 2.69 MB |
| `assets/Open Area (11).png` | PNG | 2.65 MB |
| `assets/A (1).png` | PNG | 1.63 MB |
| `assets/Scene 10.png` | PNG | 1.56 MB |
| `assets/GF View (18).png` | PNG | 1.49 MB |
| `assets/A (9).png` | PNG | 1.43 MB |
| `assets/CP_Back.jpg` | JPG | 1.36 MB |
| `assets/CP_Close2.jpg` | JPG | 1.10 MB |
| `assets/AR15_4.jpg` | JPG | 847 KB |
| `assets/Mage 2K persp Half 2_4k.jpg` | JPG | 432 KB |

### Required Changes

- Convert all PNG and JPG assets to WebP, with AVIF as an additional source for supporting browsers.
- Generate responsive widths: 480 w, 768 w, 1200 w, 1600 w.
- Use `<picture>` with `srcset` and `sizes`.
- Set explicit `width` and `height` on every `<img>` to prevent layout shift (CLS).
- Preload the hero / LCP image using `<link rel="preload">`.
- Lazy-load all images not visible above the fold.
- Compress `video_compressed.mp4` further; consider serving it via a CDN with adaptive bitrate if file size remains high.

### Responsive Image Pattern

```html
<link rel="preload" as="image"
  href="/assets/hero-1200.webp"
  imagesrcset="/assets/hero-768.webp 768w, /assets/hero-1200.webp 1200w, /assets/hero-1600.webp 1600w"
  imagesizes="(max-width: 768px) 100vw, 60vw"
/>

<picture>
  <source
    type="image/avif"
    srcset="/assets/hero-768.avif 768w, /assets/hero-1200.avif 1200w, /assets/hero-1600.avif 1600w"
    sizes="(max-width: 768px) 100vw, 60vw"
  />
  <source
    type="image/webp"
    srcset="/assets/hero-768.webp 768w, /assets/hero-1200.webp 1200w, /assets/hero-1600.webp 1600w"
    sizes="(max-width: 768px) 100vw, 60vw"
  />
  <img
    src="/assets/hero-1200.jpg"
    alt="Servayam 3D animation portfolio — cinematic brand and architectural visualisation"
    width="1200"
    height="675"
    loading="eager"
    fetchpriority="high"
    decoding="async"
  />
</picture>
```

Use `loading="lazy"` and remove `fetchpriority="high"` for all non-hero images.

### Acceptance Criteria

- No above-the-fold image exceeds 250 KB on mobile.
- No portfolio thumbnail exceeds 200 KB.
- CLS stays below `0.1` (measure with Lighthouse or CrUX).
- LCP target is below `2.5 s` on mobile field data.
- Hero image has a `<link rel="preload">` in `<head>`.

---

## Medium Priority — Complete Social Metadata

**Owner:** Frontend with marketing assets  
**Impact:** Rich link previews on LinkedIn, X/Twitter, WhatsApp, Slack, iMessage

Currently present: `og:title`, `og:description`, `og:url`, `og:type`

Missing:

```html
<!-- Open Graph image -->
<meta property="og:image" content="https://servayam.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Servayam — 3D Animation and Creative Studio" />
<meta property="og:site_name" content="Servayam" />

<!-- Twitter / X Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Servayam | 3D Animation Studio" />
<meta name="twitter:description" content="3D animation, architectural visualisation, 3D models, and original animated content from Servayam." />
<meta name="twitter:image" content="https://servayam.com/og-image.jpg" />
<meta name="twitter:image:alt" content="Servayam — 3D Animation and Creative Studio" />
```

The OG image (`og-image.jpg`) should be 1200 × 630 px, under 300 KB, visually on-brand, and readable as a small thumbnail.

### Acceptance Criteria

- Validate with [opengraph.xyz](https://www.opengraph.xyz/) and the [Twitter Card Validator](https://cards-dev.twitter.com/validator).
- Shared URLs generate rich previews on all major platforms.
- OG image is served from the canonical HTTPS domain.

---

## Medium Priority — Add `llms.txt`

**Owner:** Platform with marketing  
**Impact:** AI crawler clarity, answer engine inclusion, brand attribution in LLM responses

Current result: `https://servayam.com/llms.txt` returns `404`.

```txt
# Servayam

Servayam is an India-based 3D animation and creative studio producing cinematic animations, architectural visualisations, 3D models, and original animated content.

## Core Pages

- Homepage: https://servayam.com/
- Services: https://servayam.com/services/
- Portfolio: https://servayam.com/portfolio/
- Interior Projects: https://servayam.com/projects/interior/
- Exterior Projects: https://servayam.com/projects/exterior/
- 3D Models: https://servayam.com/projects/3d-models/
- Originals: https://servayam.com/originals/
- About: https://servayam.com/about/
- Contact: https://servayam.com/contact/

## Services

- 3D animation for brands and product marketing
- Architectural visualisation (interior and exterior)
- Character and prop modelling
- Environment and scene modelling
- Animated brand films
- Original animated storytelling (Giggle Filmz)

## Social Profiles

- Instagram: https://www.instagram.com/gigglefilmz/
- YouTube: https://www.youtube.com/@GiggleFilmz
```

### Acceptance Criteria

- `https://servayam.com/llms.txt` returns `200` with content type `text/plain`.
- File is updated whenever a new route or service is added.

---

## Medium Priority — Security and Header Hardening

**Owner:** Platform  
**Impact:** Trust signals, browser security, best-practice audit scores

Currently observed: HSTS present; all other security headers absent.

Add via Vercel `vercel.json` headers configuration:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; img-src 'self' data: https:; media-src 'self' https:; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self'; connect-src 'self' https://api.web3forms.com;"
        }
      ]
    }
  ]
}
```

Adjust `Content-Security-Policy` whenever analytics tags, video embeds, or third-party scripts are added.

### Acceptance Criteria

- [securityheaders.com](https://securityheaders.com/) grades the site A or above.
- CSP does not break any existing functionality.

---

## Low Priority — Remove Meta Keywords

**Owner:** Frontend  
**Impact:** Minor cleanup

```html
<!-- Remove this line -->
<meta name="keywords" content="Servayam, animation studio, video editing, creative studio, design" />
```

Google ignores meta keywords for ranking. The tag is harmless but adds page weight and may hint at SEO naivety to manual reviewers.

---

## Route-Level Metadata

Use these as starter values. Marketing should approve final wording before release.

| URL | `<title>` | `<meta name="description">` | `<h1>` |
|---|---|---|---|
| `/` | Servayam \| 3D Animation Studio in India | Servayam is a 3D animation and creative studio producing cinematic brand films, architectural visualisations, 3D models, and original animated content. | 3D Animation Studio for Brands and Visual Storytelling |
| `/services/` | Animation and 3D Creative Services \| Servayam | Servayam creates 3D animation, architectural visualisation, interior and exterior animations, character models, and animated brand content. | Animation and 3D Creative Services |
| `/portfolio/` | Animation Portfolio \| Servayam | Explore Servayam's 3D animation, architectural visualisation, modelling, and original content work. | Servayam Animation Portfolio |
| `/projects/interior/` | Interior Animation Projects \| Servayam | Interior animation and cinematic walkthrough projects by Servayam for spaces, studios, and architectural storytelling. | Interior Animation Projects |
| `/projects/exterior/` | Exterior Visualisation Projects \| Servayam | Exterior visualisation, architectural animation, and environment reveal projects from Servayam. | Exterior Visualisation Projects |
| `/projects/3d-models/` | 3D Modelling Projects \| Servayam | Character, prop, and environment modelling work from Servayam's 3D creative team. | 3D Modelling Projects |
| `/originals/` | Servayam Originals — Giggle Filmz | Original animated content from Servayam, including Giggle Filmz shorts and Giggle Explains series. | Original Animated Content |
| `/about/` | About Servayam \| 3D Animation Studio | Meet the Servayam team — an India-based 3D animation studio crafting kinetic experiences for brands. | About Servayam |
| `/contact/` | Contact Servayam \| Get a Project Quote | Contact Servayam for 3D animation, architectural visualisation, brand animation, and creative production enquiries. | Contact Servayam |
| `/privacy-policy/` | Privacy Policy \| Servayam | Read the Servayam privacy policy to understand how we collect and use data on servayam.com. | Privacy Policy |

---

## Suggested Release Order

1. Add `robots.txt`, canonical tags, and sitemap with full route list.
2. Implement SSR / SSG / prerendering for the homepage (target: 800+ words of crawlable HTML).
3. Create real route pages for services, portfolio, categories, originals, about, contact, and privacy policy.
4. Add JSON-LD schema (Organization, WebSite, Service on homepage; VideoObject / ImageObject on project pages).
5. Optimise images and video (convert to WebP/AVIF, add `srcset`, set dimensions, add hero preload).
6. Add OG image, complete Twitter Card metadata.
7. Add `llms.txt`.
8. Add security headers.
9. Remove meta keywords.
10. Submit updated sitemap in Google Search Console and request indexing for the homepage via URL Inspection.

---

## Validation Checklist Before Release

Run these checks after each deployment:

- [ ] `https://servayam.com/robots.txt` returns `200` and references the sitemap
- [ ] `https://servayam.com/sitemap.xml` returns `200` and lists all indexable URLs
- [ ] Every URL in the sitemap returns `200` with no redirect
- [ ] Every indexable page has exactly one canonical tag
- [ ] `curl https://servayam.com/` returns the H1 and body content
- [ ] Initial HTML contains crawlable links to all main sections
- [ ] No indexable page has zero headings
- [ ] No indexable page is missing a `<title>` or `<meta name="description">`
- [ ] JSON-LD validates at [validator.schema.org](https://validator.schema.org/)
- [ ] No placeholder values remain in schema
- [ ] Social preview image renders correctly on LinkedIn and X/Twitter
- [ ] No above-the-fold image exceeds 250 KB on mobile
- [ ] Hero image has a `<link rel="preload">` in `<head>`
- [ ] Lighthouse SEO score reaches 95 or above
- [ ] Lighthouse Accessibility score reviewed and action taken on failures
- [ ] [securityheaders.com](https://securityheaders.com/) returns grade A or above
- [ ] Google Search Console URL Inspection run for homepage after deployment

---

## Definition of Done

This handover is complete from the development side when all of the following are true:

- Search crawlers can retrieve the full homepage content without executing JavaScript.
- The site has valid `robots.txt`, sitemap, canonical tags, JSON-LD schema, and social metadata.
- All main content sections have stable, indexable URLs.
- Image payloads are optimised for mobile users (WebP/AVIF, correct sizing, explicit dimensions).
- The updated sitemap has been submitted for recrawl in Google Search Console.
- Lighthouse SEO score is 95 or above on the homepage.
