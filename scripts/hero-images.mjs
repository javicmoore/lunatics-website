/**
 * Genera las imágenes de la escena del hero a partir de la foto maestra
 * definida en src/data/hero.js (`hero.source`).
 *
 *   npm run hero:images
 *
 *  - landscape: la foto completa (sin ampliar por encima de su resolución).
 *  - portrait:  recorte alrededor del reloj sobre un lienzo alto, fundido a negro
 *               arriba y abajo con el mismo tono del fondo del sitio.
 * La geometría (focal, watchWidth) sale de la misma configuración que usa el
 * componente, así el PNG del reloj cae exactamente sobre el reloj de la foto.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { hero } from '../src/data/hero.js';

const root = path.resolve(import.meta.dirname, '..');
const INK = { r: 8, g: 9, b: 10 }; // --ink
const { source, scene } = hero;
const master = path.join(root, source.master);

async function write(buffer, image) {
  for (const w of image.widths) {
    const img = sharp(buffer).resize({ width: w, withoutEnlargement: true });
    await img.clone().avif({ quality: 60, effort: 6 }).toFile(path.join(root, 'public', `${image.base}-${w}.avif`));
    await img.clone().webp({ quality: 82, effort: 6 }).toFile(path.join(root, 'public', `${image.base}-${w}.webp`));
  }
}

await mkdir(path.join(root, 'public', 'images', 'hero'), { recursive: true });

// Horizontal: la foto tal cual.
await write(await sharp(master).removeAlpha().png().toBuffer(), scene.landscape.image);

// Vertical: recorte + fundido a negro en los bordes superior e inferior.
const P = scene.portrait;
const { width: W, height: H } = P.image;
const crop = await sharp(master).removeAlpha().extract({ left: P.crop.left, top: 0, width: W, height: source.height }).png().toBuffer();
const fade = Buffer.from(`
<svg width="${W}" height="${source.height}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="f" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0"/>
    <stop offset="0.16" stop-color="#fff" stop-opacity="1"/>
    <stop offset="0.72" stop-color="#fff" stop-opacity="1"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#f)"/>
</svg>`);
const feathered = await sharp(crop).ensureAlpha().composite([{ input: fade, blend: 'dest-in' }]).png().toBuffer();
const portrait = await sharp({ create: { width: W, height: H, channels: 3, background: INK } })
  .composite([{ input: feathered, left: 0, top: P.crop.top }])
  .png()
  .toBuffer();
await write(portrait, P.image);

console.log('Escena del hero generada en /public/images/hero');
