import { useCallback, useEffect, useRef, useState } from 'react';
import { nav, site, brandAssets } from '../../data/site.js';
import { locations } from '../../data/locations.js';
import { whatsappLink } from '../../lib/links.js';
import Icon from '../Icon/Icon.jsx';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  // Fondo oscuro sutil al hacer scroll (listener pasivo + rAF).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Menú abierto: bloquear scroll, Esc para cerrar, foco atrapado en el panel.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add('is-locked');

    const panel = panelRef.current;
    const focusables = () => panel.querySelectorAll('a[href], button:not([disabled])');
    focusables()[0]?.focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key === 'Escape') return close();
      if (e.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    // Si se rota/agranda a desktop con el menú abierto, cerrarlo.
    const mq = window.matchMedia('(min-width: 1024px)');
    const onMq = (e) => e.matches && close(false);

    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      root.classList.remove('is-locked');
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open, close]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="site-header__bar container">
        <a className="site-header__logo" href="#inicio" aria-label="Lunatic's — inicio" onClick={() => close(false)}>
          <img
            src={brandAssets.wordmark.src}
            srcSet={brandAssets.wordmark.srcSet}
            sizes="(min-width: 1024px) 136px, 112px"
            width={brandAssets.wordmark.width}
            height={brandAssets.wordmark.height}
            alt="Lunatic's"
            fetchPriority="high"
          />
        </a>

        <nav className="site-header__nav" aria-label="Principal">
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="site-header__cta" href="#sucursales">
          <span className="site-header__dot" aria-hidden="true" />
          Mexicali
        </a>

        <button
          ref={toggleRef}
          className="site-header__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => (open ? close() : setOpen(true))}
        >
          <span className="site-header__toggle-text">{open ? 'Cerrar' : 'Menú'}</span>
          <span className="site-header__burger" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        id="menu-movil"
        ref={panelRef}
        className="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        inert={!open}
      >
        <nav className="mobile-menu__nav" aria-label="Menú móvil">
          <ol>
            {nav.map((item, i) => (
              <li key={item.id} style={{ '--i': i }}>
                <a href={item.href} onClick={() => close(false)}>
                  <span className="mobile-menu__index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mobile-menu__label display">{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mobile-menu__foot">
          <p className="label">
            <span className="label__index">●</span> Dos sucursales en {site.city}
          </p>
          <ul className="mobile-menu__branches">
            {locations.map((loc) => (
              <li key={loc.id}>
                <span>{loc.label}</span> {loc.address[0]}, {loc.address[1]}
              </li>
            ))}
          </ul>
          <div className="mobile-menu__actions">
            <a className="btn" href={whatsappLink("Hola Lunatic's, quiero información.")} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" className="btn__arrow" />
              WhatsApp
            </a>
            <a className="btn" href={site.instagram.url} target="_blank" rel="noreferrer">
              <Icon name="instagram" className="btn__arrow" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
