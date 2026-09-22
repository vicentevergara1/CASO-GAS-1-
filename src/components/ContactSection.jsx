import React, { useState } from 'react';
import { validarEmail } from '../utils/validation';

export default function ContactSection() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    if (!validarEmail(form.email)) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-5 bg-light border-bottom">
      <div className="container">
        <div className="row g-5 align-items-center">
          {/* Información de Contacto */}
          <div className="col-12 col-lg-5">
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle fw-semibold mb-2">
              Atención Directa
            </span>
            <h2 className="display-6 fw-bold text-dark mb-3">Contáctanos en Chillán</h2>
            <p className="text-secondary small mb-4">
              ¿Dudas con tu pedido, convenios para pymes o solicitud de mantención técnica?
              Estamos a tu disposición en nuestra planta central y vía telefónica.
            </p>

            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-start gap-3 p-3 bg-white rounded-3 border">
                <div className="bg-primary-subtle text-primary p-2 rounded-circle flex-shrink-0">
                  <i className="bi bi-geo-alt-fill fs-5"></i>
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-0 small">Bodega y Planta Central</h6>
                  <span className="text-muted small">Av. Brasil 340, Chillán, Región de Ñuble</span>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 p-3 bg-white rounded-3 border">
                <div className="bg-success-subtle text-success p-2 rounded-circle flex-shrink-0">
                  <i className="bi bi-telephone-fill fs-5"></i>
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-0 small">Central Telefónica</h6>
                  <span className="text-muted small">+56 42 223 4567 / +56 9 8765 4321</span>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 p-3 bg-white rounded-3 border">
                <div className="bg-info-subtle text-info p-2 rounded-circle flex-shrink-0">
                  <i className="bi bi-clock-fill fs-5"></i>
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-0 small">Horario de Despacho</h6>
                  <span className="text-muted small">Lunes a Sábado: 08:30 - 20:00 hrs &bull; Dom: 09:00 - 15:00 hrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de Mensaje */}
          <div className="col-12 col-lg-7">
            <div className="card border-0 shadow-sm p-4 bg-white">
              <h5 className="fw-bold text-dark mb-3">Envíanos un Mensaje</h5>

              {submitted ? (
                <div className="alert alert-success d-flex align-items-center gap-2 mb-0">
                  <i className="bi bi-check-circle-fill fs-4"></i>
                  <div>
                    <h6 className="fw-bold mb-0">¡Mensaje Enviado con Éxito!</h6>
                    <span className="small">Nuestra operadora te contactará a la brevedad.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && <div className="alert alert-danger py-2 small">{error}</div>}

                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-semibold text-dark">Tu Nombre</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Ej: Catalina Fuentes"
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-semibold text-dark">Teléfono</label>
                      <input
                        type="tel"
                        className="form-control form-control-sm"
                        placeholder="+56 9 ..."
                        value={form.telefono}
                        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Correo Electrónico</label>
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        placeholder="tu-correo@ejemplo.cl"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Mensaje o Solicitud</label>
                      <textarea
                        className="form-control form-control-sm"
                        rows="4"
                        placeholder="Escribe aquí tu consulta o requerimiento..."
                        value={form.mensaje}
                        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                        required
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-primary fw-semibold px-4">
                        Enviar Consulta
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
