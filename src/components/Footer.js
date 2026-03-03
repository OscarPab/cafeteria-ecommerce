import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';

const Footer = () => {
  const openSocial = (url) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <img src={logo} alt="Café El Catador" className="footer-logo-img" />
            <h3>Café El Catador</h3>
            <p>Román Valderrábano</p>
          </div>
          <p className="footer-description">
            Desde 1920 cultivando los mejores granos de café con tradición y pasión. 
            Cocina en barro ancestral que intensifica los sabores.
          </p>
        </div>

        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul className="footer-links">
            <li><Link to="/products"><span>→</span> Productos</Link></li>
            <li><Link to="/restaurante"><span>→</span> Restaurante</Link></li>
            <li><Link to="/tours"><span>→</span> Tours</Link></li>
            <li><Link to="/venta-tonelada"><span>→</span> Venta por Tonelada</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Categorías</h4>
          <ul className="footer-links">
            <li><Link to="/products?categoria=grano"><span>→</span> Café en Grano</Link></li>
            <li><Link to="/products?categoria=molido"><span>→</span> Café Molido</Link></li>
            <li><Link to="/products?categoria=licor"><span>→</span> Licor de Café</Link></li>
            <li><Link to="/products?categoria=galletas"><span>→</span> Galletas</Link></li>
            <li><Link to="/products?categoria=bombones"><span>→</span> Bombones</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <ul className="footer-contact">
            <li>
              <span>📍</span>
              <div>
                <strong>Café El Catador</strong><br />
                Carretera Federal México-Veracruz Km 45<br />
                Coatepec, Veracruz, México
              </div>
            </li>
            <li>
              <span>📞</span>
              <div>
                <strong>Teléfono:</strong><br />
                +52 (228) 123-4567
              </div>
            </li>
            <li>
              <span>✉️</span>
              <div>
                <strong>Email:</strong><br />
                info@cafeelcatador.com
              </div>
            </li>
            <li>
              <span>⏰</span>
              <div>
                <strong>Horario:</strong><br />
                Lun-Vie: 8am - 6pm<br />
                Sáb: 9am - 2pm
              </div>
            </li>
          </ul>

          <div className="footer-social">
            <a href="#" className="social-icon" onClick={(e) => { e.preventDefault(); openSocial('https://facebook.com'); }}>📘</a>
            <a href="#" className="social-icon" onClick={(e) => { e.preventDefault(); openSocial('https://instagram.com'); }}>📷</a>
            <a href="#" className="social-icon" onClick={(e) => { e.preventDefault(); openSocial('https://twitter.com'); }}>🐦</a>
            <a href="#" className="social-icon" onClick={(e) => { e.preventDefault(); openSocial('https://youtube.com'); }}>▶️</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Café El Catador - Román Valderrábano. Todos los derechos reservados.</p>
        <p>Diseñado con <span>❤️</span> y <span>☕</span> para los amantes del café</p>
      </div>
    </footer>
  );
};

export default Footer;