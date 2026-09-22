import React from 'react';

export default function Footer({ onNavigate, onOpenJasmineTests }) {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 border-top border-secondary">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Columna 1: Marca & Misión */}
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src="/assets/images/logo.png"
                alt="Logo El Volcán"
                style={{ height: '48px', filter: 'brightness(1.2)' }}
              />
              <div>
                <h5 className="fw-bold mb-0 text-white">Gas El Volcán</h5>
                <span className="text-secondary small">Distribuidora Oficial Chillán</span>
              </div>
            </div>
            <p className="text-secondary small mb-3">
              Empresa líder en distribución segura y rápida de gas licuado en Chillán y Chillán Viejo.
              Comprometidos con el calor de los hogares de Ñuble desde 1998 con certificación SEC.
            </p>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-success-subtle text-success border border-success-subtle">
                <i className="bi bi-shield-check me-1"></i> Certificado SEC
              </span>
              <span className="badge bg-info-subtle text-info border border-info-subtle">
                <i className="bi bi-truck me-1"></i> Reparto &lt; 30 min
              </span>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-white mb-3">Navegación</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li>
                <button
                  type="button"
                  className="btn btn-link text-secondary text-decoration-none p-0 small hover-text-white"
                  onClick={() => onNavigate('catalogo')}
                >
                  Catálogo de Gas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-link text-secondary text-decoration-none p-0 small hover-text-white"
                  onClick={() => onNavigate('servicios')}
                >
                  Servicios Técnicos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-link text-secondary text-decoration-none p-0 small hover-text-white"
                  onClick={() => onNavigate('seguimiento')}
                >
                  Seguimiento GPS
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-link text-secondary text-decoration-none p-0 small hover-text-white"
                  onClick={() => onNavigate('nosotros')}
                >
                  Sobre El Volcán
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-link text-secondary text-decoration-none p-0 small hover-text-white"
                  onClick={() => onNavigate('faq')}
                >
                  Preguntas Frecuentes
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información Académica / Pruebas */}
          <div className="col-6 col-md-3">
            <h6 className="fw-bold text-white mb-3">Proyecto Académico</h6>
            <p className="text-secondary small mb-2" style={{ fontSize: '0.78rem' }}>
              <strong>DSY1104 - Desarrollo FullStack II</strong><br />
              Evaluación Parcial N° 2 (Forma C)<br />
              Frontend React + Jasmine & Karma Mocks
            </p>
            <button
              type="button"
              className="btn btn-sm btn-outline-success d-flex align-items-center gap-1 mt-2"
              onClick={onOpenJasmineTests}
            >
              <i className="bi bi-patch-check-fill"></i> Ver 10 Pruebas Unitarias
            </button>
          </div>

          {/* Columna 4: Contacto Chillán */}
          <div className="col-12 col-md-3">
            <h6 className="fw-bold text-white mb-3">Contacto Central</h6>
            <ul className="list-unstyled small text-secondary d-flex flex-column gap-2 mb-0">
              <li>
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                Av. Brasil 340, Chillán, Ñuble
              </li>
              <li>
                <i className="bi bi-telephone-fill text-success me-2"></i>
                +56 42 223 4567
              </li>
              <li>
                <i className="bi bi-whatsapp text-success me-2"></i>
                +56 9 8765 4321
              </li>
              <li>
                <i className="bi bi-clock-fill text-warning me-2"></i>
                Lun - Sáb: 08:30 - 20:00 hrs
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 small text-secondary">
          <div>
            &copy; {new Date().getFullYear()} Distribuidora de Gas El Volcán &bull; Chillán, Región de Ñuble, Chile. Todos los derechos reservados.
          </div>
          <div>
            Medios de pago: Efectivo &bull; Redcompra POS móvil &bull; Transferencia directa
          </div>
        </div>
      </div>
    </footer>
  );
}
