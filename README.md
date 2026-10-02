# Lunatic's — sitio web (fase 1)

Homepage de marca para **Lunatic's — Relojes y accesorios**, Mexicali, B.C.
Primera fase: experiencia visual sin e-commerce (sin carrito real, checkout ni Mercado Pago).

**Stack:** React 19 + Vite · GSAP + ScrollTrigger · CSS por componente · fuentes auto-hospedadas (Fontsource).

## Uso

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # build de producción en /dist
npm run preview   # sirve /dist localmente
npm run lint      # ESLint
npm run images    # regenera imágenes optimizadas desde los maestros
npm run hero:images       # genera la escena del hero desde la foto maestra
```

Requiere Node 20.19+ o 22.12+.

## Despliegue en Vercel

1. Subir el repositorio a GitHub.
2. En Vercel: **Add New → Project → Import** el repositorio.
3. Vercel detecta Vite. No hace falta configurar nada más: `vercel.json` ya define build, salida,
   reescrituras para rutas futuras (`/relojes`, `/producto/:slug`…) y cabeceras de caché/seguridad.
4. Variables de entorno (opcional por ahora): ver `.env.example`.

## Estructura

```
logos/, productos/, hero/   Archivos maestros (no se publican ni se modifican)
scripts/optimize-images.mjs Genera AVIF/WebP responsive, favicons, OG y textura de grano
public/
  images/brand/             Logos oficiales (copias exactas + derivados WebP)
  images/products/          Fotos de producto optimizadas
  og-image.jpg, favicon-32.png, apple-touch-icon.png, icon-512.png
src/
  App.jsx                   Shell (header, main, footer). Aquí entrará el router.
  pages/Home.jsx            Homepage: compone las secciones
  components/
    Header/                 Header transparente → oscuro al hacer scroll + menú móvil propio
    HeroExperience/         Secuencia MUÑECA → RELOJ → RELOJ AISLADO → COLECCIÓN (GSAP)
    WatchShowcase/          Relojes: pieza protagonista + grid editorial
    Accessories/            Paneles con deriva horizontal (desktop) / carrusel snap (móvil)
    Sets/                   Composiciones tipo flat-lay de outfits completos
    Locations/              LUNATIC'S — MEXICALI, dos sucursales
    Footer/
    ProductCard/            Tarjeta reutilizable (+ ProductMedia)
    ProductArt/             Placeholders de producto (dibujo técnico) hasta tener fotos
    Picture/                <picture> AVIF + WebP con srcset
    SectionHeading/, Icon/
  data/                     Contenido separado de la presentación
    site.js                 Marca, navegación, WhatsApp, Instagram, legales
    hero.js                 Configuración del hero (encuadres, punto focal del reloj)
    media.js                Descriptores de imágenes reales
    products.js, accessories.js, sets.js, locations.js
  lib/                      gsap (registro único), useReveal, formato de precios, links
  styles/global.css         Tokens (color, tipografía, espaciado) y utilidades
```

## Qué es placeholder (y dónde se cambia)

| Contenido | Archivo |
| --- | --- |
| Fotografía de la muñeca del hero (hoy una imagen temporal de demo) | `src/data/hero.js` → `source` + `npm run hero:images` |
| Precios y modelos de muestra | `src/data/products.js`, `src/data/sets.js` |
| Fotos de productos (hoy dibujos técnicos) | `image: { kind: 'photo', ...}` en cada producto |
| Sucursales: nombre, dirección, horario, foto, Maps | `src/data/locations.js` |
| Número de WhatsApp e Instagram | `src/data/site.js` |
| Aviso de privacidad, términos, políticas | `legal` en `src/data/site.js` |

### Sustituir la foto del hero

Narrativa: muñeca en sombra → Casio azul → reloj aislado → colección. La escena sale de una foto
maestra (hoy `hero/hero-wrist-casio-azul.png`, temporal para la demo) con `npm run hero:images`,
que genera la variante horizontal y la vertical (recorte fundido a negro) en `public/images/hero/`.

Para la foto definitiva, solo cambia `source` en `src/data/hero.js` (el componente no se toca):

1. Guardar la foto en `hero/` y actualizar `source.master`, `width` y `height`.
2. Medir el centro de la carátula (`focal`), el ancho que ocupa el PNG del reloj alineado encima
   (`watchWidth`; el PNG mide 1086 px) y su giro en grados (`watchRotation`).
3. Correr `npm run hero:images`. Si cambian los anchos generados, actualizar los preloads de `index.html`.

## Decisiones técnicas

- **Hero con `position: sticky` + scrub** en lugar de `pin` de ScrollTrigger: scroll nativo, sin pin-spacer, más estable en iOS.
- **Header sin `backdrop-filter`:** fondo oscuro semitransparente; el blur se recalculaba en cada frame sobre el hero.
- **Hero ligero:** solo dos capas animadas (foto y reloj) y solo `transform`/`opacity`. Sin `filter`, máscaras, blend modes ni SVG en runtime; la geometría se mide al cargar/redimensionar, nunca durante el scrub.
- **`100svh`** para el escenario fijo del hero (alto estable cuando aparece/desaparece la barra de Safari); `100dvh` para el menú móvil.
- **El reloj PNG se renderiza a su tamaño final** y se reduce al inicio, para que nunca se escale por encima de 1 y se vea nítido.
- **Móvil ≠ desktop:** en móvil el empuje de cámara es menor, no hay blur ni parallax, y Accesorios usa scroll-snap nativo.
- **Reduced motion:** composición estática, sin scroll-jacking; todo el contenido visible.
- **Títulos condensados con Archivo Narrow (estática)** en vez del eje variable `wdth`, que no se renderiza igual en todos los WebKit.
- Solo se precarga la escena inicial del hero (una variante por orientación). El resto de imágenes es `loading="lazy"` con dimensiones reservadas (sin saltos de layout).

## Seguridad

- No hay secretos en el código. `.env` está en `.gitignore`; `.env.example` solo lista nombres.
- Todo lo que tenga prefijo `VITE_` termina en el JavaScript público.
- Cuando llegue Mercado Pago, el Access Token vive **solo en el servidor** (función serverless de Vercel), nunca en el frontend.

## Próximas fases

1. Router (`react-router`): `/relojes`, `/accesorios`, `/producto/:slug`, `/carrito`, `/checkout`.
2. Catálogo real (CMS o JSON) usando la misma forma de datos de `src/data/products.js`.
3. Carrito (estado local + persistencia) reutilizando `ProductCard`.
4. Checkout con Mercado Pago (preferencias creadas en una función serverless).
5. SEO completo: dominio, canonical, sitemap, datos estructurados (`LocalBusiness`, `Product`).
