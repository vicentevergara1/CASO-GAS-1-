import React, { useState } from 'react';
import { formatCurrency } from '../utils/currency';
import { validarRut, formatearRut, validarCheckout } from '../utils/validation';

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shipping,
  total,
  onOrderSuccess,
}) {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    telefono: '',
    email: '',
    comuna: 'Chillán',
    direccion: '',
    indicaciones: '',
    metodoPago: 'efectivo',
    horarioEntrega: 'inmediato',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'rut') {
      formattedValue = formatearRut(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Limpiar error en cambio
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validarCheckout(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Simulación de procesamiento de pedido
    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess(formData);
    }, 700);
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', zIndex: 1065 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg">
          {/* Header */}
          <div className="modal-header bg-white border-bottom">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-truck fs-5 text-primary"></i>
              <h5 className="modal-title fw-bold text-dark fs-5 mb-0">
                Confirmación de Despacho a Domicilio
              </h5>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-body p-4">
              <div className="row g-4">
                {/* Columna Izquierda: Datos del Cliente y Entrega */}
                <div className="col-12 col-md-7">
                  <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">
                    <i className="bi bi-person-lines-fill me-1 text-primary"></i> Datos de Contacto y Entrega
                  </h6>

                  {/* Nombre */}
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">
                      Nombre Completo <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-sm ${errors.nombre ? 'is-invalid' : ''}`}
                      name="nombre"
                      placeholder="Ej: Rodrigo González Soto"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                    {errors.nombre && <div className="invalid-feedback small">{errors.nombre}</div>}
                  </div>

                  {/* RUT y Teléfono */}
                  <div className="row g-2 mb-3">
                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-semibold text-dark">
                        RUT Chileno <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control form-control-sm ${errors.rut ? 'is-invalid' : ''}`}
                        name="rut"
                        placeholder="12.345.678-K"
                        value={formData.rut}
                        onChange={handleChange}
                      />
                      {errors.rut && <div className="invalid-feedback small">{errors.rut}</div>}
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-semibold text-dark">
                        Teléfono Móvil <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        className={`form-control form-control-sm ${errors.telefono ? 'is-invalid' : ''}`}
                        name="telefono"
                        placeholder="+56 9 8765 4321"
                        value={formData.telefono}
                        onChange={handleChange}
                      />
                      {errors.telefono && (
                        <div className="invalid-feedback small">{errors.telefono}</div>
                      )}
                    </div>
                  </div>

                  {/* Comuna y Dirección */}
                  <div className="row g-2 mb-3">
                    <div className="col-12 col-sm-5">
                      <label className="form-label small fw-semibold text-dark">
                        Comuna <span className="text-danger">*</span>
                      </label>
                      <select
                        className={`form-select form-select-sm ${errors.comuna ? 'is-invalid' : ''}`}
                        name="comuna"
                        value={formData.comuna}
                        onChange={handleChange}
                      >
                        <option value="Chillán">Chillán (Centro y Urbano)</option>
                        <option value="Chillán Viejo">Chillán Viejo</option>
                        <option value="Coihueco">Coihueco</option>
                        <option value="Pinto">Pinto</option>
                        <option value="San Carlos">San Carlos</option>
                      </select>
                    </div>

                    <div className="col-12 col-sm-7">
                      <label className="form-label small fw-semibold text-dark">
                        Dirección y Número <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control form-control-sm ${errors.direccion ? 'is-invalid' : ''}`}
                        name="direccion"
                        placeholder="Calle, pasaje o avenida y número"
                        value={formData.direccion}
                        onChange={handleChange}
                      />
                      {errors.direccion && (
                        <div className="invalid-feedback small">{errors.direccion}</div>
                      )}
                    </div>
                  </div>

                  {/* Indicaciones adicionales */}
                  <div className="mb-3">
                    <label className="form-label small text-muted">
                      Indicaciones de entrega (opcional)
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="indicaciones"
                      placeholder="Depto, timbre, portón blanco, llamar al llegar..."
                      value={formData.indicaciones}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Métodos de Pago */}
                  <h6 className="fw-bold text-dark border-bottom pb-2 mb-2 mt-4">
                    <i className="bi bi-credit-card-2-front me-1 text-primary"></i> Método de Pago al Repartidor
                  </h6>

                  <div className="d-flex flex-column gap-2 mb-3">
                    <div className="form-check p-2 border rounded bg-light">
                      <input
                        className="form-check-input ms-1"
                        type="radio"
                        name="metodoPago"
                        id="pagoEfectivo"
                        value="efectivo"
                        checked={formData.metodoPago === 'efectivo'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label ms-2 small fw-semibold text-dark" htmlFor="pagoEfectivo">
                        <i className="bi bi-cash-stack text-success me-1"></i> Efectivo al momento de la entrega
                      </label>
                    </div>

                    <div className="form-check p-2 border rounded bg-light">
                      <input
                        className="form-check-input ms-1"
                        type="radio"
                        name="metodoPago"
                        id="pagoDebito"
                        value="debito"
                        checked={formData.metodoPago === 'debito'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label ms-2 small fw-semibold text-dark" htmlFor="pagoDebito">
                        <i className="bi bi-credit-card text-primary me-1"></i> Tarjeta Débito / Redcompra (POS en camión)
                      </label>
                    </div>

                    <div className="form-check p-2 border rounded bg-light">
                      <input
                        className="form-check-input ms-1"
                        type="radio"
                        name="metodoPago"
                        id="pagoTransferencia"
                        value="transferencia"
                        checked={formData.metodoPago === 'transferencia'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label ms-2 small fw-semibold text-dark" htmlFor="pagoTransferencia">
                        <i className="bi bi-bank text-info me-1"></i> Transferencia bancaria directa
                      </label>
                    </div>
                  </div>
                </div>

                {/* Columna Derecha: Resumen de Pedido */}
                <div className="col-12 col-md-5">
                  <div className="card bg-light border p-3 h-100 d-flex flex-column">
                    <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">
                      <i className="bi bi-receipt me-1 text-primary"></i> Resumen de tu Compra
                    </h6>

                    <div className="flex-grow-1 overflow-auto mb-3" style={{ maxHeight: '220px' }}>
                      <ul className="list-group list-group-flush bg-transparent small">
                        {items.map((item) => (
                          <li
                            key={item.id}
                            className="list-group-item bg-transparent px-0 py-2 d-flex justify-content-between align-items-center border-light-subtle"
                          >
                            <div>
                              <span className="fw-bold text-dark">{item.quantity}x</span>{' '}
                              <span className="text-secondary">{item.name}</span>
                            </div>
                            <span className="fw-semibold text-dark">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-top pt-2 mt-auto">
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(subtotal)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="d-flex justify-content-between small text-success mb-1">
                          <span>Descuento cupón:</span>
                          <span>-{formatCurrency(discount)}</span>
                        </div>
                      )}
                      <div className="d-flex justify-content-between small text-muted mb-2">
                        <span>Despacho express:</span>
                        <span>{shipping === 0 ? 'Gratis' : formatCurrency(shipping)}</span>
                      </div>
                      <div className="d-flex justify-content-between border-top pt-2 align-items-baseline">
                        <span className="fw-bold text-dark">Total Final:</span>
                        <span className="h4 fw-bold text-primary mb-0">
                          {formatCurrency(total)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 p-2 bg-white rounded border text-muted small" style={{ fontSize: '0.72rem' }}>
                      <i className="bi bi-info-circle text-primary me-1"></i>
                      Tu pedido se despachará desde nuestra bodega central en Chillán. Puedes seguir la ubicación del camión en el mapa interactivo.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer bg-light border-top p-3 d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Volver al Carrito
              </button>

              <button
                type="submit"
                className="btn btn-primary fw-bold px-4 shadow-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Confirmando pedido...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check2-circle me-1"></i> Confirmar y Despachar Pedido
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
