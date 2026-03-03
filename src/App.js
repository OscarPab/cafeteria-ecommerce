import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Tours from './pages/Tours';
import Checkout from './pages/Checkout';
import Restaurante from './pages/Restaurante';
import VentaTonelada from './pages/VentaTonelada';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTours from './pages/admin/AdminTours';
import AdminVentas from './pages/admin/AdminVentas';
import AdminEntregas from './pages/admin/AdminEntregas';
import AdminProductos from './pages/admin/AdminProductos';
import AdminPromociones from './pages/admin/AdminPromociones';
import AdminRoute from './components/AdminRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/restaurante" element={<Restaurante />} />
                <Route path="/venta-tonelada" element={<VentaTonelada />} />
                
                {/* Admin Routes - sin Navbar automáticamente por el AdminRoute */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/tours" element={<AdminRoute><AdminTours /></AdminRoute>} />
                <Route path="/admin/ventas" element={<AdminRoute><AdminVentas /></AdminRoute>} />
                <Route path="/admin/entregas" element={<AdminRoute><AdminEntregas /></AdminRoute>} />
                <Route path="/admin/productos" element={<AdminRoute><AdminProductos /></AdminRoute>} />
                <Route path="/admin/promociones" element={<AdminRoute><AdminPromociones /></AdminRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;