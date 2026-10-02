import './SectionHeading.css';

/** Encabezado editorial de sección: índice + etiqueta, título y bajada opcional. */
export default function SectionHeading({ index, label, title, accent, intro, id, align = 'start', children }) {
  return (
    <header className={`section-heading section-heading--${align}`}>
      <p className="label" data-reveal>
        <span className="label__index">{index}</span>
        <span className="label__rule" aria-hidden="true" />
        <span>{label}</span>
      </p>
      <h2 id={id} className="section-heading__title display" data-reveal>
        {title}
        {accent && (
          <>
            {' '}
            <span className="serif section-heading__accent">{accent}</span>
          </>
        )}
      </h2>
      {intro && (
        <p className="section-heading__intro" data-reveal>
          {intro}
        </p>
      )}
      {children}
    </header>
  );
}
