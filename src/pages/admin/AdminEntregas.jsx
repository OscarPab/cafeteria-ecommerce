import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './admin.css';

const AdminEntregas = () => {
    const [ventas, setVentas] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        cargarVentas();
    }, []);

    const cargarVentas = async () => {
        try {
            const response = await api.get('/ventas');
            setVentas(response.data.filter(v => v.estatus === 'pagado'));
        } catch (error) {
            console.error('Error cargando ventas:', error);
        }
    };

    const generarGuia = async (ventaId) => {
        try {
            await api.post('/estafeta/generar-guia', {
                venta_id: ventaId,
                datosEnvio: {
                    fecha_programada: selectedDate,
                    peso: 1,
                    costo: 150
                }
            });
            cargarVentas();
            alert('Guía generada exitosamente');
        } catch (error) {
            console.error('Error generando guía:', error);
            alert('Error al generar guía');
        }
    };

    const programarEntrega = async (ventaId) => {
        try {
            await api.put(`/ventas/${ventaId}/asignar-entrega`, {
                fecha_programada: selectedDate
            });
            cargarVentas();
        } catch (error) {
            console.error('Error programando entrega:', error);
        }
    };

    return (
        <div className="admin-page">
            <h1>Programación de Entregas</h1>
            
            <div className="date-selector">
                <label>Fecha de recolección:</label>
                <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                />
            </div>

            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Folio</th>
                            <th>Cliente</th>
                            <th>Dirección</th>
                            <th>Total</th>
                            <th>Fecha Entrega</th>
                            <th>Guía</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map(venta => (
                            <tr key={venta.id}>
                                <td>{venta.folio}</td>
                                <td>{venta.cliente_nombre}</td>
                                <td>
                                    {venta.cliente_direccion}, {venta.cliente_ciudad} CP:{venta.cliente_cp}
                                </td>
                                <td>${venta.total}</td>
                                <td>
                                    {venta.fecha_entrega_asignada || 
                                        <button onClick={() => programarEntrega(venta.id)}>
                                            Programar
                                        </button>
                                    }
                                </td>
                                <td>{venta.guia_estafeta || 'Pendiente'}</td>
                                <td>
                                    {!venta.guia_estafeta && venta.fecha_entrega_asignada && (
                                        <button onClick={() => generarGuia(venta.id)}>
                                            Generar Guía
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminEntregas;