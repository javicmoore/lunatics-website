import { casioAzul } from './media.js';

/**
 * Configuración del Hero "MUÑECA EN SOMBRA → RELOJ → RELOJ AISLADO → COLECCIÓN".
 *
 * La escena es UNA imagen raster por orientación, generada desde una foto
 * maestra con `npm run hero:images` (scripts/hero-images.mjs). La foto ya trae
 * el reloj puesto; el PNG del Casio se alinea encima y hace crossfade.
 *
 * ─── CÓMO SUSTITUIR LA FOTO ──────────────────────────────────────────────
 * 1. Guardar la nueva foto en `source.master` (o cambiar la ruta).
 * 2. Medir en ella el centro de la carátula (`source.focal`), el ancho que ocupa
 *    el PNG del reloj alineado encima (`source.watchWidth`, el PNG mide 1086 px)
 *    y su giro en grados (`source.watchRotation`).
 * 3. Ajustar `landscape`/`portrait` si cambian las proporciones y correr
 *    `npm run hero:images`. El componente no se toca.
 */

// Foto maestra (no se publica; vive fuera de /public).
const source = {
  master: 'hero/hero-wrist-casio-azul.png',
  width: 1586,
  height: 992,
  focal: [800, 487],
  watchWidth: 477,
  watchRotation: -13,
};

// Variante vertical: recorte de 1000 px de ancho alrededor del reloj, sobre un
// lienzo alto que se funde en negro arriba y abajo (espacio para acercamiento y texto).
const PORTRAIT_W = 1000;
const PORTRAIT_H = 1800;
const PORTRAIT_FOCAL_Y = 684; // ~38 % del alto
const portraitCropX = source.focal[0] - PORTRAIT_W / 2;

export const hero = {
  watch: casioAzul,
  source,

  copy: {
    eyebrow: 'Mexicali, B.C. — Relojes y accesorios',
    titleA: 'El tiempo',
    titleB: 'también se lleva puesto.',
    hint: 'Desliza',
    caption: {
      brand: 'Casio',
      name: 'Classic acero · carátula azul',
      cta: 'Ver relojes',
      href: '#relojes',
    },
  },

  /**
   * Por variante:
   *  image          descriptor de la imagen generada (AVIF + WebP)
   *  focal          centro de la carátula dentro de esa imagen, en px
   *  watchWidth     ancho del PNG del reloj alineado encima, en px de esa imagen
   *  watchRotation  giro del reloj en la foto (el PNG se endereza al aislarse)
   *  frame          dónde se intenta colocar el focal en pantalla al inicio (0–1)
   */
  scene: {
    landscape: {
      image: {
        base: '/images/hero/hero-wrist-landscape',
        widths: [1200, 1586],
        formats: ['avif', 'webp'],
        width: source.width,
        height: source.height,
      },
      focal: source.focal,
      watchWidth: source.watchWidth,
      watchRotation: source.watchRotation,
      frame: [0.5, 0.49],
    },
    portrait: {
      image: {
        base: '/images/hero/hero-wrist-portrait',
        widths: [700, 1000],
        formats: ['avif', 'webp'],
        width: PORTRAIT_W,
        height: PORTRAIT_H,
      },
      focal: [source.focal[0] - portraitCropX, PORTRAIT_FOCAL_Y],
      watchWidth: source.watchWidth,
      watchRotation: source.watchRotation,
      frame: [0.5, 0.38],
      crop: { left: portraitCropX, top: PORTRAIT_FOCAL_Y - source.focal[1] }, // usado por el script
    },
  },
};
