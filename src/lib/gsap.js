/**
 * Punto único de registro de GSAP. Importar siempre desde aquí.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// En móvil, mostrar/ocultar la barra de Safari cambia el alto del viewport;
// no recalculamos por eso (evita saltos). Sí recalculamos al cambiar el ancho.
ScrollTrigger.config({ ignoreMobileResize: true });

// Si la altura del documento cambia después del primer cálculo (fuentes web que
// terminan de cargar, imágenes, contenido futuro), recalcular los triggers;
// si no, quedan desfasados y algunos revelados no se disparan a tiempo.
if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
  let lastHeight = 0;
  let timer = 0;
  new ResizeObserver(() => {
    const h = document.documentElement.scrollHeight;
    if (Math.abs(h - lastHeight) < 2) return;
    lastHeight = h;
    clearTimeout(timer);
    timer = setTimeout(() => ScrollTrigger.refresh(), 150);
  }).observe(document.body);
}

export { gsap, ScrollTrigger, useGSAP };

/** Condiciones para gsap.matchMedia(). Cada rama se limpia sola al dejar de aplicar. */
export const MQ = {
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
};
