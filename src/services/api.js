import axios from 'axios';

// Usar variable de entorno o default a localhost:5000
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('🔌 Conectando a API:', API_URL);

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 segundos de timeout
});

// Interceptor para añadir token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('📤 Request:', config.method.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('❌ Request error:', error);
        return Promise.reject(error);
    }
);

// Interceptor para respuestas
api.interceptors.response.use(
    (response) => {
        console.log('📥 Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('❌ Response error:', error.message);
        if (error.code === 'ECONNABORTED') {
            console.error('⏰ Timeout - El servidor no respondió');
        }
        if (!error.response) {
            console.error('🔌 ¿El backend está corriendo en http://localhost:5000?');
        }
        return Promise.reject(error);
    }
);

export default api;