import React from 'react';

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-5 bg-light border-bottom">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Columna Imagen / Sede Chillán */}
          <div className="col-12 col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white p-2">
              <img
                src="/assets/images/chillan.jpg"
                alt="Planta El Volcán en Chillán"
                className="img-fluid rounded-3"
                style={{ objectFit: 'cover', height: '260px', width: '100%' }}
                onError={(e) => {
                  e.target.src = '/assets/images/cilindro.png';
                }}
              />
              <div className="p-3 bg-light rounded-3 mt-2 text-start border">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary-subtle text-primary p-2 rounded-circle">
                    <i className="bi bi-award fs-4"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold text-dark">Distribuidora Fundada en 1998</h6>
                    <span className="small text-secondary">Más de 26 años al servicio de Chillán y la Región de Ñuble</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Texto Histórico y Equipo */}
          <div className="col-12 col-lg-7">
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle fw-semibold mb-2">
              Quiénes Somos
            </span>
            <h2 className="display-6 fw-bold text-dark mb-3">
              Distribuidora de Gas El Volcán
            </h2>

            <p className="text-secondary lead fs-6 mb-3">
              Somos una empresa familiar chillaneja nacida en 1998 con la misión de brindar calor, energía y seguridad
              a los hogares y locales comerciales de Chillán, Chillán Viejo y comunas aledañas de la Región de Ñuble.
            </p>

            <p className="text-muted small mb-4">
              Contamos con una flota de <strong>2 camiones de reparto permanente</strong>, un equipo humano de
              <strong> 3 repartidores certificados</strong>, operadora de llamados y administración dedicada.
              Atendemos entre 80 y 120 pedidos diarios, garantizando siempre el pesaje exacto del cilindro y la prueba
              de hermeticidad en cada entrega.
            </p>

            {/* Valores / Pilares */}
            <div className="row g-3">
              <div className="col-12 col-sm-6">
                <div className="p-3 bg-white rounded-3 border">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <i className="bi bi-shield-lock-fill text-success fs-5"></i>
                    <h6 className="fw-bold text-dark mb-0 small">Seguridad SEC Certificada</h6>
                  </div>
                  <p className="text-muted small mb-0" style={{ fontSize: '0.78rem' }}>
                    Cumplimiento irrestricto de las directrices de la Superintendencia de Electricidad y Combustibles.
                  </p>
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div className="p-3 bg-white rounded-3 border">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <i className="bi bi-stopwatch-fill text-primary fs-5"></i>
                    <h6 className="fw-bold text-dark mb-0 small">Compromiso 30 Minutos</h6>
                  </div>
                  <p className="text-muted small mb-0" style={{ fontSize: '0.78rem' }}>
                    Sectores urbanos de Chillán y Chillán Viejo cubiertos con rutas optimizadas en tiempo real.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
