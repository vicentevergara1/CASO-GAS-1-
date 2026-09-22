/**
 * Lógica pura del carrito de compras para Distribuidora El Volcán.
 * Diseñado con funciones puras para facilitar pruebas unitarias con Jasmine/Karma.
 */

export const CUPONES_VALIDOS = {
  VOLCAN10: { tipo: 'porcentaje', valor: 10, descripcion: '10% de descuento de lanzamiento' },
  CHILLAN2024: { tipo: 'despacho_gratis', valor: 0, descripcion: 'Despacho gratuito en Chillán' },
  DUOC15: { tipo: 'porcentaje', valor: 15, descripcion: '15% de descuento especial comunidad Duoc' }
};

export const COSTO_DESPACHO_BASE = 2500;
export const MONTO_DESPACHO_GRATIS = 20000;

export function calculateSubtotal(items = []) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((acc, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    const qty = typeof item.quantity === 'number' ? item.quantity : 0;
    return acc + (price * qty);
  }, 0);
}

export function applyCoupon(code = '', subtotal = 0) {
  if (!code || typeof code !== 'string') {
    return { valid: false, discount: 0, freeShipping: false, message: 'Cupón vacío' };
  }

  const cleanCode = code.trim().toUpperCase();
  const cupon = CUPONES_VALIDOS[cleanCode];

  if (!cupon) {
    return { valid: false, discount: 0, freeShipping: false, message: 'Cupón no válido o expirado' };
  }

  if (cupon.tipo === 'porcentaje') {
    const discount = Math.round((subtotal * cupon.valor) / 100);
    return { valid: true, discount, freeShipping: false, message: `${cupon.valor}% de descuento aplicado` };
  }

  if (cupon.tipo === 'despacho_gratis') {
    return { valid: true, discount: 0, freeShipping: true, message: 'Despacho gratis activado' };
  }

  return { valid: false, discount: 0, freeShipping: false, message: 'Tipo de cupón desconocido' };
}

export function calculateShipping(subtotal = 0, freeShipping = false) {
  if (subtotal <= 0) return 0;
  if (freeShipping || subtotal >= MONTO_DESPACHO_GRATIS) {
    return 0;
  }
  return COSTO_DESPACHO_BASE;
}

export function calculateTotal(subtotal = 0, discount = 0, shipping = 0) {
  const total = subtotal - discount + shipping;
  return Math.max(0, total);
}

export function updateItemQuantity(items = [], productId, delta) {
  if (!Array.isArray(items) || !productId) return items;

  return items.reduce((acc, item) => {
    if (item.id === productId) {
      const newQty = (item.quantity || 0) + delta;
      if (newQty > 0) {
        acc.push({ ...item, quantity: newQty });
      }
      // Si newQty <= 0, se excluye (se elimina)
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}

export function addItemToCart(items = [], product, quantity = 1) {
  if (!Array.isArray(items) || !product || !product.id) return items;

  const existingIndex = items.findIndex((item) => item.id === product.id);
  if (existingIndex >= 0) {
    return items.map((item, index) => {
      if (index === existingIndex) {
        return { ...item, quantity: (item.quantity || 0) + quantity };
      }
      return item;
    });
  }

  return [...items, { ...product, quantity: Math.max(1, quantity) }];
}

export function removeItemFromCart(items = [], productId) {
  if (!Array.isArray(items) || !productId) return items;
  return items.filter((item) => item.id !== productId);
}

export function isCartEmpty(items = []) {
  return !Array.isArray(items) || items.length === 0;
}

export function clearCart() {
  return [];
}
