/**
 * Genera los derivados optimizados (AVIF/WebP en varios anchos, favicons, OG)
 * a partir de los archivos maestros. Los maestros NUNCA se modifican.
 *
 *   npm run images
 *
 * Maestros (entregados por el cliente):
 *   logos/lunatics-logo.png          -> logo completo, fondo transparente
 *   logos/lunatics-logo-nb.png       -> solo "Lunatic's", fondo transparente
 *   logos/lunatics-logo-full.png     -> logo completo sobre fondo negro
 *   logos/lunatics-logo-circulo.png  -> versión circular
 *   productos/reloj-casio-azul.png   -> Casio plateado, carátula azul (PNG transparente)
 */
import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const pub = (...p) => path.join(root, 'public', ...p);

const BRAND_DIR = pub('images', 'brand');
const WATCH_DIR = pub('images', 'products', 'casio-azul');

const brand = [
  { src: 'logos/lunatics-logo.png', name: 'lunatics-logo-full', widths: [480, 960] },
  { src: 'logos/lunatics-logo-nb.png', name: 'lunatics-logo-wordmark', widths: [240, 480, 960] },
  { src: 'logos/lunatics-logo-full.png', name: 'lunatics-logo-black-bg', widths: [480, 960] },
  { src: 'logos/lunatics-logo-circulo.png', name: 'lunatics-logo-circle', widths: [512] },
];

async function variants(input, outDir, name, widths, { avif = true } = {}) {
  for (const w of widths) {
    const base = sharp(input).resize({ width: w, withoutEnlargement: true });
    await base.clone().webp({ quality: 86, alphaQuality: 90, effort: 6 }).toFile(path.join(outDir, `${name}-${w}.webp`));
    if (avif) await base.clone().avif({ quality: 62, effort: 6 }).toFile(path.join(outDir, `${name}-${w}.avif`));
  }
}

/** Recorta el exterior del círculo (las esquinas blancas) sin tocar el logo. */
async function circleIcon(input, size, out) {
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 0.5}" fill="#fff"/></svg>`,
  );
  await sharp(input).resize(size, size).composite([{ input: mask, blend: 'dest-in' }]).png().toFile(out);
}

await mkdir(BRAND_DIR, { recursive: true });
await mkdir(WATCH_DIR, { recursive: true });

// 1. Copias exactas de los logos oficiales, con nombres descriptivos.
for (const b of brand) {
  await copyFile(path.join(root, b.src), path.join(BRAND_DIR, `${b.name}.png`));
  await variants(path.join(root, b.src), BRAND_DIR, b.name, b.widths, { avif: false });
}

// 2. Reloj protagonista: copia exacta + derivados responsive.
const watchSrc = path.join(root, 'productos/reloj-casio-azul.png');
await copyFile(watchSrc, path.join(WATCH_DIR, 'casio-azul.png'));
await variants(watchSrc, WATCH_DIR, 'casio-azul', [360, 640, 900, 1086]);

// 3. Favicons / iconos (derivados del logo circular).
const circle = path.join(root, 'logos/lunatics-logo-circulo.png');
await circleIcon(circle, 32, pub('favicon-32.png'));
await circleIcon(circle, 180, pub('apple-touch-icon.png'));
await circleIcon(circle, 512, pub('icon-512.png'));

// 4. Imagen Open Graph 1200x630: fondo carbón, logo (fondo negro fundido con "lighten") y reloj.
const OG_W = 1200;
const OG_H = 630;
const bg = Buffer.from(`
<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="72%" cy="45%" r="65%">
      <stop offset="0" stop-color="#1d1f23"/>
      <stop offset="1" stop-color="#050506"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>`);
const ogLogo = await sharp(path.join(root, 'logos/lunatics-logo-full.png')).resize({ width: 600 }).toBuffer();
const ogWatch = await sharp(watchSrc).resize({ height: 560 }).toBuffer();
await sharp(bg)
  .composite([
    { input: ogLogo, left: 40, top: 215, blend: 'lighten' },
    { input: ogWatch, left: 720, top: 35 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(pub('og-image.jpg'));

// 5. Textura de grano fotográfico (estática, se repite en CSS).
const G = 160;
const noise = Buffer.alloc(G * G * 2);
let seed = 7;
for (let i = 0; i < G * G; i++) {
  seed = (seed * 16807) % 2147483647;
  noise[i * 2] = seed & 1 ? 255 : 0;
  noise[i * 2 + 1] = (seed >> 3) % 70;
}
await mkdir(pub('images', 'texture'), { recursive: true });
await sharp(noise, { raw: { width: G, height: G, channels: 2 } })
  .png({ compressionLevel: 9 })
  .toFile(pub('images', 'texture', 'grain.png'));

console.log('Imágenes generadas en /public');
