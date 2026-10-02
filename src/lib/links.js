import { site } from '../data/site.js';

/** Link de WhatsApp con mensaje prellenado. */
export function whatsappLink(message, number = site.whatsapp) {
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number}${text}`;
}

export function mapsLink(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
