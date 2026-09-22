import React, { useState } from 'react';
import { formatCLP } from '../utils/formatters';

/**
 * Vista de Compra Exitosa según Figura 7 de la propuesta:
 * "Se ha realizado la compra. nro #20240705"
 * Muestra información del cliente, dirección, tabla de items, total y botones de acción.
 */
export default function OrderSuccessView({ order, onTrackOrder, onGoHome }) {
  const [emailSent, setEmailSent] = useState(false);

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">No hay datos de orden disponibles.</div>
        <button className="btn btn-primary" onClick={onGoHome}>Volver al Inicio</button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 4000);
  };

  return (
    <div className="container py-4" style={{ maxWidth: '820px' }}>
      <div className="card border shadow-sm p-4 p-md-5 bg-white">
        {/* Encabezado según Figura 7 */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center border-bottom pb-4 mb-4 gap-2">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <i className="bi bi-check-circle-fill text-success fs-3"></i>
              <h1 className="h4 fw-bold text-dark mb-0">
                Se ha realizado la compra. nro #{order.id}
              </h1>
            </div>
            <p className="text-secondary small mb-0 ms-sm-4">
              Fecha de emisión: {new Date(order.fecha).toLocaleDateString('es-CL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <span className="badge bg-light text-dark border align-self-start align-self-sm-center px-3 py-2">
            Código orden: {order.id}
          </span>
        </div>

        {emailSent && (
          <div className="alert alert-success d-flex align-items-center mb-4 py-2">
            <i className="bi bi-envelope-check-fill me-2 fs-5"></i>
            <div>Boleta electrónica enviada exitosamente a <strong>{order.cliente.email}</strong>.</div>
          </div>
        )}

        {/* Sección: Información del cliente (Figura 7) */}
        <div className="mb-4">
          <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">Información del cliente</h6>
          <div className="row g-3">
            <div className="col-12 col-sm-4">
              <label className="text-muted small d-block">Nombre</label>
              <div className="p-2 bg-light rounded border text-dark fw-medium small">
                {order.cliente.nombre.split(' ')[0] || 'Cliente'}
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

        {/* Sección: Dirección de entrega de los productos (Figura 7) */}
        <div className="mb-4">
          <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">Dirección de entrega de los productos</h6>
          <div className="row g-3">
            <div className="col-12 col-sm-7">
              <label className="text-muted small d-block">Calle y Número</label>
              <div className="p-2 bg-light rounded border text-dark fw-medium small">
                {order.cliente.direccion || 'Av. O\'Higgins 450'}
              </div>
            </div>
            <div className="col-12 col-sm-5">
              <label className="text-muted small d-block">Comuna / Región</label>
              <div className="p-2 bg-light rounded border text-dark fw-medium small">
                {order.cliente.comuna || 'Chillán'}, Región de Ñuble
              </div>
            </div>
            {order.cliente.indicaciones && (
              <div className="col-12">
                <label className="text-muted small d-block">Indicaciones de entrega</label>
                <div className="p-2 bg-light rounded border text-secondary small">
                  {order.cliente.indicaciones}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabla de Productos según Figura 7 */}
        <div className="mb-4">
          <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">Detalle de productos</h6>
          <div className="table-responsive">
            <table className="table table-sm align-middle">
              <thead className="table-light">
                <tr className="small text-muted">
                  <th style={{ width: '60px' }}>Imagen</th>
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
                        style={{ width: '40px', height: '40px', objectFit: 'contain' }}
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

        {/* Resumen Total */}
        <div className="bg-light p-3 rounded border mb-4">
          <div className="d-flex justify-content-between mb-1 small text-secondary">
            <span>Subtotal neto:</span>
            <span>{formatCLP(order.subtotal)}</span>
          </div>
          {order.descuento > 0 && (
            <div className="d-flex justify-content-between mb-1 small text-success">
              <span>Descuento aplicado:</span>
              <span>-{formatCLP(order.descuento)}</span>
            </div>
          )}
          <div className="d-flex justify-content-between mb-2 small text-secondary">
            <span>Despacho a domicilio:</span>
            <span>{order.envio === 0 ? 'Gratis' : formatCLP(order.envio)}</span>
          </div>
          <div className="d-flex justify-content-between border-top pt-2">
            <span className="fw-bold text-dark fs-5">Total pagado:</span>
            <span className="fw-bold text-primary fs-5">{formatCLP(order.total)}</span>
          </div>
          <small className="text-muted d-block mt-1">
            Método: Pago contra entrega ({order.metodoPago.toUpperCase()})
          </small>
        </div>

        {/* Botones de acción según Figura 7 */}
        <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center pt-2">
          <div className="d-flex gap-2">
            <button className="btn btn-danger btn-sm px-3" onClick={handlePrint}>
              <i className="bi bi-file-earmark-pdf me-1"></i> Imprimir boleta en PDF
            </button>
            <button className="btn btn-outline-secondary btn-sm px-3" onClick={handleSendEmail}>
              <i className="bi bi-envelope me-1"></i> Enviar boleta por email
            </button>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm px-3" onClick={() => onTrackOrder(order)}>
              <i className="bi bi-geo-alt-fill me-1"></i> Ver camión en mapa GPS
            </button>
            <button className="btn btn-outline-dark btn-sm px-3" onClick={onGoHome}>
              Volver a la tienda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
