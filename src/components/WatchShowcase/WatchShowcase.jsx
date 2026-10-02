import { useRef } from 'react';
import { gsap } from '../../lib/gsap.js';
import { useReveal } from '../../lib/useReveal.js';
import { watches } from '../../data/products.js';
import { formatPrice } from '../../lib/format.js';
import { whatsappLink } from '../../lib/links.js';
import SectionHeading from '../SectionHeading/SectionHeading.jsx';
import ProductCard, { ProductMedia } from '../ProductCard/ProductCard.jsx';
import Icon from '../Icon/Icon.jsx';
import './WatchShowcase.css';

export default function WatchShowcase() {
  const root = useRef(null);
  const featured = watches.find((w) => w.featured);
  const rest = watches.filter((w) => !w.featured);

  useReveal(root, ({ desktop }, q) => {
    // Parallax muy sutil del reloj protagonista (solo desktop).
    if (!desktop) return;
    gsap.fromTo(
      q('.watches__feature-media .product-media__picture'),
      { yPercent: -4 },
      {
        yPercent: 4,
        ease: 'none',
        scrollTrigger: { trigger: q('.watches__feature')[0], start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  return (
    <section id="relojes" ref={root} className="section watches" aria-labelledby="relojes-title">
      <div className="container">
        <div className="watches__head">
          <SectionHeading
            id="relojes-title"
            index="01"
            label="Relojes"
            title="Relojes"
            accent="para todos los días."
            intro="Casio y otras marcas, elegidos pieza por pieza en Mexicali. Acero, digitales y G‑Shock."
          />
        </div>

        <article className="watches__feature" aria-labelledby="feature-name">
          <ProductMedia product={featured} sizes="(min-width: 768px) 50vw, 100vw" className="watches__feature-media" />
          <div className="watches__feature-info">
            <p className="label" data-reveal>
              <span className="label__index">●</span> La pieza del mes
            </p>
            <div data-reveal>
              <p className="watches__feature-brand">{featured.brand}</p>
              <h3 id="feature-name" className="watches__feature-name">
                <span className="display">Classic acero</span>
                <span className="serif">carátula azul</span>
              </h3>
            </div>
            <ul className="watches__specs" data-reveal>
              {featured.specs.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="watches__feature-price" data-reveal>
              {formatPrice(featured.price)} <span>MXN</span>
            </p>
            <div className="watches__feature-actions" data-reveal>
              <a
                className="btn btn--solid"
                href={whatsappLink(`Hola Lunatic's, quiero apartar el ${featured.brand} ${featured.name}.`)}
                target="_blank"
                rel="noreferrer"
              >
                Apartar por WhatsApp
                <Icon name="arrow" className="btn__arrow" />
              </a>
              <a className="text-link" href="#sucursales">
                Verlo en sucursal
              </a>
            </div>
          </div>
        </article>

        <div className="watches__grid">
          {rest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
