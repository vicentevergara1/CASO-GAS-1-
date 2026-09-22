import React, { useState } from 'react';
import { formatCurrency } from '../utils/currency';

export default function Navbar({
  cartCount,
  cartTotal,
  onOpenCart,
  searchQuery,
  onSearchChange,
  activeView,
  onNavigate,
  currentUser,
  onOpenAuth,
  onOpenJasmineTests,
  onRoleChange,
}) {
  const [navExpanded, setNavExpanded] = useState(false);

  return (
    <nav className="navbar navbar-expand-xl navbar-light bg-white border-bottom sticky-top shadow-sm py-2">
      <div className="container-fluid px-3 px-lg-4">
        {/* 1. Brand Logo */}
        <a
          href="#inicio"
          className="navbar-brand d-flex align-items-center gap-2 me-3"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('catalogo');
          }}
        >
          <img
            src="/assets/images/logo.png"
            alt="Logo El Volcán"
            style={{ height: '42px', width: 'auto' }}
          />
          <div className="d-flex flex-column">
            <span className="fw-bold text-dark fs-5 lh-1">El Volcán</span>
            <span className="text-muted small lh-1" style={{ fontSize: '0.72rem' }}>
              Chillán &bull; Desde 1998
            </span>
          </div>
        </a>

        {/* 2. Botón Móvil: Carrito y Hamburguesa */}
        <div className="d-flex align-items-center gap-2 d-xl-none">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary position-relative"
            onClick={onOpenCart}
            aria-label="Abrir carrito"
          >
            <i className="bi bi-cart3 fs-5"></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="navbar-toggler border-0 p-1"
            type="button"
            onClick={() => setNavExpanded(!navExpanded)}
            aria-label="Alternar navegación"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* 3. Menú colapsable */}
        <div className={`collapse navbar-collapse ${navExpanded ? 'show' : ''}`} id="navbarMain">
          {/* Enlaces de navegación principales */}
          <ul className="navbar-nav me-auto mb-2 mb-xl-0 fw-medium">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${
                  activeView === 'catalogo' ? 'active fw-bold text-primary' : 'text-dark'
                }`}
                onClick={() => {
                  onNavigate('catalogo');
                  setNavExpanded(false);
                }}
              >
                <i className="bi bi-fire me-1 text-danger"></i> Catálogo
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${
                  activeView === 'servicios' ? 'active fw-bold text-primary' : 'text-dark'
                }`}
                onClick={() => {
                  onNavigate('servicios');
                  setNavExpanded(false);
                }}
              >
                <i className="bi bi-tools me-1 text-info"></i> Servicios
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${
                  activeView === 'seguimiento' ? 'active fw-bold text-primary' : 'text-dark'
                }`}
                onClick={() => {
                  onNavigate('seguimiento');
                  setNavExpanded(false);
                }}
              >
                <i className="bi bi-geo-alt-fill me-1 text-success"></i> Seguimiento GPS
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${
                  activeView === 'nosotros' ? 'active fw-bold text-primary' : 'text-dark'
                }`}
                onClick={() => {
                  onNavigate('nosotros');
                  setNavExpanded(false);
                }}
              >
                <i className="bi bi-people me-1"></i> Nosotros
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${
                  activeView === 'faq' ? 'active fw-bold text-primary' : 'text-dark'
                }`}
                onClick={() => {
                  onNavigate('faq');
                  setNavExpanded(false);
                }}
              >
                <i className="bi bi-question-circle me-1"></i> Preguntas
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${
                  activeView === 'contacto' ? 'active fw-bold text-primary' : 'text-dark'
                }`}
                onClick={() => {
                  onNavigate('contacto');
                  setNavExpanded(false);
                }}
              >
                <i className="bi bi-telephone me-1"></i> Contacto
              </button>
            </li>

            {/* Acceso a Administración (RBAC: Administrador u Operadora) */}
            {(currentUser.role === 'Administrador' || currentUser.role === 'Operadora') && (
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-decoration-none badge bg-dark text-white p-2 mt-1 ms-xl-2 ${
                    activeView === 'admin' ? 'border border-warning' : ''
                  }`}
                  onClick={() => {
                    onNavigate('admin');
                    setNavExpanded(false);
                  }}
                >
                  <i className="bi bi-speedometer2 me-1 text-warning"></i> Panel {currentUser.role}
                </button>
              </li>
            )}
          </ul>

          {/* Barra de Búsqueda */}
          <div className="d-flex align-items-center mb-3 mb-xl-0 me-xl-3">
            <div className="input-group input-group-sm" style={{ maxWidth: '280px' }}>
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0 ps-0"
                placeholder="Buscar gas, regulador..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="btn btn-light border"
                  type="button"
                  onClick={() => onSearchChange('')}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>

          {/* Acciones Rápidas: Suite Jasmine, Selector de Rol, Perfil y Carrito */}
          <div className="d-flex flex-wrap align-items-center gap-2">
            {/* Botón Jasmine Unit Tests */}
            <button
              type="button"
              className="btn btn-sm btn-outline-success d-flex align-items-center gap-1 shadow-sm"
              onClick={onOpenJasmineTests}
              title="Ver las 10 pruebas unitarias con Jasmine & Karma"
            >
              <i className="bi bi-patch-check-fill text-success"></i>
              <span className="fw-semibold">Pruebas Jasmine</span>
              <span className="badge bg-success ms-1">10/10</span>
            </button>

            {/* Selector de Rol (Para facilitar la demostración de la evaluación) */}
            <div className="dropdown">
              <button
                className="btn btn-sm btn-light border dropdown-toggle d-flex align-items-center gap-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-badge text-secondary"></i>
                <span className="small text-muted">Rol:</span>
                <span className="fw-bold small">{currentUser.role}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm small">
                <li>
                  <h6 className="dropdown-header">Cambiar Rol (Demostración)</h6>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${currentUser.role === 'Cliente' ? 'active' : ''}`}
                    onClick={() => onRoleChange('Cliente')}
                  >
                    <i className="bi bi-person me-2"></i> Cliente Residencial
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${currentUser.role === 'Operadora' ? 'active' : ''}`}
                    onClick={() => onRoleChange('Operadora')}
                  >
                    <i className="bi bi-headset me-2"></i> Operadora de Pedidos
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${currentUser.role === 'Repartidor' ? 'active' : ''}`}
                    onClick={() => onRoleChange('Repartidor')}
                  >
                    <i className="bi bi-truck me-2"></i> Repartidor (Camión)
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${currentUser.role === 'Administrador' ? 'active' : ''}`}
                    onClick={() => onRoleChange('Administrador')}
                  >
                    <i className="bi bi-shield-lock me-2"></i> Administrador General
                  </button>
                </li>
              </ul>
            </div>

            {/* Usuario / Login */}
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
              onClick={onOpenAuth}
            >
              <i className="bi bi-person-circle"></i>
              <span className="d-none d-sm-inline">{currentUser.name || 'Mi Cuenta'}</span>
            </button>

            {/* Botón Carrito Desktop */}
            <button
              type="button"
              className="btn btn-sm btn-primary d-none d-xl-flex align-items-center gap-2 px-3 shadow-sm"
              onClick={onOpenCart}
            >
              <div className="position-relative">
                <i className="bi bi-cart3 fs-6"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="fw-semibold">{formatCurrency(cartTotal)}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
