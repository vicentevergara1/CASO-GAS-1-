import React, { useState } from 'react';
import { validarEmail, validarRut, formatearRut } from '../utils/validation';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register state
  const [regName, setRegName] = useState('');
  const [regRut, setRegRut] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regErrors, setRegErrors] = useState({});

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validarEmail(loginEmail)) {
      setLoginError('Ingresa un correo electrónico válido');
      return;
    }
    if (loginPass.length < 4) {
      setLoginError('La contraseña debe tener al menos 4 caracteres');
      return;
    }

    setLoginError('');
    onLoginSuccess({
      name: loginEmail.split('@')[0],
      email: loginEmail,
      role: 'Cliente',
    });
    onClose();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!regName.trim()) errors.name = 'El nombre es obligatorio';
    if (!validarRut(regRut)) errors.rut = 'RUT inválido (ej: 12.345.678-5)';
    if (!validarEmail(regEmail)) errors.email = 'Correo electrónico inválido';
    if (regPass.length < 6) errors.pass = 'La contraseña debe tener mínimo 6 caracteres';

    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      return;
    }

    setRegErrors({});
    onLoginSuccess({
      name: regName,
      rut: regRut,
      email: regEmail,
      phone: regPhone,
      role: 'Cliente',
    });
    onClose();
  };

  // Demo direct role login
  const handleQuickRole = (name, email, role) => {
    onLoginSuccess({ name, email, role });
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', zIndex: 1070 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content border-0 shadow-lg">
          {/* Header */}
          <div className="modal-header border-bottom bg-white">
            <h5 className="modal-title fw-bold text-dark fs-5">
              <i className="bi bi-person-circle text-primary me-2"></i>
              Acceso a Plataforma El Volcán
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Quick Demo Roles Bar */}
          <div className="bg-light p-3 border-bottom">
            <span className="small text-muted fw-bold d-block mb-2">
              <i className="bi bi-person-badge text-primary me-1"></i> Cuentas de Acceso Rápido (Demostración):
            </span>
            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-xs btn-outline-dark small py-1 px-2"
                onClick={() => handleQuickRole('Marta Solís', 'admin@elvolcan.cl', 'Administrador')}
              >
                🛡️ Admin
              </button>
              <button
                type="button"
                className="btn btn-xs btn-outline-primary small py-1 px-2"
                onClick={() => handleQuickRole('Lorena Navarrete', 'operadora@elvolcan.cl', 'Operadora')}
              >
                🎧 Operadora
              </button>
              <button
                type="button"
                className="btn btn-xs btn-outline-info small py-1 px-2 text-dark"
                onClick={() => handleQuickRole('Juan Pérez', 'juan.perez@elvolcan.cl', 'Repartidor')}
              >
                🚚 Repartidor
              </button>
              <button
                type="button"
                className="btn btn-xs btn-outline-secondary small py-1 px-2"
                onClick={() => handleQuickRole('Catalina Fuentes', 'cliente@chillan.cl', 'Cliente')}
              >
                👤 Cliente
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-4 pt-3">
            <ul className="nav nav-pills nav-fill bg-light p-1 rounded">
              <li className="nav-item">
                <button
                  className={`nav-link small fw-bold ${activeTab === 'login' ? 'active shadow-sm' : 'text-muted'}`}
                  onClick={() => setActiveTab('login')}
                >
                  Iniciar Sesión
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link small fw-bold ${activeTab === 'register' ? 'active shadow-sm' : 'text-muted'}`}
                  onClick={() => setActiveTab('register')}
                >
                  Registrarse
                </button>
              </li>
            </ul>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            {activeTab === 'login' ? (
              <form onSubmit={handleLoginSubmit}>
                {loginError && <div className="alert alert-danger py-2 small">{loginError}</div>}

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-dark">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    placeholder="usuario@ejemplo.cl"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-dark">Contraseña</label>
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    placeholder="••••••••"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-semibold shadow-sm">
                  Entrar a mi Cuenta
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit}>
                <div className="mb-2">
                  <label className="form-label small fw-semibold text-dark">Nombre y Apellido</label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${regErrors.name ? 'is-invalid' : ''}`}
                    placeholder="Ej: Rodrigo Soto"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                  {regErrors.name && <div className="invalid-feedback small">{regErrors.name}</div>}
                </div>

                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-dark">RUT Chileno</label>
                    <input
                      type="text"
                      className={`form-control form-control-sm ${regErrors.rut ? 'is-invalid' : ''}`}
                      placeholder="12.345.678-5"
                      value={regRut}
                      onChange={(e) => setRegRut(formatearRut(e.target.value))}
                    />
                    {regErrors.rut && <div className="invalid-feedback small">{regErrors.rut}</div>}
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-dark">Teléfono</label>
                    <input
                      type="tel"
                      className="form-control form-control-sm"
                      placeholder="+56 9 ..."
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label small fw-semibold text-dark">Correo Electrónico</label>
                  <input
                    type="email"
                    className={`form-control form-control-sm ${regErrors.email ? 'is-invalid' : ''}`}
                    placeholder="nombre@ejemplo.cl"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                  {regErrors.email && <div className="invalid-feedback small">{regErrors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-dark">Crear Contraseña</label>
                  <input
                    type="password"
                    className={`form-control form-control-sm ${regErrors.pass ? 'is-invalid' : ''}`}
                    placeholder="Mínimo 6 caracteres"
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                  />
                  {regErrors.pass && <div className="invalid-feedback small">{regErrors.pass}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-semibold shadow-sm">
                  Crear Cuenta de Cliente
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
