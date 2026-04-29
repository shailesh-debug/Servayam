# Servayam SEO Handover for Development Team

Audit date: 2026-04-25  
Site audited: https://servayam.com/  
Current SEO health score: 42/100  
Primary risk: The site is a client-rendered single-page app whose initial HTML contains almost no crawlable body content.

## Executive Summary

The site is live, HTTPS is working, and the homepage has a title and meta description. The major SEO problem is that search engines receive a mostly empty HTML shell:

```html
<body>
  <div id="root"></div>
</body>
```

The real page content, navigation, images, portfolio sections, services, FAQ, privacy policy, and project views are rendered through JavaScript. Google can render JavaScript, but this setup weakens indexing reliability, delays content discovery, and leaves non-JS crawlers and AI crawlers with almost no useful content.

Development should prioritize making the primary content crawlable in the initial HTML, then add missing technical SEO files, canonical tags, structured data, image optimization, and route-level discoverability.

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
- Initial crawlable word count after shell parsing: `3`
- JSON-LD schema blocks: `0`
- Canonical tag: missing

Other endpoint checks:

- `https://servayam.com/robots.txt` returns `404`
- `https://servayam.com/sitemap.xml` returns `200`, but only lists the homepage
- `https://servayam.com/sitemap_index.xml` returns `404`
- `https://servayam.com/llms.txt` returns `404`
- `http://servayam.com/` redirects with `308` to `https://servayam.com/`
- `https://www.servayam.com/` redirects with `308` to `https://servayam.com/`
- `http://www.servayam.com/` redirects with `308` to `https://www.servayam.com/`, then to root domain

PageSpeed Insights could not be completed because Google's public endpoint returned a quota error. Performance notes below are based on direct asset inspection.

## Critical Workstream 1: Make Content Crawlable

Priority: Critical  
Owner: Frontend/platform  
Impact: Indexing, rankings, AI crawler understanding, snippet quality

### Problem

The server-rendered HTML does not expose the visible site content. The JavaScript bundle contains the real content, including:

- Navigation: Portfolio, Services, Originals, Why Us, FAQ
- Homepage hero: `WE BRING STORY TO LIFE`
- Brand positioning: `Servayam is a high-octane animation studio crafting kinetic experiences for brands that refuse to blend in.`
- Portfolio section: `The Kinetic Vault`
- Project categories: Interior, Exterior, 3D Models, Originals
- Project examples: Neon Drift, Ves Book, Cyber Shell, Modern Loft, Luxury Residence, Minimalist Studio, Industrial Space, Urban Facade, Landscape Flow, Architectural Marvel, Scenic Route, Character Design A/B, Environment Model, Prop Collection
- Privacy policy route/state
- Contact form modal
- FAQ content

None of this appears in the initial HTML response.

### Required Change

Implement one of these approaches:

1. Preferred: convert the app to SSR or SSG with Next.js, Remix, Astro, or a Vite prerender setup.
2. Acceptable short-term fix: prerender the homepage and key route states into static HTML at build time.
3. Minimum fallback: add a crawlable static HTML content layer in the initial document before hydration.

The initial HTML for `https://servayam.com/` must include:

- One descriptive H1
- Descriptive body copy
- Crawlable internal anchors
- Key service sections
- Portfolio/project summaries
- FAQ text
- Organization/contact details
- Image tags with useful alt text

### Suggested H1

```html
<h1>3D Animation Studio for Brands, Interiors, Architecture, and Original Content</h1>
```

### Suggested Crawlable Homepage Structure

```html
<main>
  <section id="hero">
    <h1>3D Animation Studio for Brands, Interiors, Architecture, and Original Content</h1>
    <p>Servayam is an India-based 3D animation and creative studio producing cinematic animations, architectural visualizations, product visuals, character models, and original animated content.</p>
  </section>

  <section id="portfolio">
    <h2>Animation Portfolio</h2>
    <a href="/projects/interior/">Interior animation projects</a>
    <a href="/projects/exterior/">Exterior visualization projects</a>
    <a href="/projects/3d-models/">3D modeling projects</a>
    <a href="/originals/">Original animated content</a>
  </section>

  <section id="services">
    <h2>Animation and Creative Services</h2>
  </section>

  <section id="faq">
    <h2>Frequently Asked Questions</h2>
  </section>
</main>
```

### Acceptance Criteria

- Viewing page source, not just inspecting rendered DOM, shows the H1 and meaningful page copy.
- Initial HTML contains at least 800 words of useful homepage content.
- Initial HTML contains crawlable links to main sections or route pages.
- `curl https://servayam.com/` returns headings, links, and content.
- Lighthouse SEO no longer flags missing crawlable anchor/content issues.

## Critical Workstream 2: Create Real URL Routes

Priority: High  
Owner: Frontend/platform  
Impact: Crawlability, sitemap depth, link equity, shareability

### Problem

The sitemap only lists:

```xml
<loc>https://servayam.com/</loc>
```

The app has multiple meaningful views, but they are controlled by React state/modals instead of discoverable URLs. Search engines cannot independently index the services, portfolio categories, project pages, originals, privacy policy, or contact information.

### Required Change

Create indexable routes for key content:

- `/`
- `/services/`
- `/portfolio/`
- `/projects/interior/`
- `/projects/exterior/`
- `/projects/3d-models/`
- `/originals/`
- `/about/`
- `/contact/`
- `/privacy-policy/`

Optional future routes:

- `/projects/neon-drift/`
- `/projects/ves-book/`
- `/projects/cyber-shell/`
- `/projects/modern-loft/`
- `/projects/luxury-residence/`

### Acceptance Criteria

- Each route returns a direct `200` response.
- Each route has unique title, meta description, canonical, H1, and body copy.
- The sitemap includes each route.
- Navigation uses normal anchor links where possible.
- Modals and stateful UI can still exist, but core content should also be available at URLs.

## High Priority: Add robots.txt

Priority: High  
Owner: Platform  
Impact: Crawl guidance, sitemap discovery

Current result: `https://servayam.com/robots.txt` returns `404`.

Add this file at the public root:

```txt
User-agent: *
Allow: /

Sitemap: https://servayam.com/sitemap.xml
```

Acceptance criteria:

- `https://servayam.com/robots.txt` returns `200`
- Content type is `text/plain`
- It references `https://servayam.com/sitemap.xml`

## High Priority: Add Canonical Tags

Priority: High  
Owner: Frontend/platform  
Impact: Duplicate handling, signal consolidation

Current result: homepage canonical is missing.

Add per-route canonical tags:

```html
<link rel="canonical" href="https://servayam.com/" />
```

For route pages:

```html
<link rel="canonical" href="https://servayam.com/services/" />
```

Acceptance criteria:

- Every indexable route has exactly one canonical tag.
- Canonical URLs use HTTPS.
- Canonical URLs use the non-www root domain.
- Canonical URLs match final redirect destination.

## High Priority: Add Structured Data

Priority: High  
Owner: Frontend/platform with marketing input  
Impact: Entity clarity, rich result eligibility, AI search readiness

Current result: no JSON-LD schema found.

Add JSON-LD using `application/ld+json`. Start with `Organization`, `WebSite`, and `Service`.

### Organization Schema Starter

Marketing should confirm the official logo URL, social profiles, address/service area, and contact email before this goes live.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Servayam",
  "url": "https://servayam.com/",
  "description": "Servayam is an India-based 3D animation and creative studio producing cinematic animations, architectural visualizations, product visuals, character models, and original animated content.",
  "sameAs": [
    "https://www.instagram.com/gigglefilmz/",
    "https://www.youtube.com/@GiggleFilmz"
  ]
}
</script>
```

### WebSite Schema Starter

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Servayam",
  "url": "https://servayam.com/"
}
</script>
```

### Service Schema Starter

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
    "Architectural visualization",
    "Interior animation",
    "Exterior visualization",
    "3D modeling",
    "Animated brand content"
  ],
  "areaServed": "India"
}
</script>
```

Acceptance criteria:

- JSON-LD validates in Schema.org Validator.
- No placeholder values remain.
- Schema appears in initial HTML, not injected only after user interaction.
- Route-specific pages include relevant `WebPage`, `Service`, `CreativeWork`, `ImageObject`, or `VideoObject` schema where appropriate.

## High Priority: Improve Sitemap Coverage

Priority: High  
Owner: Platform  
Impact: Discovery and crawl prioritization

Current sitemap:

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://servayam.com/</loc>
  </url>
</urlset>
```

Update after route creation:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://servayam.com/</loc></url>
  <url><loc>https://servayam.com/services/</loc></url>
  <url><loc>https://servayam.com/portfolio/</loc></url>
  <url><loc>https://servayam.com/projects/interior/</loc></url>
  <url><loc>https://servayam.com/projects/exterior/</loc></url>
  <url><loc>https://servayam.com/projects/3d-models/</loc></url>
  <url><loc>https://servayam.com/originals/</loc></url>
  <url><loc>https://servayam.com/about/</loc></url>
  <url><loc>https://servayam.com/contact/</loc></url>
  <url><loc>https://servayam.com/privacy-policy/</loc></url>
</urlset>
```

Acceptance criteria:

- Sitemap returns `200`
- Content type is XML
- Every listed URL returns `200`
- No redirected, 404, blocked, or canonical-mismatched URLs appear in sitemap

## Medium Priority: Optimize Image and Video Assets

Priority: Medium to High  
Owner: Frontend/media pipeline  
Impact: LCP, bandwidth, mobile experience

Large assets found in the app bundle references:

| Asset | Type | Size |
|---|---:|---:|
| `assets/A (3).png` | PNG | 7.2 MB |
| `assets/View (19).png` | PNG | 2.69 MB |
| `assets/Open Area  (11).png` | PNG | 2.65 MB |
| `assets/A (1).png` | PNG | 1.63 MB |
| `assets/Scene 10.png` | PNG | 1.56 MB |
| `assets/GF View (18).png` | PNG | 1.49 MB |
| `assets/A (9).png` | PNG | 1.43 MB |
| `assets/CP_Back.jpg` | JPG | 1.36 MB |
| `assets/CP_Close2.jpg` | JPG | 1.10 MB |
| `assets/AR15_4.jpg` | JPG | 847 KB |
| `assets/Mage 2K persp Half 2_4k.jpg` | JPG | 432 KB |

Required changes:

- Convert large PNG/JPG files to WebP or AVIF.
- Generate responsive sizes, for example 480, 768, 1200, 1600 widths.
- Use `srcset` and `sizes`.
- Set explicit `width` and `height` attributes on images.
- Keep the first hero image highly optimized and preload it if it remains the LCP candidate.
- Lazy-load non-hero images.
- Compress `video_compressed.mp4` further if it is loaded early or affects initial load.

Example:

```html
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
    alt="Servayam 3D animation portfolio showcase"
    width="1200"
    height="675"
    loading="eager"
    decoding="async"
  />
</picture>
```

Acceptance criteria:

- No above-the-fold image exceeds 250 KB on mobile.
- No general portfolio thumbnail exceeds 200 KB.
- CLS stays under `0.1`.
- LCP target is under `2.5s` on mobile field data.

## Medium Priority: Add Social Metadata Completeness

Priority: Medium  
Owner: Frontend with marketing assets  
Impact: Sharing previews, brand consistency

Currently present:

- `og:title`
- `og:description`
- `og:url`
- `og:type`

Missing or incomplete:

- `og:image`
- `og:image:width`
- `og:image:height`
- `twitter:card`
- `twitter:title`
- `twitter:description`
- `twitter:image`

Add:

```html
<meta property="og:image" content="https://servayam.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Servayam | 3D Animation Studio" />
<meta name="twitter:description" content="3D animation, architectural visualization, 3D models, and original animated content from Servayam." />
<meta name="twitter:image" content="https://servayam.com/og-image.jpg" />
```

Acceptance criteria:

- Shared URLs generate rich previews on LinkedIn, X/Twitter, WhatsApp, and Slack.
- Image is 1200 x 630, under 300 KB, and visually readable on mobile previews.

## Medium Priority: Add llms.txt

Priority: Medium  
Owner: Platform with marketing  
Impact: AI crawler and answer engine clarity

Current result: `https://servayam.com/llms.txt` returns `404`.

Add a concise file at root:

```txt
# Servayam

Servayam is an India-based 3D animation and creative studio producing cinematic animations, architectural visualizations, 3D models, and original animated content.

## Core Pages

- Homepage: https://servayam.com/
- Services: https://servayam.com/services/
- Portfolio: https://servayam.com/portfolio/
- Interior Projects: https://servayam.com/projects/interior/
- Exterior Projects: https://servayam.com/projects/exterior/
- 3D Models: https://servayam.com/projects/3d-models/
- Originals: https://servayam.com/originals/
- Contact: https://servayam.com/contact/

## Services

- 3D animation
- Architectural visualization
- Interior animation
- Exterior visualization
- 3D modeling
- Animated brand content
- Original animated storytelling

## Social Profiles

- Instagram: https://www.instagram.com/gigglefilmz/
- YouTube: https://www.youtube.com/@GiggleFilmz
```

Acceptance criteria:

- `https://servayam.com/llms.txt` returns `200`
- Content type is `text/plain`
- It is updated when core pages change

## Medium Priority: Security and Header Hardening

Priority: Medium  
Owner: Platform  
Impact: Trust, best practices

Currently observed:

- HSTS exists
- `Content-Security-Policy` not observed
- `X-Frame-Options` not observed
- `X-Content-Type-Options` not observed
- `Referrer-Policy` not observed

Recommended headers:

```txt
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; media-src 'self' https:; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self'; connect-src 'self' https://api.web3forms.com;
```

Adjust CSP if analytics, embeds, or third-party scripts are added.

## Medium Priority: Remove or De-emphasize Meta Keywords

Priority: Low to Medium  
Owner: Frontend  
Impact: Cleanup

The page includes:

```html
<meta name="keywords" content="Servayam, animation studio, video editing, creative studio, design" />
```

Google does not use meta keywords for ranking. This is not harmful, but it is unnecessary and can be removed.

## Route-Level Metadata Recommendations

Use these as starter values. Marketing should approve final wording.

| URL | Title | Meta Description | H1 |
|---|---|---|---|
| `/` | Servayam | 3D Animation Studio in India | Servayam is a 3D animation and creative studio producing cinematic brand films, architectural visualization, 3D models, and original animated content. | 3D Animation Studio for Brands and Visual Storytelling |
| `/services/` | Animation and 3D Creative Services | Servayam creates 3D animation, architectural visualization, interior and exterior animations, character models, and animated brand content. | Animation and 3D Creative Services |
| `/portfolio/` | Animation Portfolio | Explore Servayam's 3D animation, architectural visualization, 3D modeling, and original content work. | Servayam Animation Portfolio |
| `/projects/interior/` | Interior Animation Projects | Interior animation and cinematic walkthrough projects by Servayam for spaces, studios, and architectural storytelling. | Interior Animation Projects |
| `/projects/exterior/` | Exterior Visualization Projects | Exterior visualization, architectural animation, and environment reveal projects from Servayam. | Exterior Visualization Projects |
| `/projects/3d-models/` | 3D Modeling Projects | Character, prop, and environment modeling work from Servayam's 3D creative team. | 3D Modeling Projects |
| `/originals/` | Servayam Originals | Original animated content from Servayam, including Giggle Filmz shorts and Giggle Explains. | Original Animated Content |
| `/contact/` | Contact Servayam | Contact Servayam for 3D animation, architectural visualization, brand animation, and creative production inquiries. | Contact Servayam |

## Validation Checklist Before Release

Run these checks after implementation:

- `https://servayam.com/robots.txt` returns 200 and references sitemap.
- `https://servayam.com/sitemap.xml` returns 200 and lists all indexable URLs.
- Each sitemap URL returns 200.
- Each indexable page has exactly one canonical tag.
- Initial HTML contains the H1 and core body content.
- Initial HTML includes crawlable links.
- No important page has zero headings.
- No important page has missing title or meta description.
- JSON-LD validates.
- Social preview image works.
- Large images are served in WebP/AVIF with responsive sizes.
- Lighthouse SEO score should be 95+.
- Lighthouse accessibility and best practices should be reviewed.
- Search Console URL Inspection should be run for the homepage after deployment.

## Suggested Release Order

1. Add `robots.txt`, canonical, sitemap fixes, and route metadata.
2. Implement SSR/SSG/prerendering for homepage.
3. Create real route pages for services, portfolio, categories, originals, contact, and privacy policy.
4. Add schema.
5. Optimize images and video.
6. Add social preview image and Twitter metadata.
7. Add `llms.txt`.
8. Submit updated sitemap in Google Search Console.

## Definition of Done

This handover is complete from the development side when:

- Search crawlers can retrieve the main homepage content without executing JavaScript.
- The site has valid robots, sitemap, canonical, schema, and social metadata.
- Main content sections have stable URLs.
- Image payloads are suitable for mobile users.
- The updated sitemap has been submitted for recrawl.
