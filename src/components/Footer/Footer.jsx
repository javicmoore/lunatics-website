import { nav, legal, site, brandAssets } from '../../data/site.js';
import { locations } from '../../data/locations.js';
import Icon from '../Icon/Icon.jsx';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            {/* Logo oficial sobre fondo negro; "lighten" funde su fondo con el del footer sin alterar el logo */}
            <img
              className="site-footer__logo"
              src={brandAssets.full.src}
              srcSet={brandAssets.full.srcSet}
              sizes="240px"
              width={brandAssets.full.width}
              height={brandAssets.full.height}
              alt="Lunatic's — Relojes y accesorios"
              loading="lazy"
              decoding="async"
            />
            <p>Relojes, cadenas, pulseras y dijes para hombre. {site.city}</p>
          </div>

          <nav className="site-footer__col" aria-label="Pie de página">
            <h2 className="site-footer__heading">Explorar</h2>
            <ul>
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__col">
            <h2 className="site-footer__heading">Sucursales</h2>
            <ul>
              {locations.map((loc) => (
                <li key={loc.id}>
                  <span className="site-footer__strong">{loc.label}</span>
                  <span>
                    {loc.address[0]}, {loc.address[1]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__col">
            <h2 className="site-footer__heading">Síguenos</h2>
            <ul>
              <li>
                <a className="site-footer__social" href={site.instagram.url} target="_blank" rel="noreferrer">
                  <Icon name="instagram" className="site-footer__icon" />
                  {site.instagram.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {year} {site.name}. {site.city}
          </p>
          <ul className="site-footer__legal">
            {legal.map((l) =>
              l.href ? (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ) : (
                <li key={l.label} title="Próximamente">
                  {l.label}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
