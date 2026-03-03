import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Restaurante = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const menuItems = {
    desayunos: [
      {
        id: 1,
        nombre: 'Huevos al comal con café',
        descripcion: 'Huevos estrellados servidos con salsa de café y frijoles refritos, acompañados de tortillas hechas a mano',
        precio: '$120',
        imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
        tags: ['tradicional', 'desayuno']
      },
      {
        id: 2,
        nombre: 'Chilaquiles con mole de café',
        descripcion: 'Totopos bañados en mole especial con notas de café, crema, queso fresco y cebolla encurtida',
        precio: '$135',
        imagen: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        tags: ['tradicional', 'desayuno']
      },
      {
        id: 3,
        nombre: 'Hot cakes de café',
        descripcion: 'Panqueques con infusión de café, servidos con miel de maple, frutas de temporada y crema batida',
        precio: '$110',
        imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
        tags: ['dulce', 'desayuno']
      }
    ],
    comidas: [
      {
        id: 4,
        nombre: 'Mole poblano con café',
        descripcion: 'Tradicional mole con toques de café, servido con pollo, arroz blanco y ajonjolí',
        precio: '$180',
        imagen: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        tags: ['tradicional', 'comida']
      },
      {
        id: 5,
        nombre: 'Cochinita pibil en olla de barro',
        descripcion: 'Cochinita marinada con achiote y café, cocida en olla de barro por 6 horas, servida con cebolla morada',
        precio: '$165',
        imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
        tags: ['tradicional', 'comida']
      },
      {
        id: 6,
        nombre: 'Pescado a la Xicotepec de Juárez, Pueblaana',
        descripcion: 'Filete de pescado con salsa de jitomate, aceitunas, alcaparras y un toque de café',
        precio: '$200',
        imagen: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        tags: ['mariscos', 'comida']
      }
    ],
    postres: [
      {
        id: 7,
        nombre: 'Flan de café',
        descripcion: 'Flan cremoso con caramelo y esencia de café, decorado con granos de café caramelizados',
        precio: '$80',
        imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
        tags: ['dulce', 'postre']
      },
      {
        id: 8,
        nombre: 'Pastel tres leches de café',
        descripcion: 'Esponjoso pastel bañado en tres leches infusionadas con café, cubierto con merengue',
        precio: '$90',
        imagen: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        tags: ['dulce', 'postre']
      },
      {
        id: 9,
        nombre: 'Helado de café artesanal',
        descripcion: 'Helado cremoso elaborado con nuestro café de especialidad, servido con galleta de café',
        precio: '$70',
        imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
        tags: ['dulce', 'postre']
      }
    ],
    bebidas: [
      {
        id: 10,
        nombre: 'Café de olla tradicional',
        descripcion: 'Café preparado en olla de barro con canela y piloncillo, servido en jarro de barro',
        precio: '$45',
        imagen: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        tags: ['caliente', 'tradicional']
      },
      {
        id: 11,
        nombre: 'Espresso de la casa',
        descripcion: 'Shot de espresso con nuestro blend especial de granos Xicotepec de Juárez, Pueblaanos',
        precio: '$35',
        imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
        tags: ['caliente', 'cafe']
      },
      {
        id: 12,
        nombre: 'Frappé de café',
        descripcion: 'Bebida fría con hielo, leche y café, coronada con crema batida y jarabe de café',
        precio: '$65',
        imagen: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        tags: ['frio', 'cafe']
      }
    ]
  };

  const categorias = [
    { id: 'todos', nombre: 'Todos' },
    { id: 'desayunos', nombre: 'Desayunos' },
    { id: 'comidas', nombre: 'Comidas' },
    { id: 'postres', nombre: 'Postres' },
    { id: 'bebidas', nombre: 'Bebidas' }
  ];

  const getFilteredItems = () => {
    if (selectedCategory === 'todos') {
      return Object.values(menuItems).flat();
    }
    return menuItems[selectedCategory] || [];
  };

  const openSocial = (url) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <div className="restaurante-page">
      {/* Hero Section */}
      <section className="restaurante-hero">
        <div className="restaurante-hero-overlay"></div>
        <div className="restaurante-hero-content">
          <h1>Restaurante El Catador</h1>
          <p>Una experiencia gastronómica donde el café es el protagonista</p>
          <button 
            className="btn-primary"
            onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Menú
          </button>
        </div>
      </section>

      {/* Sobre el Restaurante */}
      <section className="restaurante-about">
        <div className="restaurante-about-container">
          <div className="restaurante-about-content">
            <span className="about-badge">TRADICIÓN ANCESTRAL</span>
            <h2>Cocina en Barro</h2>
            <h3>Sabores que cuentan historias</h3>
            <p>
              Nuestro restaurante ofrece una experiencia única donde el café no solo es una bebida, 
              sino un ingrediente fundamental en nuestra cocina. Cada plato está inspirado en las 
              notas y matices de nuestros mejores granos.
            </p>
            <p>
              La cocina en barro es una técnica ancestral que hemos preservado por generaciones. 
              Las ollas de barro permiten una cocción uniforme, intensifican los sabores y conservan 
              los nutrientes de los alimentos, ofreciendo resultados únicos que no encontrarás en 
              ningún otro lugar.
            </p>
            
            <div className="restaurante-stats">
              <div className="stat">
                <span className="stat-number">100+</span>
                <span className="stat-label">Años de tradición</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Platos con café</span>
              </div>
              <div className="stat">
                <span className="stat-number">15</span>
                <span className="stat-label">Ollas de barro</span>
              </div>
            </div>
          </div>
          
          <div className="restaurante-about-image">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" 
              alt="Cocina en barro tradicional"
            />
            <div className="image-badge">
              <span>🏺</span>
              Cocina en Barro
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Características */}
      <section className="restaurante-features-section">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">🏺</div>
            <h3>Ollas de Barro</h3>
            <p>Técnica ancestral que preserva los sabores y nutrientes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">☕</div>
            <h3>Café en cada plato</h3>
            <p>El café como ingrediente principal en nuestra cocina</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌄</div>
            <h3>Vista panorámica</h3>
            <p>Disfruta de las montañas mientras comes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍🍳</div>
            <h3>Chef ejecutivo</h3>
            <p>Especializado en cocina tradicional mexicana</p>
          </div>
        </div>
      </section>
{/* Sección de Buffet Gallery */}
<section className="buffet-gallery-section">
  <div className="buffet-gallery-header">
    <h2>Nuestro Buffet Tradicional</h2>
    <p>Platos preparados en ollas de barro con recetas ancestrales</p>
  </div>

  <div className="buffet-gallery-grid">
    <div className="buffet-item">
      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" alt="Mole con café" />
      <div className="buffet-overlay">
        <h3>Mole con Café</h3>
        <p>Tradicional mole con toques de café</p>
        <span className="price">$180</span>
      </div>
    </div>
    <div className="buffet-item">
      <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" alt="Cochinita Pibil" />
      <div className="buffet-overlay">
        <h3>Cochinita Pibil</h3>
        <p>Marinada con achiote y café en olla de barro</p>
        <span className="price">$165</span>
      </div>
    </div>
    <div className="buffet-item">
      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" alt="Pescado Xicotepec de Juárez, Pueblaano" />
      <div className="buffet-overlay">
        <h3>Pescado Xicotepec de Juárez, Pueblaano</h3>
        <p>Con salsa de jitomate y toque de café</p>
        <span className="price">$200</span>
      </div>
    </div>
    <div className="buffet-item">
      <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" alt="Huevos al comal" />
      <div className="buffet-overlay">
        <h3>Huevos al Comal</h3>
        <p>Con salsa de café y frijoles</p>
        <span className="price">$120</span>
      </div>
    </div>
    <div className="buffet-item">
      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" alt="Chilaquiles" />
      <div className="buffet-overlay">
        <h3>Chilaquiles</h3>
        <p>Con mole de café, crema y queso</p>
        <span className="price">$135</span>
      </div>
    </div>
    <div className="buffet-item">
      <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" alt="Flan de Café" />
      <div className="buffet-overlay">
        <h3>Flan de Café</h3>
        <p>Con caramelo y granos de café</p>
        <span className="price">$80</span>
      </div>
    </div>
  </div>
</section>

      {/* Horarios y Reservas */}
      <section className="restaurante-info-section">
        <div className="info-container">
          <div className="info-card">
            <div className="info-icon">⏰</div>
            <h3>Horarios</h3>
            <p><strong>Lunes a Viernes:</strong> 8:00 am - 8:00 pm</p>
            <p><strong>Sábados:</strong> 8:00 am - 10:00 pm</p>
            <p><strong>Domingos:</strong> 9:00 am - 6:00 pm</p>
          </div>
          
          <div className="info-card highlight">
            <div className="info-icon">📞</div>
            <h3>Contacto</h3>
            <p><strong>Teléfono:</strong> +52 (228) 123-4567</p>
            <p><strong>Email:</strong> restaurante@cafeelcatador.com</p>
            <p><strong>Dirección:</strong> Carretera Federal México-Xicotepec de Juárez, Puebla Km 45</p>
            <p>Coatepec, Xicotepec de Juárez, Puebla</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">🎉</div>
            <h3>Eventos Privados</h3>
            <p>Organizamos eventos corporativos, bodas y celebraciones</p>
            <p><strong>Capacidad:</strong> hasta 50 personas</p>
            <p><strong>Menú personalizado</strong> con cocina en barro</p>
            <button className="btn-secondary btn-small">
              Solicitar Información
            </button>
          </div>
        </div>

        <div className="reserva-cta">
          <h3>¿Listo para vivir la experiencia?</h3>
          <button className="btn-primary btn-large">
            Reservar Mesa
          </button>
        </div>

        <div className="social-section">
          <h3>Síguenos en redes</h3>
          <div className="social-links">
            <button className="social-icon" onClick={() => openSocial('https://instagram.com')}>
              📷
            </button>
            <button className="social-icon" onClick={() => openSocial('https://facebook.com')}>
              📘
            </button>
            <button className="social-icon" onClick={() => openSocial('https://tiktok.com')}>
              🎵
            </button>
            <button className="social-icon" onClick={() => openSocial('https://youtube.com')}>
              ▶️
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Restaurante;