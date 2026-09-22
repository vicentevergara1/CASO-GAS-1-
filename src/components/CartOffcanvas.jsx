import React, { useState } from 'react';
import { formatCurrency } from '../utils/currency';

export default function CartOffcanvas({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  subtotal,
  discount,
  shipping,
  total,
  couponCode,
  couponMessage,
  couponValid,
  onApplyCoupon,
  onProceedCheckout,
}) {
  const [inputCoupon, setInputCoupon] = useState('');

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', zIndex: 1055 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-md">
        <div className="modal-content border-0 shadow-lg" style={{ maxHeight: '90vh' }}>
          {/* Header */}
          <div className="modal-header bg-white border-bottom">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-cart3 fs-5 text-primary"></i>
              <h5 className="modal-title fw-bold text-dark fs-5 mb-0">Mi Carrito de Compras</h5>
              <span className="badge bg-secondary rounded-pill small">
                {items.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Cerrar carrito"
            ></button>
          </div>

          {/* Body: Lista de Items */}
          <div className="modal-body p-3">
            {items.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-cart-x fs-1 text-muted mb-2 d-block"></i>
                <h5 className="fw-bold text-dark">Tu carrito está vacío</h5>
                <p className="text-muted small mb-3">
                  Agrega cilindros de gas, reguladores o accesorios para realizar tu pedido en Chillán.
                </p>
                <button type="button" className="btn btn-sm btn-primary" onClick={onClose}>
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center gap-3 p-2 bg-light rounded-3 border"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '56px', height: '56px', objectFit: 'contain' }}
                      className="bg-white p-1 rounded border flex-shrink-0"
                      onError={(e) => {
                        e.target.src = '/assets/images/cilindro.png';
                      }}
                    />

                    <div className="flex-grow-1 min-w-0">
                      <h6 className="fw-bold text-dark small mb-0 text-truncate" title={item.name}>
                        {item.name}
                      </h6>
                      <span className="text-primary small fw-semibold">
                        {formatCurrency(item.price)}
                      </span>

                      {/* Stepper de cantidad */}
                      <div className="d-flex align-items-center gap-2 mt-1">
                        <div className="input-group input-group-sm" style={{ width: '90px' }}>
                          <button
                            className="btn btn-outline-secondary px-2"
                            type="button"
                            onClick={() => onUpdateQty(item.id, -1)}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="form-control text-center p-0 bg-white small fw-bold"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            className="btn btn-outline-secondary px-2"
                            type="button"
                            onClick={() => onUpdateQty(item.id, 1)}
                          >
                            +
                          </button>
                        </div>

                        <span className="small text-muted ms-auto fw-medium">
                          {formatCurrency(item.price * item.quantity)}
                        </span>

                        <button
                          type="button"
                          className="btn btn-sm text-danger p-0 ms-2"
                          onClick={() => onRemoveItem(item.id)}
                          title="Eliminar producto"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Cupón de Descuento */}
                <div className="pt-2 border-top">
                  <label htmlFor="couponInput" className="form-label small fw-semibold text-dark mb-1">
                    ¿Tienes un cupón de descuento?
                  </label>
                  <div className="input-group input-group-sm">
                    <input
                      id="couponInput"
                      type="text"
                      className="form-control text-uppercase"
                      placeholder="Ej: VOLCAN10 o CHILLAN2024"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-primary fw-semibold"
                      type="button"
                      onClick={() => {
                        onApplyCoupon(inputCoupon);
                        setInputCoupon('');
                      }}
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponMessage && (
                    <div
                      className={`small mt-1 ${
                        couponValid ? 'text-success fw-semibold' : 'text-danger'
                      }`}
                    >
                      <i className={`bi ${couponValid ? 'bi-check-circle' : 'bi-exclamation-circle'} me-1`}></i>
                      {couponMessage}
                    </div>
                  )}
                  <div className="text-muted small mt-1" style={{ fontSize: '0.72rem' }}>
                    Tip de prueba: Usa <strong>VOLCAN10</strong> para 10% de descuento o <strong>CHILLAN2024</strong> para despacho gratis.
                  </div>
                </div>

                {/* Desglose de Totales */}
                <div className="card bg-light border-0 p-3 mt-2">
                  <div className="d-flex justify-content-between small text-muted mb-1">
                    <span>Subtotal:</span>
                    <span className="fw-semibold text-dark">{formatCurrency(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="d-flex justify-content-between small text-success mb-1">
                      <span>Descuento aplicado:</span>
                      <span className="fw-bold">-{formatCurrency(discount)}</span>
                    </div>
                  )}

                  <div className="d-flex justify-content-between small text-muted mb-2">
                    <span>Despacho a Domicilio:</span>
                    <span className="fw-semibold text-dark">
                      {shipping === 0 ? (
                        <span className="badge bg-success-subtle text-success">¡Gratis!</span>
                      ) : (
                        formatCurrency(shipping)
                      )}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between border-top pt-2 align-items-baseline">
                    <span className="fw-bold text-dark">Total a Pagar:</span>
                    <span className="h4 fw-bold text-primary mb-0">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="modal-footer bg-white border-top p-3 d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={onClearCart}
              >
                Vaciar Carrito
              </button>

              <button
                type="button"
                className="btn btn-primary fw-semibold px-4 shadow-sm"
                onClick={() => {
                  onClose();
                  onProceedCheckout();
                }}
              >
                Ir a Despacho y Pago <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
