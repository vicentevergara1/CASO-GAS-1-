import React from 'react';

export default function FaqSection() {
  const faqs = [
    {
      id: 'faq1',
      pregunta: '¿Puedo intercambiar un cilindro de otra marca (amarillo, azul o plateado)?',
      respuesta:
        '¡Sí! En conformidad con la normativa de la SEC en Chile, todas las empresas distribuidoras estamos obligadas a aceptar e intercambiar cilindros de cualquier marca o color, siempre y cuando estén en buen estado físico general y no presenten fisuras graves.',
    },
    {
      id: 'faq2',
      pregunta: '¿Cuánto demora el reparto a domicilio en Chillán y Chillán Viejo?',
      respuesta:
        'Nuestro tiempo promedio de entrega en el radio urbano de Chillán y Chillán Viejo es de 20 a 35 minutos. Nuestros 2 camiones circulan permanentemente por cuadrantes estratégicos de la ciudad.',
    },
    {
      id: 'faq3',
      pregunta: '¿Cómo sé si mi regulador o manguera están vencidos según la SEC?',
      respuesta:
        'Los reguladores y mangueras tienen una fecha de caducidad impresa en su cuerpo (generalmente 5 años desde su fabricación). Si la manguera presenta grietas, rigidez o pérdida de flexibilidad, debe ser reemplazada de inmediato por seguridad.',
    },
    {
      id: 'faq4',
      pregunta: '¿Qué debo hacer si percibo olor a gas licuado en mi hogar?',
      respuesta:
        'Cierre de inmediato la llave de paso del regulador, abra puertas y ventanas para ventilar, y NO encienda luces, fósforos ni artefactos eléctricos. Si el olor persiste, llámenos a nuestra central o a Bomberos de Chillán (132).',
    },
    {
      id: 'faq5',
      pregunta: '¿Cuáles son los medios de pago aceptados al recibir el cilindro?',
      respuesta:
        'Aceptamos efectivo, tarjetas de débito / Redcompra y crédito mediante la máquina POS móvil que lleva cada repartidor en su camión, y transferencia electrónica directa.',
    },
  ];

  return (
    <section id="faq" className="py-5 bg-white border-bottom">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle fw-semibold mb-2">
            Preguntas Frecuentes
          </span>
          <h2 className="display-6 fw-bold text-dark mb-2">Resolvemos tus dudas</h2>
          <p className="text-muted small">
            Respuestas claras sobre recambio de cilindros, normativa SEC y tiempos de despacho en Chillán.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="accordion shadow-sm" id="accordionFaq">
              {faqs.map((faq, idx) => (
                <div className="accordion-item border" key={faq.id}>
                  <h2 className="accordion-header" id={`heading-${faq.id}`}>
                    <button
                      className={`accordion-button fw-semibold text-dark ${idx !== 0 ? 'collapsed' : ''}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${faq.id}`}
                      aria-expanded={idx === 0 ? 'true' : 'false'}
                      aria-controls={`collapse-${faq.id}`}
                    >
                      <i className="bi bi-question-circle text-primary me-2"></i>
                      {faq.pregunta}
                    </button>
                  </h2>
                  <div
                    id={`collapse-${faq.id}`}
                    className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`}
                    aria-labelledby={`heading-${faq.id}`}
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body text-secondary small lh-base">
                      {faq.respuesta}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
