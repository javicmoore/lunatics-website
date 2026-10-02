import { useRef } from 'react';
import { gsap } from '../../lib/gsap.js';
import { useReveal } from '../../lib/useReveal.js';
import { sets } from '../../data/sets.js';
import { casioAzul } from '../../data/media.js';
import { formatPrice } from '../../lib/format.js';
import { whatsappLink } from '../../lib/links.js';
import SectionHeading from '../SectionHeading/SectionHeading.jsx';
import ProductArt from '../ProductArt/ProductArt.jsx';
import Picture from '../Picture/Picture.jsx';
import Icon from '../Icon/Icon.jsx';
import './Sets.css';

/** Piezas de cada composición tipo flat-lay (posiciones en % del lienzo). */
const COMPOSITIONS = {
  night: [
    { kind: 'art', art: 'chain', cls: 'set-piece--chain' },
    { kind: 'art', art: 'bracelet', cls: 'set-piece--bracelet' },
    { kind: 'photo', cls: 'set-piece--watch' },
  ],
  daily: [
    { kind: 'art', art: 'chain', cls: 'set-piece--chain-sm' },
    { kind: 'art', art: 'watch-digital', cls: 'set-piece--watch-sm' },
  ],
  gift: [
    { kind: 'art', art: 'pendant', cls: 'set-piece--pendant' },
    { kind: 'art', art: 'chain', cls: 'set-piece--chain-sm' },
    { kind: 'art', art: 'watch-gshock', cls: 'set-piece--watch-sm' },
  ],
};

function SetComposition({ type, featured }) {
  return (
    <div className={`set-comp set-comp--${type}${featured ? ' set-comp--featured' : ''}`}>
      {COMPOSITIONS[type].map((p, i) => (
        <div key={i} className={`set-piece ${p.cls}`} data-depth={i}>
          {p.kind === 'photo' ? (
            <Picture media={casioAzul} sizes="(min-width: 1024px) 26vw, 50vw" alt="" />
          ) : (
            <ProductArt art={p.art} />
          )}
        </div>
      ))}
    </div>
  );
}

function SetItems({ items }) {
  return (
    <ol className="set-items">
      {items.map((it, i) => (
        <li key={it.type + i}>
          {i > 0 && (
            <span className="set-items__plus" aria-hidden="true">
              +
            </span>
          )}
          <span className="set-items__type">{it.type}</span>
          <span className="set-items__name">{it.name}</span>
        </li>
      ))}
    </ol>
  );
}

export default function Sets() {
  const root = useRef(null);
  const [featured, ...others] = sets;

  useReveal(root, ({ desktop }, q) => {
    // Profundidad sutil entre piezas del set principal (solo desktop).
    if (!desktop) return;
    q('.set-comp--featured .set-piece').forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 18 * (i + 1) },
        {
          y: -18 * (i + 1),
          ease: 'none',
          scrollTrigger: { trigger: q('.set-comp--featured')[0], start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
  });

  const cta = (set) => whatsappLink(`Hola Lunatic's, me interesa el ${set.name}.`);

  return (
    <section id="sets" ref={root} className="section sets" aria-labelledby="sets-title">
      <div className="container">
        <div className="sets__head">
          <SectionHeading
            id="sets-title"
            index="03"
            label="Sets"
            title="Sets"
            accent="el outfit completo."
            intro="Reloj, cadena y pulsera pensados para usarse juntos. También listos para regalo."
          />
        </div>

        <article className="set-feature" aria-labelledby={`${featured.id}-name`}>
          <SetComposition type={featured.composition} featured />
          <div className="set-feature__info">
            <p className="label" data-reveal>
              <span className="label__index">●</span> Set destacado
            </p>
            <h3 id={`${featured.id}-name`} className="set-feature__name" data-reveal>
              <span className="display">{featured.name}</span>
              <span className="serif">{featured.mood}</span>
            </h3>
            <div data-reveal>
              <SetItems items={featured.items} />
            </div>
            <div className="set-feature__buy" data-reveal>
              <p className="set-price">
                <span className="set-price__label">Precio del set</span>
                {formatPrice(featured.price)} <small>MXN</small>
              </p>
              <a className="btn btn--solid" href={cta(featured)} target="_blank" rel="noreferrer">
                Lo quiero
                <Icon name="arrow" className="btn__arrow" />
              </a>
            </div>
          </div>
        </article>

        <div className="sets__grid">
          {others.map((set) => (
            <article key={set.id} className="set-card" data-reveal-item aria-labelledby={`${set.id}-name`}>
              <SetComposition type={set.composition} />
              <div className="set-card__body">
                <h3 id={`${set.id}-name`} className="set-card__name">
                  <span className="display">{set.name}</span>
                  <span className="serif">{set.mood}</span>
                </h3>
                <SetItems items={set.items} />
                <div className="set-card__foot">
                  <p className="set-price">
                    {formatPrice(set.price)} <small>MXN</small>
                  </p>
                  <a className="text-link" href={cta(set)} target="_blank" rel="noreferrer">
                    Consultar
                    <Icon name="arrow" className="btn__arrow" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
