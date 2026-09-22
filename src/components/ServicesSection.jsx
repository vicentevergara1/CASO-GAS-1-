import React from 'react';

export default function ServicesSection({ onOrderService }) {
  const servicios = [
    {
      id: 'servicio-reparto',
      icon: 'bi-truck-fast',
      titulo: 'Despacho Express Chillán',
      desc: 'Entrega en menos de 30 minutos en Chillán y Chillán Viejo. Dos camiones en ruta permanente con choferes certificados.',
      precio: 'Gratis sobre $20.000',
      badge: 'Garantía 30 min',
      color: 'primary',
    },
    {
      id: 'servicio-instalacion',
      icon: 'bi-shield-check',
      titulo: 'Instalación y Cambio Seguro SEC',
      desc: 'Nuestro repartidor realiza la conexión del regulador, reemplaza la golilla de goma y aplica prueba de espuma para certificar cero fugas.',
      precio: 'Incluido en el recambio',
      badge: 'Sello SEC Oficial',
      color: 'success',
    },
    {
      id: 'servicio-mantencion',
      icon: 'bi-tools',
      titulo: 'Mantención de Calefonts y Estufas',
      desc: 'Servicio técnico especializado para limpieza de quemadores, inyectores, regulación de llama azul y revisión preventiva de tiro forzado.',
      precio: 'Desde $15.990',
      badge: 'Técnico Autorizado',
      color: 'warning',
    },
    {
      id: 'servicio-industrial',
      icon: 'bi-building-gear',
      titulo: 'Abastecimiento a Pymes y Locales',
      desc: 'Suministro continuo de cilindros de 45 kg para restaurantes, panaderías, quinchos comerciales e instituciones educativas en Ñuble.',
      precio: 'Tarifa Comercial Preferente',
      badge: 'Convenio Empresa',
      color: 'dark',
    },
  ];

  return (
    <section id="servicios" className="py-5 bg-white border-bottom">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle fw-semibold mb-2">
            Nuestros Servicios
          </span>
          <h2 className="display-6 fw-bold text-dark mb-2">
            Más que gas, seguridad y respaldo para tu familia
          </h2>
          <p className="text-muted small">
            Servicios técnicos y de logística en Chillán respaldados por la normativa SEC.
          </p>
        </div>

        <div className="row g-4">
          {servicios.map((s) => (
            <div className="col-12 col-md-6 col-lg-3" key={s.id}>
              <div className="card h-100 border shadow-sm p-3 d-flex flex-column hover-shadow">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div
                    className={`rounded-3 p-3 bg-${s.color}-subtle text-${s.color} d-inline-flex`}
                  >
                    <i className={`bi ${s.icon} fs-4`}></i>
                  </div>
                  <span className={`badge bg-${s.color}`}>{s.badge}</span>
                </div>

                <h5 className="fw-bold text-dark fs-6 mb-2">{s.titulo}</h5>
                <p className="text-muted small mb-3 flex-grow-1" style={{ fontSize: '0.82rem' }}>
                  {s.desc}
                </p>

                <div className="border-top pt-2 mt-auto">
                  <div className="small text-muted mb-1">Costo / Condición:</div>
                  <div className="fw-bold text-primary small mb-3">{s.precio}</div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary w-100 fw-semibold"
                    onClick={() => onOrderService(s.titulo)}
                  >
                    Solicitar Servicio
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
