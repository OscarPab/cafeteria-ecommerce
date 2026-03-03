import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './admin.css';

const AdminVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarVentas();
    }, []);

    const cargarVentas = async () => {
        try {
            const response = await api.get('/ventas');
            setVentas(response.data);
        } catch (error) {
            console.error('Error cargando ventas:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="admin-page">
            <h1>Gestión de Ventas</h1>
            
            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Folio</th>
                            <th>Cliente</th>
                            <th>Total</th>
                            <th>Método Pago</th>
                            <th>Estatus</th>
                            <th>Guía</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map(venta => (
                            <tr key={venta.id}>
                                <td>{venta.folio}</td>
                                <td>{venta.cliente_nombre}</td>
                                <td>${venta.total}</td>
                                <td>{venta.metodo_pago}</td>
                                <td>
                                    <span className={`status-badge ${venta.estatus}`}>
                                        {venta.estatus}
                                    </span>
                                </td>
                                <td>{venta.guia_estafeta || 'Pendiente'}</td>
                                <td>{new Date(venta.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminVentas;