import React from 'react';
import { formatCLP } from '../utils/formatters';

/**
 * Vista de Ofertas y Promociones - Distribuidora Gas El Volcán Chillán
 * Muestra promociones, packs con descuento y precios especiales en gas licuado y accesorios.
 */
export default function OffersView({
  products = [],
  onAddToCart,
  onViewProductDetail,
  onGoToCatalog,
}) {
  // Productos en oferta: aquellos con isOffer o con originalPrice > price o cilindros con promo
  const offerProducts = products.filter(
    (p) =>
      p.isOffer ||
      (p.originalPrice && p.originalPrice > p.price) ||
      p.id === 'cilindro-15kg' ||
      p.id === 'kit-instalacion' ||
      p.id === 'regulador-dual' ||
      p.id === 'cilindro-45kg'
  );

  return (
    <div className="container py-4">
      {/* Banner de Ofertas */}
      <div className="bg-gradient bg-primary text-white rounded-3 p-4 p-md-5 mb-4 shadow-sm position-relative overflow-hidden">
        <div className="position-relative z-1" style={{ maxWidth: '650px' }}>
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-3 fs-6">
            <i className="bi bi-tag-fill me-1"></i> PROMOCIONES DE TEMPORADA EN CHILLÁN
          </span>
          <h1 className="display-6 fw-bold mb-3">Ofertas Especiales y Packs de Ahorro</h1>
          <p className="lead mb-4 fs-6 opacity-90">
            Aprovecha descuentos exclusivos en recargas de gas de 15 Kg y 45 Kg, kits certificados SEC y servicios preventivos para tu hogar.
          </p>
          <div className="d-flex align-items-center gap-3">
            <span className="badge bg-white text-primary px-3 py-2 rounded-pill fw-semibold">
              <i className="bi bi-clock-history me-1"></i> Despacho express gratis sobre $20.000
            </span>
            <span className="badge bg-white text-dark px-3 py-2 rounded-pill fw-semibold">
              <i className="bi bi-percent me-1"></i> Cupón VOLCAN10 activo
            </span>
          </div>
        </div>
      </div>

      {/* Grid de productos en oferta */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 fw-bold text-dark mb-0">
          <i className="bi bi-fire text-danger me-2"></i>
          Productos con Descuento ({offerProducts.length})
        </h2>
        <button className="btn btn-sm btn-outline-primary" onClick={onGoToCatalog}>
          Ver catálogo completo <i className="bi bi-arrow-right ms-1"></i>
        </button>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {offerProducts.map((product) => {
          const discountPct = product.originalPrice
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 15;
          const originalPrice = product.originalPrice || Math.round(product.price * 1.18);

          return (
            <div key={product.id} className="col">
              <div className="card h-100 border border-danger-subtle shadow-sm product-card">
                {/* Barra de cabecera con categoría y descuento (despejada, sin tapar imagen) */}
                <div className="px-3 pt-3 pb-2 d-flex justify-content-between align-items-center bg-white border-bottom border-light">
                  <span className="badge bg-danger-subtle text-danger border border-danger-subtle small fw-semibold">
                    <i className="bi bi-lightning-fill me-1"></i>-{discountPct}% OFF
                  </span>
                  <span className="badge bg-light text-secondary border small">
                    {product.category}
                  </span>
                </div>

                <div className="p-3 bg-light text-center d-flex align-items-center justify-content-center" style={{ height: '170px' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid object-fit-contain"
                    style={{ maxHeight: '150px', maxWidth: '100%' }}
                    onError={(e) => {
                      e.target.src = '/assets/images/cilindro.png';
                    }}
                  />
                </div>

                <div className="card-body d-flex flex-column p-3">
                  <span className="badge bg-danger-subtle text-danger border border-danger-subtle align-self-start mb-2 small">
                    <i className="bi bi-lightning-fill me-1"></i>Oferta Relámpago
                  </span>
                  <h5 className="card-title fw-bold text-dark fs-6 mb-2">{product.name}</h5>
                  <p className="card-text text-secondary small flex-grow-1 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-3 pt-2 border-top">
                    <div className="d-flex align-items-baseline gap-2 mb-1">
                      <span className="fs-5 fw-bold text-danger">{formatCLP(product.price)}</span>
                      <small className="text-muted text-decoration-line-through">
                        {formatCLP(originalPrice)}
                      </small>
                    </div>
                    <small className="text-success fw-medium d-block">
                      <i className="bi bi-piggy-bank me-1"></i> Ahorras {formatCLP(originalPrice - product.price)}
                    </small>
                  </div>
                </div>

                <div className="card-footer bg-white border-0 pt-0 pb-3 px-3 d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-secondary w-50"
                    onClick={() => onViewProductDetail(product)}
                  >
                    Detalle
                  </button>
                  <button
                    className="btn btn-sm btn-danger w-50"
                    onClick={() => onAddToCart(product)}
                    disabled={product.stock <= 0}
                  >
                    <i className="bi bi-cart-plus me-1"></i>Comprar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
