import { filterProductsByCategory, searchProducts } from '../../src/data/products.js';
import { formatCurrency } from '../../src/utils/currency.js';

describe('Módulo de Catálogo y Formateo (Products & Currency)', () => {
  const mockCatalog = [
    { id: '1', name: 'Cilindro Gas 15 Kg', category: 'Cilindros', description: 'Gas licuado purificado' },
    { id: '2', name: 'Regulador Estándar', category: 'Reguladores', description: 'Presión constante 28 mbar' },
    { id: '3', name: 'Manguera Gas 1.5 m', category: 'Mangueras', description: 'Manguera flexible certificada SEC' },
    { id: '4', name: 'Detector de Fugas', category: 'Accesorios', description: 'Alarma sonora digital' },
  ];

  // Test 5: Filtrado por categorías
  it('Prueba 5: Debe filtrar el catálogo correctamente por categoría seleccionada o retornar todos si es "todos"', () => {
    const cilindros = filterProductsByCategory(mockCatalog, 'Cilindros');
    expect(cilindros.length).toBe(1);
    expect(cilindros[0].id).toBe('1');

    const reguladores = filterProductsByCategory(mockCatalog, 'Reguladores');
    expect(reguladores.length).toBe(1);
    expect(reguladores[0].name).toBe('Regulador Estándar');

    // Categoría 'todos' debe retornar todo el catálogo sin alterar
    const todos = filterProductsByCategory(mockCatalog, 'todos');
    expect(todos.length).toBe(4);
  });

  // Test 6: Búsqueda insensible a mayúsculas
  it('Prueba 6: Debe buscar productos de forma insensible a mayúsculas y minúsculas por nombre o descripción', () => {
    // Buscar en minúsculas coincidiendo con nombre
    const resultadosMin = searchProducts(mockCatalog, 'cilindro');
    expect(resultadosMin.length).toBe(1);
    expect(resultadosMin[0].name).toContain('Cilindro');

    // Buscar en mayúsculas coincidiendo con descripción
    const resultadosDesc = searchProducts(mockCatalog, 'SEC');
    expect(resultadosDesc.length).toBe(1);
    expect(resultadosDesc[0].id).toBe('3');

    // Búsqueda vacía retorna todos
    expect(searchProducts(mockCatalog, '').length).toBe(4);
  });

  // Test 7: Formateo de moneda CLP chilena
  it('Prueba 7: Debe formatear correctamente números a formato moneda chilena CLP ($XX.XXX)', () => {
    expect(formatCurrency(16000)).toBe('$16.000');
    expect(formatCurrency(6500)).toBe('$6.500');
    expect(formatCurrency(990)).toBe('$990');
    expect(formatCurrency(45000)).toBe('$45.000');
    expect(formatCurrency(0)).toBe('$0');
    expect(formatCurrency(null)).toBe('$0');
  });
});
