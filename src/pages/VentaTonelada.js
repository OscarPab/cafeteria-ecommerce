import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VentaTonelada = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    phone: '',
    tonnage: '1',
    quality: '',
    message: ''
  });

  const [selectedVariety, setSelectedVariety] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let mensaje = `📦 **SOLICITUD DE COTIZACIÓN - CAFÉ VERDE**\n`;
    mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    mensaje += `👤 Nombre: ${formData.name}\n`;
    mensaje += `📧 Email: ${formData.email}\n`;
    mensaje += `🏢 Empresa: ${formData.company}\n`;
    mensaje += `🌍 País: ${formData.country}\n`;
    mensaje += `📞 Teléfono: ${formData.phone}\n`;
    mensaje += `📦 Cantidad: ${formData.tonnage} tonelada(s)\n`;
    mensaje += `⚡ Calidad: ${formData.quality}\n`;
    mensaje += `📝 Mensaje: ${formData.message || 'Sin mensaje adicional'}\n\n`;
    mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    mensaje += `Un asesor comercial te contactará en máximo 24 horas.\n`;
    mensaje += `¡Gracias por tu interés en Café El Catador!`;

    alert(mensaje);
    console.log('Cotización:', formData);
  };

  const varieties = [
    {
      id: 1,
      name: 'Oro Natural Superior',
      origin: 'Xicotepec de Juárez, Puebla, México',
      altitude: '1,400 - 1,600 msnm',
      profile: 'Chocolate, nuez, caramelo',
      score: '85+',
      stock: 'Disponible',
      price: '$85,000 MXN/ton',
      description: 'Nuestro café insignia. Granos seleccionados de las mejores fincas de Xicotepec de Juárez, Puebla. Perfil balanceado con notas dulces y acidez media.'
    },
    {
      id: 2,
      name: 'Oro PL-10',
      origin: 'Chiapas, México',
      altitude: '1,500 - 1,800 msnm',
      profile: 'Cítrico, floral, miel',
      score: '86+',
      stock: 'Disponible',
      price: '$82,000 MXN/ton',
      description: 'Café con notas cítricas y florales distintivas. Ideal para blends de especialidad. Cosecha de altura.'
    },
    {
      id: 3,
      name: 'Oro PL-20',
      origin: 'Oaxaca, México',
      altitude: '1,600 - 2,000 msnm',
      profile: 'Frutos rojos, vino tinto',
      score: '88+',
      stock: 'Stock limitado',
      price: '$89,000 MXN/ton',
      description: 'Café complejo con notas a frutos rojos y vino tinto. Perfil único de la región mixteca.'
    },
    {
      id: 4,
      name: 'Altura Premium',
      origin: 'Puebla, México',
      altitude: '1,700 - 2,100 msnm',
      profile: 'Chocolate amargo, especias',
      score: '87+',
      stock: 'Disponible',
      price: '$86,500 MXN/ton',
      description: 'Café de gran altura con cuerpo completo y notas especiadas. Excelente para espresso.'
    },
    {
      id: 5,
      name: 'Mezcla Personalizada',
      origin: 'Múltiples orígenes',
      altitude: 'Variable',
      profile: 'A diseñar según necesidad',
      score: 'Personalizado',
      stock: 'Bajo pedido',
      price: 'Consultar',
      description: 'Creamos mezclas exclusivas para tostadores según el perfil deseado. Volumen mínimo: 5 toneladas.'
    }
  ];

  return (
    <div className="venta-tonelada-page">
      {/* Hero Section */}
      <section className="venta-hero">
        <div className="venta-hero-content">
          <h1>Venta de Café Verde por Tonelada</h1>
          <p>Exportación directa desde nuestra finca hasta tu negocio</p>
        </div>
      </section>

      {/* Información Principal */}
      <section className="venta-info-section">
        <div className="venta-container">
          <div className="venta-stats">
            <div className="stat-card">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Toneladas exportadas</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">15+</span>
              <span className="stat-label">Países importadores</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Trazabilidad</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">5</span>
              <span className="stat-label">Certificaciones</span>
            </div>
          </div>

          <div className="venta-grid">
            <div className="venta-text">
              <h2>¿Por qué comprar directamente de nuestra finca?</h2>
              <p>
                En Café El Catador, eliminamos los intermediarios para ofrecerte el mejor café 
                verde del mercado. Trabajamos directamente con tostadores, importadores y 
                productores de todo el mundo, garantizando la más alta calidad.
              </p>
              
              <ul className="venta-benefits">
                <li>✅ Precios competitivos - Hasta 30% menos que el mercado</li>
                <li>✅ Trazabilidad completa de cada lote con certificados de origen</li>
                <li>✅ Perfiles de taza certificados por Q-Graders</li>
                <li>✅ Documentación de exportación incluida</li>
                <li>✅ Flexibilidad en volúmenes y mezclas personalizadas</li>
                <li>✅ Envíos a cualquier parte del mundo con logística integrada</li>
                <li>✅ Certificaciones: Orgánico, Comercio Justo, Rainforest Alliance</li>
              </ul>
            </div>
            
            <div className="venta-image">
              <img 
                src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735" 
                alt="Café verde en costales"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Variedades Disponibles */}
      <section className="variedades-section">
        <div className="venta-container">
          <h2>Variedades de Café Disponibles</h2>
          <p>Seleccionamos los mejores granos de nuestras fincas y productores aliados</p>
          
          <div className="variedades-grid">
            {varieties.map(variety => (
              <div 
                key={variety.id} 
                className={`variedad-card ${selectedVariety === variety.id ? 'selected' : ''}`}
                onClick={() => setSelectedVariety(variety.id)}
              >
                <h3>{variety.name}</h3>
                <p className="variedad-origen"><strong>Origen:</strong> {variety.origin}</p>
                <p className="variedad-altura"><strong>Altitud:</strong> {variety.altitude}</p>
                <p className="variedad-perfil"><strong>Perfil:</strong> {variety.profile}</p>
                <p className="variedad-puntaje"><strong>Puntaje:</strong> {variety.score}</p>
                <p className="variedad-stock"><strong>Stock:</strong> {variety.stock}</p>
                <p className="variedad-precio"><strong>Precio:</strong> {variety.price}</p>
                <p className="variedad-descripcion">{variety.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Compra */}
      <section className="proceso-section">
        <div className="venta-container">
          <h2>Proceso de Compra</h2>
          
          <div className="proceso-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Contacto Inicial</h4>
              <p>Completa el formulario con tus necesidades</p>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <h4>Asesoría Personalizada</h4>
              <p>Te contactamos para entender tu perfil deseado</p>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <h4>Envío de Muestras</h4>
              <p>Recibe muestras de 1kg para evaluar calidad</p>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <h4>Cotización Formal</h4>
              <p>Recibe precio final según volumen y calidad</p>
            </div>
            
            <div className="step">
              <div className="step-number">5</div>
              <h4>Logística y Envío</h4>
              <p>Coordinamos embarque y documentación</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Contacto Comercial */}
      <section className="contacto-comercial">
        <div className="venta-container">
          <div className="contacto-comercial-grid">
            <div className="contacto-info">
              <h2>Solicita una Cotización</h2>
              <p className="contacto-subtitle">
                Nuestro equipo comercial te responderá en máximo 24 horas
              </p>
              
              <div className="contacto-metodos">
                <div className="metodo">
                  <span className="metodo-icon">📞</span>
                  <div>
                    <h4>WhatsApp Comercial</h4>
                    <p>+52 228 123 4567</p>
                  </div>
                </div>
                
                <div className="metodo">
                  <span className="metodo-icon">✉️</span>
                  <div>
                    <h4>Email</h4>
                    <p>ventas@cafeelcatador.com</p>
                  </div>
                </div>
                
                <div className="metodo">
                  <span className="metodo-icon">💬</span>
                  <div>
                    <h4>Chat en vivo</h4>
                    <p>Disponible 8am - 6pm</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contacto-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Nombre completo *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email corporativo *"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Empresa *"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="País *"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      placeholder="Teléfono *"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <select
                      value={formData.tonnage}
                      onChange={(e) => setFormData({...formData, tonnage: e.target.value})}
                    >
                      <option value="1">1 tonelada (muestra)</option>
                      <option value="5">5 toneladas</option>
                      <option value="10">10 toneladas</option>
                      <option value="20">20 toneladas</option>
                      <option value="50">50 toneladas</option>
                      <option value="100">100+ toneladas</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <select
                      value={formData.quality}
                      onChange={(e) => setFormData({...formData, quality: e.target.value})}
                      required
                    >
                      <option value="">Selecciona calidad *</option>
                      <option value="superior">Oro Natural Superior</option>
                      <option value="pl10">Oro PL-10</option>
                      <option value="pl20">Oro PL-20</option>
                      <option value="altura">Altura Premium</option>
                      <option value="personalizada">Mezcla Personalizada</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <textarea
                    placeholder="Requerimientos específicos (opcional)"
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-submit btn-large">
                  Solicitar Cotización
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="faq-section">
        <div className="venta-container">
          <h2>Preguntas Frecuentes</h2>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h4>¿Cuál es el volumen mínimo de compra?</h4>
              <p>El volumen mínimo es de 1 tonelada para muestras comerciales. Para envíos internacionales, trabajamos a partir de 5 toneladas. Las mezclas personalizadas requieren mínimo 5 toneladas.</p>
            </div>
            
            <div className="faq-item">
              <h4>¿Incluyen los costos de envío?</h4>
              <p>Los costos de envío se cotizan por separado según el destino. Podemos incluir logística puerta a puerta con nuestra red de aliados. Consulta por envíos FOB o CIF.</p>
            </div>
            
            <div className="faq-item">
              <h4>¿Puedo recibir muestras antes de comprar?</h4>
              <p>Sí, enviamos muestras de 1kg para que evalúes la calidad antes de realizar tu pedido comercial. El costo de envío de la muestra corre por cuenta del cliente.</p>
            </div>
            
            <div className="faq-item">
              <h4>¿Qué documentación proporcionan?</h4>
              <p>Certificados de origen, análisis de taza (Q-Grader), factura comercial, lista de empaque, certificados de orgánico (si aplica) y documentos de exportación.</p>
            </div>

            <div className="faq-item">
              <h4>¿Ofrecen financiamiento?</h4>
              <p>Sí, tenemos opciones de pago flexibles para clientes recurrentes. Consulta por cartas de crédito y pagos diferidos según volumen.</p>
            </div>

            <div className="faq-item">
              <h4>¿Cómo garantizan la consistencia?</h4>
              <p>Cada lote es analizado por nuestro equipo de Q-Graders. Mantenemos lotes separados por micro-región y cosecha para garantizar consistencia.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VentaTonelada;