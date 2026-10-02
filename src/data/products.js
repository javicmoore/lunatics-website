import { casioAzul } from './media.js';

/**
 * Catálogo de muestra. La forma de cada producto ya es la que usará
 * el e-commerce (/producto/:slug, carrito, checkout):
 *
 *  id, slug        identificadores estables
 *  brand, name     textos visibles
 *  category        'relojes' | 'cadenas' | 'pulseras' | 'dijes' | 'accesorios'
 *  price           centavos MXN (entero)
 *  image           { kind: 'photo', ...media } | { kind: 'art', art: '<placeholder>' }
 *  specs           lista corta para fichas
 *  placeholder     true mientras el dato no sea real
 */
export const watches = [
  {
    id: 'w-casio-azul',
    slug: 'casio-classic-acero-caratula-azul',
    brand: 'Casio',
    name: 'Classic acero, carátula azul',
    category: 'relojes',
    price: 189900,
    image: { kind: 'photo', ...casioAzul },
    specs: ['Acero inoxidable', 'Resistente al agua 50 m', 'Fechador', 'Movimiento japonés'],
    featured: true,
    placeholder: true, // precio de muestra
  },
  {
    id: 'w-casio-digital',
    slug: 'casio-vintage-digital-acero',
    brand: 'Casio',
    name: 'Vintage digital, acero',
    category: 'relojes',
    price: 129900,
    image: { kind: 'art', art: 'watch-digital' },
    placeholder: true,
  },
  {
    id: 'w-gshock-negro',
    slug: 'casio-g-shock-negro-mate',
    brand: 'Casio G‑Shock',
    name: 'Negro mate',
    category: 'relojes',
    price: 249900,
    image: { kind: 'art', art: 'watch-gshock' },
    placeholder: true,
  },
  {
    id: 'w-edifice-crono',
    slug: 'casio-edifice-cronografo',
    brand: 'Casio Edifice',
    name: 'Cronógrafo, carátula negra',
    category: 'relojes',
    price: 319900,
    image: { kind: 'art', art: 'watch-chrono' },
    placeholder: true,
  },
  {
    id: 'w-classic-piel',
    slug: 'reloj-clasico-correa-piel',
    brand: "Lunatic's Select",
    name: 'Clásico, correa de piel negra',
    category: 'relojes',
    price: 149900,
    image: { kind: 'art', art: 'watch-leather' },
    placeholder: true,
  },
];
