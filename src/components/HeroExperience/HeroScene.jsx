import { hero } from '../../data/hero.js';

const srcSet = (img, fmt) => img.widths.map((w) => `${img.base}-${w}.${fmt} ${w}w`).join(', ');

/**
 * Escena del hero: una sola imagen raster por orientación (dirección de arte).
 * Hoy es el placeholder generado por `npm run hero:placeholder`; mañana la foto
 * real con los mismos nombres. Es decorativa: el h1 del hero da el significado.
 *
 * `sizes` refleja el recorte "cover": en vertical la imagen es más ancha que la pantalla.
 */
export default function HeroScene() {
  const { landscape, portrait } = hero.scene;
  const L = landscape.image;
  const P = portrait.image;
  return (
    <picture className="hero__photo">
      {P.formats.map((fmt) => (
        <source
          key={`p-${fmt}`}
          media="(orientation: portrait)"
          type={`image/${fmt}`}
          srcSet={srcSet(P, fmt)}
          sizes="120vw"
        />
      ))}
      {L.formats.map((fmt) => (
        <source key={`l-${fmt}`} type={`image/${fmt}`} srcSet={srcSet(L, fmt)} sizes="100vw" />
      ))}
      <img
        src={`${L.base}-${L.widths[0]}.webp`}
        width={L.width}
        height={L.height}
        alt=""
        fetchPriority="high"
        decoding="async"
        draggable="false"
      />
    </picture>
  );
}
