import React, { useState } from 'react';
import { formatCurrency } from '../utils/currency';

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', zIndex: 1060 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          {/* Header */}
          <div className="modal-header border-bottom">
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-primary">{product.category}</span>
              <h5 className="modal-title fw-bold text-dark fs-5">{product.name}</h5>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Cerrar modal"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            <div className="row g-4 align-items-center">
              {/* Imagen */}
              <div className="col-12 col-md-5 text-center">
                <div className="p-3 bg-light rounded-3 border">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid"
                    style={{ maxHeight: '240px', objectFit: 'contain' }}
                    onError={(e) => {
                      e.target.src = '/assets/images/cilindro.png';
                    }}
                  />
                </div>
              </div>

              {/* Detalles y Ficha Técnica */}
              <div className="col-12 col-md-7">
                <div className="h3 fw-bold text-primary mb-2">
                  {formatCurrency(product.price)}
                </div>
                <p className="text-secondary small mb-3">{product.description}</p>

                {/* Especificaciones Técnicas */}
                {product.specs && (
                  <div className="card bg-light border-0 p-3 mb-3">
                    <h6 className="fw-bold small text-dark mb-2">
                      <i className="bi bi-card-checklist me-1 text-primary"></i> Especificaciones Técnicas (SEC)
                    </h6>
                    <ul className="list-unstyled mb-0 small text-muted">
                      {Object.entries(product.specs).map(([key, val]) => (
                        <li key={key} className="py-1 border-bottom border-light-subtle d-flex justify-content-between">
                          <span className="text-capitalize fw-medium text-dark">{key}:</span>
                          <span className="text-end">{val}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Selector de Cantidad y Agregar */}
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <div className="input-group input-group-sm" style={{ width: '130px' }}>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <input
                      type="text"
                      className="form-control text-center fw-bold bg-white"
                      value={quantity}
                      readOnly
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary flex-grow-1 fw-semibold d-flex align-items-center justify-content-center gap-2"
                    onClick={() => {
                      onAddToCart(product, quantity);
                      onClose();
                    }}
                  >
                    <i className="bi bi-cart-plus-fill"></i> Agregar {quantity} al Carrito (
                    {formatCurrency(product.price * quantity)})
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer bg-light border-top py-2 px-4 d-flex justify-content-between">
            <span className="small text-muted">
              <i className="bi bi-shield-check text-success me-1"></i> Garantía oficial Distribuidora El Volcán Chillán
            </span>
            <button type="button" className="btn btn-sm btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
