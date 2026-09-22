import React, { useState } from 'react';
import { formatCurrency } from '../utils/currency';
import { ORDER_STATUSES } from '../utils/orderWorkflow';
import {
  getStoredProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCriticalStockProducts,
  getStoredCategories,
  createCategory,
} from '../data/products';

/**
 * Panel de Administración - Distribuidora Gas El Volcán Chillán
 * Incluye Dashboard central (métricas en tiempo real + módulos operativos), CRUD de productos,
 * listado de productos críticos, gestión de órdenes con vista de boletas, categorías y usuarios.
 */
export default function AdminDashboard({ currentUser, onGoToStore }) {
  const [activeModule, setActiveModule] = useState('dashboard'); // 'dashboard', 'ordenes', 'productos', 'criticos', 'categorias', 'usuarios', 'reportes', 'perfil'
  const [productsList, setProductsList] = useState(getStoredProducts());
  const [categoriesList, setCategoriesList] = useState(getStoredCategories());
  const [selectedBoleta, setSelectedBoleta] = useState(null);

  // Estados para Modales de CRUD de Productos
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productFormData, setProductFormData] = useState({
    name: '',
    category: 'Cilindros',
    price: '',
    stock: '',
    description: '',
    image: '/assets/images/cilindro.png',
  });

  // Modal Nueva Categoría
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryLabel, setNewCategoryLabel] = useState('');

  // Pedidos del día
  const [pedidos, setPedidos] = useState([
    {
      id: 'VOL-20240705',
      boletaNum: 'BOL-78912',
      cliente: 'Catalina Fuentes Morales',
      rut: '14.832.194-2',
      email: 'catalina.fuentes@gmail.com',
      direccion: 'Calle Arauco 450, Chillán',
      telefono: '+56 9 8765 4321',
      items: [
        { name: 'Cilindro Gas Licuado 15 Kg', quantity: 1, price: 16000 },
        { name: 'Kit Regulador + Manguera SEC', quantity: 1, price: 13990 },
      ],
      total: 29990,
      metodoPago: 'Transferencia Bancaria',
      estado: ORDER_STATUSES.EN_CAMINO,
      repartidor: 'Juan Pérez (Camión 1)',
      fecha: '2024-06-18 10:15',
    },
    {
      id: 'VOL-20240704',
      boletaNum: 'BOL-78911',
      cliente: 'Manuel Beltrán Silva',
      rut: '12.345.678-5',
      email: 'manuel.beltran@chillan.cl',
      direccion: 'Av. Collín 890, Chillán',
      telefono: '+56 9 7654 3210',
      items: [
        { name: 'Cilindro Gas Licuado 11 Kg', quantity: 2, price: 12000 },
      ],
      total: 24000,
      metodoPago: 'Efectivo contra entrega',
      estado: ORDER_STATUSES.ASIGNADO,
      repartidor: 'Carlos Muñoz (Camión 2)',
      fecha: '2024-06-18 10:02',
    },
    {
      id: 'VOL-20240703',
      boletaNum: 'BOL-78910',
      cliente: 'Panadería Ñuble Central',
      rut: '76.432.890-K',
      email: 'contacto@nublecentral.cl',
      direccion: 'Maipón 320, Chillán',
      telefono: '+56 42 221 4455',
      items: [
        { name: 'Cilindro Gas Licuado 45 Kg Industrial', quantity: 2, price: 45000 },
      ],
      total: 90000,
      metodoPago: 'Tarjeta Débito (POS Móvil)',
      estado: ORDER_STATUSES.RECIBIDO,
      repartidor: 'Sin Asignar',
      fecha: '2024-06-18 09:48',
    },
    {
      id: 'VOL-20240702',
      boletaNum: 'BOL-78909',
      cliente: 'Patricia Valenzuela Riquelme',
      rut: '9.876.543-1',
      email: 'patricia.valenzuela@hotmail.com',
      direccion: 'Villa Los Volcanes Pje 4 #112, Chillán',
      telefono: '+56 9 6543 2109',
      items: [
        { name: 'Cilindro Gas Licuado 5 Kg', quantity: 1, price: 6500 },
      ],
      total: 6500,
      metodoPago: 'Efectivo',
      estado: ORDER_STATUSES.ENTREGADO,
      repartidor: 'Juan Pérez (Camión 1)',
      fecha: '2024-06-18 09:15',
    },
  ]);

  // Lista de usuarios según requerimiento
  const [usuarios, setUsuarios] = useState([
    { id: 'usr-1', nombre: 'Vicente Vergara', email: 'v.vergara@duocuc.cl', rol: 'ADMIN', estado: 'Activo', compras: 12 },
    { id: 'usr-2', nombre: 'Marcela Lagos', email: 'm.lagos@volcan.cl', rol: 'OPERADOR', estado: 'Activo', compras: 0 },
    { id: 'usr-3', nombre: 'Juan Pérez', email: 'j.perez@volcan.cl', rol: 'REPARTIDOR', estado: 'En Ruta', compras: 0 },
    { id: 'usr-4', nombre: 'Catalina Fuentes', email: 'catalina.fuentes@gmail.com', rol: 'CLIENTE', estado: 'Activo', compras: 4 },
  ]);

  // Manejadores CRUD de Productos
  const handleOpenCreateProduct = () => {
    setEditingProduct(null);
    setProductFormData({
      name: '',
      category: 'Cilindros',
      price: '',
      stock: '',
      description: '',
      image: '/assets/images/cilindro.png',
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductFormData({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      stock: prod.stock,
      description: prod.description || '',
      image: prod.image || '/assets/images/cilindro.png',
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productFormData.name || !productFormData.price) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: productFormData.name,
        category: productFormData.category,
        price: Number(productFormData.price),
        stock: Number(productFormData.stock),
        description: productFormData.description,
        image: productFormData.image,
      });
    } else {
      createProduct({
        name: productFormData.name,
        category: productFormData.category,
        price: Number(productFormData.price),
        stock: Number(productFormData.stock),
        description: productFormData.description,
        image: productFormData.image,
      });
    }
    setProductsList(getStoredProducts());
    setShowProductModal(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto del catálogo?')) {
      deleteProduct(id);
      setProductsList(getStoredProducts());
    }
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCategoryLabel.trim()) return;
    createCategory({ label: newCategoryLabel.trim() });
    setCategoriesList(getStoredCategories());
    setNewCategoryLabel('');
    setShowCategoryModal(false);
  };

  const criticalProducts = getCriticalStockProducts(productsList, 25);

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Barra superior de administración */}
      <div className="bg-dark text-white px-4 py-3 shadow-sm border-bottom border-secondary">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div className="d-flex align-items-center gap-3">
            <span className="badge bg-danger px-2 py-1">PANEL ADMINISTRATIVO</span>
            <h1 className="h5 fw-bold mb-0 text-white">Distribuidora Gas El Volcán</h1>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-secondary">
              <i className="bi bi-person-badge me-1"></i>
              {currentUser?.name || 'Administrador Central'}
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={onGoToStore}>
              <i className="bi bi-shop me-1"></i> Ir a la Tienda
            </button>
          </div>
        </div>
      </div>

      <div className="container py-4">
        {/* Submenú de navegación rápida administrativo */}
        <div className="d-flex flex-wrap gap-2 mb-4 bg-white p-2 rounded-3 border shadow-sm">
          <button
            className={`btn btn-sm ${activeModule === 'dashboard' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setActiveModule('dashboard')}
          >
            <i className="bi bi-speedometer2 me-1"></i> Dashboard
          </button>
          <button
            className={`btn btn-sm ${activeModule === 'ordenes' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setActiveModule('ordenes')}
          >
            <i className="bi bi-receipt me-1"></i> Órdenes / Boletas ({pedidos.length})
          </button>
          <button
            className={`btn btn-sm ${activeModule === 'productos' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setActiveModule('productos')}
          >
            <i className="bi bi-box-seam me-1"></i> Productos ({productsList.length})
          </button>
          <button
            className={`btn btn-sm ${activeModule === 'criticos' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => setActiveModule('criticos')}
          >
            <i className="bi bi-exclamation-triangle me-1"></i> Stock Crítico ({criticalProducts.length})
          </button>
          <button
            className={`btn btn-sm ${activeModule === 'categorias' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setActiveModule('categorias')}
          >
            <i className="bi bi-tags me-1"></i> Categorías ({categoriesList.length})
          </button>
          <button
            className={`btn btn-sm ${activeModule === 'usuarios' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setActiveModule('usuarios')}
          >
            <i className="bi bi-people me-1"></i> Usuarios ({usuarios.length})
          </button>
          <button
            className={`btn btn-sm ${activeModule === 'reportes' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setActiveModule('reportes')}
          >
            <i className="bi bi-graph-up me-1"></i> Reportes
          </button>
          <button
            className={`btn btn-sm ${activeModule === 'perfil' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setActiveModule('perfil')}
          >
            <i className="bi bi-person me-1"></i> Perfil
          </button>
        </div>

        {/* 1. MÓDULO DASHBOARD PRINCIPAL (FIGURA 9) */}
        {activeModule === 'dashboard' && (
          <div>
            {/* Las 3 tarjetas de métricas según Figura 9 */}
            <div className="row g-4 mb-4">
              {/* Tarjeta 1: Compras (Azul) */}
              <div className="col-12 col-md-4">
                <div
                  className="card text-white shadow-sm border-0 h-100"
                  style={{ backgroundColor: '#1e88e5', borderRadius: '12px' }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title fw-bold mb-0 text-white">Compras</h5>
                      <i className="bi bi-cart-check fs-2 opacity-75"></i>
                    </div>
                    <div className="display-5 fw-bold mb-2">1,234</div>
                    <div className="small bg-white bg-opacity-25 px-2 py-1 rounded d-inline-block">
                      Rentabilidad de aumento: 20%
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta 2: Productos (Verde) */}
              <div className="col-12 col-md-4">
                <div
                  className="card text-white shadow-sm border-0 h-100"
                  style={{ backgroundColor: '#2e7d32', borderRadius: '12px' }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title fw-bold mb-0 text-white">Productos</h5>
                      <i className="bi bi-box-seam fs-2 opacity-75"></i>
                    </div>
                    <div className="display-5 fw-bold mb-2">400</div>
                    <div className="small bg-white bg-opacity-25 px-2 py-1 rounded d-inline-block">
                      Inventario actual: 500
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta 3: Usuarios (Naranja) */}
              <div className="col-12 col-md-4">
                <div
                  className="card text-white shadow-sm border-0 h-100"
                  style={{ backgroundColor: '#f57c00', borderRadius: '12px' }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title fw-bold mb-0 text-white">Usuarios</h5>
                      <i className="bi bi-people-fill fs-2 opacity-75"></i>
                    </div>
                    <div className="display-5 fw-bold mb-2">890</div>
                    <div className="small bg-white bg-opacity-25 px-2 py-1 rounded d-inline-block">
                      Nuevos usuarios este mes: 130
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cuadrícula de 8 Módulos de Acceso Directo (Figura 9) */}
            <h4 className="fw-bold text-dark mb-3">Módulos de Gestión Administrativa</h4>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 mb-4">
              {/* 1. Dashboard */}
              <div className="col">
                <div
                  className="card h-100 border text-center p-3 hover-shadow cursor-pointer bg-white"
                  onClick={() => setActiveModule('dashboard')}
                  role="button"
                >
                  <div className="mb-2 text-primary fs-3"><i className="bi bi-speedometer2"></i></div>
                  <h6 className="fw-bold text-dark mb-1">Dashboard</h6>
                  <p className="text-secondary small mb-0">Visión general de todas las métricas y estadísticas clave del sistema.</p>
                </div>
              </div>

              {/* 2. Órdenes */}
              <div className="col">
                <div
                  className="card h-100 border text-center p-3 hover-shadow cursor-pointer bg-white"
                  onClick={() => setActiveModule('ordenes')}
                  role="button"
                >
                  <div className="mb-2 text-primary fs-3"><i className="bi bi-receipt"></i></div>
                  <h6 className="fw-bold text-dark mb-1">Órdenes</h6>
                  <p className="text-secondary small mb-0">Gestión y seguimiento de todas las órdenes de compra realizadas.</p>
                </div>
              </div>

              {/* 3. Productos */}
              <div className="col">
                <div
                  className="card h-100 border text-center p-3 hover-shadow cursor-pointer bg-white"
                  onClick={() => setActiveModule('productos')}
                  role="button"
                >
                  <div className="mb-2 text-primary fs-3"><i className="bi bi-box-seam"></i></div>
                  <h6 className="fw-bold text-dark mb-1">Productos</h6>
                  <p className="text-secondary small mb-0">Administrar inventario y detalles de los productos disponibles.</p>
                </div>
              </div>

              {/* 4. Categorías */}
              <div className="col">
                <div
                  className="card h-100 border text-center p-3 hover-shadow cursor-pointer bg-white"
                  onClick={() => setActiveModule('categorias')}
                  role="button"
                >
                  <div className="mb-2 text-primary fs-3"><i className="bi bi-tags"></i></div>
                  <h6 className="fw-bold text-dark mb-1">Categorías</h6>
                  <p className="text-secondary small mb-0">Organizar productos en categorías para facilitar su navegación.</p>
                </div>
              </div>

              {/* 5. Usuarios */}
              <div className="col">
                <div
                  className="card h-100 border text-center p-3 hover-shadow cursor-pointer bg-white"
                  onClick={() => setActiveModule('usuarios')}
                  role="button"
                >
                  <div className="mb-2 text-primary fs-3"><i className="bi bi-people"></i></div>
                  <h6 className="fw-bold text-dark mb-1">Usuarios</h6>
                  <p className="text-secondary small mb-0">Gestión de cuentas de usuario y sus roles dentro del sistema.</p>
                </div>
              </div>

              {/* 6. Reportes */}
              <div className="col">
                <div
                  className="card h-100 border text-center p-3 hover-shadow cursor-pointer bg-white"
                  onClick={() => setActiveModule('reportes')}
                  role="button"
                >
                  <div className="mb-2 text-primary fs-3"><i className="bi bi-graph-up"></i></div>
                  <h6 className="fw-bold text-dark mb-1">Reportes</h6>
                  <p className="text-secondary small mb-0">Generación de informes detallados sobre las operaciones del sistema.</p>
                </div>
              </div>

              {/* 7. Perfil */}
              <div className="col">
                <div
                  className="card h-100 border text-center p-3 hover-shadow cursor-pointer bg-white"
                  onClick={() => setActiveModule('perfil')}
                  role="button"
                >
                  <div className="mb-2 text-primary fs-3"><i className="bi bi-person"></i></div>
                  <h6 className="fw-bold text-dark mb-1">Perfil</h6>
                  <p className="text-secondary small mb-0">Administración de la información personal y configuraciones de cuenta.</p>
                </div>
              </div>

              {/* 8. Tienda */}
              <div className="col">
                <div
                  className="card h-100 border text-center p-3 hover-shadow cursor-pointer bg-white"
                  onClick={onGoToStore}
                  role="button"
                >
                  <div className="mb-2 text-primary fs-3"><i className="bi bi-shop"></i></div>
                  <h6 className="fw-bold text-dark mb-1">Tienda</h6>
                  <p className="text-secondary small mb-0">Visualiza tu tienda en tiempo real, visualiza los reportes de los usuarios.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. MÓDULO PRODUCTOS (CRUD COMPLETO Y LISTADO PRODUCTOS CRÍTICOS - FIGURA 10) */}
        {activeModule === 'productos' && (
          <div className="bg-white p-4 rounded-3 border shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <div>
                <h4 className="fw-bold text-dark mb-0">Inventario y Catálogo de Productos</h4>
                <p className="text-secondary small mb-0">Operaciones CRUD con persistencia local en tiempo real.</p>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-danger btn-sm" onClick={() => setActiveModule('criticos')}>
                  <i className="bi bi-exclamation-triangle me-1"></i> Ver Críticos ({criticalProducts.length})
                </button>
                <button className="btn btn-primary btn-sm" onClick={handleOpenCreateProduct}>
                  <i className="bi bi-plus-circle me-1"></i> Nuevo Producto
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light small text-muted">
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList.map((prod) => (
                    <tr key={prod.id}>
                      <td style={{ width: '50px' }}>
                        <img
                          src={prod.image}
                          alt={prod.name}
                          style={{ width: '36px', height: '36px', objectFit: 'contain' }}
                          className="rounded border"
                          onError={(e) => { e.target.src = '/assets/images/cilindro.png'; }}
                        />
                      </td>
                      <td className="fw-semibold small text-dark">{prod.name}</td>
                      <td><span className="badge bg-light text-secondary border">{prod.category}</span></td>
                      <td className="fw-bold small">{formatCurrency(prod.price)}</td>
                      <td>
                        <span className={`badge ${prod.stock <= 20 ? 'bg-danger' : 'bg-success'}`}>
                          {prod.stock} unids.
                        </span>
                      </td>
                      <td>
                        {prod.stock <= 0 ? (
                          <span className="badge bg-danger">Agotado</span>
                        ) : prod.stock <= 20 ? (
                          <span className="badge bg-warning text-dark">Stock Crítico</span>
                        ) : (
                          <span className="badge bg-success-subtle text-success">Disponible</span>
                        )}
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleOpenEditProduct(prod)}
                          title="Editar Producto"
                        >
                          <i className="bi bi-pencil-square"></i> Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteProduct(prod.id)}
                          title="Eliminar Producto"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. MÓDULO PRODUCTOS CRÍTICOS (FIGURA 10) */}
        {activeModule === 'criticos' && (
          <div className="bg-white p-4 rounded-3 border shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span className="badge bg-danger mb-1">ALERTA DE REABASTECIMIENTO</span>
                <h4 className="fw-bold text-dark mb-0">Listado de Productos Críticos</h4>
                <p className="text-secondary small mb-0">
                  Productos con inventario menor o igual a 25 unidades en la bodega de Chillán.
                </p>
              </div>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setActiveModule('productos')}>
                <i className="bi bi-arrow-left me-1"></i> Volver a Todos los Productos
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-danger small text-danger">
                  <tr>
                    <th>Imagen</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Stock Actual</th>
                    <th>Nivel de Riesgo</th>
                    <th className="text-end">Acción Rápida</th>
                  </tr>
                </thead>
                <tbody>
                  {criticalProducts.map((prod) => (
                    <tr key={prod.id}>
                      <td style={{ width: '50px' }}>
                        <img
                          src={prod.image}
                          alt={prod.name}
                          style={{ width: '36px', height: '36px', objectFit: 'contain' }}
                          className="rounded border"
                          onError={(e) => { e.target.src = '/assets/images/cilindro.png'; }}
                        />
                      </td>
                      <td className="fw-bold small text-dark">{prod.name}</td>
                      <td><span className="badge bg-light text-secondary border">{prod.category}</span></td>
                      <td className="fw-bold text-danger fs-6">{prod.stock}</td>
                      <td>
                        {prod.stock === 0 ? (
                          <span className="badge bg-danger">QUIEBRE TOTAL</span>
                        ) : (
                          <span className="badge bg-warning text-dark">URGENCIA ALTA</span>
                        )}
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => {
                            updateProduct(prod.id, { stock: prod.stock + 50 });
                            setProductsList(getStoredProducts());
                          }}
                        >
                          <i className="bi bi-plus-lg me-1"></i> +50 Unidades
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. MÓDULO ÓRDENES / BOLETAS (FIGURA 10: "Órdenes / Boletas -> Mostrar Boleta") */}
        {activeModule === 'ordenes' && (
          <div className="bg-white p-4 rounded-3 border shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 className="fw-bold text-dark mb-0">Órdenes y Boletas de Compra</h4>
                <p className="text-secondary small mb-0">Registro y emisión de comprobantes tributarios.</p>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light small text-muted">
                  <tr>
                    <th>N° Pedido</th>
                    <th>N° Boleta</th>
                    <th>Cliente / RUT</th>
                    <th>Dirección</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td className="fw-bold small text-primary">{pedido.id}</td>
                      <td><span className="badge bg-light text-dark border">{pedido.boletaNum}</span></td>
                      <td>
                        <div className="fw-semibold small text-dark">{pedido.cliente}</div>
                        <small className="text-muted">{pedido.rut}</small>
                      </td>
                      <td className="small text-secondary">{pedido.direccion}</td>
                      <td className="fw-bold small">{formatCurrency(pedido.total)}</td>
                      <td>
                        <span className="badge bg-info-subtle text-info border border-info-subtle">
                          {pedido.estado}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => setSelectedBoleta(pedido)}
                        >
                          <i className="bi bi-file-earmark-text me-1"></i> Mostrar Boleta
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. MÓDULO CATEGORÍAS (FIGURA 10: "Nueva Categoría, Editar") */}
        {activeModule === 'categorias' && (
          <div className="bg-white p-4 rounded-3 border shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 className="fw-bold text-dark mb-0">Categorías de la Tienda</h4>
                <p className="text-secondary small mb-0">Estructuración de navegación y catálogos.</p>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setShowCategoryModal(true)}>
                <i className="bi bi-plus-circle me-1"></i> Nueva Categoría
              </button>
            </div>

            <div className="row g-3">
              {categoriesList.map((cat) => (
                <div key={cat.id} className="col-12 col-sm-6 col-md-4">
                  <div className="card border p-3 d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded bg-light p-2 text-primary fs-4">
                        <i className={`bi ${cat.icon || 'bi-tag'}`}></i>
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark mb-0">{cat.label}</h6>
                        <small className="text-muted">ID: {cat.id}</small>
                      </div>
                    </div>
                    <span className="badge bg-secondary-subtle text-secondary">Activa</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. MÓDULO USUARIOS (FIGURA 10) */}
        {activeModule === 'usuarios' && (
          <div className="bg-white p-4 rounded-3 border shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 className="fw-bold text-dark mb-0">Gestión de Usuarios y Roles</h4>
                <p className="text-secondary small mb-0">Control de acceso y perfiles del sistema.</p>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light small text-muted">
                  <tr>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Rol Asignado</th>
                    <th>Compras Realizadas</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usr) => (
                    <tr key={usr.id}>
                      <td className="fw-semibold small text-dark">{usr.nombre}</td>
                      <td className="small text-secondary">{usr.email}</td>
                      <td>
                        <span className={`badge ${usr.rol === 'ADMIN' ? 'bg-danger' : usr.rol === 'OPERADOR' ? 'bg-primary' : usr.rol === 'REPARTIDOR' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                          {usr.rol}
                        </span>
                      </td>
                      <td className="small">{usr.compras} pedidos</td>
                      <td><span className="badge bg-success-subtle text-success">{usr.estado}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 7. MÓDULO REPORTES */}
        {activeModule === 'reportes' && (
          <div className="bg-white p-4 rounded-3 border shadow-sm">
            <h4 className="fw-bold text-dark mb-3">Reportes y Estadísticas de Despacho</h4>
            <div className="row g-4 mb-4">
              <div className="col-12 col-md-6">
                <div className="p-3 border rounded-3 bg-light">
                  <h6 className="fw-bold text-dark mb-2">Ventas por Tipo de Cilindro (Mes Actual)</h6>
                  <ul className="list-group list-group-flush small">
                    <li className="list-group-item bg-transparent d-flex justify-content-between">
                      <span>Cilindro 15 Kg (Familiar)</span>
                      <strong className="text-primary">640 unidades (52%)</strong>
                    </li>
                    <li className="list-group-item bg-transparent d-flex justify-content-between">
                      <span>Cilindro 11 Kg (Cocina / Estufa)</span>
                      <strong className="text-primary">380 unidades (31%)</strong>
                    </li>
                    <li className="list-group-item bg-transparent d-flex justify-content-between">
                      <span>Cilindro 45 Kg (Comercial / Panaderías)</span>
                      <strong className="text-primary">120 unidades (10%)</strong>
                    </li>
                    <li className="list-group-item bg-transparent d-flex justify-content-between">
                      <span>Cilindro 5 Kg (Portátil / Camping)</span>
                      <strong className="text-primary">94 unidades (7%)</strong>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="p-3 border rounded-3 bg-light">
                  <h6 className="fw-bold text-dark mb-2">Eficiencia de Tiempos de Entrega Chillán</h6>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between small mb-1">
                      <span>Menos de 30 minutos (Express)</span>
                      <span className="fw-bold text-success">88%</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div className="progress-bar bg-success" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between small mb-1">
                      <span>Entre 30 y 45 minutos</span>
                      <span className="fw-bold text-warning">12%</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div className="progress-bar bg-warning" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 8. MÓDULO PERFIL */}
        {activeModule === 'perfil' && (
          <div className="bg-white p-4 rounded-3 border shadow-sm" style={{ maxWidth: '600px' }}>
            <h4 className="fw-bold text-dark mb-3">Perfil de Administrador</h4>
            <div className="mb-3">
              <label className="form-label small text-muted">Nombre de Usuario</label>
              <input type="text" className="form-control" defaultValue={currentUser?.name || 'Marta Solís (Administradora)'} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label small text-muted">Correo Corporativo</label>
              <input type="email" className="form-control" defaultValue={currentUser?.email || 'admin@gaselvolcan.cl'} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label small text-muted">Rol en Sistema</label>
              <input type="text" className="form-control" defaultValue="ADMINISTRADOR GENERAL (RBAC)" readOnly />
            </div>
            <div className="alert alert-info small mb-0">
              <i className="bi bi-shield-lock-fill me-1"></i> Sesión corporativa activa con privilegios de gestión total (RBAC).
            </div>
          </div>
        )}
      </div>

      {/* MODAL: MOSTRAR BOLETA (FIGURA 10) */}
      {selectedBoleta && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title fs-6 fw-bold">
                  <i className="bi bi-receipt me-2"></i>
                  Boleta Electrónica {selectedBoleta.boletaNum}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedBoleta(null)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="text-center pb-3 border-bottom mb-3">
                  <h6 className="fw-bold text-dark mb-0">DISTRIBUIDORA GAS EL VOLCÁN LTDA.</h6>
                  <small className="text-muted d-block">RUT: 77.291.800-4 | Giro: Distribución de Combustibles</small>
                  <small className="text-muted d-block">Av. Brasil 340, Chillán, Región de Ñuble</small>
                </div>

                <div className="row g-2 small mb-3">
                  <div className="col-6"><strong>N° Orden:</strong> {selectedBoleta.id}</div>
                  <div className="col-6 text-end"><strong>Fecha:</strong> {selectedBoleta.fecha}</div>
                  <div className="col-12"><strong>Cliente:</strong> {selectedBoleta.cliente} ({selectedBoleta.rut})</div>
                  <div className="col-12"><strong>Dirección:</strong> {selectedBoleta.direccion}</div>
                </div>

                <table className="table table-sm small align-middle mb-3">
                  <thead className="table-light">
                    <tr>
                      <th>Cant.</th>
                      <th>Detalle</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBoleta.items.map((it, idx) => (
                      <tr key={idx}>
                        <td>{it.quantity}</td>
                        <td>{it.name}</td>
                        <td className="text-end">{formatCurrency(it.price * it.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="bg-light p-3 rounded small">
                  <div className="d-flex justify-content-between mb-1">
                    <span>Monto Neto:</span>
                    <span>{formatCurrency(Math.round(selectedBoleta.total / 1.19))}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>19% IVA:</span>
                    <span>{formatCurrency(selectedBoleta.total - Math.round(selectedBoleta.total / 1.19))}</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold border-top pt-1 fs-6 text-dark">
                    <span>Total Boleta:</span>
                    <span className="text-primary">{formatCurrency(selectedBoleta.total)}</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-light">
                <button className="btn btn-secondary btn-sm" onClick={() => setSelectedBoleta(null)}>
                  Cerrar
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => window.print()}>
                  <i className="bi bi-printer me-1"></i> Imprimir Boleta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NUEVO / EDITAR PRODUCTO (FIGURA 10) */}
      {showProductModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <form onSubmit={handleSaveProduct}>
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title fs-6 fw-bold">
                    <i className="bi bi-box-seam me-2"></i>
                    {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowProductModal(false)}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Nombre del Producto</label>
                    <input
                      type="text"
                      className="form-control"
                      value={productFormData.name}
                      onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Categoría</label>
                      <select
                        className="form-select"
                        value={productFormData.category}
                        onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                      >
                        {categoriesList.filter((c) => c.id !== 'todos').map((c) => (
                          <option key={c.id} value={c.label}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Precio (CLP)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={productFormData.price}
                        onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                        required
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Stock en Bodega</label>
                    <input
                      type="number"
                      className="form-control"
                      value={productFormData.stock}
                      onChange={(e) => setProductFormData({ ...productFormData, stock: e.target.value })}
                      required
                      min="0"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Descripción</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={productFormData.description}
                      onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer bg-light">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowProductModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    <i className="bi bi-save me-1"></i> Guardar Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NUEVA CATEGORÍA (FIGURA 10) */}
      {showCategoryModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content border-0 shadow">
              <form onSubmit={handleCreateCategory}>
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title fs-6 fw-bold">Nueva Categoría</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowCategoryModal(false)}
                  ></button>
                </div>
                <div className="modal-body p-3">
                  <label className="form-label small fw-semibold">Nombre de Categoría</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newCategoryLabel}
                    onChange={(e) => setNewCategoryLabel(e.target.value)}
                    placeholder="Ej. Calefacción"
                    required
                  />
                </div>
                <div className="modal-footer bg-light">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowCategoryModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
