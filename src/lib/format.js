const mxn = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

/** Precios en centavos (entero) para evitar errores de punto flotante en el futuro carrito. */
export function formatPrice(cents) {
  return mxn.format(cents / 100);
}
