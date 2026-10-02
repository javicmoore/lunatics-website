import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, MQ } from '../../lib/gsap.js';
import { hero } from '../../data/hero.js';
import Picture from '../Picture/Picture.jsx';
import Icon from '../Icon/Icon.jsx';
import HeroScene from './HeroScene.jsx';
import './HeroExperience.css';

/**
 * MUÑECA EN SOMBRA → RELOJ → RELOJ AISLADO → COLECCIÓN
 *
 * Un "track" alto con un escenario `position: sticky` (scroll nativo, sin pin).
 * Solo DOS capas se animan, y solo con transform + opacity:
 *  - cámara: la foto de la muñeca (ya trae el reloj puesto), escalada desde la carátula;
 *  - reloj:  el PNG real, a su tamaño FINAL y reducido al inicio (nunca se escala
 *            por encima de 1). Sigue a la cámara invisible, alineado con el reloj
 *            de la foto, y entra con un crossfade cuando la cámara ya está cerca.
 * La geometría se mide solo al cargar/redimensionar (refreshInit), nunca durante el scrub.
 */
export default function HeroExperience() {
  const root = useRef(null);
  const { copy, watch } = hero;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const stage = q('.hero__stage')[0];
      const camera = q('.hero__camera')[0];
      const watchEl = q('.hero__watch')[0];
      const portraitMQ = window.matchMedia('(orientation: portrait)'); // mismo criterio que <picture>
      const L = {};

      const measure = () => {
        const W = stage.clientWidth;
        const H = stage.clientHeight;
        const portrait = portraitMQ.matches;
        const v = portrait ? hero.scene.portrait : hero.scene.landscape;
        const { width: iw, height: ih } = v.image;

        // Encuadre "cover" de la foto, intentando colocar la carátula en `frame`.
        const c = Math.max(W / iw, H / ih);
        const sw = iw * c;
        const sh = ih * c;
        const fx = v.focal[0] * c;
        const fy = v.focal[1] * c;
        const ox = gsap.utils.clamp(W - sw, 0, v.frame[0] * W - fx);
        const oy = gsap.utils.clamp(H - sh, 0, v.frame[1] * H - fy);
        Object.assign(camera.style, {
          width: `${sw}px`,
          height: `${sh}px`,
          left: `${ox}px`,
          top: `${oy}px`,
          transformOrigin: `${fx}px ${fy}px`,
        });

        // Reloj aislado: tamaño y posición finales.
        const ar = watch.height / watch.width;
        const Wf = portrait ? Math.min(W * 0.74, (H * 0.5) / ar) : Math.min(W * 0.5, (H * 0.64) / ar);
        const Hf = Wf * ar;
        const targetY = H * (portrait ? 0.44 : 0.47);
        Object.assign(watchEl.style, {
          width: `${Wf}px`,
          height: `${Hf}px`,
          left: `${W / 2 - Wf * watch.dialCenter.x}px`,
          top: `${targetY - Hf * watch.dialCenter.y}px`,
        });

        const Fx = ox + fx;
        const Fy = oy + fy;
        L.camX = W / 2 - Fx; // la cámara lleva la carátula a su posición final
        L.camY = targetY - Fy;
        L.watchX = Fx - W / 2; // el PNG arranca exactamente sobre el reloj de la foto
        L.watchY = Fy - targetY;
        L.watchScale = (v.watchWidth * c) / Wf;
        L.watchRot = v.watchRotation ?? 0; // giro del reloj en la foto; el PNG se endereza al aislarse
        // Acercamiento para que el reloj de la foto llegue a ~95 % de su tamaño final
        // (mínimo sutil si la foto ya es un close-up).
        L.push = gsap.utils.clamp(1.08, W >= 1024 ? 2.4 : 2.2, 0.95 / L.watchScale);
      };

      measure();
      const mm = gsap.matchMedia();

      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile, reduce: MQ.reduce }, (ctx) => {
        const { desktop, reduce } = ctx.conditions;

        // Reduced motion: la foto de la muñeca, estática. Sin scroll-jacking.
        if (reduce) {
          const place = () => measure();
          window.addEventListener('resize', place);
          return () => window.removeEventListener('resize', place);
        }

        ScrollTrigger.addEventListener('refreshInit', measure);

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: q('.hero__track')[0],
            start: 'top top',
            end: 'bottom bottom',
            // Móvil: el dedo manda (sin suavizado extra). Desktop: suaviza la rueda.
            scrub: desktop ? 0.6 : true,
            invalidateOnRefresh: true,
          },
        });

        tl
          // 0 — texto fuera
          .to(q('.hero__copy > *'), { autoAlpha: 0, y: -16, stagger: 0.08, duration: 1 }, 0)
          .to(q('.hero__hint'), { autoAlpha: 0, duration: 0.6 }, 0)

          // 1 — acercamiento a la muñeca; el PNG (invisible) sigue al reloj de la foto
          .fromTo(
            camera,
            { x: 0, y: 0, scale: 1, autoAlpha: 1 },
            { x: () => L.camX, y: () => L.camY, scale: () => L.push, duration: 5.5, ease: 'power1.inOut' },
            0,
          )
          .fromTo(
            watchEl,
            { x: () => L.watchX, y: () => L.watchY, scale: () => L.watchScale, rotation: () => L.watchRot, autoAlpha: 0 },
            { x: 0, y: 0, scale: () => L.watchScale * L.push, duration: 5.5, ease: 'power1.inOut' },
            0,
          )

          // 2 — crossfade: aparece el PNG y la muñeca se apaga
          .to(watchEl, { autoAlpha: 1, duration: 1.2 }, 4)
          .to(camera, { autoAlpha: 0, duration: 2 }, 4.6)

          // 3 — reloj aislado a tamaño final; la cámara sigue un poco mientras desaparece
          .to(camera, { scale: () => L.push * 1.06, duration: 2, ease: 'power1.out' }, 5.5)
          .to(watchEl, { scale: 1, rotation: 0, duration: 2.2, ease: 'power2.out' }, 5.5)

          // 4 — ficha del producto, pausa y salida hacia Relojes
          .fromTo(q('.hero__caption'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power2.out' }, 7.2)
          .fromTo(q('.hero__progress-bar'), { scaleX: 0 }, { scaleX: 1, duration: 9.5 }, 0)
          .to({}, { duration: 1.2 });

        return () => ScrollTrigger.removeEventListener('refreshInit', measure);
      });
    },
    { scope: root },
  );

  return (
    <section id="inicio" ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero__track">
        <div className="hero__stage">
          <div className="hero__lens">
            <div className="hero__camera">
              <HeroScene />
            </div>

            <div className="hero__watch">
              <div className="hero__watch-shadow" aria-hidden="true" />
              <Picture
                media={watch}
                sizes="(orientation: portrait) 74vw, 48vh"
                loading="eager"
                className="hero__watch-picture"
              />
            </div>
          </div>

          <div className="hero__copy container">
            <p className="label hero__eyebrow">
              <span className="label__rule" aria-hidden="true" />
              {copy.eyebrow}
            </p>
            <h1 id="hero-title" className="hero__title">
              <span className="sr-only">Lunatic's, relojes y accesorios para hombre en Mexicali. </span>
              <span className="display hero__title-a">{copy.titleA}</span>
              <span className="serif hero__title-b">{copy.titleB}</span>
            </h1>
          </div>

          <p className="hero__hint" aria-hidden="true">
            <span>{copy.hint}</span>
            <span className="hero__hint-line" />
          </p>

          <div className="hero__caption">
            <p className="hero__caption-brand label">
              <span className="label__index">●</span> {copy.caption.brand}
            </p>
            <p className="hero__caption-name">{copy.caption.name}</p>
            <a className="text-link" href={copy.caption.href}>
              {copy.caption.cta}
              <Icon name="arrow-down" className="btn__arrow" />
            </a>
          </div>

          <div className="hero__progress" aria-hidden="true">
            <span className="hero__progress-bar" />
          </div>
        </div>
      </div>
    </section>
  );
}
