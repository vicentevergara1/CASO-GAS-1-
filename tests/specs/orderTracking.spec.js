import {
  ORDER_STATUSES,
  createOrder,
  transitionOrderStatus
} from '../../src/utils/orderWorkflow.js';

describe('Módulo de Seguimiento y Máquina de Estados (OrderTracking)', () => {
  // Test 10: Máquina de estados con Mock de pedido y repartidor
  it('Prueba 10: Debe validar el ciclo de vida del pedido con mocks (Recibido -> Asignado -> En Camino -> Entregado) y rechazar saltos ilegales', () => {
    // 1. Mock inicial de pedido
    const mockCliente = {
      nombre: 'Catalina Fuentes',
      rut: '17.654.321-K',
      direccion: 'Calle Arauco 450, Chillán',
    };
    const mockItems = [{ id: 'cilindro-15kg', name: 'Gas 15kg', price: 16000, quantity: 1 }];
    const mockTotales = { subtotal: 16000, descuento: 0, despacho: 0, total: 16000 };

    let pedido = createOrder(mockCliente, mockItems, mockTotales);
    expect(pedido.estado).toBe(ORDER_STATUSES.RECIBIDO);
    expect(pedido.repartidor).toBeNull();

    // 2. Intento de salto ilegal: De "recibido" directo a "entregado" sin pasar por asignado/en camino
    const saltoIlegal = transitionOrderStatus(pedido, ORDER_STATUSES.ENTREGADO);
    expect(saltoIlegal.success).toBe(false);
    expect(saltoIlegal.error).toContain('Transición inválida');

    // 3. Paso legal 1: Asignar a Repartidor
    const pasoAsignar = transitionOrderStatus(pedido, ORDER_STATUSES.ASIGNADO, {
      repartidor: 'Juan Pérez (Camión 1 - Chillán Centro)',
      camion: 'Camión Isuzu Patente GH-5544',
      nota: 'Pedido asignado por Operadora de Chillán',
    });
    expect(pasoAsignar.success).toBe(true);
    pedido = pasoAsignar.order;
    expect(pedido.estado).toBe(ORDER_STATUSES.ASIGNADO);
    expect(pedido.repartidor).toContain('Juan Pérez');

    // 4. Paso legal 2: En Camino
    const pasoEnCamino = transitionOrderStatus(pedido, ORDER_STATUSES.EN_CAMINO, {
      etaMinutos: 15,
      nota: 'Camión en tránsito por Av. Collín',
    });
    expect(pasoEnCamino.success).toBe(true);
    pedido = pasoEnCamino.order;
    expect(pedido.estado).toBe(ORDER_STATUSES.EN_CAMINO);
    expect(pedido.etaMinutos).toBe(15);

    // 5. Paso legal 3: Entregado
    const pasoEntregado = transitionOrderStatus(pedido, ORDER_STATUSES.ENTREGADO, {
      nota: 'Cilindro entregado e instalado conforme',
    });
    expect(pasoEntregado.success).toBe(true);
    pedido = pasoEntregado.order;
    expect(pedido.estado).toBe(ORDER_STATUSES.ENTREGADO);
    expect(pedido.historial.length).toBe(4);
  });
});
