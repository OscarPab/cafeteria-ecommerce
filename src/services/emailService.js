import api from './api';

const emailService = {
    // Enviar confirmación de pedido
    enviarConfirmacionPedido: async (ventaId) => {
        try {
            const response = await api.post(`/email/confirmacion-pedido/${ventaId}`);
            return response.data;
        } catch (error) {
            console.error('Error enviando confirmación de pedido:', error);
            throw error;
        }
    },

    // Enviar confirmación de tour
    enviarConfirmacionTour: async (tourId) => {
        try {
            const response = await api.post(`/email/confirmacion-tour/${tourId}`);
            return response.data;
        } catch (error) {
            console.error('Error enviando confirmación de tour:', error);
            throw error;
        }
    },

    // Enviar correo manual
    enviarCorreoManual: async (data) => {
        try {
            const response = await api.post('/email/manual', data);
            return response.data;
        } catch (error) {
            console.error('Error enviando correo manual:', error);
            throw error;
        }
    },

    // Enviar promoción a clientes
    enviarPromocion: async (promocionId, clientes) => {
        try {
            const response = await api.post('/email/promocion', {
                promocionId,
                clientes
            });
            return response.data;
        } catch (error) {
            console.error('Error enviando promoción:', error);
            throw error;
        }
    },

    // Obtener historial de comunicaciones
    getHistorialComunicaciones: async (clienteId = null) => {
        try {
            const url = clienteId 
                ? `/email/historial/${clienteId}` 
                : '/email/historial';
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            console.error('Error obteniendo historial:', error);
            throw error;
        }
    }
};

export default emailService;