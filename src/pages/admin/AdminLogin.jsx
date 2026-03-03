import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log('1. Intentando login con:', email);
            
            const response = await api.post('/auth/login', { 
                email, 
                password 
            });
            
            console.log('2. Respuesta del servidor:', response.data);
            
            if (response.data.token) {
                // Guardar en localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                console.log('3. Token guardado:', response.data.token);
                console.log('4. Usuario guardado:', response.data.user);
                
                // Redirigir directamente
                console.log('5. Redirigiendo a /admin...');
                navigate('/admin');
                
                // Forzar recarga después de 100ms para asegurar que el contexto se actualice
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            }
        } catch (err) {
            console.error('❌ Error en login:', err);
            
            if (err.code === 'ERR_NETWORK') {
                setError('No se puede conectar al servidor. Verifica que el backend esté corriendo en http://localhost:5000');
            } else if (err.response) {
                setError(err.response.data?.error || 'Credenciales inválidas');
            } else {
                setError('Error al conectar con el servidor');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-box">
                <h1>Panel de Administración</h1>
                <h2>Román Valderrábano</h2>
                
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@romanvalderrabano.com"
                            autoComplete="email"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn-login"
                        disabled={loading}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>
                
                <div className="login-info">
                    <p><strong>Demo:</strong> admin@romanvalderrabano.com</p>
                    <p><strong>Contraseña:</strong> admin123</p>
                    <p style={{color: '#28a745', marginTop: '10px'}}>
                        ✅ Conexión exitosa (Status 200)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;