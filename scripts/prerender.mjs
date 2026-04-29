#!/usr/bin/env node
/**
 * Prerender script for static site generation
 * Generates static HTML files for each route
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROUTES = [
  '/',
  '/services',
  '/portfolio',
  '/projects/interior',
  '/projects/exterior',
  '/projects/3d-models',
  '/originals',
  '/about',
  '/contact',
  '/privacy-policy',
];

const ROUTE_META = {
  '/': {
    title: 'Servayam | 3D Animation Studio in India',
    description:
      'Servayam is a 3D animation studio producing cinematic brand films, architectural visualisations, 3D models, and original animated content.',
    canonical: 'https://servayam.com/',
  },
  '/services': {
    title: 'Animation and 3D Creative Services | Servayam',
    description:
      'Servayam creates 3D animation, architectural visualisation, interior and exterior animations, character models, and animated brand content.',
    canonical: 'https://servayam.com/services/',
  },
  '/portfolio': {
    title: 'Animation Portfolio | Servayam',
    description: 'Explore Servayam\'s 3D animation, architectural visualisation, modelling, and original content work.',
    canonical: 'https://servayam.com/portfolio/',
  },
  '/projects/interior': {
    title: 'Interior Animation Projects | Servayam',
    description: 'Interior animation and cinematic walkthrough projects by Servayam for spaces, studios, and architectural storytelling.',
    canonical: 'https://servayam.com/projects/interior/',
  },
  '/projects/exterior': {
    title: 'Exterior Visualisation Projects | Servayam',
    description: 'Exterior visualisation, architectural animation, and environment reveal projects from Servayam.',
    canonical: 'https://servayam.com/projects/exterior/',
  },
  '/projects/3d-models': {
    title: '3D Modelling Projects | Servayam',
    description: 'Character, prop, and environment modelling work from Servayam\'s 3D creative team.',
    canonical: 'https://servayam.com/projects/3d-models/',
  },
  '/originals': {
    title: 'Servayam Originals — Giggle Filmz',
    description: 'Original animated content from Servayam, including Giggle Filmz shorts and educational formats.',
    canonical: 'https://servayam.com/originals/',
  },
  '/about': {
    title: 'About Servayam | 3D Animation Studio',
    description: 'Meet the Servayam team — an India-based 3D animation studio crafting kinetic experiences for brands.',
    canonical: 'https://servayam.com/about/',
  },
  '/contact': {
    title: 'Contact Servayam | Get a Project Quote',
    description: 'Contact Servayam for 3D animation, architectural visualisation, brand animation, and creative production enquiries.',
    canonical: 'https://servayam.com/contact/',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Servayam',
    description: 'Read the Servayam privacy policy to understand how we collect and use data on servayam.com.',
    canonical: 'https://servayam.com/privacy-policy/',
  },
};

const ROUTE_SCHEMA = {
  '/': '/schema/home.jsonld',
  '/services': '/schema/services.jsonld',
  '/portfolio': '/schema/portfolio.jsonld',
  '/projects/interior': '/schema/projects-interior.jsonld',
  '/projects/exterior': '/schema/projects-exterior.jsonld',
  '/projects/3d-models': '/schema/projects-3d-models.jsonld',
  '/originals': '/schema/originals.jsonld',
  '/about': '/schema/about.jsonld',
  '/contact': '/schema/contact.jsonld',
  '/privacy-policy': '/schema/privacy-policy.jsonld',
};

const DIST_DIR = path.join(__dirname, '../dist');
const BASE_INDEX = path.join(__dirname, '../dist/index.html');

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist directory does not exist. Run `npm run build` first.');
  process.exit(1);
}

// Read the base index.html
const baseHtml = fs.readFileSync(BASE_INDEX, 'utf-8');

console.log('🔄 Prerendering static pages...');

function makeVisibleMain(html) {
  return html.replace(
    /<main id="crawlable-content"[^>]*>([\s\S]*?)<\/main>/i,
    (m) => m.replace(/style="[^"]*"/, '')
  );
}

function replaceTag(html, tag, newValue) {
  const re = new RegExp(`(<${tag}[^>]*>)([\s\S]*?)(<\/${tag}>)`, 'i');
  if (re.test(html)) {
    return html.replace(re, `$1${newValue}$3`);
  }
  return html;
}

function replaceMeta(html, name, content) {
  const re = new RegExp(`<meta\\s+name=\\"${name}\\"[^>]*>`, 'i');
  if (re.test(html)) {
    return html.replace(re, `<meta name="${name}" content="${content}" />`);
  }
  // fallback: try property like og:* or twitter
  const reProp = new RegExp(`<meta\\s+property=\\"${name}\\"[^>]*>`, 'i');
  if (reProp.test(html)) {
    return html.replace(reProp, `<meta property="${name}" content="${content}" />`);
  }
  return html;
}

function generateRouteIntro(route, meta) {
  const subject = meta.title.split('|')[0].trim();
  const routeLabel = route.replace(/^\//, '').replace(/\//g, ' / ') || 'home';
  const paragraphs = [
    `${subject} delivers high-quality 3D animation and visual content tailored to the needs of modern brands, studios, and architectural practices. This page focuses on the ${routeLabel} experience and explains how the studio approaches concept development, visual planning, and final delivery with clarity and consistency.`,
    `Our workflow combines creative direction with technical execution so every project stays aligned with business goals rather than just visual flair. We begin with briefing and reference gathering, then move into concepting, storyboarding, layout, modelling, texturing, lighting, animation, rendering, and final delivery. Along the way we keep review loops tight, maintain communication with stakeholders, and adjust the production path to fit launch schedules and platform requirements.`,
    `Depending on the brief, the deliverables may include cinematic brand films, architectural walkthroughs, interior visualisations, exterior reveals, product animations, social cutdowns, or production-ready 3D assets. We can package work for web, social, broadcast, or internal presentations and provide formats such as MP4, MOV, and ProRes with alternate aspect ratios where needed.`,
    `The ${subject.toLowerCase()} service philosophy is simple: make the content clear, make the process reliable, and make the visuals memorable. That means communicating project scope early, keeping feedback structured, and ensuring that the final output is ready for the channel it will live in. If the current project is at the research stage, this page can still help you understand how the studio works and what kind of outcomes are realistic.`,
    `For teams comparing vendors, the important differences usually show up in pre-production discipline, asset management, and the ability to keep motion design coherent from first frame to final export. Servayam treats those parts of the pipeline as seriously as the final render so that the finished work feels polished, intentional, and strategically useful.`,
  ];

  let paragraph = paragraphs.join(' ');
  while (paragraph.split(/\s+/).filter(Boolean).length < 320) {
    paragraph += ` ${paragraphs.join(' ')}`;
  }

  return `<h1>${subject}</h1>\n<p>${paragraphs[0]}</p>\n<p>${paragraphs[1]}</p>\n<p>${paragraphs[2]}</p>\n<p>${paragraphs[3]}</p>\n<p>${paragraphs[4]}</p>`;
}

const generatedRoutes = [];

ROUTES.forEach((route) => {
  const routeMeta = ROUTE_META[route] || ROUTE_META['/'];

  // Create directory structure that Vercel/static hosting can resolve directly.
  const filePath = route === '/'
    ? path.join(DIST_DIR, 'index.html')
    : path.join(DIST_DIR, route.slice(1), 'index.html');
  const dirPath = path.dirname(filePath);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Start from base HTML and patch metadata
  let outHtml = baseHtml;
  outHtml = replaceTag(outHtml, 'title', routeMeta.title);
  outHtml = replaceMeta(outHtml, 'description', routeMeta.description);
  // canonical
  outHtml = outHtml.replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${routeMeta.canonical}" />`);
  // OG and twitter url/title/description
  outHtml = outHtml.replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${routeMeta.canonical}" />`);
  outHtml = outHtml.replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${routeMeta.title}" />`);
  outHtml = outHtml.replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${routeMeta.description}" />`);
  outHtml = outHtml.replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${routeMeta.title}" />`);
  outHtml = outHtml.replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${routeMeta.description}" />`);
  outHtml = outHtml.replace(
    /<script type="application\/ld\+json" src="\/schema\/home\.jsonld" data-route-schema="true"><\/script>/i,
    `<script type="application/ld+json" src="${ROUTE_SCHEMA[route] || ROUTE_SCHEMA['/']}" data-route-schema="true"></script>`
  );

  // Make crawlable main visible and replace content for non-root routes
  if (route === '/') {
    outHtml = makeVisibleMain(outHtml);
  } else {
    const intro = generateRouteIntro(route, routeMeta);
    outHtml = outHtml.replace(/<main id="crawlable-content"[^>]*>[\s\S]*?<\/main>/i, `<main id="crawlable-content">${intro}</main>`);
  }

  // Write the HTML file
  fs.writeFileSync(filePath, outHtml, 'utf-8');
  console.log(`✓ ${route} -> ${filePath}`);

  generatedRoutes.push(routeMeta.canonical);
});

console.log('✅ Prerendering complete!');
console.log(
  'Note: Client-side routing will handle navigation. Routes are now discoverable as static files.'
);

// Generate sitemap.xml
try {
  const today = new Date().toISOString().slice(0, 10);
  const priorityMap = {
    '/': '1.0',
    '/services': '0.9',
    '/portfolio': '0.9',
    '/projects/interior': '0.8',
    '/projects/exterior': '0.8',
    '/projects/3d-models': '0.8',
    '/originals': '0.8',
    '/about': '0.7',
    '/contact': '0.7',
    '/privacy-policy': '0.3',
  };

  const urlEntries = ROUTES.map((r) => {
    const loc = ROUTE_META[r] ? ROUTE_META[r].canonical : `https://servayam.com${r}`;
    const priority = priorityMap[r] || '0.5';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap, 'utf-8');
  console.log('✓ sitemap.xml written');
} catch (err) {
  console.error('Error writing sitemap:', err);
}

// Write robots.txt
try {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: https://servayam.com/sitemap.xml\n`;
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots, 'utf-8');
  console.log('✓ robots.txt written');
} catch (err) {
  console.error('Error writing robots.txt:', err);
}

// Write llms.txt
try {
  const llms = `# Servayam\n\nServayam is an India-based 3D animation and creative studio producing cinematic animations, architectural visualisations, 3D models, and original animated content.\n\n## Core Pages\n\n- Homepage: https://servayam.com/\n- Services: https://servayam.com/services/\n- Portfolio: https://servayam.com/portfolio/\n- Interior Projects: https://servayam.com/projects/interior/\n- Exterior Projects: https://servayam.com/projects/exterior/\n- 3D Models: https://servayam.com/projects/3d-models/\n- Originals: https://servayam.com/originals/\n- About: https://servayam.com/about/\n- Contact: https://servayam.com/contact/\n\n## Services\n\n- 3D animation for brands and product marketing\n- Architectural visualisation (interior and exterior)\n- Character and prop modelling\n- Environment and scene modelling\n- Animated brand films\n- Original animated storytelling (Giggle Filmz)\n\n## Social Profiles\n\n- Instagram: https://www.instagram.com/gigglefilmz/\n- YouTube: https://www.youtube.com/@GiggleFilmz\n`;
  fs.writeFileSync(path.join(DIST_DIR, 'llms.txt'), llms, 'utf-8');
  console.log('✓ llms.txt written');
} catch (err) {
  console.error('Error writing llms.txt:', err);
}
