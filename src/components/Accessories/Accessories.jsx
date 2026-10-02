import { useRef } from 'react';
import { gsap } from '../../lib/gsap.js';
import { useReveal } from '../../lib/useReveal.js';
import { accessoryCategories } from '../../data/accessories.js';
import SectionHeading from '../SectionHeading/SectionHeading.jsx';
import ProductArt from '../ProductArt/ProductArt.jsx';
import './Accessories.css';

/**
 * Desktop: fila de paneles que se desplaza horizontalmente de forma sutil
 * mientras la sección atraviesa el viewport (sin pin).
 * Móvil/tablet: carrusel nativo con scroll-snap (el dedo manda; sin GSAP).
 */
export default function Accessories() {
  const root = useRef(null);

  useReveal(root, ({ desktop }, q) => {
    if (!desktop) return;
    const rail = q('.acc__rail')[0];
    const track = q('.acc__track')[0];
    gsap.to(track, {
      x: () => -Math.max(0, track.scrollWidth - rail.clientWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: rail,
        start: 'top 85%',
        end: 'bottom 15%',
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
  });

  return (
    <section id="accesorios" ref={root} className="section acc" aria-labelledby="accesorios-title">
      <div className="container acc__head">
        <SectionHeading
          id="accesorios-title"
          index="02"
          label="Accesorios"
          title="Accesorios"
          accent="que cierran el outfit."
          intro="Cadenas, pulseras y dijes en acero y plata. Para combinar con tu reloj o usar solos."
        />
        <p className="acc__swipe" aria-hidden="true">
          Desliza <span>→</span>
        </p>
      </div>

      <div className="acc__rail">
        <ul className="acc__track">
          {accessoryCategories.map((cat, i) => (
            <li key={cat.id} className="acc-panel">
              <article aria-labelledby={`acc-${cat.id}`}>
                <div className="acc-panel__media">
                  <ProductArt art={cat.art} />
                  <span className="acc-panel__index serif" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="acc-panel__body">
                  <h3 id={`acc-${cat.id}`} className="acc-panel__name display">
                    {cat.name}
                  </h3>
                  <p className="acc-panel__note">{cat.note}</p>
                  <p className="acc-panel__tag">Catálogo en línea · próximamente</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
