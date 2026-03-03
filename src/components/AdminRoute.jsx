import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    console.log('AdminRoute - user:', user);
    console.log('AdminRoute - loading:', loading);
    console.log('AdminRoute - token:', localStorage.getItem('token'));

    if (loading) {
        return <div className="loading">Cargando...</div>;
    }

    if (!user) {
        console.log('No hay usuario, redirigiendo a login');
        return <Navigate to="/admin/login" />;
    }

    console.log('Usuario autenticado, mostrando dashboard');
    return children;
};

export default AdminRoute;