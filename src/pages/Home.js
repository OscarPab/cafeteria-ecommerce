import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image360 from '../components/Image360';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    people: '2',
    message: '',
    includeBuffet: false
  });

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    tonnage: '1',
    quality: '',
    message: ''
  });

  const handleTourSubmit = (e) => {
    e.preventDefault();
    
    const numPersonas = parseInt(formData.people);
    const costoBase = 300 * numPersonas;
    const costoTourCompleto = 300 * numPersonas;
    const costoCatacion = 150 * numPersonas;
    const costoRecorrido = 200 * numPersonas;
    const costoBuffet = formData.includeBuffet && numPersonas >= 10 ? 200 * numPersonas : 0;
    const costoTotal = costoTourCompleto + costoBuffet;

    let mensaje = `¡Gracias por tu interés en visitar nuestra finca!\n\n`;
    mensaje += `📋 **RESUMEN DE TU RESERVACIÓN**\n`;
    mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    mensaje += `👤 Nombre: ${formData.name}\n`;
    mensaje += `📧 Email: ${formData.email}\n`;
    mensaje += `📞 Teléfono: ${formData.phone}\n`;
    mensaje += `📅 Fecha: ${formData.date || 'Por definir'}\n`;
    mensaje += `👥 Personas: ${formData.people}\n\n`;
    
    mensaje += `💰 **DETALLE DE COSTOS**\n`;
    mensaje += `━━━━━━━━━━━━━━━━━━\n`;
    mensaje += `🎫 Tour Completo (${numPersonas} personas): $${costoBase} MXN\n`;
    mensaje += `   ├─ Catación ($${150 * numPersonas} MXN)\n`;
    mensaje += `   └─ Recorrido ($${200 * numPersonas} MXN)\n`;
    
    if (formData.includeBuffet) {
      if (numPersonas >= 10) {
        mensaje += `🍽️ Buffet Tradicional: $${costoBuffet} MXN\n`;
      } else {
        mensaje += `⚠️ Buffet no incluido (mínimo 10 personas)\n`;
      }
    }
    
    mensaje += `\n💵 **TOTAL ESTIMADO: $${costoTotal} MXN**\n\n`;
    mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    mensaje += `Te contactaremos en máximo 24 horas para confirmar disponibilidad.\n`;
    mensaje += `\n¡Gracias por elegir Café El Catador! ☕`;

    alert(mensaje);
    console.log('Tour reservado:', formData);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    let mensaje = `📦 **SOLICITUD DE COTIZACIÓN - CAFÉ VERDE**\n`;
    mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    mensaje += `👤 Nombre: ${contactData.name}\n`;
    mensaje += `📧 Email: ${contactData.email}\n`;
    mensaje += `🏢 Empresa: ${contactData.company || 'No especificada'}\n`;
    mensaje += `📞 Teléfono: ${contactData.phone}\n`;
    mensaje += `📦 Cantidad: ${contactData.tonnage} tonelada(s)\n`;
    mensaje += `⚡ Calidad: ${contactData.quality || 'Por definir'}\n`;
    mensaje += `📝 Mensaje: ${contactData.message || 'Sin mensaje adicional'}\n\n`;
    mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    mensaje += `Un asesor comercial te contactará en máximo 24 horas.\n`;
    mensaje += `Gracias por tu interés en Café El Catador.`;

    alert(mensaje);
    console.log('Contacto comercial:', contactData);
  };

  // Videos de YouTube (reemplazar con los tuyos después)
  const videos = [
    {
      id: 1,
      title: "Recorrido por Nuestra Finca",
      description: "Conoce el proceso tradicional del café en nuestras instalaciones",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735"
    },
    {
      id: 2,
      title: "Cata de Café con Román",
      description: "Aprende a identificar los mejores granos con nuestro experto",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
    },
    {
      id: 3,
      title: "Cocina en Barro Ancestral",
      description: "La tradición de cocinar en ollas de barro para intensificar sabores",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    },
    {
      id: 4,
      title: "De la Finca a tu Taza",
      description: "Todo el proceso de producción de nuestro café premium",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1442512595331-e89e73853f31"
    }
  ];

  // Productos destacados
  const featuredProducts = [
    {
      id: 1,
      name: 'Café Premium Altura',
      description: 'Grano seleccionado de nuestras mejores cosechas',
      price: 250,
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31',
      category: 'Café en Grano',
      presentaciones: ['Medio kg', '1 kg']
    },
    {
      id: 2,
      name: 'Licor de Café Artesanal',
      description: 'Elaborado con nuestra receta familiar',
      price: 350,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
      category: 'Licor',
      presentaciones: ['750 ml']
    },
    {
      id: 3,
      name: 'Bombones de Café',
      description: 'Chocolate relleno con crema de café',
      price: 180,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
      category: 'Bombones',
      presentaciones: ['Caja de 12', 'Caja de 24']
    },
    {
      id: 4,
      name: 'Galletas de Café',
      description: 'Horneadas con nuestra receta secreta, perfectas para acompañar tu taza',
      price: 120,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
      category: 'Galletas',
      presentaciones: ['Bolsa 250g', 'Bolsa 500g']
    }
  ];

  // Variedades de café verde
  const greenCoffeeVarieties = [
    {
      name: 'Oro Natural Superior',
      origin: 'Veracruz, México',
      altitude: '1,400 - 1,600 msnm',
      profile: 'Chocolate, nuez, caramelo',
      price: 'Consultar'
    },
    {
      name: 'Oro PL-10',
      origin: 'Chiapas, México',
      altitude: '1,500 - 1,800 msnm',
      profile: 'Cítrico, floral, miel',
      price: 'Consultar'
    },
    {
      name: 'Oro PL-20',
      origin: 'Oaxaca, México',
      altitude: '1,600 - 2,000 msnm',
      profile: 'Frutos rojos, vino tinto',
      price: 'Consultar'
    },
    {
      name: 'Altura Premium',
      origin: 'Puebla, México',
      altitude: '1,700 - 2,100 msnm',
      profile: 'Chocolate amargo, especias',
      price: 'Consultar'
    }
  ];

  // Función para abrir redes sociales
  const openSocial = (url) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-particles"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Café El Catador
            <span className="hero-subtitle">Román Valderrábano</span>
          </h1>
          <p className="hero-description">
            Desde 1920 cultivando los mejores granos de café con tradición y pasión. 
            Cocina en barro ancestral que intensifica los sabores y conserva los nutrientes.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              <span>☕</span>
              Comprar Café
            </Link>
            <a href="#tour" className="btn btn-secondary" onClick={(e) => {
              e.preventDefault();
              document.getElementById('tour')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <span>🌿</span>
              Reservar Tour
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Años de tradición</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Variedades</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Países</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Imagen 360° */}
      <section className="panorama-section">
        <div className="panorama-container">
          <h2>Explora Nuestra Finca</h2>
          <p>Recorrido virtual 360° por nuestras instalaciones y cafetales</p>
          <Image360 />
        </div>
      </section>

      {/* Sección de Videos */}
      <section className="videos-section">
        <div className="section-header">
          <h2>Conoce Nuestra Historia</h2>
          <p>Videos que muestran nuestra pasión por el café</p>
        </div>

        <div className="videos-grid">
          {videos.map(video => (
            <div key={video.id} className="video-card">
              <div className="video-container">
                <iframe
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-info">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="featured-products">
        <div className="section-header">
          <h2>Productos Destacados</h2>
          <p>Nuestra selección especial para ti</p>
        </div>

        <div className="products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <span className="product-badge">Destacado</span>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">${product.price} MXN</span>
                    <span className="product-stock">Disponible</span>
                  </div>
                </div>
              </Link>
              <button className="add-to-cart-btn-card">
                <span>🛒</span>
                Agregar
              </button>
            </div>
          ))}
        </div>

        <div className="section-footer">
          <Link to="/products" className="btn btn-primary">
            Ver Todos los Productos
          </Link>
        </div>
      </section>

      {/* Sección Sobre Nosotros */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <h2>NUESTRA HISTORIA</h2>
            <h3>Cinco generaciones dedicadas al arte del café</h3>
            <p>
              Román Valderrábano representa la quinta generación de una familia dedicada 
              al cultivo y catación de café. Nuestra historia comenzó en las montañas 
              de Veracruz, donde aprendimos a respetar cada grano y a entender que el 
              verdadero café es un arte que se transmite de padres a hijos.
            </p>
            <p>
              Hoy, nuestra finca se ha convertido en un referente para los amantes del 
              café. Mantenemos vivas las tradiciones ancestrales como la cocina en barro, 
              que intensifica los sabores y conserva los nutrientes de los alimentos, 
              ofreciendo resultados únicos que no encontrarás en ningún otro lugar.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <span className="feature-icon">🌱</span>
                <h4>Cultivo Orgánico</h4>
                <p>100% natural, sin químicos</p>
              </div>
              <div className="about-feature">
                <span className="feature-icon">🏺</span>
                <h4>Cocina en Barro</h4>
                <p>Técnica ancestral única</p>
              </div>
              <div className="about-feature">
                <span className="feature-icon">🏆</span>
                <h4>Premios Internacionales</h4>
                <p>Reconocimiento mundial</p>
              </div>
            </div>

            <div className="about-quote">
              <blockquote>
                "El café no es solo un grano, es la historia de nuestra tierra y el sudor de nuestros ancestros"
              </blockquote>
              <cite>- Román Valderrábano V</cite>
            </div>
          </div>

          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" 
              alt="Román Valderrábano catando café"
            />
            <div className="image-caption">
              Don Román en su laboratorio de catación
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Tour y Reservas */}
      <section id="tour" className="tour-section">
        <div className="tour-container">
          <div className="tour-header">
            <h2>Visita Nuestra Finca</h2>
            <p>Vive la experiencia completa del café en nuestro paraíso cafetalero</p>
          </div>

          <div className="tour-content">
            <div className="tour-info">
              <h3>Tour Completo: $300 MXN por persona</h3>
              <h4>Incluye ambas experiencias:</h4>
              
              <ul className="tour-features">
                <li>
                  <span>🌿</span>
                  <div>
                    <strong>Recorrido por el cafetal <span className="tour-badge">$200 MXN</span></strong>
                    <p>Visita guiada por nuestras plantaciones, explicación del cultivo, proceso de tostado artesanal y degustación en el campo.</p>
                  </div>
                </li>
                <li>
                  <span>👃</span>
                  <div>
                    <strong>Taller de Catación <span className="tour-badge">$150 MXN</span></strong>
                    <p>Aprende a identificar notas y aromas con Román, cata de 5 variedades diferentes y certificado de participación.</p>
                  </div>
                </li>
                <li>
                  <span>🍽️</span>
                  <div>
                    <strong>Buffet Tradicional <span className="tour-badge">$200 MXN extra</span></strong>
                    <p>Cocina en barro ancestral con recetas familiares. Incluye: mole, frijoles charros, tamales y café de olla.</p>
                    <small>* Requiere mínimo 10 personas</small>
                  </div>
                </li>
              </ul>

              <div className="tour-details">
                <div className="detail-item">
                  <span className="detail-label">Duración total:</span>
                  <span className="detail-value">4 horas</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Disponibilidad:</span>
                  <span className="detail-value">Martes a Domingo</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Horarios:</span>
                  <span className="detail-value">10:00 AM - 2:00 PM</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Grupo máximo:</span>
                  <span className="detail-value">15 personas</span>
                </div>
                <div className="detail-total">
                  Tour + Buffet (10+ personas): $500 MXN por persona
                </div>
              </div>
            </div>

            <div className="tour-form">
              <h3>Reserva tu Experiencia</h3>
              <form onSubmit={handleTourSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <select
                      value={formData.people}
                      onChange={(e) => setFormData({...formData, people: e.target.value})}
                    >
                      <option value="1">1 persona</option>
                      <option value="2">2 personas</option>
                      <option value="3">3 personas</option>
                      <option value="4">4 personas</option>
                      <option value="5">5 personas</option>
                      <option value="6">6 personas</option>
                      <option value="7">7 personas</option>
                      <option value="8">8 personas</option>
                      <option value="9">9 personas</option>
                      <option value="10">10 personas</option>
                      <option value="11">11 personas</option>
                      <option value="12">12 personas</option>
                      <option value="13">13 personas</option>
                      <option value="14">14 personas</option>
                      <option value="15">15 personas</option>
                    </select>
                  </div>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.includeBuffet}
                      onChange={(e) => setFormData({...formData, includeBuffet: e.target.checked})}
                    />
                    Agregar Buffet Tradicional ($200 MXN extra por persona)
                  </label>
                  {formData.includeBuffet && parseInt(formData.people) < 10 && (
                    <small className="form-hint">⚠️ El buffet requiere mínimo 10 personas</small>
                  )}
                </div>

                <div className="form-group">
                  <textarea
                    placeholder="Mensaje o requerimientos especiales (opcional)"
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit">
                  Reservar Ahora
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Café Verde por Tonelada */}
      <section className="wholesale-section">
        <div className="wholesale-container">
          <div className="wholesale-header">
            <h2>Venta de Café Verde por Tonelada</h2>
            <p>Para tostadores, importadores y productores</p>
          </div>

          <div className="wholesale-grid">
            <div className="wholesale-card">
              <span className="wholesale-icon">🚢</span>
              <h3>Exportación Directa</h3>
              <p>Sin intermediarios, garantizando el mejor precio y calidad.</p>
            </div>
            <div className="wholesale-card">
              <span className="wholesale-icon">📋</span>
              <h3>Trazabilidad Completa</h3>
              <p>Cada lote con certificado de origen y análisis de taza.</p>
            </div>
            <div className="wholesale-card">
              <span className="wholesale-icon">🌍</span>
              <h3>Certificaciones</h3>
              <p>Orgánico, Comercio Justo, Rainforest Alliance.</p>
            </div>
            <div className="wholesale-card">
              <span className="wholesale-icon">📦</span>
              <h3>Logística Integrada</h3>
              <p>Envíos a cualquier parte del mundo.</p>
            </div>
          </div>

          <div className="wholesale-cta">
            <p>¿Interesado en compras por tonelada?</p>
            <a href="#contacto-comercial" className="btn btn-primary btn-large" onClick={(e) => {
              e.preventDefault();
              document.getElementById('contacto-comercial')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Solicitar Cotización
            </a>
          </div>
        </div>
      </section>

      {/* Sección de Variedades de Café Verde */}
      <section className="green-coffee-section">
        <div className="green-coffee-container">
          <div className="green-coffee-header">
            <h2>Variedades de Café Verde</h2>
            <p>Seleccionamos los mejores granos de nuestras fincas y productores aliados</p>
          </div>

          <div className="coffee-varieties-grid">
            {greenCoffeeVarieties.map((variety, index) => (
              <div key={index} className="variety-card">
                <h3>{variety.name}</h3>
                <div className="variety-detail">
                  <strong>Origen:</strong> {variety.origin}
                </div>
                <div className="variety-detail">
                  <strong>Altitud:</strong> {variety.altitude}
                </div>
                <div className="variety-detail">
                  <strong>Perfil:</strong> {variety.profile}
                </div>
                <div className="variety-price">
                  {variety.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Contacto Comercial */}
      <section id="contacto-comercial" className="contacto-comercial">
        <div className="contacto-comercial-grid">
          <div className="contacto-info">
            <h2>Contacto para Ventas por Tonelada</h2>
            <p className="contacto-subtitle">
              Nuestro equipo comercial te responderá en máximo 24 horas
            </p>

            <div className="contacto-metodos">
              <div className="metodo">
                <span className="metodo-icon">📞</span>
                <div>
                  <h4>Teléfono Comercial</h4>
                  <p>+52 (228) 123-4567</p>
                </div>
              </div>
              <div className="metodo">
                <span className="metodo-icon">✉️</span>
                <div>
                  <h4>Email Corporativo</h4>
                  <p>ventas@cafeelcatador.com</p>
                </div>
              </div>
              <div className="metodo">
                <span className="metodo-icon">💬</span>
                <div>
                  <h4>WhatsApp Business</h4>
                  <p>+52 228 123 4567</p>
                </div>
              </div>
              <div className="metodo">
                <span className="metodo-icon">⏰</span>
                <div>
                  <h4>Horario de Atención</h4>
                  <p>Lunes a Viernes: 8am - 6pm</p>
                  <p>Sábados: 9am - 2pm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contacto-form">
            <h3>Solicita tu Cotización</h3>
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Nombre completo *"
                  value={contactData.name}
                  onChange={(e) => setContactData({...contactData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email *"
                    value={contactData.email}
                    onChange={(e) => setContactData({...contactData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Empresa"
                    value={contactData.company}
                    onChange={(e) => setContactData({...contactData, company: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Teléfono *"
                    value={contactData.phone}
                    onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    value={contactData.tonnage}
                    onChange={(e) => setContactData({...contactData, tonnage: e.target.value})}
                  >
                    <option value="1">1 tonelada (muestra)</option>
                    <option value="5">5 toneladas</option>
                    <option value="10">10 toneladas</option>
                    <option value="20">20 toneladas</option>
                    <option value="50">50 toneladas</option>
                    <option value="100">100+ toneladas</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <select
                  value={contactData.quality}
                  onChange={(e) => setContactData({...contactData, quality: e.target.value})}
                  required
                >
                  <option value="">Selecciona la calidad deseada *</option>
                  <option value="superior">Oro Natural Superior</option>
                  <option value="pl10">Oro PL-10</option>
                  <option value="pl20">Oro PL-20</option>
                  <option value="altura">Altura Premium</option>
                  <option value="especialidad">Café de Especialidad (85+ puntos)</option>
                  <option value="gourmet">Gourmet (90+ puntos)</option>
                </select>
              </div>

              <div className="form-group">
                <textarea
                  placeholder="Requerimientos específicos (opcional)"
                  rows="4"
                  value={contactData.message}
                  onChange={(e) => setContactData({...contactData, message: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="btn-submit">
                Solicitar Cotización
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Sección de Mapa */}
      <section className="mapa-section">
        <div className="mapa-container">
          <h2>Visítanos</h2>
          <p>Te esperamos en nuestra finca para vivir la experiencia del café</p>

          <div className="mapa-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.6954788998783!2d-97.9614830264746!3d20.271460381195027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d085564fd3d265%3A0xf644826230ec25e5!2sCaf%C3%A9%20El%20Catador!5e0!3m2!1ses-419!2smx!4v1772573023469!5m2!1ses-419!2smx"
              title="Ubicación de Café El Catador"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="mapa-overlay">
              <h3>Café El Catador</h3>
              <p>Carretera Federal México-Veracruz Km 45, Coatepec, Veracruz</p>
            </div>
          </div>

          <div className="mapa-info">
            <div className="mapa-info-item">
              <span>📍</span>
              <span>Coatepec, Veracruz</span>
            </div>
            <div className="mapa-info-item">
              <span>⏰</span>
              <span>Lun-Sáb: 8am - 6pm</span>
            </div>
            <div className="mapa-info-item">
              <span>📞</span>
              <span>+52 228 123 4567</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2>Lo que dicen nuestros clientes</h2>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "El café de Román tiene una consistencia increíble. Llevamos 5 años comprándoles café verde por tonelada y nunca nos han decepcionado. La trazabilidad es excepcional."
              </p>
              <div className="testimonial-author">
                <strong>Juan Carlos Hernández</strong>
                <span>Tostador Artesanal, CDMX</span>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">
                "El tour por la finca fue una experiencia transformadora. Ver el proceso de primera mano y probar la cocina en barro cambió mi perspectiva del café. ¡Volveré cada año!"
              </p>
              <div className="testimonial-author">
                <strong>María Fernanda López</strong>
                <span>Barista, Guadalajara</span>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">
                "Como importador, valoro la honestidad y calidad de Román. Sus lotes de Oro PL-20 son consistentes y el perfil de taza es exactamente lo que buscan mis clientes en Europa."
              </p>
              <div className="testimonial-author">
                <strong>Carlos Mendoza</strong>
                <span>Importador, Barcelona</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;