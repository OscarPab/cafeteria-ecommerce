import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './admin.css';

const AdminTours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarTours();
    }, []);

    const cargarTours = async () => {
        try {
            const response = await api.get('/tours');
            setTours(response.data);
        } catch (error) {
            console.error('Error cargando tours:', error);
        } finally {
            setLoading(false);
        }
    };

    const cambiarEstatus = async (id, nuevoEstatus) => {
        try {
            await api.put(`/tours/${id}`, { estatus: nuevoEstatus });
            cargarTours();
        } catch (error) {
            console.error('Error actualizando tour:', error);
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="admin-page">
            <h1>Gestión de Tours</h1>
            
            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Fecha</th>
                            <th>Personas</th>
                            <th>Estatus</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours.map(tour => (
                            <tr key={tour.id}>
                                <td>#{tour.id}</td>
                                <td>{tour.nombre}</td>
                                <td>{tour.email}</td>
                                <td>{tour.telefono}</td>
                                <td>{new Date(tour.fecha_reserva).toLocaleDateString()}</td>
                                <td>{tour.personas}</td>
                                <td>
                                    <select 
                                        value={tour.estatus}
                                        onChange={(e) => cambiarEstatus(tour.id, e.target.value)}
                                        className={`status-select ${tour.estatus}`}
                                    >
                                        <option value="pendiente">Pendiente</option>
                                        <option value="confirmado">Confirmado</option>
                                        <option value="completado">Completado</option>
                                        <option value="cancelado">Cancelado</option>
                                    </select>
                                </td>
                                <td>
                                    <button className="btn-icon" onClick={() => window.open(`mailto:${tour.email}`)}>📧</button>
                                    <button className="btn-icon" onClick={() => window.open(`tel:${tour.telefono}`)}>📞</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminTours;