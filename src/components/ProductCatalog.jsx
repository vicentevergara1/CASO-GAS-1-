import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/products';

export default function ProductCatalog({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onResetSearch,
  onAddToCart,
  onQuickView,
}) {
  const [sortBy, setSortBy] = useState('destacados');

  // Ordenar productos
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'precio-menor') return a.price - b.price;
    if (sortBy === 'precio-mayor') return b.price - a.price;
    if (sortBy === 'nombre') return a.name.localeCompare(b.name);
    // Destacados primero por defecto
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <section id="catalogo" className="py-5 bg-light border-bottom">
      <div className="container">
        {/* Encabezado de Sección */}
        <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 gap-3">
          <div>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle fw-semibold mb-1">
              Catálogo Oficial 2024
            </span>
            <h2 className="h3 fw-bold text-dark mb-1">Cilindros, Reguladores y Accesorios</h2>
            <p className="text-muted small mb-0">
              Todos los productos cuentan con certificación SEC y garantía de estanqueidad.
            </p>
          </div>

          {/* Selector de ordenamiento */}
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="sortSelect" className="small text-muted text-nowrap mb-0">
              Ordenar por:
            </label>
            <select
              id="sortSelect"
              className="form-select form-select-sm"
              style={{ width: 'auto' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="destacados">Recomendados / Destacados</option>
              <option value="precio-menor">Precio: Menor a Mayor</option>
              <option value="precio-mayor">Precio: Mayor a Menor</option>
              <option value="nombre">Nombre: A - Z</option>
            </select>
          </div>
        </div>

        {/* Pestañas de Filtro de Categorías */}
        <div className="d-flex flex-nowrap overflow-auto pb-2 mb-4 gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`btn btn-sm text-nowrap d-flex align-items-center gap-2 px-3 py-2 rounded-pill ${
                  isSelected
                    ? 'btn-primary shadow-sm fw-semibold'
                    : 'btn-outline-secondary bg-white'
                }`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <i className={`bi ${cat.icon}`}></i>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Notificación de búsqueda activa */}
        {searchQuery && (
          <div className="alert alert-info py-2 d-flex justify-content-between align-items-center mb-4">
            <span className="small">
              Mostrando resultados para la búsqueda: <strong>"{searchQuery}"</strong> ({sortedProducts.length} productos)
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-info text-dark"
              onClick={onResetSearch}
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

        {/* Grilla de Productos Responsiva (Bootstrap: 1 col móvil, 2 col tablet, 3-4 col desktop) */}
        {sortedProducts.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {sortedProducts.map((product) => (
              <div className="col" key={product.id}>
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center p-5 border-dashed bg-white shadow-sm">
            <i className="bi bi-search fs-1 text-muted mb-3"></i>
            <h4 className="fw-bold text-dark">No se encontraron productos</h4>
            <p className="text-muted small mb-3">
              No hay coincidencias para "{searchQuery}" en la categoría seleccionada.
            </p>
            <div>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => {
                  onResetSearch();
                  onSelectCategory('todos');
                }}
              >
                Ver todos los productos
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
