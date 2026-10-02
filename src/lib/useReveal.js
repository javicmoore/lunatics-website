import { gsap, useGSAP, ScrollTrigger } from './gsap.js';

/**
 * Revelado editorial al entrar en viewport, dentro de `scope`:
 *  - [data-reveal]       elementos sueltos (títulos, textos)
 *  - [data-reveal-item]  elementos en grupo (tarjetas), con stagger
 * Solo transform + opacity. Con reduced motion no se oculta nada.
 * `extra(conditions, q)` permite que cada sección agregue su propio motion
 * dentro del mismo contexto (misma limpieza automática).
 */
export function useReveal(scope, extra) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1024px)' },
        (ctx) => {
          if (!ctx.conditions.motion) return;
          const distance = ctx.conditions.desktop ? 28 : 18;
          const q = gsap.utils.selector(scope);

          q('[data-reveal]').forEach((el) => {
            gsap.from(el, {
              autoAlpha: 0,
              y: distance,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            });
          });

          const items = q('[data-reveal-item]');
          if (items.length) {
            gsap.set(items, { autoAlpha: 0, y: distance * 1.4 });
            ScrollTrigger.batch(items, {
              start: 'top 90%',
              once: true,
              onEnter: (batch) =>
                gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.09, overwrite: true }),
            });
          }

          extra?.(ctx.conditions, q);
        },
      );
    },
    { scope },
  );
}
