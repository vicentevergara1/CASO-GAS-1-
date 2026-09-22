import React from 'react';
import { formatCLP } from '../utils/formatters';

/**
 * Vista de Categorías y Catálogo Segmentado - Distribuidora Gas El Volcán Chillán
 */
export default function CategoriesView({
  categories = [],
  products = [],
  selectedCategory = 'todos',
  onSelectCategory,
  onAddToCart,
  onViewProductDetail,
}) {
  const currentCategoryObj = categories.find((c) => c.id === selectedCategory) || categories[0];
  const filteredProducts =
    selectedCategory === 'todos'
      ? products
      : products.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="container py-4">
      {/* Encabezado */}
      <div className="mb-4">
        <h1 className="h3 fw-bold text-dark mb-1">
          <i className="bi bi-grid-3x3-gap-fill text-primary me-2"></i>
          Categorías de Productos
        </h1>
        <p className="text-secondary small mb-0">
          Explora nuestra selección especializada en gas licuado, grifería, mangueras y accesorios de seguridad en Chillán.
        </p>
      </div>

      {/* Grilla de Categorías estilo Figura 4 (Tarjetas 400x200) */}
      <div className="row g-3 mb-5">
        {categories
          .filter((c) => c.id !== 'todos')
          .map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
            const count = products.filter((p) => p.category.toLowerCase() === cat.id.toLowerCase()).length;

            return (
              <div key={cat.id} className="col-12 col-sm-6 col-lg-3">
                <div
                  className={`card h-100 border text-center p-3 cursor-pointer transition-all shadow-sm ${
                    isSelected ? 'border-primary bg-primary-subtle' : 'border-light-subtle bg-white hover-shadow'
                  }`}
                  style={{ minHeight: '160px', cursor: 'pointer' }}
                  onClick={() => onSelectCategory(cat.id)}
                  role="button"
                >
                  <div className="d-flex flex-column align-items-center justify-content-center h-100">
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center mb-3 ${
                        isSelected ? 'bg-primary text-white' : 'bg-light text-primary'
                      }`}
                      style={{ width: '56px', height: '56px' }}
                    >
                      <i className={`bi ${cat.icon || 'bi-tag'} fs-4`}></i>
                    </div>
                    <h5 className="card-title fw-bold fs-6 mb-1 text-dark">{cat.label}</h5>
                    <span className="badge bg-secondary-subtle text-secondary small">
                      {count} {count === 1 ? 'producto' : 'productos'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Sección con título de Categoría activa y Grilla de Productos */}
      <div className="border-top pt-4">
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <div>
            <h2 className="h4 fw-bold text-dark mb-0">
              {currentCategoryObj ? currentCategoryObj.label : 'Catálogo'}
            </h2>
            <span className="text-muted small">
              Mostrando {filteredProducts.length} productos disponibles
            </span>
          </div>

          {selectedCategory !== 'todos' && (
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => onSelectCategory('todos')}
            >
              <i className="bi bi-x-circle me-1"></i> Ver todas las categorías
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="alert alert-info py-4 text-center">
            <i className="bi bi-info-circle fs-3 d-block mb-2"></i>
            No hay productos registrados en esta categoría por el momento.
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col">
                <div className="card h-100 border shadow-sm product-card">
                  {/* Barra de categoría y badge */}
                  <div className="px-3 pt-3 pb-1 d-flex justify-content-between align-items-center bg-white border-bottom border-light">
                    <span className="badge bg-light text-secondary border small">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle small fw-semibold" style={{ fontSize: '0.72rem' }}>
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Contenedor de Imagen Limpia sin texto encima */}
                  <div className="p-3 bg-light text-center d-flex align-items-center justify-content-center" style={{ height: '170px' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid object-fit-contain"
                      style={{ maxHeight: '150px', maxWidth: '100%' }}
                      onError={(e) => {
                        e.target.src = '/assets/images/cilindro.png';
                      }}
                    />
                  </div>

                  <div className="card-body d-flex flex-column p-3">
                    <h5 className="card-title fw-bold text-dark fs-6 mb-2">{product.name}</h5>
                    <p className="card-text text-secondary small flex-grow-1 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="d-flex align-items-baseline justify-content-between mt-3 pt-2 border-top">
                      <div>
                        <span className="fs-5 fw-bold text-dark">{formatCLP(product.price)}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <small className="text-muted text-decoration-line-through d-block">
                            {formatCLP(product.originalPrice)}
                          </small>
                        )}
                      </div>
                      <span className="badge bg-success-subtle text-success small">
                        <i className="bi bi-check2-circle me-1"></i>Stock: {product.stock}
                      </span>
                    </div>
                  </div>

                  <div className="card-footer bg-white border-0 pt-0 pb-3 px-3 d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary w-50"
                      onClick={() => onViewProductDetail(product)}
                    >
                      <i className="bi bi-eye me-1"></i>Detalle
                    </button>
                    <button
                      className="btn btn-sm btn-primary w-50"
                      onClick={() => onAddToCart(product)}
                      disabled={product.stock <= 0}
                    >
                      <i className="bi bi-cart-plus me-1"></i>Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
