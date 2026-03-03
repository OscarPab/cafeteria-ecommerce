import React, { useState, useEffect } from 'react';

const Carrusel360 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false); // CAMBIADO a false

  const imagenes = [
    {
      url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
      titulo: 'Entrada Principal',
      descripcion: 'Bienvenida a nuestra finca'
    },
    {
      url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31',
      titulo: 'Cafetal',
      descripcion: 'Nuestros cultivos de altura'
    },
    {
      url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
      titulo: 'Beneficio Húmedo',
      descripcion: 'Procesamiento del grano'
    },
    {
      url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
      titulo: 'Tostado',
      descripcion: 'Arte del tostado artesanal'
    },
    {
      url: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff',
      titulo: 'Catación',
      descripcion: 'Taller con Román'
    },
    {
      url: 'https://images.unsplash.com/photo-1509785307050-d4066910ec76',
      titulo: 'Empaque',
      descripcion: 'Preparación de pedidos'
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % imagenes.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, imagenes.length]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imagenes.length);
    setIsAutoPlaying(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="carrusel-360-container">
      <div className="carrusel-360-header">
        <h2>Recorrido Virtual por Nuestra Finca</h2>
        <p>Explora cada rincón de Café El Catador</p>
      </div>

      <div className="carrusel-360-main">
        <button className="carrusel-nav-btn prev" onClick={prevImage}>←</button>
        
        <div className="carrusel-360-viewport">
          <div 
            className="carrusel-360-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {imagenes.map((img, index) => (
              <div key={index} className="carrusel-360-slide">
                <img src={img.url} alt={img.titulo} />
                <div className="slide-caption">
                  <h3>{img.titulo}</h3>
                  <p>{img.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="carrusel-nav-btn next" onClick={nextImage}>→</button>
      </div>

      {/* SECCIÓN DE MINIATURAS ELIMINADA */}

      <div className="carrusel-360-controls">
        <button 
          className={`auto-play-btn ${isAutoPlaying ? 'active' : ''}`}
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        >
          {isAutoPlaying ? '⏸️ Pausar' : '▶️ Auto-rotar'}
        </button>
        <div className="carrusel-counter">
          {currentIndex + 1} / {imagenes.length}
        </div>
      </div>

      <div className="carrusel-360-footer">
        <p>🖱️ Usa las flechas para navegar | 📱 Desliza en móvil</p>
      </div>
    </div>
  );
};

export default Carrusel360;