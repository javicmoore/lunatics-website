/**
 * <picture> con AVIF + WebP en varios anchos a partir de un descriptor de
 * src/data/media.js. Reserva el espacio con width/height (sin saltos de layout).
 */
export default function Picture({
  media,
  sizes = '100vw',
  alt = media.alt,
  loading = 'lazy',
  fetchPriority,
  className,
  imgClassName,
  style,
  imgRef,
}) {
  const srcSet = (fmt) => media.widths.map((w) => `${media.base}-${w}.${fmt} ${w}w`).join(', ');
  const fallbackWidth = media.widths[Math.min(1, media.widths.length - 1)];
  const lastFormat = media.formats[media.formats.length - 1];

  return (
    <picture className={className} style={style}>
      {media.formats.map((fmt) => (
        <source key={fmt} type={`image/${fmt}`} srcSet={srcSet(fmt)} sizes={sizes} />
      ))}
      <img
        ref={imgRef}
        className={imgClassName}
        src={`${media.base}-${fallbackWidth}.${lastFormat}`}
        width={media.width}
        height={media.height}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        draggable="false"
      />
    </picture>
  );
}
