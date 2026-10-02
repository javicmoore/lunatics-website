import Picture from '../Picture/Picture.jsx';
import ProductArt from '../ProductArt/ProductArt.jsx';
import Icon from '../Icon/Icon.jsx';
import { formatPrice } from '../../lib/format.js';
import { whatsappLink } from '../../lib/links.js';
import './ProductCard.css';

/**
 * Tarjeta de producto reutilizable (home, /relojes, /accesorios…).
 * Hoy el CTA abre WhatsApp con el producto prellenado; cuando exista el
 * carrito se cambia `action` por "Agregar" sin tocar el layout.
 */
export function ProductMedia({ product, sizes, className = '' }) {
  const { image } = product;
  return (
    <div className={`product-media ${className}`}>
      {image.kind === 'photo' ? (
        <Picture media={image} sizes={sizes} className="product-media__picture" alt={image.alt} />
      ) : (
        <ProductArt art={image.art} />
      )}
    </div>
  );
}

export default function ProductCard({ product, sizes = '(min-width: 1024px) 22vw, 46vw' }) {
  const message = `Hola Lunatic's, me interesa: ${product.brand} ${product.name}. ¿Lo tienen disponible?`;
  return (
    <article className="product-card" data-reveal-item>
      <ProductMedia product={product} sizes={sizes} className="product-card__media" />
      <div className="product-card__body">
        <p className="product-card__brand">{product.brand}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price">
          {formatPrice(product.price)} <span>MXN</span>
        </p>
      </div>
      <a
        className="product-card__cta"
        href={whatsappLink(message)}
        target="_blank"
        rel="noreferrer"
        aria-label={`Consultar ${product.brand} ${product.name} por WhatsApp`}
      >
        <span>Consultar</span>
        <Icon name="arrow" className="product-card__cta-icon" />
      </a>
    </article>
  );
}
