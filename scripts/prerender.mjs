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

ROUTES.forEach((route) => {
  // Create directory structure
  const routePath = route === '/' ? 'index' : route.replace(/\//g, '/index');
  const filePath = path.join(DIST_DIR, `${routePath}.html`);
  const dirPath = path.dirname(filePath);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Write the HTML file
  fs.writeFileSync(filePath, baseHtml, 'utf-8');
  console.log(`✓ ${route} -> ${filePath}`);
});

console.log('✅ Prerendering complete!');
console.log(
  'Note: Client-side routing will handle navigation. Routes are now discoverable as static files.'
);
