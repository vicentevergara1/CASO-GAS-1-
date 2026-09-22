import React, { useState } from 'react';
import { formatCurrency } from '../utils/currency';
import { ORDER_STATUSES } from '../utils/orderWorkflow';

export default function AdminDashboard({ currentUser }) {
  const [activeTab, setActiveTab] = useState('pedidos'); // 'pedidos', 'usuarios', 'stock'

  // Lista simulada de pedidos del día en Chillán
  const [pedidos, setPedidos] = useState([
    {
      id: 'VOL-8492',
      cliente: 'Catalina Fuentes Morales',
      direccion: 'Calle Arauco 450, Chillán',
      telefono: '+56 9 8765 4321',
      cilindros: '1x 15 Kg',
      total: 16000,
      estado: ORDER_STATUSES.EN_CAMINO,
      repartidor: 'Juan Pérez',
      camion: 'Camión 1',
      hora: '10:15',
    },
    {
      id: 'VOL-8491',
      cliente: 'Manuel Beltrán Silva',
      direccion: 'Av. Collín 890, Chillán',
      telefono: '+56 9 7654 3210',
      cilindros: '2x 11 Kg + 1x Regulador',
      total: 32990,
      estado: ORDER_STATUSES.ASIGNADO,
      repartidor: 'Carlos Muñoz',
      camion: 'Camión 2',
      hora: '10:02',
    },
    {
      id: 'VOL-8490',
      cliente: 'Panadería Ñuble Central',
      direccion: 'Maipón 320, Chillán',
      telefono: '+56 42 221 4455',
      cilindros: '1x 45 Kg (Industrial)',
      total: 45000,
      estado: ORDER_STATUSES.RECIBIDO,
      repartidor: 'Sin Asignar',
      camion: 'Pendiente',
      hora: '09:48',
    },
    {
      id: 'VOL-8489',
      cliente: 'Patricia Valenzuela',
      direccion: 'Villa Los Volcanes Pje 4, Chillán',
      telefono: '+56 9 6543 2109',
      cilindros: '1x 5 Kg',
      total: 6500,
      estado: ORDER_STATUSES.ENTREGADO,
      repartidor: 'Juan Pérez',
      camion: 'Camión 1',
      hora: '09:15',
    },
  ]);

  // Lista de usuarios RBAC
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Marta Solís', email: 'admin@elvolcan.cl', rol: 'Administrador', estado: 'Activo' },
    { id: 2, nombre: 'Lorena Navarrete', email: 'operadora@elvolcan.cl', rol: 'Operadora', estado: 'Activo' },
    { id: 3, nombre: 'Juan Pérez', email: 'juan.perez@elvolcan.cl', rol: 'Repartidor', estado: 'Activo' },
    { id: 4, nombre: 'Carlos Muñoz', email: 'carlos.munoz@elvolcan.cl', rol: 'Repartidor', estado: 'Activo' },
    { id: 5, nombre: 'Rodrigo Soto', email: 'rodrigo.soto@elvolcan.cl', rol: 'Repartidor', estado: 'Activo' },
  ]);

  // Asignar chofer a un pedido
  const handleAssignDriver = (orderId, driverName, truckName) => {
    setPedidos((prev) =>
      prev.map((p) => {
        if (p.id === orderId) {
          return {
            ...p,
            repartidor: driverName,
            camion: truckName,
            estado: ORDER_STATUSES.ASIGNADO,
          };
        }
        return p;
      })
    );
  };

  // Cambiar estado de pedido
  const handleChangeStatus = (orderId, newStatus) => {
    setPedidos((prev) =>
      prev.map((p) => {
        if (p.id === orderId) {
          return { ...p, estado: newStatus };
        }
        return p;
      })
    );
  };

  // Métricas del día
  const totalVentas = pedidos.reduce((acc, p) => acc + p.total, 0);
  const entregados = pedidos.filter((p) => p.estado === ORDER_STATUSES.ENTREGADO).length;
  const pendientes = pedidos.filter((p) => p.estado !== ORDER_STATUSES.ENTREGADO).length;

  return (
    <section className="py-5 bg-white border-bottom">
      <div className="container">
        {/* Cabecera del Panel */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-dark">Módulo React RBAC</span>
              <span className="badge bg-primary">Sesión: {currentUser.role}</span>
            </div>
            <h2 className="h3 fw-bold text-dark mb-0">
              Panel de Control - Distribuidora El Volcán Chillán
            </h2>
            <p className="text-muted small mb-0">
              Digitalización completa del despacho de gas licuado (Resuelve proceso manual de cuaderno).
            </p>
          </div>

          {/* Navegación por Pestañas */}
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-sm ${activeTab === 'pedidos' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('pedidos')}
            >
              <i className="bi bi-card-list me-1"></i> Pedidos del Día ({pedidos.length})
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeTab === 'usuarios' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('usuarios')}
            >
              <i className="bi bi-people me-1"></i> Usuarios y Roles RBAC
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeTab === 'stock' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('stock')}
            >
              <i className="bi bi-boxes me-1"></i> Stock en Bodega
            </button>
          </div>
        </div>

        {/* Tarjetas de Métricas Rápidas */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow-sm bg-light p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small d-block">Ventas de Hoy</span>
                  <span className="h4 fw-bold text-primary mb-0">{formatCurrency(totalVentas)}</span>
                </div>
                <div className="p-2 bg-primary-subtle text-primary rounded-circle">
                  <i className="bi bi-cash-coin fs-4"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow-sm bg-light p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small d-block">Pedidos Activos</span>
                  <span className="h4 fw-bold text-warning mb-0">{pendientes} en curso</span>
                </div>
                <div className="p-2 bg-warning-subtle text-warning rounded-circle">
                  <i className="bi bi-clock-history fs-4"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow-sm bg-light p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small d-block">Entregas Completadas</span>
                  <span className="h4 fw-bold text-success mb-0">{entregados} despachos</span>
                </div>
                <div className="p-2 bg-success-subtle text-success rounded-circle">
                  <i className="bi bi-check2-all fs-4"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card border-0 shadow-sm bg-light p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small d-block">Flota Operativa</span>
                  <span className="h4 fw-bold text-dark mb-0">2 Camiones / 3 Choferes</span>
                </div>
                <div className="p-2 bg-secondary-subtle text-dark rounded-circle">
                  <i className="bi bi-truck fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 1: Gestión de Pedidos del Día */}
        {activeTab === 'pedidos' && (
          <div className="card border shadow-sm">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="h6 fw-bold mb-0 text-dark">
                <i className="bi bi-list-task text-primary me-2"></i> Lista de Despachos del Turno Actual
              </h5>
              <span className="small text-muted">Operadora: Asignación y cambio de estado en tiempo real</span>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 small">
                <thead className="table-light">
                  <tr>
                    <th>ID Pedido</th>
                    <th>Hora</th>
                    <th>Cliente / Dirección</th>
                    <th>Detalle Cilindros</th>
                    <th>Monto</th>
                    <th>Estado Actual</th>
                    <th>Repartidor / Camión</th>
                    <th className="text-end">Acciones Operadora</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((p) => (
                    <tr key={p.id}>
                      <td className="fw-bold text-primary">{p.id}</td>
                      <td>{p.hora}</td>
                      <td>
                        <strong className="text-dark d-block">{p.cliente}</strong>
                        <span className="text-muted">{p.direccion}</span>
                      </td>
                      <td>{p.cilindros}</td>
                      <td className="fw-bold">{formatCurrency(p.total)}</td>
                      <td>
                        <span
                          className={`badge ${
                            p.estado === ORDER_STATUSES.ENTREGADO
                              ? 'bg-success'
                              : p.estado === ORDER_STATUSES.EN_CAMINO
                              ? 'bg-info text-dark'
                              : p.estado === ORDER_STATUSES.ASIGNADO
                              ? 'bg-warning text-dark'
                              : 'bg-secondary'
                          }`}
                        >
                          {p.estado}
                        </span>
                      </td>
                      <td>
                        <div className="fw-semibold text-dark">{p.repartidor}</div>
                        <span className="text-muted small" style={{ fontSize: '0.72rem' }}>
                          {p.camion}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          {p.estado === ORDER_STATUSES.RECIBIDO && (
                            <button
                              type="button"
                              className="btn btn-outline-primary"
                              onClick={() => handleAssignDriver(p.id, 'Juan Pérez', 'Camión 1')}
                              title="Asignar a Juan Pérez"
                            >
                              Asignar Camión 1
                            </button>
                          )}
                          {p.estado === ORDER_STATUSES.ASIGNADO && (
                            <button
                              type="button"
                              className="btn btn-outline-info"
                              onClick={() => handleChangeStatus(p.id, ORDER_STATUSES.EN_CAMINO)}
                            >
                              Marcar en Ruta
                            </button>
                          )}
                          {p.estado === ORDER_STATUSES.EN_CAMINO && (
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              onClick={() => handleChangeStatus(p.id, ORDER_STATUSES.ENTREGADO)}
                            >
                              Completar Entrega
                            </button>
                          )}
                          {p.estado === ORDER_STATUSES.ENTREGADO && (
                            <span className="text-success small fw-semibold">
                              <i className="bi bi-check-circle-fill me-1"></i> Conforme
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Usuarios y Roles RBAC */}
        {activeTab === 'usuarios' && (
          <div className="card border shadow-sm">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="h6 fw-bold mb-0 text-dark">
                <i className="bi bi-shield-check text-primary me-2"></i> Gestión de Usuarios y Permisos RBAC
              </h5>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => alert('Función demostrativa: En la versión final se conecta con Spring Boot /api/usuarios')}
              >
                <i className="bi bi-plus-circle me-1"></i> Nuevo Usuario
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 small">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre Completo</th>
                    <th>Correo Corporativo</th>
                    <th>Rol en el Sistema</th>
                    <th>Permisos Asignados</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.id}>
                      <td className="fw-bold">{u.id}</td>
                      <td className="fw-semibold text-dark">{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>
                        <span
                          className={`badge ${
                            u.rol === 'Administrador'
                              ? 'bg-danger'
                              : u.rol === 'Operadora'
                              ? 'bg-primary'
                              : 'bg-secondary'
                          }`}
                        >
                          {u.rol}
                        </span>
                      </td>
                      <td className="text-muted">
                        {u.rol === 'Administrador' && 'Acceso total: gestión usuarios, reportes y configuración'}
                        {u.rol === 'Operadora' && 'Recepción de llamadas, asignación a choferes y seguimiento'}
                        {u.rol === 'Repartidor' && 'Visualización de ruta asignada y confirmación de entrega'}
                      </td>
                      <td>
                        <span className="badge bg-success-subtle text-success">{u.estado}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Stock en Bodega */}
        {activeTab === 'stock' && (
          <div className="card border shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="h6 fw-bold mb-0 text-dark">
                <i className="bi bi-box-seam text-primary me-2"></i> Inventario de Cilindros y Accesorios (Bodega Chillán)
              </h5>
            </div>
            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="p-3 border rounded bg-light text-center">
                    <img src="/assets/images/5kg.png" alt="5kg" style={{ height: '60px' }} className="mb-2" />
                    <h6 className="fw-bold mb-1">Cilindro 5 Kg</h6>
                    <div className="h4 text-success fw-bold mb-1">45 unid.</div>
                    <span className="badge bg-success-subtle text-success">Stock Óptimo</span>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="p-3 border rounded bg-light text-center">
                    <img src="/assets/images/11kg.png" alt="11kg" style={{ height: '60px' }} className="mb-2" />
                    <h6 className="fw-bold mb-1">Cilindro 11 Kg</h6>
                    <div className="h4 text-success fw-bold mb-1">80 unid.</div>
                    <span className="badge bg-success-subtle text-success">Stock Óptimo</span>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="p-3 border rounded bg-light text-center">
                    <img src="/assets/images/15kg.png" alt="15kg" style={{ height: '60px' }} className="mb-2" />
                    <h6 className="fw-bold mb-1">Cilindro 15 Kg</h6>
                    <div className="h4 text-primary fw-bold mb-1">120 unid.</div>
                    <span className="badge bg-primary-subtle text-primary">Alta Demanda</span>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="p-3 border rounded bg-light text-center">
                    <img src="/assets/images/45kg.png" alt="45kg" style={{ height: '60px' }} className="mb-2" />
                    <h6 className="fw-bold mb-1">Cilindro 45 Kg</h6>
                    <div className="h4 text-warning fw-bold mb-1">25 unid.</div>
                    <span className="badge bg-warning-subtle text-warning">Industrial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
