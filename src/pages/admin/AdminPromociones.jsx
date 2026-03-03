import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import emailService from '../../services/emailService';
import './admin.css';

const AdminPromociones = () => {
    const [promociones, setPromociones] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showEnvioForm, setShowEnvioForm] = useState(false);
    const [promocionSeleccionada, setPromocionSeleccionada] = useState(null);
    const [clientesSeleccionados, setClientesSeleccionados] = useState([]);
    const [stats, setStats] = useState({});
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        tipo: 'porcentaje',
        valor: '',
        descuento: '',
        fecha_inicio: '',
        fecha_fin: '',
        productos_incluidos: '',
        minimo_compra: 0,
        maximo_usos: '',
        imagen: '',
        activa: true
    });

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            setLoading(true);
            const [promosRes, clientesRes, statsRes] = await Promise.all([
                api.get('/promociones'),
                api.get('/promociones/clientes?filtros=todos'),
                api.get('/promociones/estadisticas')
            ]);
            
            setPromociones(promosRes.data);
            setClientes(clientesRes.data);
            setStats(statsRes.data);
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await api.put(`/promociones/${formData.id}`, formData);
                alert('Promoción actualizada');
            } else {
                await api.post('/promociones', formData);
                alert('Promoción creada');
            }
            setShowForm(false);
            cargarDatos();
            setFormData({
                titulo: '',
                descripcion: '',
                tipo: 'porcentaje',
                valor: '',
                descuento: '',
                fecha_inicio: '',
                fecha_fin: '',
                productos_incluidos: '',
                minimo_compra: 0,
                maximo_usos: '',
                imagen: '',
                activa: true
            });
        } catch (error) {
            console.error('Error guardando promoción:', error);
            alert('Error al guardar promoción');
        }
    };

    const handleEdit = (promo) => {
        setFormData(promo);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar esta promoción?')) {
            try {
                await api.delete(`/promociones/${id}`);
                cargarDatos();
                alert('Promoción eliminada');
            } catch (error) {
                console.error('Error eliminando:', error);
            }
        }
    };

    const handleEnviarPromocion = async () => {
        if (!promocionSeleccionada || clientesSeleccionados.length === 0) {
            alert('Selecciona una promoción y al menos un cliente');
            return;
        }

        try {
            const response = await api.post('/email/promocion', {
                promocionId: promocionSeleccionada,
                clientes: clientesSeleccionados
            });

            alert(`✅ Promoción enviada a ${response.data.total} clientes`);
            setShowEnvioForm(false);
            cargarDatos();
        } catch (error) {
            console.error('Error enviando promoción:', error);
            alert('Error al enviar promoción');
        }
    };

    const toggleClienteSeleccionado = (cliente) => {
        setClientesSeleccionados(prev => {
            const existe = prev.find(c => c.email === cliente.email);
            if (existe) {
                return prev.filter(c => c.email !== cliente.email);
            } else {
                return [...prev, cliente];
            }
        });
    };

    const seleccionarTodos = () => {
        if (clientesSeleccionados.length === clientes.length) {
            setClientesSeleccionados([]);
        } else {
            setClientesSeleccionados(clientes);
        }
    };

    if (loading) return <div className="loading">Cargando...</div>;

    return (
        <div className="admin-promociones">
            <div className="page-header">
                <h1>Gestión de Promociones</h1>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary">
                    {showForm ? 'Cancelar' : '+ Nueva Promoción'}
                </button>
            </div>

            {/* Estadísticas */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Promociones</h3>
                    <p className="stat-number">{stats.total_promociones || 0}</p>
                </div>
                <div className="stat-card">
                    <h3>Activas</h3>
                    <p className="stat-number">{stats.activas || 0}</p>
                </div>
                <div className="stat-card">
                    <h3>Emails Enviados</h3>
                    <p className="stat-number">{stats.total_emails_enviados || 0}</p>
                </div>
                <div className="stat-card">
                    <h3>Clientes</h3>
                    <p className="stat-number">{clientes.length}</p>
                </div>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="promo-form">
                    <h2>{formData.id ? 'Editar' : 'Nueva'} Promoción</h2>
                    
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Título *</label>
                            <input
                                type="text"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleInputChange}
                                required
                                placeholder="Ej: 20% OFF en Cafés Premium"
                            />
                        </div>

                        <div className="form-group">
                            <label>Tipo *</label>
                            <select name="tipo" value={formData.tipo} onChange={handleInputChange}>
                                <option value="porcentaje">Porcentaje</option>
                                <option value="fijo">Monto Fijo</option>
                                <option value="combo">Combo</option>
                                <option value="envio_gratis">Envío Gratis</option>
                            </select>
                        </div>

                        {formData.tipo === 'porcentaje' && (
                            <div className="form-group">
                                <label>Descuento % *</label>
                                <input
                                    type="number"
                                    name="descuento"
                                    value={formData.descuento}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="100"
                                />
                            </div>
                        )}

                        {formData.tipo === 'fijo' && (
                            <div className="form-group">
                                <label>Descuento $ *</label>
                                <input
                                    type="number"
                                    name="valor"
                                    value={formData.valor}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label>Fecha Inicio *</label>
                            <input
                                type="date"
                                name="fecha_inicio"
                                value={formData.fecha_inicio}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Fecha Fin *</label>
                            <input
                                type="date"
                                name="fecha_fin"
                                value={formData.fecha_fin}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Compra Mínima</label>
                            <input
                                type="number"
                                name="minimo_compra"
                                value={formData.minimo_compra}
                                onChange={handleInputChange}
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div className="form-group">
                            <label>Usos Máximos</label>
                            <input
                                type="number"
                                name="maximo_usos"
                                value={formData.maximo_usos}
                                onChange={handleInputChange}
                                min="0"
                                placeholder="Ilimitado si se deja vacío"
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Descripción</label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Detalles de la promoción"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="activa"
                                    checked={formData.activa}
                                    onChange={handleInputChange}
                                />
                                Promoción Activa
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary btn-large">
                        Guardar Promoción
                    </button>
                </form>
            )}

            {/* Lista de Promociones */}
            <div className="promociones-list">
                <h2>Promociones Existentes</h2>
                <div className="promociones-grid">
                    {promociones.map(promo => (
                        <div key={promo.id} className="promo-card">
                            <div className="promo-header">
                                <h3>{promo.titulo}</h3>
                                <span className={`promo-status ${promo.activa ? 'activa' : 'inactiva'}`}>
                                    {promo.activa ? 'Activa' : 'Inactiva'}
                                </span>
                            </div>
                            
                            <p className="promo-descripcion">{promo.descripcion}</p>
                            
                            <div className="promo-detalles">
                                {promo.tipo === 'porcentaje' && (
                                    <div className="promo-badge">{promo.descuento}% OFF</div>
                                )}
                                {promo.tipo === 'fijo' && (
                                    <div className="promo-badge">${promo.valor} OFF</div>
                                )}
                                {promo.tipo === 'envio_gratis' && (
                                    <div className="promo-badge">🚚 Envío Gratis</div>
                                )}
                                
                                <div className="promo-fechas">
                                    <span>📅 {new Date(promo.fecha_inicio).toLocaleDateString()}</span>
                                    <span>→ {new Date(promo.fecha_fin).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="promo-stats">
                                <span>📨 Enviados: {promo.emails_enviados || 0}</span>
                                <span>🔄 Usos: {promo.usos_actuales || 0}/{promo.maximo_usos || '∞'}</span>
                            </div>

                            <div className="promo-acciones">
                                <button onClick={() => handleEdit(promo)} className="btn-icon">
                                    ✏️
                                </button>
                                <button 
                                    onClick={() => {
                                        setPromocionSeleccionada(promo.id);
                                        setShowEnvioForm(true);
                                    }} 
                                    className="btn-icon"
                                    title="Enviar a clientes"
                                >
                                    📧
                                </button>
                                <button onClick={() => handleDelete(promo.id)} className="btn-icon">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal de envío a clientes */}
            {showEnvioForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Enviar Promoción a Clientes</h2>
                        
                        <div className="clientes-selector">
                            <div className="selector-header">
                                <button onClick={seleccionarTodos} className="btn-secondary">
                                    {clientesSeleccionados.length === clientes.length ? 
                                        'Deseleccionar todos' : 'Seleccionar todos'}
                                </button>
                                <span>{clientesSeleccionados.length} clientes seleccionados</span>
                            </div>

                            <div className="clientes-list">
                                {clientes.map(cliente => (
                                    <label key={cliente.email} className="cliente-item">
                                        <input
                                            type="checkbox"
                                            checked={clientesSeleccionados.some(c => c.email === cliente.email)}
                                            onChange={() => toggleClienteSeleccionado(cliente)}
                                        />
                                        <div className="cliente-info">
                                            <strong>{cliente.nombre}</strong>
                                            <span>{cliente.email}</span>
                                            <small>Compras: ${cliente.total_compras || 0}</small>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button onClick={handleEnviarPromocion} className="btn-primary">
                                Enviar a {clientesSeleccionados.length} clientes
                            </button>
                            <button onClick={() => setShowEnvioForm(false)} className="btn-secondary">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPromociones;