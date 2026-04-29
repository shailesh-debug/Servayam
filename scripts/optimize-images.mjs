#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'public', 'assets');
const OUTPUT_DIR = path.join(SOURCE_DIR, 'optimized');

const TARGETS = [
  'Mage 2K persp Half 2_4k.jpg',
  'Scene 10.png',
  'CP_Back.jpg',
  'CP_Close2.jpg',
  'A (3).png',
  'character.png',
  'CP_Back2_Low.jpg',
];

const widths = [480, 768, 1200, 1600];

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function slugify(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function optimizeFile(filename) {
  const inputPath = path.join(SOURCE_DIR, filename);
  if (!fs.existsSync(inputPath)) {
    console.warn(`Skipping missing asset: ${filename}`);
    return;
  }

  const base = slugify(filename);
  const image = sharp(inputPath).rotate();
  const metadata = await image.metadata();
  const availableWidths = widths.filter((width) => !metadata.width || width <= metadata.width);
  const ext = path.extname(filename).toLowerCase();

  for (const width of availableWidths) {
    const resized = image.clone().resize({ width, withoutEnlargement: true });
    await resized.webp({ quality: 72, effort: 4 }).toFile(path.join(OUTPUT_DIR, `${base}-${width}.webp`));
    await resized.avif({ quality: 48 }).toFile(path.join(OUTPUT_DIR, `${base}-${width}.avif`));
  }

  if (ext === '.jpg' || ext === '.jpeg') {
    await image.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUTPUT_DIR, `${base}.jpg`));
  }

  if (ext === '.png') {
    await image.clone().png({ compressionLevel: 9 }).toFile(path.join(OUTPUT_DIR, `${base}.png`));
  }
}

async function main() {
  for (const file of TARGETS) {
    await optimizeFile(file);
  }
  console.log('Optimized image variants written to public/assets/optimized');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});