# 🎬 Servayam Animation Studio — SEO Strategy

**Site Type:** Motion-heavy React + Vite Portfolio Site  
**Business Type:** Animation Studio (3D Visualization, Interior/Exterior Renders, Film Production)  
**Primary Target Location:** India (Lucknow, Uttar Pradesh + wider UP/North India region)  
**Generated:** 2026-05-01  
**Strategy Version:** 1.0  

---

## 📍 Local SEO Summary

Servayam Animation Studio operates in a niche where **location signals matter enormously** — clients searching for "3D animation studio near me" or "interior visualization Lucknow" are high-intent buyers. This strategy prioritizes **local discoverability first**, then national authority.

---

## 1. 🔍 Keyword Strategy

### Primary Keywords (High Intent, Local)

| Keyword | Intent | Est. Local Competition |
|--------|--------|------------------------|
| 3D animation studio Lucknow | Commercial | Low |
| interior visualization Lucknow | Commercial | Low |
| exterior rendering UP | Commercial | Low–Medium |
| 3D architectural rendering Lucknow | Commercial | Low |
| animation studio Uttar Pradesh | Commercial | Medium |
| architectural 3D visualization North India | Commercial | Medium |
| Giggle Filmz production Lucknow | Navigational | Very Low |

### Secondary Keywords (Broader, Informational)

| Keyword | Intent | Notes |
|--------|--------|-------|
| interior 3D rendering India | Informational | Blog/resource target |
| exterior visualization real estate | Informational | B2B content target |
| 3D product animation studio India | Commercial | National reach |
| architectural walkthrough video | Informational | YouTube SEO target |
| animation studio portfolio India | Informational | Portfolio SEO |

### Long-Tail Local Keywords (Low Competition, High Conversion)

- "best 3D animation studio in Lucknow"
- "interior design visualization Lucknow UP"
- "real estate 3D rendering company near Lucknow"
- "architectural animation studio Awadh region"
- "3D model rendering services Uttar Pradesh"
- "commercial animation production Lucknow"
- "film production company Giggle Filmz UP"

---

## 2. 🏙️ Local SEO Foundation

### Google Business Profile (GBP) — CRITICAL FIRST STEP

- [ ] **Claim & verify** Servayam Animation Studio on Google Business Profile
- [ ] Set **primary category**: `Animation Studio`
- [ ] Add secondary categories: `Video Production Service`, `Graphic Designer`, `Film Production Company`
- [ ] Add **full address** (Lucknow, UP), phone, website URL
- [ ] Upload **15–20 high-quality portfolio images** (renders, stills, behind-the-scenes)
- [ ] Add **business description** with local keywords:
  > *"Servayam Animation Studio is Lucknow's leading 3D visualization and animation studio, specializing in interior renders, exterior walkthroughs, architectural 3D models, and film production through Giggle Filmz. Serving clients across Uttar Pradesh and North India."*
- [ ] Set **service areas**: Lucknow, Kanpur, Varanasi, Allahabad, Agra, Noida, Delhi NCR
- [ ] Post **weekly GBP updates** with new project renders
- [ ] Enable **messaging** and respond within 24 hours
- [ ] Collect **Google Reviews** — target 20+ reviews in 6 months

### NAP Consistency (Name, Address, Phone)

Ensure identical NAP across:
- [ ] Website footer + contact page
- [ ] Google Business Profile
- [ ] Justdial listing
- [ ] Sulekha listing
- [ ] IndiaMART (if applicable)
- [ ] LinkedIn company page
- [ ] Facebook Business page
- [ ] Instagram bio

### Local Schema Markup

Add the following JSON-LD to `index.html`:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Servayam Animation Studio",
  "description": "3D animation, interior visualization, exterior rendering, and film production studio in Lucknow, Uttar Pradesh",
  "@id": "https://yoursite.com/#business",
  "url": "https://yoursite.com",
  "telephone": "+91-XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Your Street Address]",
    "addressLocality": "Lucknow",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "226XXX",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 26.8467,
    "longitude": 80.9462
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "10:00",
      "closes": "19:00"
    }
  ],
  "areaServed": [
    "Lucknow", "Varanasi", "Allahabad", "Kanpur", "Agra", "Noida", "Uttar Pradesh", "North India"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Animation & Visualization Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interior 3D Visualization" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Exterior 3D Rendering" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "3D Architectural Models" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Film Production (Giggle Filmz)" } }
    ]
  },
  "sameAs": [
    "https://www.instagram.com/servayam",
    "https://www.linkedin.com/company/servayam",
    "https://www.youtube.com/@servayam"
  ]
}
```

---

## 3. 🏗️ Site Architecture & URL Structure

### Recommended URL Hierarchy

```
servayam.com/
├── /                          ← Homepage (hero + showreel)
├── /portfolio/                ← All Projects hub
│   ├── /portfolio/interior/   ← Interior renders
│   ├── /portfolio/exterior/   ← Exterior renders
│   ├── /portfolio/3d-models/  ← 3D Models
│   └── /portfolio/giggle-filmz/ ← Film production
├── /services/                 ← Services overview
│   ├── /services/interior-visualization/
│   ├── /services/exterior-rendering/
│   ├── /services/3d-modelling/
│   └── /services/film-production/
├── /about/                    ← Studio story + team
├── /blog/                     ← Content marketing hub
└── /contact/                  ← Contact + inquiry form
```

### React Router — Implement These Routes

The current `App.tsx` view-switching should map to proper URL routes so Google can crawl each category independently. Each `/portfolio/[category]` route should have:
- Unique `<title>` tag
- Unique `<meta name="description">`
- `<link rel="canonical">` pointing to itself
- Breadcrumb schema markup

---

## 4. 🔧 Technical SEO Checklist

### Meta Tags (per page)

Add these to your React app using `react-helmet-async` or Vite's `vite-plugin-html`:

**Homepage:**
```html
<title>Servayam Animation Studio | 3D Visualization & Animation – Lucknow</title>
<meta name="description" content="Lucknow's premier 3D animation studio. Interior & exterior visualization, architectural rendering, 3D models, and film production (Giggle Filmz). Serving UP & North India." />
<meta name="keywords" content="animation studio Lucknow, 3D visualization UP, interior rendering Lucknow, architectural animation North India" />
<link rel="canonical" href="https://yoursite.com/" />
```

**Interior Portfolio:**
```html
<title>Interior 3D Visualization | Servayam Animation Studio, Lucknow</title>
<meta name="description" content="Photorealistic interior 3D renders and walkthroughs by Servayam Animation Studio, Lucknow. Serving real estate, architects, and interior designers across UP." />
```

**Open Graph (all pages):**
```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Servayam Animation Studio" />
<meta property="og:locale" content="en_IN" />
<meta property="og:image" content="https://yoursite.com/assets/og-cover.jpg" />
```

### Core Web Vitals Targets

| Metric | Target | Current Action |
|--------|--------|---------------|
| LCP | < 2.5s | Lazy-load hero images, preload critical renders |
| INP | < 200ms | Debounce category picker interactions |
| CLS | < 0.1 | Set explicit width/height on all `<img>` tags |

### Image Optimization

- Convert all portfolio images in `public/assets/` to **WebP** format
- Add `width` and `height` attributes to prevent CLS
- Implement `loading="lazy"` on below-fold images
- Add descriptive `alt` text: `alt="Modern loft interior 3D render by Servayam Animation Studio Lucknow"`

### Sitemap

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://yoursite.com/</loc><priority>1.0</priority></url>
  <url><loc>https://yoursite.com/portfolio/</loc><priority>0.9</priority></url>
  <url><loc>https://yoursite.com/portfolio/interior/</loc><priority>0.8</priority></url>
  <url><loc>https://yoursite.com/portfolio/exterior/</loc><priority>0.8</priority></url>
  <url><loc>https://yoursite.com/portfolio/3d-models/</loc><priority>0.8</priority></url>
  <url><loc>https://yoursite.com/portfolio/giggle-filmz/</loc><priority>0.8</priority></url>
  <url><loc>https://yoursite.com/services/</loc><priority>0.9</priority></url>
  <url><loc>https://yoursite.com/about/</loc><priority>0.7</priority></url>
  <url><loc>https://yoursite.com/contact/</loc><priority>0.7</priority></url>
</urlset>
```

Add `public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml
```

---

## 5. 📝 Content Strategy

### Services Pages (Priority 1)

Create dedicated service pages (each ~800–1200 words) targeting commercial keywords:

1. **`/services/interior-visualization/`**  
   Target: "interior 3D visualization Lucknow", "interior rendering UP"  
   Content: Process explanation, turnaround times, pricing signals, portfolio gallery, FAQ

2. **`/services/exterior-rendering/`**  
   Target: "exterior 3D rendering Lucknow", "architectural exterior visualization India"  
   Content: Exterior project showcase, real estate use cases, client testimonials

3. **`/services/3d-modelling/`**  
   Target: "3D model rendering Lucknow", "product 3D animation India"

4. **`/services/film-production/`**  
   Target: "Giggle Filmz Lucknow", "film production company UP"

### Blog Content Calendar (Months 1–6)

| Month | Post Title | Target Keyword | Type |
|-------|-----------|---------------|------|
| 1 | "Why Real Estate Developers in UP Need 3D Visualization in 2026" | real estate 3D visualization UP | Local B2B |
| 1 | "Interior Design Trends for Lucknow Homes in 2026" | interior design Lucknow | Local Audience |
| 2 | "How 3D Architectural Walkthroughs Close More Sales" | architectural walkthrough video | Informational |
| 2 | "Giggle Filmz: Behind Our Film Production Process" | film production Lucknow | Brand Story |
| 3 | "Interior vs Exterior 3D Rendering: What Does Your Project Need?" | interior vs exterior 3D render | Comparison |
| 3 | "Top 5 Mistakes Architects Make When Skipping 3D Visualization" | 3D visualization architects India | Informational |
| 4 | "How Much Does 3D Rendering Cost in India? (2026 Guide)" | 3D rendering cost India | High-intent |
| 4 | "Portfolio Spotlight: [Project Name] – Luxury Interior Lucknow" | interior render portfolio | Portfolio SEO |
| 5 | "3D Animation Studio vs Freelancer: Which Should You Choose?" | 3D animation studio India | Comparison |
| 5 | "Real Estate Marketing in Uttar Pradesh: The Power of 3D Visuals" | real estate marketing UP | Local B2B |
| 6 | "Our 3D Modelling Process: From CAD to Photorealistic Render" | 3D modelling process | Authority |
| 6 | "Servayam's 1-Year Journey: Highlights from Lucknow's Animation Studio" | Servayam animation Lucknow | Brand |

### YouTube / Video SEO

YouTube is the **#1 channel** for this type of business — 3D walkthroughs and showreels rank in both YouTube and Google Search.

- Upload all showreels and project walkthroughs to YouTube
- Title format: `"[Project Name] | 3D Interior Walkthrough | Servayam Animation Studio Lucknow"`
- Add full description with local keywords + website link
- Create playlists: Interior Renders, Exterior Renders, 3D Models, Giggle Filmz
- Embed YouTube videos on corresponding portfolio pages

---

## 6. 🔗 Local Link Building

### Priority Sources (India-Specific)

| Source | Type | Action |
|--------|------|--------|
| Justdial | Business Directory | Create/claim listing |
| Sulekha | Business Directory | Create/claim listing |
| IndiaMart | B2B Directory | Create supplier profile |
| Udyam MSME Portal | Government | Register as MSME |
| Local UP Architecture Council | Association | Request link/listing |
| Real estate developer blogs in UP | Guest Post | Outreach |
| Interior design blogs India | Guest Post | Outreach |
| Lucknow local news sites | PR | Press release on projects |

### Testimonial & Review Strategy

- Request **Google Reviews** from every completed client
- Ask clients to tag @Servayam on Instagram when they share renders
- Submit to Clutch.co as an animation/design agency (strong B2B SEO value)
- Create a dedicated **Testimonials page** with structured `Review` schema

---

## 7. 📊 KPI Targets

| Metric | Baseline | 3 Months | 6 Months | 12 Months |
|--------|----------|----------|----------|-----------|
| Google Business Profile Views | 0 | 500/mo | 1,500/mo | 5,000/mo |
| Organic Search Traffic | ~0 | 200/mo | 800/mo | 3,000/mo |
| "Lucknow" keyword rankings | — | Top 10 for 3 terms | Top 5 for 5 terms | Top 3 for 10 terms |
| Google Reviews | 0 | 10 | 25 | 50+ |
| Blog Posts Published | 0 | 4 | 10 | 20 |
| YouTube Videos | — | 5 | 12 | 24 |
| Backlinks (referring domains) | 0 | 10 | 30 | 80 |
| Core Web Vitals (LCP) | Unknown | < 3.0s | < 2.5s | < 2.5s |

---

## 8. 🗺️ Implementation Roadmap

### Phase 1: Foundation (Weeks 1–4)

- [ ] Claim Google Business Profile + full optimization
- [ ] Add `robots.txt` + `sitemap.xml` to Vite project
- [ ] Implement `react-helmet-async` for per-page meta tags
- [ ] Add LocalBusiness JSON-LD schema to `index.html`
- [ ] Convert portfolio images to WebP + add alt text
- [ ] Set up Google Search Console + submit sitemap
- [ ] Set up Google Analytics 4
- [ ] Create NAP-consistent listings on Justdial + Sulekha

### Phase 2: Content & Structure (Weeks 5–12)

- [ ] Implement React Router with SEO-friendly URLs for each portfolio category
- [ ] Build `/services/` pages (one per service)
- [ ] Launch `/blog/` section with first 4 posts
- [ ] Upload 5 portfolio walkthroughs to YouTube (optimized titles/descriptions)
- [ ] Create `/about/` page with team, studio story, E-E-A-T signals
- [ ] Begin Google Review collection campaign

### Phase 3: Authority (Weeks 13–26)

- [ ] Publish 2 blog posts/month
- [ ] Outreach to 10 UP real estate / architecture sites for links
- [ ] Submit to Clutch.co and IndiaMART
- [ ] Add FAQ schema to service pages
- [ ] Build dedicated case study pages for 3 flagship projects
- [ ] Begin MSME Udyam registration for government credibility signals

### Phase 4: Scale (Months 7–12)

- [ ] Target national keywords with in-depth guide content
- [ ] Launch email newsletter for client retention and brand recall
- [ ] Explore Google Ads for high-intent local keywords
- [ ] Track GBP photo views, direction requests as local intent signals
- [ ] Quarterly SEO audit using PageSpeed Insights + GSC data

---

## 9. ⚡ Quick Wins (Do This Week)

1. **Add your city to every page title** — `| Lucknow` suffix on all `<title>` tags
2. **Claim Google Business Profile today** — it's free and the highest-ROI local SEO action
3. **Add alt text to all images** in `AllProjects.tsx` — currently missing
4. **Create a `sitemap.xml`** and add it to Vite's `public/` folder
5. **Add `robots.txt`** to `public/`
6. **Upload your showreel to YouTube** with a keyword-rich title and local description

---

## 10. 📁 E-E-A-T Signals (Experience, Expertise, Authority, Trust)

Google increasingly evaluates content on E-E-A-T, especially for service businesses.

- **Experience**: Add project case studies with client names, locations, and project context
- **Expertise**: Author the blog as the studio's lead artists — with name + role bylines
- **Authority**: List studio awards, features, or media mentions on the About page
- **Trust**: Display client logos, Google Review count, years in business, and physical address in footer

---

*Strategy generated for Servayam Animation Studio — Lucknow, Uttar Pradesh, India*  
*Aligned with: SKILL_seo_plan.md v1.9.6 | SKILL_google_seo.md v1.9.6 | SKILL_competitor_profiling.md v1.0.0*
