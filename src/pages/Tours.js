import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image360 from '../components/Image360';

const Tours = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    people: '2',
    message: '',
    includeBuffet: false,
    includeCatacion: true,
    includeRecorrido: true
  });

  const [activeTab, setActiveTab] = useState('info');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const numPersonas = parseInt(formData.people);
    const costoCatacion = formData.includeCatacion ? 150 * numPersonas : 0;
    const costoRecorrido = formData.includeRecorrido ? 200 * numPersonas : 0;
    const costoTourCompleto = formData.includeCatacion && formData.includeRecorrido ? 300 * numPersonas : costoCatacion + costoRecorrido;
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
    if (formData.includeCatacion) {
      mensaje += `🎫 Taller de Catación: $${150 * numPersonas} MXN\n`;
    }
    if (formData.includeRecorrido) {
      mensaje += `🌿 Recorrido por el cafetal: $${200 * numPersonas} MXN\n`;
    }
    if (formData.includeCatacion && formData.includeRecorrido) {
      mensaje += `🎟️ Tour Completo (ahorro): $${300 * numPersonas} MXN\n`;
    }
    
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toursDisponibles = [
    {
      id: 1,
      nombre: 'Tour Completo',
      duracion: '4 horas',
      incluye: ['Recorrido por cafetal', 'Taller de catación', 'Degustación de 5 cafés', 'Recuerdo artesanal'],
      precio: 300,
      imagen: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31',
      disponible: true
    },
    {
      id: 2,
      nombre: 'Solo Recorrido',
      duracion: '2 horas',
      incluye: ['Recorrido por cafetal', 'Explicación del proceso', 'Degustación básica'],
      precio: 200,
      imagen: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
      disponible: true
    },
    {
      id: 3,
      nombre: 'Taller de Catación',
      duracion: '1.5 horas',
      incluye: ['Taller con Román', 'Cata de 5 variedades', 'Certificado de participación'],
      precio: 150,
      imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
      disponible: true
    },
    {
      id: 4,
      nombre: 'Experiencia Gastronómica',
      duracion: '2 horas',
      incluye: ['Buffet en olla de barro', 'Maridaje con cafés', 'Postre especial'],
      precio: 200,
      imagen: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
      disponible: true,
      minimo: 10
    }
  ];

  return (
    <div className="tours-page">
      {/* Hero Section */}
      <section className="tours-hero">
        <div className="tours-hero-overlay"></div>
        <div className="tours-hero-content">
          <h1>Tours en Nuestra Finca</h1>
          <p>Vive la experiencia completa del café en nuestro paraíso cafetalero</p>
          <button 
            className="btn-primary"
            onClick={() => document.getElementById('reserva-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Reservar Ahora
          </button>
        </div>
      </section>

      {/* Tabs de navegación */}
      <div className="tours-tabs">
        <button 
          className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Información
        </button>
        <button 
          className={`tab-btn ${activeTab === 'tours' ? 'active' : ''}`}
          onClick={() => setActiveTab('tours')}
        >
          Tours Disponibles
        </button>
        <button 
          className={`tab-btn ${activeTab === 'galeria' ? 'active' : ''}`}
          onClick={() => setActiveTab('galeria')}
        >
          Galería
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reserva' ? 'active' : ''}`}
          onClick={() => setActiveTab('reserva')}
        >
          Reservar
        </button>
      </div>

      {/* Contenido de tabs */}
      <div className="tabs-content">
        {/* Tab Información */}
        {activeTab === 'info' && (
          <section className="tours-info-section">
            <div className="tours-info-container">
              <div className="tours-info-grid">
                <div className="tours-info-text">
                  <h2>Conoce Nuestra Finca</h2>
                  <p>
                    Ubicada en las montañas de Veracruz, nuestra finca es el hogar de los mejores 
                    granos de café de México. Te invitamos a conocer el proceso completo, desde 
                    la semilla hasta la taza.
                  </p>
                  
                  <div className="tours-highlights">
                    <div className="highlight-item">
                      <span className="highlight-icon">🌿</span>
                      <h4>Recorrido Guiado</h4>
                      <p>Acompañados por nuestros expertos, conocerás cada etapa del cultivo</p>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">👃</span>
                      <h4>Taller de Catación</h4>
                      <p>Aprende a identificar notas y aromas con Román Valderrábano</p>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">🏭</span>
                      <h4>Proceso de Tostado</h4>
                      <p>Descubre cómo transformamos el grano en café de especialidad</p>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">🍽️</span>
                      <h4>Cocina en Barro</h4>
                      <p>Degusta nuestra gastronomía tradicional en ollas de barro</p>
                    </div>
                  </div>

                  <div className="tours-quote">
                    <blockquote>
                      "Cada visita es única, compartimos nuestra pasión por el café con quienes 
                      llegan a nuestra casa"
                    </blockquote>
                    <cite>- Román Valderrábano V</cite>
                  </div>
                </div>

                <div className="tours-info-image">
                  <img 
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" 
                    alt="Finca cafetalera"
                  />
                  <div className="image-badge">
                    <span>🌱</span>
                    Fundada en 1920
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab Tours Disponibles */}
        {activeTab === 'tours' && (
          <section className="tours-available-section">
            <div className="tours-available-container">
              <h2>Tours Disponibles</h2>
              <p>Selecciona la experiencia que más se adapte a tus intereses</p>

              <div className="tours-cards-grid">
                {toursDisponibles.map(tour => (
                  <div key={tour.id} className="tour-card">
                    <div className="tour-card-image">
                      <img src={tour.image} alt={tour.nombre} />
                      {tour.minimo && (
                        <span className="tour-minimo-badge">Mínimo {tour.minimo} personas</span>
                      )}
                    </div>
                    <div className="tour-card-content">
                      <h3>{tour.nombre}</h3>
                      <p className="tour-duracion">⏱️ Duración: {tour.duracion}</p>
                      <ul className="tour-incluye">
                        {tour.incluye.map((item, index) => (
                          <li key={index}>✓ {item}</li>
                        ))}
                      </ul>
                      <div className="tour-card-footer">
                        <span className="tour-precio">${tour.precio} MXN</span>
                        <button 
                          className="btn-small"
                          onClick={() => {
                            setActiveTab('reserva');
                            if (tour.nombre === 'Tour Completo') {
                              setFormData(prev => ({...prev, includeCatacion: true, includeRecorrido: true}));
                            } else if (tour.nombre === 'Solo Recorrido') {
                              setFormData(prev => ({...prev, includeCatacion: false, includeRecorrido: true}));
                            } else if (tour.nombre === 'Taller de Catación') {
                              setFormData(prev => ({...prev, includeCatacion: true, includeRecorrido: false}));
                            } else if (tour.nombre === 'Experiencia Gastronómica') {
                              setFormData(prev => ({...prev, includeBuffet: true}));
                            }
                          }}
                        >
                          Seleccionar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tab Galería */}
        {activeTab === 'galeria' && (
          <section className="tours-galeria-section">
            <div className="tours-galeria-container">
              <h2>Galería de la Finca</h2>
              <p>Conoce nuestros espacios a través de estas imágenes</p>

              <div className="tours-360-preview">
                <h3>Recorrido Virtual 360°</h3>
                <Image360 />
              </div>

              <div className="galeria-grid">
                <div className="galeria-item">
                  <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31" alt="Cafetal" />
                  <div className="galeria-caption">Nuestros cafetales</div>
                </div>
                <div className="galeria-item">
                  <img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735" alt="Cosecha" />
                  <div className="galeria-caption">Cosecha manual</div>
                </div>
                <div className="galeria-item">
                  <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" alt="Tostado" />
                  <div className="galeria-caption">Proceso de tostado</div>
                </div>
                <div className="galeria-item">
                  <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd" alt="Catación" />
                  <div className="galeria-caption">Taller de catación</div>
                </div>
                <div className="galeria-item">
                  <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" alt="Restaurante" />
                  <div className="galeria-caption">Cocina en barro</div>
                </div>
                <div className="galeria-item">
                  <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31" alt="Mirador" />
                  <div className="galeria-caption">Mirador panorámico</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab Reserva */}
        {activeTab === 'reserva' && (
          <section id="reserva-form" className="tours-reserva-section">
            <div className="tours-reserva-container">
              <div className="reserva-header">
                <h2>Reserva tu Experiencia</h2>
                <p>Completa el formulario y te contactaremos para confirmar</p>
              </div>

              <div className="reserva-grid">
                <div className="reserva-info">
                  <div className="info-card">
                    <h3>Información importante</h3>
                    <ul>
                      <li>📍 Las reservaciones deben hacerse con al menos 48 horas de anticipación</li>
                      <li>👥 Grupos máximos de 15 personas</li>
                      <li>🍽️ El buffet tradicional requiere mínimo 10 personas</li>
                      <li>👗 Se recomienda ropa cómoda y zapatos para caminar</li>
                      <li>☔ El tour se realiza aún con lluvia (llevar paraguas)</li>
                    </ul>
                  </div>

                  <div className="precios-card">
                    <h3>Precios</h3>
                    <div className="precio-item">
                      <span>Tour Completo</span>
                      <span className="precio">$300 MXN</span>
                    </div>
                    <div className="precio-item">
                      <span>Solo Recorrido</span>
                      <span className="precio">$200 MXN</span>
                    </div>
                    <div className="precio-item">
                      <span>Solo Catación</span>
                      <span className="precio">$150 MXN</span>
                    </div>
                    <div className="precio-item highlight">
                      <span>Buffet Tradicional</span>
                      <span className="precio">$200 MXN</span>
                    </div>
                    <p className="precio-nota">*Buffet requiere mínimo 10 personas</p>
                  </div>
                </div>

                <div className="reserva-form-container">
                  <form onSubmit={handleSubmit} className="reserva-form">
                    <div className="form-group">
                      <label>Nombre completo *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Ej: Juan Pérez García"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="correo@ejemplo.com"
                        />
                      </div>
                      <div className="form-group">
                        <label>Teléfono *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="2281234567"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Fecha preferente *</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Número de personas *</label>
                        <select
                          name="people"
                          value={formData.people}
                          onChange={handleInputChange}
                          required
                        >
                          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'personas'}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="includeCatacion"
                          checked={formData.includeCatacion}
                          onChange={handleInputChange}
                        />
                        <span>Incluir Taller de Catación ($150 MXN por persona)</span>
                      </label>
                    </div>

                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="includeRecorrido"
                          checked={formData.includeRecorrido}
                          onChange={handleInputChange}
                        />
                        <span>Incluir Recorrido por el cafetal ($200 MXN por persona)</span>
                      </label>
                    </div>

                    {formData.includeCatacion && formData.includeRecorrido && (
                      <div className="tour-completo-info">
                        ✨ Tour Completo: $300 MXN por persona (ahorras $50 MXN)
                      </div>
                    )}

                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="includeBuffet"
                          checked={formData.includeBuffet}
                          onChange={handleInputChange}
                        />
                        <span>Agregar Buffet Tradicional en olla de barro ($200 MXN extra por persona)</span>
                      </label>
                      {formData.includeBuffet && parseInt(formData.people) < 10 && (
                        <div className="form-warning">
                          ⚠️ El buffet requiere mínimo 10 personas
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Comentarios adicionales</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="¿Alguna pregunta o requerimiento especial?"
                      ></textarea>
                    </div>

                    <div className="resumen-costos">
                      <h4>Resumen de costos:</h4>
                      {(() => {
                        const num = parseInt(formData.people);
                        const catacion = formData.includeCatacion ? 150 * num : 0;
                        const recorrido = formData.includeRecorrido ? 200 * num : 0;
                        const buffet = (formData.includeBuffet && num >= 10) ? 200 * num : 0;
                        const total = catacion + recorrido + buffet;
                        return (
                          <>
                            {formData.includeCatacion && <p>Catación: ${catacion} MXN</p>}
                            {formData.includeRecorrido && <p>Recorrido: ${recorrido} MXN</p>}
                            {formData.includeBuffet && num >= 10 && <p>Buffet: ${buffet} MXN</p>}
                            {formData.includeBuffet && num < 10 && <p className="warning">Buffet no disponible (mínimo 10 personas)</p>}
                            <p className="total"><strong>Total estimado: ${total} MXN</strong></p>
                          </>
                        );
                      })()}
                    </div>

                    <button type="submit" className="btn-submit btn-large">
                      Reservar Ahora
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Tours;