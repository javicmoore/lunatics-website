/**
 * Descriptores de imágenes reales del proyecto. Cada uno genera un <picture>
 * con AVIF + WebP en varios anchos (ver components/Picture).
 * Para agregar una foto nueva: correr `npm run images` con el maestro y
 * declarar aquí su ruta base, anchos e intrínsecos.
 */
export const casioAzul = {
  base: '/images/products/casio-azul/casio-azul',
  widths: [360, 640, 900, 1086],
  formats: ['avif', 'webp'],
  width: 1086,
  height: 1448,
  alt: 'Reloj Casio plateado de acero con carátula azul intensa y fechador',
  // Centro de la carátula dentro del PNG (proporción 0–1). Lo usa el hero para alinear.
  dialCenter: { x: 539 / 1086, y: 700 / 1448 },
};
