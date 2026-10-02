/**
 * Sets (outfits completos). Más adelante cada set referenciará productos
 * reales por `id` y podrá agregarse al carrito como un paquete.
 */
export const sets = [
  {
    id: 'set-noche',
    name: 'Set Noche',
    mood: 'Acero y azul para salir.',
    items: [
      { type: 'Reloj', name: 'Casio classic, carátula azul', productId: 'w-casio-azul' },
      { type: 'Cadena', name: 'Cubana de acero, 5 mm' },
      { type: 'Pulsera', name: 'Ónix mate, 8 mm' },
    ],
    price: 269900,
    composition: 'night',
    placeholder: true,
  },
  {
    id: 'set-diario',
    name: 'Set Diario',
    mood: 'Lo que usas de lunes a domingo.',
    items: [
      { type: 'Reloj', name: 'Vintage digital, acero' },
      { type: 'Pulsera', name: 'Eslabón de acero' },
    ],
    price: 179900,
    composition: 'daily',
    placeholder: true,
  },
  {
    id: 'set-regalo',
    name: 'Set Regalo',
    mood: 'Listo para entregar, con caja.',
    items: [
      { type: 'Reloj', name: 'G-Shock negro mate' },
      { type: 'Cadena', name: 'Torzal de acero' },
      { type: 'Dije', name: 'Placa grabable' },
    ],
    price: 319900,
    composition: 'gift',
    placeholder: true,
  },
];
