import React from 'react';
import { formatCLP } from '../utils/formatters';

/**
 * Vista de Error en el Pago según Figura 8 de la propuesta:
 * "No se pudo realizar el pago. nro #20240705"
 * Muestra el resumen y el botón destacado "VOLVER A REALIZAR EL PAGO".
 */
export default function OrderErrorView({ order, onRetryPayment, onGoHome }) {
  if (!order) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">Error de transacción sin datos de pedido.</div>
        <button className="btn btn-primary" onClick={onGoHome}>Volver al Inicio</button>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: '820px' }}>
      <div className="card border border-danger-subtle shadow-sm p-4 p-md-5 bg-white">
        {/* Encabezado según Figura 8 */}
        <div className="border-bottom pb-3 mb-4">
          <div className="d-flex align-items-center gap-2 mb-2">
            <i className="bi bi-x-circle-fill text-danger fs-3"></i>
            <h1 className="h4 fw-bold text-dark mb-0">
              No se pudo realizar el pago. nro #{order.id}
            </h1>
          </div>
          <p className="text-secondary small mb-0">
            Detalle de compra rechazada. La pasarela de pago o el método de autenticación reportó un error de validación bancaria o fondos insuficientes.
          </p>
        </div>

        {/* Botón Verde Central según Figura 8 */}
        <div className="text-center my-3 pb-3 border-bottom">
          <button
            className="btn btn-success btn-lg px-4 py-3 fw-bold text-uppercase shadow-sm"
            onClick={onRetryPayment}
            style={{ minWidth: '280px', letterSpacing: '0.5px' }}
          >
            <i className="bi bi-arrow-repeat me-2"></i>
            Volver a Realizar el Pago
          </button>
          <div className="text-muted small mt-2">
            Puedes seleccionar otro medio de pago o verificar tus datos de despacho.
          </div>
        </div>

        {/* Información del cliente (Figura 8) */}
        <div className="mb-4">
          <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">Información del cliente</h6>
          <div className="row g-3">
            <div className="col-12 col-sm-4">
              <label className="text-muted small d-block">Nombre</label>
              <div className="p-2 bg-light rounded border text-dark fw-medium small">
                {order.cliente.nombre || 'Cliente'}
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <label className="text-muted small d-block">Apellidos / RUT</label>
              <div className="p-2 bg-light rounded border text-dark fw-medium small">
                {order.cliente.rut || '12.345.678-5'}
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <label className="text-muted small d-block">Correo</label>
              <div className="p-2 bg-light rounded border text-dark fw-medium small text-truncate">
                {order.cliente.email || 'contacto@chillan.cl'}
              </div>
            </div>
          </div>
        </div>

        {/* Dirección de entrega (Figura 8) */}
        <div className="mb-4">
          <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">Dirección de entrega de los productos</h6>
          <div className="row g-3">
            <div className="col-12 col-sm-7">
              <label className="text-muted small d-block">Calle</label>
              <div className="p-2 bg-light rounded border text-dark fw-medium small">
                {order.cliente.direccion || 'Av. Libertad 820'}
              </div>
            </div>
            <div className="col-12 col-sm-5">
              <label className="text-muted small d-block">Comuna</label>
              <div className="p-2 bg-light rounded border text-dark fw-medium small">
                {order.cliente.comuna || 'Chillán'}, Región de Ñuble
              </div>
            </div>
          </div>
        </div>

        {/* Resumen de items */}
        <div className="mb-4">
          <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">Detalle de productos</h6>
          <div className="table-responsive">
            <table className="table table-sm align-middle">
              <thead className="table-light small text-muted">
                <tr>
                  <th style={{ width: '50px' }}>Imagen</th>
                  <th>Nombre</th>
                  <th className="text-end">Precio</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image || '/assets/images/cilindro.png'}
                        alt={item.name}
                        className="rounded border"
                        style={{ width: '36px', height: '36px', objectFit: 'contain' }}
                        onError={(e) => { e.target.src = '/assets/images/cilindro.png'; }}
                      />
                    </td>
                    <td className="fw-medium small text-dark">{item.name}</td>
                    <td className="text-end small text-secondary">{formatCLP(item.price)}</td>
                    <td className="text-center small fw-bold">{item.quantity}</td>
                    <td className="text-end small fw-bold text-dark">{formatCLP(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total pagado */}
        <div className="bg-light p-3 rounded border text-end mb-4">
          <span className="fs-6 text-muted me-2">Total pendiente:</span>
          <span className="fs-5 fw-bold text-danger">{formatCLP(order.total)}</span>
        </div>

        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-secondary btn-sm" onClick={onGoHome}>
            <i className="bi bi-arrow-left me-1"></i> Cancelar y volver a la tienda
          </button>
          <button className="btn btn-success btn-sm px-4 fw-semibold" onClick={onRetryPayment}>
            Reintentar con otro medio
          </button>
        </div>
      </div>
    </div>
  );
}
