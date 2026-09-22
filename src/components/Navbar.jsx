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
            src="/assets/images/logo.svg"
            alt="Logo El Volcán"
            style={{ height: '40px', width: '40px' }}
            onError={(e) => {
              e.target.src = '/assets/images/logo.png';
            }}
          />
          <div className="d-flex flex-column">
            <span className="fw-bold text-dark fs-5 lh-1">Gas El Volcán</span>
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
          {/* Enlaces de navegación principales según diagrama Figura 3 y 4 */}
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
                <i className="bi bi-house-door me-1"></i> Catálogo
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${
                  activeView === 'categorias' ? 'active fw-bold text-primary' : 'text-dark'
                }`}
                onClick={() => {
                  onNavigate('categorias');
                  setNavExpanded(false);
                }}
              >
                <i className="bi bi-grid me-1"></i> Categorías
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${
                  activeView === 'ofertas' ? 'active fw-bold text-danger' : 'text-dark'
                }`}
                onClick={() => {
                  onNavigate('ofertas');
                  setNavExpanded(false);
                }}
              >
                <i className="bi bi-fire me-1 text-danger"></i> Ofertas
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${
                  activeView === 'blogs' ? 'active fw-bold text-primary' : 'text-dark'
                }`}
                onClick={() => {
                  onNavigate('blogs');
                  setNavExpanded(false);
                }}
              >
                <i className="bi bi-newspaper me-1"></i> Blogs
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
                  <i className="bi bi-speedometer2 me-1 text-warning"></i> Panel Admin
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

          {/* Acciones Rápidas: Perfil y Carrito */}
          <div className="d-flex flex-wrap align-items-center gap-2">
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
