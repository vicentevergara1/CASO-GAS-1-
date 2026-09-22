import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { formatCurrency } from '../utils/currency';
import { ORDER_STATUSES, transitionOrderStatus } from '../utils/orderWorkflow';

export default function OrderTracking({ currentOrder, onUpdateOrder }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Si no hay pedido activo, proveemos un pedido de demostración
  const [order, setOrder] = useState(
    currentOrder || {
      id: 'VOL-8492',
      fecha: new Date().toISOString(),
      cliente: {
        nombre: 'Catalina Fuentes Morales',
        rut: '17.654.321-K',
        telefono: '+56 9 8765 4321',
        direccion: 'Calle Arauco 450, Chillán',
        comuna: 'Chillán',
        metodoPago: 'efectivo',
      },
      items: [
        { id: 'cilindro-15kg', name: 'Cilindro Gas 15 Kg', price: 16000, quantity: 1, image: '/assets/images/15kg.png' },
        { id: 'regulador-estandar', name: 'Regulador Estándar 28 mbar', price: 8990, quantity: 1, image: '/assets/images/regulador-estandar.png' }
      ],
      totales: { subtotal: 24990, descuento: 0, despacho: 0, total: 24990 },
      estado: ORDER_STATUSES.EN_CAMINO,
      repartidor: 'Juan Pérez (Camión N° 1 - Chillán Urbano)',
      camion: 'Isuzu NPR Patente GH-5544',
      etaMinutos: 18,
      historial: [
        { estado: ORDER_STATUSES.RECIBIDO, timestamp: '10:15', nota: 'Pedido recibido en central' },
        { estado: ORDER_STATUSES.ASIGNADO, timestamp: '10:22', nota: 'Asignado a Juan Pérez en bodega central Chillán' },
        { estado: ORDER_STATUSES.EN_CAMINO, timestamp: '10:35', nota: 'Camión en tránsito hacia domicilio por Av. O’Higgins' },
      ]
    }
  );

  // Sincronizar si cambia desde props
  useEffect(() => {
    if (currentOrder) {
      setOrder(currentOrder);
    }
  }, [currentOrder]);

  // Inicializar mapa de Leaflet centrado en Chillán
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([-36.6067, -72.1033], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | Gas El Volcán Chillán',
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Limpiar marcadores anteriores
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    // Coordenadas en Chillán
    const coordPlanta = [-36.6080, -72.1090]; // Planta El Volcán
    const coordCamion = order.estado === ORDER_STATUSES.ENTREGADO ? [-36.6025, -72.0970] : [-36.6050, -72.1020];
    const coordCliente = [-36.6025, -72.0970]; // Dirección Cliente

    // Marcador Planta Central
    const markerPlanta = L.marker(coordPlanta).addTo(map).bindPopup('<b>Planta Central El Volcán</b><br>Av. Brasil 340, Chillán');
    markersRef.current.push(markerPlanta);

    // Marcador Camión Repartidor
    const truckIcon = L.divIcon({
      className: 'custom-truck-icon',
      html: '<div style="background-color: #22a3af; color: white; border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white;"><i class="bi bi-truck fs-6"></i></div>',
      iconSize: [34, 34],
    });

    const markerCamion = L.marker(coordCamion, { icon: truckIcon }).addTo(map)
      .bindPopup(`<b>Repartidor: ${order.repartidor || 'Camión El Volcán'}</b><br>Estado: ${order.estado}<br>ETA: ${order.etaMinutos} min`)
      .openPopup();
    markersRef.current.push(markerCamion);

    // Marcador Domicilio Cliente
    const homeIcon = L.divIcon({
      className: 'custom-home-icon',
      html: '<div style="background-color: #f97316; color: white; border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white;"><i class="bi bi-geo-alt-fill fs-6"></i></div>',
      iconSize: [34, 34],
    });

    const markerCliente = L.marker(coordCliente, { icon: homeIcon }).addTo(map)
      .bindPopup(`<b>Punto de Entrega:</b><br>${order.cliente.direccion}, ${order.cliente.comuna}`);
    markersRef.current.push(markerCliente);

    // Línea de ruta
    const polyline = L.polyline([coordPlanta, coordCamion, coordCliente], {
      color: '#22a3af',
      weight: 4,
      dashArray: '8, 8',
      opacity: 0.8,
    }).addTo(map);
    markersRef.current.push(polyline);

    // Ajustar vista
    map.fitBounds(L.latLngBounds([coordPlanta, coordCamion, coordCliente]), { padding: [50, 50] });

    return () => {
      // no cleanup map on simple re-renders
    };
  }, [order.estado]);

  // Avanzar estado para simular ciclo de vida en vivo
  const handleAdvanceStatus = () => {
    let nextStatus = ORDER_STATUSES.ASIGNADO;
    let metadata = {
      repartidor: 'Juan Pérez (Camión N° 1 - Chillán Urbano)',
      camion: 'Isuzu NPR Patente GH-5544',
      etaMinutos: 25,
      nota: 'Asignado a chofer para despacho',
    };

    if (order.estado === ORDER_STATUSES.RECIBIDO) {
      nextStatus = ORDER_STATUSES.ASIGNADO;
    } else if (order.estado === ORDER_STATUSES.ASIGNADO) {
      nextStatus = ORDER_STATUSES.EN_CAMINO;
      metadata = { etaMinutos: 12, nota: 'Camión en ruta hacia Chillán Oriente' };
    } else if (order.estado === ORDER_STATUSES.EN_CAMINO) {
      nextStatus = ORDER_STATUSES.ENTREGADO;
      metadata = { etaMinutos: 0, nota: 'Pedido entregado en puerta e inspeccionado' };
    } else {
      // Reiniciar demo
      nextStatus = ORDER_STATUSES.RECIBIDO;
      metadata = { etaMinutos: 35, nota: 'Pedido reiniciado para nueva demostración' };
    }

    const res = transitionOrderStatus(order, nextStatus, metadata);
    if (res.success) {
      setOrder(res.order);
      if (onUpdateOrder) onUpdateOrder(res.order);
    }
  };

  // Helper para clases de timeline
  const getTimelineClass = (targetStatus) => {
    const sequence = [ORDER_STATUSES.RECIBIDO, ORDER_STATUSES.ASIGNADO, ORDER_STATUSES.EN_CAMINO, ORDER_STATUSES.ENTREGADO];
    const currentIndex = sequence.indexOf(order.estado);
    const targetIndex = sequence.indexOf(targetStatus);

    if (currentIndex > targetIndex) return 'bg-success text-white';
    if (currentIndex === targetIndex) return 'bg-primary text-white border border-4 border-primary-subtle';
    return 'bg-light text-muted border';
  };

  return (
    <section id="seguimiento" className="py-5 bg-white border-bottom">
      <div className="container">
        {/* Encabezado */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <div className="d-inline-flex align-items-center gap-2 mb-1">
              <span className="badge bg-success">
                <i className="bi bi-broadcast me-1"></i> GPS en Tiempo Real
              </span>
              <span className="small text-muted">ID de Seguimiento: <strong>{order.id}</strong></span>
            </div>
            <h2 className="h3 fw-bold text-dark mb-0">Seguimiento de Despacho en Chillán</h2>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary fw-semibold"
              onClick={handleAdvanceStatus}
              title="Avanza el estado del pedido para evaluar la máquina de estados"
            >
              <i className="bi bi-play-circle-fill me-1"></i> Simular Avance Repartidor
            </button>
          </div>
        </div>

        {/* Timeline Visual de 4 Pasos (Bootstrap Responsive) */}
        <div className="card bg-light border-0 shadow-sm p-4 mb-4">
          <div className="row g-3 text-center align-items-center position-relative">
            {/* Paso 1: Recibido */}
            <div className="col-6 col-md-3">
              <div
                className={`rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-2 ${getTimelineClass(
                  ORDER_STATUSES.RECIBIDO
                )}`}
                style={{ width: '48px', height: '48px' }}
              >
                <i className="bi bi-file-earmark-check fs-5"></i>
              </div>
              <h6 className="fw-bold small mb-0 text-dark">1. Pedido Recibido</h6>
              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Registrado en Central</span>
            </div>

            {/* Paso 2: Asignado */}
            <div className="col-6 col-md-3">
              <div
                className={`rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-2 ${getTimelineClass(
                  ORDER_STATUSES.ASIGNADO
                )}`}
                style={{ width: '48px', height: '48px' }}
              >
                <i className="bi bi-person-check fs-5"></i>
              </div>
              <h6 className="fw-bold small mb-0 text-dark">2. Asignado</h6>
              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Camión en Bodega</span>
            </div>

            {/* Paso 3: En Camino */}
            <div className="col-6 col-md-3">
              <div
                className={`rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-2 ${getTimelineClass(
                  ORDER_STATUSES.EN_CAMINO
                )}`}
                style={{ width: '48px', height: '48px' }}
              >
                <i className="bi bi-truck fs-5"></i>
              </div>
              <h6 className="fw-bold small mb-0 text-dark">3. En Camino</h6>
              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Ruta Chillán Urbano</span>
            </div>

            {/* Paso 4: Entregado */}
            <div className="col-6 col-md-3">
              <div
                className={`rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-2 ${getTimelineClass(
                  ORDER_STATUSES.ENTREGADO
                )}`}
                style={{ width: '48px', height: '48px' }}
              >
                <i className="bi bi-house-check fs-5"></i>
              </div>
              <h6 className="fw-bold small mb-0 text-dark">4. Entregado</h6>
              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Instalado y Conforme</span>
            </div>
          </div>
        </div>

        {/* Contenido: Mapa Leaflet + Datos del Despacho */}
        <div className="row g-4">
          {/* Mapa Leaflet */}
          <div className="col-12 col-lg-8">
            <div className="card border shadow-sm overflow-hidden h-100">
              <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <span className="fw-bold small text-dark">
                  <i className="bi bi-map-fill text-primary me-2"></i> Mapa Interactivo OpenStreetMap / Leaflet (Chillán)
                </span>
                <span className="badge bg-light text-dark border">
                  ETA: <strong>{order.etaMinutos > 0 ? `${order.etaMinutos} minutos` : '¡Entregado!'}</strong>
                </span>
              </div>
              <div className="card-body p-0">
                <div ref={mapContainerRef} style={{ height: '420px', width: '100%' }}></div>
              </div>
              <div className="card-footer bg-light small py-2 d-flex justify-content-between text-muted">
                <span>📍 Bodega Central: Av. Brasil 340, Chillán</span>
                <span>🚚 Móvil: {order.camion || 'Isuzu NPR Patente GH-5544'}</span>
              </div>
            </div>
          </div>

          {/* Detalles del Pedido y Repartidor */}
          <div className="col-12 col-lg-4">
            <div className="card border shadow-sm p-3 h-100 d-flex flex-column bg-light">
              <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">
                <i className="bi bi-info-circle-fill text-primary me-1"></i> Información del Despacho
              </h6>

              <div className="mb-3">
                <span className="text-muted small d-block">Destinatario:</span>
                <strong className="text-dark">{order.cliente.nombre}</strong>
                <div className="text-muted small">{order.cliente.direccion}, {order.cliente.comuna}</div>
                <div className="text-muted small">RUT: {order.cliente.rut} &bull; Tel: {order.cliente.telefono}</div>
              </div>

              <div className="mb-3 p-2 bg-white rounded border">
                <span className="text-muted small d-block">Repartidor Asignado:</span>
                <div className="d-flex align-items-center gap-2 mt-1">
                  <div className="bg-primary-subtle text-primary rounded-circle p-2">
                    <i className="bi bi-person-badge fs-5"></i>
                  </div>
                  <div>
                    <strong className="text-dark small d-block">{order.repartidor || 'En asignación de ruta'}</strong>
                    <span className="text-muted small" style={{ fontSize: '0.72rem' }}>
                      {order.camion || 'Turno mañana Chillán'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <span className="text-muted small d-block mb-1">Productos a Entregar:</span>
                <ul className="list-group list-group-flush bg-transparent small">
                  {order.items.map((it) => (
                    <li key={it.id} className="list-group-item bg-transparent px-0 py-1 d-flex justify-content-between border-light-subtle">
                      <span>{it.quantity}x {it.name}</span>
                      <span className="fw-semibold">{formatCurrency(it.price * it.quantity)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-top pt-2 mt-auto">
                <div className="d-flex justify-content-between align-items-baseline">
                  <span className="fw-bold text-dark">Total a Cobrar:</span>
                  <span className="h5 fw-bold text-primary mb-0">
                    {formatCurrency(order.totales.total)}
                  </span>
                </div>
                <div className="small text-muted mt-1">
                  Método: <span className="text-capitalize fw-medium">{order.cliente.metodoPago}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
