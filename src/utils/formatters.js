import { formatCurrency } from './currency';

export const formatCLP = formatCurrency;

export function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default {
  formatCLP,
  formatDate,
};
