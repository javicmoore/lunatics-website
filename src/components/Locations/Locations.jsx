import { useRef } from 'react';
import { useReveal } from '../../lib/useReveal.js';
import { locations } from '../../data/locations.js';
import { mapsLink, whatsappLink } from '../../lib/links.js';
import { site } from '../../data/site.js';
import Icon from '../Icon/Icon.jsx';
import './Locations.css';

function LocationPhoto({ loc }) {
  if (loc.photo) {
    return (
      <img
        className="loc-card__img"
        src={loc.photo.src}
        srcSet={loc.photo.srcSet}
        sizes="(min-width: 768px) 50vw, 100vw"
        width={loc.photo.width}
        height={loc.photo.height}
        alt={loc.photo.alt}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <div className="loc-card__placeholder" aria-hidden="true">
      <Icon name="pin" className="loc-card__placeholder-icon" />
      <span>Fotografía de la sucursal</span>
    </div>
  );
}

export default function Locations() {
  const root = useRef(null);
  useReveal(root);

  return (
    <section id="sucursales" ref={root} className="section locs" aria-labelledby="sucursales-title">
      <div className="container">
        <header className="locs__head">
          <p className="label" data-reveal>
            <span className="label__index">04</span>
            <span className="label__rule" aria-hidden="true" />
            <span>Sucursales</span>
          </p>
          <h2 id="sucursales-title" className="locs__title display" data-reveal>
            Lunatic’s <span className="locs__dash" aria-hidden="true" />
            <span className="sr-only">—</span> Mexicali
          </h2>
          <div className="locs__meta" data-reveal>
            <p>32.62° N · 115.45° O</p>
            <p>Baja California, México</p>
            <p>Dos tiendas. Ven a probártelo.</p>
          </div>
        </header>

        <div className="locs__grid">
          {locations.map((loc) => (
            <article key={loc.id} className="loc-card" data-reveal-item aria-labelledby={`${loc.id}-name`}>
              <div className="loc-card__media grain">
                <LocationPhoto loc={loc} />
                <span className="loc-card__tag label">
                  <span className="label__index">●</span> {loc.label}
                </span>
              </div>

              <div className="loc-card__body">
                <h3 id={`${loc.id}-name`} className="loc-card__name">
                  {loc.name}
                </h3>

                <dl className="loc-card__info">
                  <div>
                    <dt>
                      <Icon name="pin" className="loc-card__icon" />
                      <span className="sr-only">Dirección</span>
                    </dt>
                    <dd>
                      <address>
                        {loc.address.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </address>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      <Icon name="clock" className="loc-card__icon" />
                      <span className="sr-only">Horario</span>
                    </dt>
                    <dd>
                      {loc.hours.map((h) => (
                        <span key={h.days} className="loc-card__hours">
                          <span>{h.days}</span>
                          <span>{h.time}</span>
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <div className="loc-card__actions">
                  <a className="btn" href={mapsLink(loc.mapsQuery)} target="_blank" rel="noreferrer">
                    <Icon name="pin" className="btn__arrow" />
                    Cómo llegar
                  </a>
                  <a
                    className="btn"
                    href={whatsappLink(`Hola Lunatic's (${loc.label}), quiero información.`, loc.whatsapp ?? site.whatsapp)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="whatsapp" className="btn__arrow" />
                    WhatsApp
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
