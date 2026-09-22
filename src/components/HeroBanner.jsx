import React from 'react';

export default function HeroBanner({ onSelectCategory, onQuickAddCylinder }) {
  return (
    <section className="bg-white border-bottom py-4 py-lg-5 position-relative overflow-hidden">
      <div className="container">
        <div className="row align-items-center g-4">
          {/* Columna Texto */}
          <div className="col-12 col-lg-7">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-light border border-info mb-3">
              <span className="badge rounded-pill bg-info text-dark">
                <i className="bi bi-clock-history me-1"></i> Despacho Express
              </span>
              <span className="small text-muted fw-medium">
                En tu hogar en menos de 30 min en Chillán y Chillán Viejo
              </span>
            </div>

            <h1 className="display-5 fw-bold text-dark mb-3 lh-sm">
              Gas Licuado seguro y rápido para tu hogar en{' '}
              <span className="text-primary">Chillán</span>
            </h1>

            <p className="lead text-secondary mb-4 fs-6">
              Distribuidora oficial <strong>El Volcán</strong>. Más de 25 años abasteciendo a familias
              y comercios con cilindros certificados por la SEC, reguladores y servicio técnico garantizado.
            </p>

            {/* Selector rápido de cilindros */}
            <div className="card border shadow-sm p-3 mb-4 bg-light">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fw-bold small text-dark">
                  <i className="bi bi-lightning-charge-fill text-warning me-1"></i> Pedido Rápido de Gas
                </span>
                <span className="small text-muted">Selecciona tu formato:</span>
              </div>
              <div className="row g-2">
                <div className="col-6 col-sm-3">
                  <button
                    type="button"
                    className="btn btn-outline-dark w-100 p-2 text-center h-100 bg-white"
                    onClick={() => onQuickAddCylinder('cilindro-5kg')}
                  >
                    <div className="fw-bold small">5 Kg</div>
                    <div className="text-primary small fw-semibold">$6.500</div>
                    <span className="badge bg-secondary" style={{ fontSize: '0.65rem' }}>Estufa / Camping</span>
                  </button>
                </div>
                <div className="col-6 col-sm-3">
                  <button
                    type="button"
                    className="btn btn-outline-dark w-100 p-2 text-center h-100 bg-white"
                    onClick={() => onQuickAddCylinder('cilindro-11kg')}
                  >
                    <div className="fw-bold small">11 Kg</div>
                    <div className="text-primary small fw-semibold">$12.000</div>
                    <span className="badge bg-secondary" style={{ fontSize: '0.65rem' }}>Hogar / Cocina</span>
                  </button>
                </div>
                <div className="col-6 col-sm-3">
                  <button
                    type="button"
                    className="btn btn-primary w-100 p-2 text-center h-100 shadow-sm"
                    onClick={() => onQuickAddCylinder('cilindro-15kg')}
                  >
                    <div className="fw-bold small">15 Kg</div>
                    <div className="text-white small fw-bold">$16.000</div>
                    <span className="badge bg-warning text-dark" style={{ fontSize: '0.65rem' }}>Más Vendido</span>
                  </button>
                </div>
                <div className="col-6 col-sm-3">
                  <button
                    type="button"
                    className="btn btn-outline-dark w-100 p-2 text-center h-100 bg-white"
                    onClick={() => onQuickAddCylinder('cilindro-45kg')}
                  >
                    <div className="fw-bold small">45 Kg</div>
                    <div className="text-primary small fw-semibold">$45.000</div>
                    <span className="badge bg-secondary" style={{ fontSize: '0.65rem' }}>Industrial</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Acciones principales */}
            <div className="d-flex flex-wrap align-items-center gap-3">
              <a href="#catalogo" className="btn btn-primary px-4 py-2 fw-semibold shadow-sm">
                <i className="bi bi-cart-plus me-2"></i> Ver Catálogo Completo
              </a>
              <a
                href="tel:+56422234567"
                className="btn btn-outline-secondary px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-telephone-fill text-success"></i> Central Chillán: +56 42 223 4567
              </a>
            </div>
          </div>

          {/* Columna Imagen / Sello */}
          <div className="col-12 col-lg-5 text-center">
            <div className="position-relative d-inline-block">
              <img
                src="/assets/images/15kg.png"
                alt="Cilindro Gas El Volcán 15kg"
                className="img-fluid"
                style={{ maxHeight: '340px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))' }}
              />
              <div
                className="position-absolute bottom-0 start-0 bg-white p-3 rounded-3 shadow border text-start"
                style={{ maxWidth: '240px' }}
              >
                <div className="d-flex align-items-center gap-2 mb-1">
                  <i className="bi bi-shield-fill-check text-success fs-4"></i>
                  <div>
                    <h6 className="mb-0 fw-bold small text-dark">Certificación SEC</h6>
                    <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Norma NCh 1079</span>
                  </div>
                </div>
                <p className="small text-secondary mb-0" style={{ fontSize: '0.75rem' }}>
                  Prueba de estanqueidad incluida en cada recambio domiciliario.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
