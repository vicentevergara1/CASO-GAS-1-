/**
 * Máquina de estados del flujo de pedidos de gas (Distribuidora El Volcán)
 * Flujo: Recibido -> Asignado a Repartidor -> En Camino -> Entregado
 */

export const ORDER_STATUSES = {
  RECIBIDO: 'recibido',
  ASIGNADO: 'asignado',
  EN_CAMINO: 'en_camino',
  ENTREGADO: 'entregado',
  CANCELADO: 'cancelado',
};

export function createOrder(clienteData, items, totals) {
  const orderId = `VOL-${Math.floor(1000 + Math.random() * 9000)}`;
  return {
    id: orderId,
    fecha: new Date().toISOString(),
    cliente: { ...clienteData },
    items: [...items],
    totales: { ...totals },
    estado: ORDER_STATUSES.RECIBIDO,
    repartidor: null,
    camion: null,
    etaMinutos: 35,
    historial: [
      { estado: ORDER_STATUSES.RECIBIDO, timestamp: new Date().toISOString(), nota: 'Pedido recibido en central' }
    ]
  };
}

export function transitionOrderStatus(order, nuevoEstado, metadata = {}) {
  if (!order || !order.estado) {
    return { success: false, error: 'Pedido inválido', order };
  }

  // Reglas de transición de la máquina de estados
  const transicionesValidas = {
    [ORDER_STATUSES.RECIBIDO]: [ORDER_STATUSES.ASIGNADO, ORDER_STATUSES.CANCELADO],
    [ORDER_STATUSES.ASIGNADO]: [ORDER_STATUSES.EN_CAMINO, ORDER_STATUSES.CANCELADO],
    [ORDER_STATUSES.EN_CAMINO]: [ORDER_STATUSES.ENTREGADO, ORDER_STATUSES.CANCELADO],
    [ORDER_STATUSES.ENTREGADO]: [], // Estado final
    [ORDER_STATUSES.CANCELADO]: [], // Estado final
  };

  const permitidos = transicionesValidas[order.estado] || [];
  if (!permitidos.includes(nuevoEstado)) {
    return {
      success: false,
      error: `Transición inválida desde "${order.estado}" hacia "${nuevoEstado}"`,
      order
    };
  }

  // Actualizar estado y metadatos
  const updatedOrder = {
    ...order,
    estado: nuevoEstado,
    repartidor: metadata.repartidor || order.repartidor,
    camion: metadata.camion || order.camion,
    etaMinutos: metadata.etaMinutos !== undefined ? metadata.etaMinutos : order.etaMinutos,
    historial: [
      ...order.historial,
      {
        estado: nuevoEstado,
        timestamp: new Date().toISOString(),
        nota: metadata.nota || `Estado actualizado a ${nuevoEstado}`,
      }
    ]
  };

  return { success: true, order: updatedOrder };
}
