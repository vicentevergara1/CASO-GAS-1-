import React from 'react';
import { formatCurrency } from '../utils/currency';

export default function ProductCard({ product, onAddToCart, onQuickView }) {
  return (
    <div className="card h-100 card-product shadow-sm border">
      {/* Contenedor de Imagen con Badge */}
      <div className="product-img-container">
        {product.badge && (
          <span className="badge bg-primary position-absolute top-0 start-0 m-2 shadow-sm">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.src = '/assets/images/cilindro.png';
          }}
        />
      </div>

      {/* Contenido del Producto */}
      <div className="card-body d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="badge bg-light text-secondary border small">
            {product.category}
          </span>
          <span className="small text-muted">
            <i className="bi bi-box-seam me-1"></i> Stock: {product.stock}
          </span>
        </div>

        <h5 className="card-title fw-bold text-dark fs-6 mb-1 text-truncate" title={product.name}>
          {product.name}
        </h5>

        <p className="card-text text-muted small mb-3 flex-grow-1" style={{ fontSize: '0.82rem', minHeight: '2.5rem' }}>
          {product.description}
        </p>

        {/* Precio y Botones */}
        <div className="pt-2 border-top mt-auto">
          <div className="d-flex justify-content-between align-items-baseline mb-2">
            <span className="text-muted small">Precio:</span>
            <span className="h5 mb-0 fw-bold text-primary">
              {formatCurrency(product.price)}
            </span>
          </div>

          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-sm btn-primary d-flex align-items-center justify-content-center gap-1 fw-semibold py-2"
              onClick={() => onAddToCart(product, 1)}
            >
              <i className="bi bi-cart-plus-fill"></i> Agregar al Carrito
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center gap-1"
              onClick={() => onQuickView(product)}
            >
              <i className="bi bi-eye"></i> Ver Detalles y Ficha SEC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
