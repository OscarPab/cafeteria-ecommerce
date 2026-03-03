import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './admin.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        ventas_hoy: 0,
        ventas_mes: 0,
        tours_pendientes: 0,
        entregas_hoy: 0,
        productos_bajos: 0
    });
    
    const [ventasRecientes, setVentasRecientes] = useState([]);
    const [toursProximos, setToursProximos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarDashboard();
        
        // Actualizar cada 30 segundos
        const intervalo = setInterval(cargarDashboard, 30000);
        return () => clearInterval(intervalo);
    }, []);

    const cargarDashboard = async () => {
        try {
            setLoading(true);
            
            // Obtener ventas
            const ventasRes = await api.get('/ventas');
            const ventas = ventasRes.data;
            
            // Obtener tours
            const toursRes = await api.get('/tours');
            const tours = toursRes.data;
            
            // Calcular estadísticas
            const hoy = new Date().toISOString().split('T')[0];
            const inicioMes = new Date();
            inicioMes.setDate(1);
            const inicioMesStr = inicioMes.toISOString().split('T')[0];
            
            const ventasHoy = ventas.filter(v => 
                v.created_at && v.created_at.startsWith(hoy)
            );
            
            const ventasMes = ventas.filter(v => 
                v.created_at && v.created_at >= inicioMesStr
            );
            
            const entregasHoy = ventas.filter(v => 
                v.fecha_entrega_asignada === hoy
            );
            
            const toursPendientes = tours.filter(t => 
                t.estatus === 'pendiente'
            );
            
            setStats({
                ventas_hoy: ventasHoy.length,
                ventas_mes: ventasMes.length,
                tours_pendientes: toursPendientes.length,
                entregas_hoy: entregasHoy.length,
                ventas_totales: ventas.length,
                tours_totales: tours.length
            });
            
            setVentasRecientes(ventas.slice(0, 5));
            setToursProximos(toursPendientes.slice(0, 5));
            
        } catch (error) {
            console.error('Error cargando dashboard:', error);
            setError('Error al cargar los datos');
            
            // Datos de ejemplo si no hay conexión
            setStats({
                ventas_hoy: 3,
                ventas_mes: 45,
                tours_pendientes: 2,
                entregas_hoy: 1,
                ventas_totales: 150,
                tours_totales: 28
            });
            
            setVentasRecientes([
                { id: 1, folio: 'RV-001', cliente_nombre: 'Juan Pérez', total: 350, estatus: 'pagado' },
                { id: 2, folio: 'RV-002', cliente_nombre: 'María García', total: 280, estatus: 'enviado' },
                { id: 3, folio: 'RV-003', cliente_nombre: 'Carlos López', total: 520, estatus: 'pendiente' }
            ]);
            
            setToursProximos([
                { id: 1, nombre: 'Ana Martínez', fecha_reserva: '2024-03-15', personas: 4, estatus: 'pendiente' },
                { id: 2, nombre: 'Roberto Sánchez', fecha_reserva: '2024-03-16', personas: 2, estatus: 'confirmado' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const formatearFecha = (fecha) => {
        if (!fecha) return 'No asignada';
        return new Date(fecha).toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatearMoneda = (cantidad) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(cantidad || 0);
    };

    if (loading && ventasRecientes.length === 0) {
        return (
            <div className="admin-dashboard loading">
                <div className="spinner"></div>
                <p>Cargando dashboard...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Panel de Administración</h1>
                <p className="bienvenida">Bienvenido, Román Valderrábano</p>
                {error && <div className="error-banner">{error}</div>}
            </div>
            
            {/* Tarjetas de estadísticas */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                        <h3>Ventas Hoy</h3>
                        <p className="stat-number">{stats.ventas_hoy}</p>
                        <span className="stat-label">últimas 24h</span>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-info">
                        <h3>Ventas del Mes</h3>
                        <p className="stat-number">{stats.ventas_mes}</p>
                        <span className="stat-label">total {stats.ventas_totales || 0} general</span>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">🎫</div>
                    <div className="stat-info">
                        <h3>Tours Pendientes</h3>
                        <p className="stat-number">{stats.tours_pendientes}</p>
                        <span className="stat-label">de {stats.tours_totales || 0} totales</span>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">🚚</div>
                    <div className="stat-info">
                        <h3>Entregas Hoy</h3>
                        <p className="stat-number">{stats.entregas_hoy}</p>
                        <span className="stat-label">programadas</span>
                    </div>
                </div>
            </div>

            {/* Acciones rápidas */}
            <div className="quick-actions">
                <h2>Acciones Rápidas</h2>
                <div className="actions-grid">
                    <Link to="/admin/ventas" className="action-card">
                        <span className="action-icon">📋</span>
                        <h3>Ver Ventas</h3>
                        <p>Gestionar pedidos</p>
                    </Link>
                    
                    <Link to="/admin/tours" className="action-card">
                        <span className="action-icon">🎫</span>
                        <h3>Gestionar Tours</h3>
                        <p>{stats.tours_pendientes} pendientes</p>
                    </Link>
                    
                    <Link to="/admin/entregas" className="action-card">
                        <span className="action-icon">🚚</span>
                        <h3>Programar Entregas</h3>
                        <p>{stats.entregas_hoy} para hoy</p>
                    </Link>
                    
                    <Link to="/admin/productos" className="action-card">
                        <span className="action-icon">☕</span>
                        <h3>Productos</h3>
                        <p>Actualizar inventario</p>
                    </Link>
                    
                    <Link to="/admin/configuracion" className="action-card">
                        <span className="action-icon">⚙️</span>
                        <h3>Configuración</h3>
                        <p>Ajustes del sistema</p>
                    </Link>
                    
                    <a 
                        href="http://localhost/phpmyadmin" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="action-card"
                    >
                        <span className="action-icon">🗄️</span>
                        <h3>phpMyAdmin</h3>
                        <p>Base de datos</p>
                    </a>
                </div>
            </div>

            {/* Grid de tablas */}
            <div className="dashboard-grid">
                {/* Ventas recientes */}
                <div className="dashboard-card">
                    <h2>Ventas Recientes</h2>
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Folio</th>
                                    <th>Cliente</th>
                                    <th>Total</th>
                                    <th>Estatus</th>
                                    <th>Envío</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ventasRecientes.map(venta => (
                                    <tr key={venta.id}>
                                        <td>
                                            <Link to={`/admin/ventas/${venta.id}`} className="folio-link">
                                                {venta.folio || `#${venta.id}`}
                                            </Link>
                                        </td>
                                        <td>{venta.cliente_nombre || 'Cliente'}</td>
                                        <td className="monto">{formatearMoneda(venta.total)}</td>
                                        <td>
                                            <span className={`status-badge ${venta.estatus || 'pendiente'}`}>
                                                {venta.estatus || 'pendiente'}
                                            </span>
                                        </td>
                                        <td>
                                            {venta.guia_estafeta ? (
                                                <span className="guia-small" title="Guía generada">
                                                    📦 {venta.guia_estafeta.slice(-6)}
                                                </span>
                                            ) : (
                                                <span className="pendiente">⏳ Pendiente</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {ventasRecientes.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No hay ventas recientes
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Link to="/admin/ventas" className="view-all">
                        Ver todas las ventas →
                    </Link>
                </div>

                {/* Tours próximos */}
                <div className="dashboard-card">
                    <h2>Próximos Tours</h2>
                    <div className="tours-list">
                        {toursProximos.map(tour => (
                            <div key={tour.id} className="tour-item">
                                <div className="tour-info">
                                    <strong>{tour.nombre}</strong>
                                    <span>📅 {formatearFecha(tour.fecha_reserva)}</span>
                                    <span>👥 {tour.personas || 2} personas</span>
                                </div>
                                <span className={`status-badge ${tour.estatus || 'pendiente'}`}>
                                    {tour.estatus || 'pendiente'}
                                </span>
                                <div className="tour-actions">
                                    <button 
                                        className="btn-icon" 
                                        title="Confirmar tour"
                                        onClick={() => alert('Función en desarrollo')}
                                    >
                                        ✅
                                    </button>
                                    <button 
                                        className="btn-icon"
                                        title="Ver detalles"
                                        onClick={() => alert('Función en desarrollo')}
                                    >
                                        👁️
                                    </button>
                                </div>
                            </div>
                        ))}
                        {toursProximos.length === 0 && (
                            <div className="text-center">No hay tours pendientes</div>
                        )}
                    </div>
                    <Link to="/admin/tours" className="view-all">
                        Ver todos los tours →
                    </Link>
                </div>
            </div>

            {/* Actividad reciente */}
            <div className="recent-activity">
                <h2>Actividad Reciente</h2>
                <div className="activity-grid">
                    <div className="activity-card">
                        <h4>Última venta</h4>
                        <p>{ventasRecientes[0]?.cliente_nombre || 'Sin ventas'}</p>
                        <small>{formatearFecha(ventasRecientes[0]?.created_at)}</small>
                    </div>
                    
                    <div className="activity-card">
                        <h4>Próximo tour</h4>
                        <p>{toursProximos[0]?.nombre || 'Sin tours'}</p>
                        <small>{formatearFecha(toursProximos[0]?.fecha_reserva)}</small>
                    </div>
                    
                    <div className="activity-card">
                        <h4>Total ingresos mes</h4>
                        <p className="monto">
                            {formatearMoneda(ventasRecientes.reduce((acc, v) => acc + (v.total || 0), 0))}
                        </p>
                        <small>estimado</small>
                    </div>
                </div>
            </div>

            {/* Atajo a Estafeta */}
            <div className="estafeta-atajo">
                <h3>📦 Integración Estafeta</h3>
                <div className="estafeta-actions">
                    <button className="btn-estafeta" onClick={() => alert('Cotizador en desarrollo')}>
                        Cotizar envío
                    </button>
                    <button className="btn-estafeta" onClick={() => alert('Generador de guías en desarrollo')}>
                        Generar guía
                    </button>
                    <button className="btn-estafeta" onClick={() => alert('Rastreo en desarrollo')}>
                        Rastrear paquete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;