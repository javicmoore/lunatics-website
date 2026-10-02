/**
 * Sucursales. TODO: reemplazar con datos reales (nombre, dirección, horario,
 * teléfono de WhatsApp, foto y búsqueda/URL exacta de Google Maps).
 */
export const locations = [
  {
    id: 'sucursal-1',
    label: 'Sucursal 01',
    name: 'Nombre de la sucursal',
    address: ['Calle y número', 'Colonia, C.P. 21000', 'Mexicali, B.C.'],
    hours: [
      { days: 'Lunes a sábado', time: '11:00 – 20:00' },
      { days: 'Domingo', time: '12:00 – 18:00' },
    ],
    mapsQuery: "Lunatic's Relojes y Accesorios Mexicali",
    whatsapp: null, // usa el número general si es null
    photo: null, // { src, srcSet, width, height, alt }
    placeholder: true,
  },
  {
    id: 'sucursal-2',
    label: 'Sucursal 02',
    name: 'Nombre de la sucursal',
    address: ['Calle y número', 'Colonia, C.P. 21000', 'Mexicali, B.C.'],
    hours: [
      { days: 'Lunes a sábado', time: '11:00 – 20:00' },
      { days: 'Domingo', time: '12:00 – 18:00' },
    ],
    mapsQuery: "Lunatic's Relojes y Accesorios Mexicali",
    whatsapp: null,
    photo: null,
    placeholder: true,
  },
];
