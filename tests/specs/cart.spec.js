import {
  calculateSubtotal,
  applyCoupon,
  calculateShipping,
  calculateTotal,
  updateItemQuantity,
  addItemToCart,
  removeItemFromCart,
  isCartEmpty,
} from '../../src/utils/cartLogic.js';

describe('Módulo de Carrito de Compras (CartLogic)', () => {
  // Mock de productos para las pruebas
  const mockProducts = [
    { id: 'cilindro-15kg', name: 'Cilindro Gas 15 Kg', price: 16000, quantity: 2 },
    { id: 'regulador-estandar', name: 'Regulador Estándar', price: 8990, quantity: 1 },
  ];

  // Test 1: Cálculo de subtotal
  it('Prueba 1: Debe calcular correctamente el subtotal acumulado para múltiples productos y cantidades', () => {
    // (16000 * 2) + (8990 * 1) = 32000 + 8990 = 40990
    const subtotal = calculateSubtotal(mockProducts);
    expect(subtotal).toBe(40990);

    // Caso borde: array vacío
    expect(calculateSubtotal([])).toBe(0);
  });

  // Test 2: Aplicación de cupones de descuento
  it('Prueba 2: Debe aplicar 10% de descuento con cupón válido "VOLCAN10" y rechazar cupones inválidos', () => {
    const subtotal = 30000;
    const resultadoValido = applyCoupon('VOLCAN10', subtotal);

    expect(resultadoValido.valid).toBe(true);
    expect(resultadoValido.discount).toBe(3000); // 10% de 30000
    expect(resultadoValido.message).toContain('10%');

    // Cupón inexistente
    const resultadoInvalido = applyCoupon('INVENTADO99', subtotal);
    expect(resultadoInvalido.valid).toBe(false);
    expect(resultadoInvalido.discount).toBe(0);
  });

  // Test 3: Modificación y eliminación de items
  it('Prueba 3: Debe incrementar, decrementar y eliminar un producto del carrito cuando su cantidad llega a cero', () => {
    let items = [{ id: 'cilindro-11kg', name: 'Cilindro 11kg', price: 12000, quantity: 2 }];

    // Incrementar en 1
    items = updateItemQuantity(items, 'cilindro-11kg', 1);
    expect(items[0].quantity).toBe(3);

    // Decrementar en 2
    items = updateItemQuantity(items, 'cilindro-11kg', -2);
    expect(items[0].quantity).toBe(1);

    // Decrementar en 1 (llega a 0 -> debe removerse automáticamente)
    items = updateItemQuantity(items, 'cilindro-11kg', -1);
    expect(items.length).toBe(0);
  });

  // Test 4: Validación de carrito vacío y prevención de checkout
  it('Prueba 4: Debe detectar correctamente un carrito vacío y rechazar pedidos sin productos', () => {
    expect(isCartEmpty([])).toBe(true);
    expect(isCartEmpty(null)).toBe(true);
    expect(isCartEmpty(undefined)).toBe(true);

    const itemsConProducto = [{ id: 'abrazadera', price: 990, quantity: 1 }];
    expect(isCartEmpty(itemsConProducto)).toBe(false);
  });
});
