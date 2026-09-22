import React from 'react';

export default function JasmineRunnerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', zIndex: 1080 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg" style={{ height: '90vh' }}>
          {/* Header */}
          <div className="modal-header bg-white border-bottom py-3">
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-success p-2">
                <i className="bi bi-patch-check-fill fs-6"></i>
              </span>
              <div>
                <h5 className="modal-title fw-bold text-dark fs-5 mb-0">
                  Suite de Pruebas Unitarias Jasmine & Karma (10/10 Pruebas)
                </h5>
                <span className="text-muted small">
                  Evaluación Parcial N° 2 &bull; Indicadores IE2.2.1, IE2.3.1, IE2.2.2, IE2.3.2
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <a
                href="/test-runner.html"
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-primary"
              >
                <i className="bi bi-box-arrow-up-right me-1"></i> Abrir Runner Completo
              </a>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Cerrar"
              ></button>
            </div>
          </div>

          {/* Body con Iframe al runner interactivo */}
          <div className="modal-body p-0 bg-light" style={{ overflow: 'hidden' }}>
            <iframe
              src="/test-runner.html"
              title="Jasmine Test Runner"
              style={{ width: '100%', height: '100%', border: 'none' }}
            ></iframe>
          </div>

          {/* Footer */}
          <div className="modal-footer bg-white border-top py-2 px-4 d-flex justify-content-between">
            <div className="small text-muted">
              <i className="bi bi-terminal me-1"></i>
              También ejecutable por terminal mediante: <code>npm test</code> (Jasmine Node) o <code>npm run test:karma</code> (Karma)
            </div>
            <button type="button" className="btn btn-sm btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
