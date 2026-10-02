/**
 * Datos generales de la marca. Todo lo marcado con TODO es placeholder
 * y debe reemplazarse con la información real del cliente.
 * Aquí no van secretos: este archivo termina en el JavaScript público.
 */
export const site = {
  name: "Lunatic's",
  tagline: 'Relojes y accesorios',
  city: 'Mexicali, B.C.',
  // TODO: usuario real de Instagram
  instagram: { handle: '@lunatics.mxl', url: 'https://www.instagram.com/' },
  // TODO: número real de WhatsApp en formato internacional, solo dígitos (52 + 10 dígitos)
  whatsapp: '526860000000',
};

/** Navegación principal. `href` apunta a anclas hoy; mañana a rutas (/relojes, /accesorios…). */
export const nav = [
  { id: 'inicio', label: 'Inicio', href: '#inicio' },
  { id: 'relojes', label: 'Relojes', href: '#relojes' },
  { id: 'accesorios', label: 'Accesorios', href: '#accesorios' },
  { id: 'sets', label: 'Sets', href: '#sets' },
  { id: 'sucursales', label: 'Sucursales', href: '#sucursales' },
];

export const legal = [
  { label: 'Aviso de privacidad', href: null },
  { label: 'Términos y condiciones', href: null },
  { label: 'Políticas de compra', href: null },
];

export const brandAssets = {
  wordmark: {
    src: '/images/brand/lunatics-logo-wordmark-480.webp',
    srcSet: '/images/brand/lunatics-logo-wordmark-240.webp 240w, /images/brand/lunatics-logo-wordmark-480.webp 480w',
    width: 2172,
    height: 724,
  },
  full: {
    src: '/images/brand/lunatics-logo-black-bg-960.webp',
    srcSet: '/images/brand/lunatics-logo-black-bg-480.webp 480w, /images/brand/lunatics-logo-black-bg-960.webp 960w',
    width: 2172,
    height: 724,
  },
};
