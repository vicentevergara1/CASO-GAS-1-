/**
 * Utilidades de formato monetario para moneda chilena (CLP)
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0';
  }
  // Formato chileno: $16.000 sin decimales
  const parts = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `$${parts}`;
}

export default formatCurrency;
