import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/images/logo.jpg';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(true); // Siempre true para fondo sólido
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Calcular cantidad total en carrito
  const cartCount = cartItems?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;

  useEffect(() => {
    // Mantener navbar siempre con fondo sólido
    setIsScrolled(true);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          <div className="logo-wrapper">
            <img src={logo} alt="Café El Catador" className="nav-logo-img" />
            <div className="logo-text">
              <span className="logo-main">Café El Catador</span>
              <span className="logo-sub">Román Valderrábano</span>
            </div>
          </div>
        </Link>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-icon">🏠</span>
              Inicio
            </Link>
          </li>

          <li className={`nav-item dropdown ${activeDropdown === 1 ? 'active' : ''}`}>
            <span 
              className="nav-link" 
              onClick={() => toggleDropdown(1)}
            >
              <span className="nav-icon">☕</span>
              Café
              <span className="dropdown-icon">▼</span>
            </span>
            <ul className="dropdown-menu">
              <li><Link to="/products?categoria=grano" onClick={() => setIsMenuOpen(false)}>Café en Grano</Link></li>
              <li><Link to="/products?categoria=molido" onClick={() => setIsMenuOpen(false)}>Café Molido</Link></li>
              <li><Link to="/products?categoria=licor" onClick={() => setIsMenuOpen(false)}>Licor de Café</Link></li>
              <li><Link to="/products?categoria=galletas" onClick={() => setIsMenuOpen(false)}>Galletas</Link></li>
              <li><Link to="/products?categoria=bombones" onClick={() => setIsMenuOpen(false)}>Bombones</Link></li>
              <li><Link to="/products?categoria=verde" onClick={() => setIsMenuOpen(false)}>Café Verde</Link></li>
            </ul>
          </li>

          <li className="nav-item">
            <Link to="/restaurante" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-icon">🍽️</span>
              Restaurante
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/tours" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-icon">🌿</span>
              Tours
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/venta-tonelada" className="nav-link highlight" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-icon">📦</span>
              Venta x Tonelada
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/cart" className="nav-link cart-link" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-icon">🛒</span>
              Carrito
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
          </li>

          {user ? (
            <li className={`nav-item dropdown user-menu ${activeDropdown === 2 ? 'active' : ''}`}>
              <span 
                className="nav-link user-name" 
                onClick={() => toggleDropdown(2)}
              >
                <span className="nav-icon">👤</span>
                {user.nombre?.split(' ')[0] || 'Admin'}
                <span className="dropdown-icon">▼</span>
              </span>
              <ul className="dropdown-menu">
                {user.rol === 'admin' && (
                  <>
                    <li><Link to="/admin" onClick={() => setIsMenuOpen(false)}>📊 Panel de Control</Link></li>
                    <li><Link to="/admin/productos" onClick={() => setIsMenuOpen(false)}>📦 Productos</Link></li>
                    <li><Link to="/admin/ventas" onClick={() => setIsMenuOpen(false)}>💰 Ventas</Link></li>
                    <li><Link to="/admin/tours" onClick={() => setIsMenuOpen(false)}>🎫 Tours</Link></li>
                    <li><Link to="/admin/promociones" onClick={() => setIsMenuOpen(false)}>🎁 Promociones</Link></li>
                  </>
                )}
                <li><button onClick={() => { logout(); setIsMenuOpen(false); }}>🚪 Cerrar Sesión</button></li>
              </ul>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/admin/login" className="nav-link login-btn" onClick={() => setIsMenuOpen(false)}>
                <span className="nav-icon">🔐</span>
                Admin
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;