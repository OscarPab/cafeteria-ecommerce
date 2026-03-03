import React, { useState, useEffect, useRef } from 'react';

const Image360 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const containerRef = useRef(null);
  const totalImages = 36;

  // Generar URLs de imágenes (usando imágenes de Unsplash para demo)
  useEffect(() => {
    const generateImages = () => {
      // En producción, usa: `/images/360/img${i}.jpg`
      const imageUrls = [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
        'https://images.unsplash.com/photo-1442512595331-e89e73853f31',
        'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
        'https://images.unsplash.com/photo-1459755486867-b55449bb39ff',
        'https://images.unsplash.com/photo-1509785307050-d4066910ec76',
      ];
      
      // Repetir imágenes para simular 360°
      const repeatedImages = [];
      for (let i = 0; i < totalImages; i++) {
        repeatedImages.push(imageUrls[i % imageUrls.length] + `?sig=${i}`);
      }
      return repeatedImages;
    };

    setImages(generateImages());
  }, []);

  // Precargar imágenes
  useEffect(() => {
    if (images.length === 0) return;

    let loadedCount = 0;
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };
        img.onerror = reject;
      });
    };

    Promise.all(images.map(src => loadImage(src).catch(() => {
      console.warn('Error cargando imagen:', src);
    }))).finally(() => {
      // Si no se cargaron todas, igual mostrar el componente
      if (loadedCount > 0) {
        setImagesLoaded(true);
      }
    });
  }, [images]);

  // Auto-rotación
  useEffect(() => {
    let interval;
    if (isAutoRotating && !isDragging && imagesLoaded && !error) {
      interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % totalImages);
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating, isDragging, imagesLoaded, error, totalImages]);

  // Manejar arrastre del mouse
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const deltaX = e.clientX - startX;
    const sensitivity = 8;
    const imageChange = Math.floor(deltaX / sensitivity);

    if (Math.abs(imageChange) > 0) {
      setCurrentIndex(prev => {
        let newIndex = prev - imageChange;
        if (newIndex < 0) newIndex = totalImages - 1;
        if (newIndex >= totalImages) newIndex = 0;
        return newIndex;
      });
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Controles táctiles para móvil
  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setIsAutoRotating(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const deltaX = e.touches[0].clientX - startX;
    const sensitivity = 8;
    const imageChange = Math.floor(deltaX / sensitivity);

    if (Math.abs(imageChange) > 0) {
      setCurrentIndex(prev => {
        let newIndex = prev - imageChange;
        if (newIndex < 0) newIndex = totalImages - 1;
        if (newIndex >= totalImages) newIndex = 0;
        return newIndex;
      });
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

  // Navegación manual
  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % totalImages);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

  const prevImage = () => {
    setCurrentIndex(prev => (prev - 1 + totalImages) % totalImages);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

  // Reintentar carga
  const handleRetry = () => {
    setError(false);
    setImagesLoaded(false);
    setTimeout(() => setImagesLoaded(true), 2000);
  };

  if (error) {
    return (
      <div className="image-360-error">
        <div className="error-icon">🔄</div>
        <h3>Imágenes no disponibles</h3>
        <p>No se pudieron cargar las imágenes del recorrido 360°</p>
        <button onClick={handleRetry} className="generate-btn">
          Reintentar
        </button>
        <p className="error-hint">
          Para un funcionamiento óptimo, coloca 36 imágenes en la carpeta /public/images/360/
        </p>
      </div>
    );
  }

  if (!imagesLoaded) {
    return (
      <div className="image-360-loading">
        <div className="spinner"></div>
        <p>Cargando experiencia 360°...</p>
        <p className="loading-hint">Preparando las mejores vistas de nuestra finca</p>
      </div>
    );
  }

  return (
    <div className="image-360-wrapper">
      <div className="image-360-header">
        <h2>Recorrido Virtual 360°</h2>
        <p>Arrastra la imagen para explorar nuestra finca desde todos los ángulos</p>
      </div>

      <div
        className={`image-360-container ${isDragging ? 'dragging' : ''}`}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex]}
          alt={`Vista 360° ${currentIndex + 1}`}
          className="image-360"
          draggable="false"
        />

        {/* Overlay de instrucciones */}
        <div className={`image-360-overlay ${!isDragging && isAutoRotating ? 'visible' : ''}`}>
          <div className="overlay-content">
            <span className="overlay-icon">🖱️</span>
            <p>Arrastra para explorar 360°</p>
            <span className="overlay-hint">También puedes usar las flechas</span>
          </div>
        </div>

        {/* Botones de navegación */}
        <button className="nav-btn prev-btn" onClick={prevImage} aria-label="Imagen anterior">
          ←
        </button>
        <button className="nav-btn next-btn" onClick={nextImage} aria-label="Imagen siguiente">
          →
        </button>

        {/* Controles de zoom (simulados) */}
        <div className="zoom-controls">
          <button className="zoom-btn" onClick={() => {}} aria-label="Acercar">+</button>
          <button className="zoom-btn" onClick={() => {}} aria-label="Alejar">−</button>
        </div>

        {/* Indicadores de dirección */}
        <div className="direction-indicators">
          <div className="direction-left">←</div>
          <div className="direction-right">→</div>
        </div>

        {/* Indicador de progreso */}
        <div className="progress-indicator">
          <div className="progress-info">
            {currentIndex + 1} / {totalImages}
          </div>
          <div
            className="progress-bar"
            style={{ width: `${((currentIndex + 1) / totalImages) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="image-360-footer">
        <div className="image-360-instruction">
          <span className="instruction-icon">🖱️</span>
          <span>Arrastra con el mouse</span>
        </div>
        <div className="image-360-instruction">
          <span className="instruction-icon">📱</span>
          <span>Desliza en móvil</span>
        </div>
        <div className="image-360-instruction">
          <span className="instruction-icon">🔄</span>
          <span>{totalImages} ángulos</span>
        </div>
        <button
          className={`auto-rotate-btn ${isAutoRotating ? 'active' : ''}`}
          onClick={() => setIsAutoRotating(!isAutoRotating)}
        >
          {isAutoRotating ? '⏸️ Pausar' : '▶️ Auto-rotar'}
        </button>
      </div>

      <div className="image-360-info">
        <span className="info-badge">
          🌿 Recorrido por nuestra finca cafetalera
        </span>
      </div>
    </div>
  );
};

export default Image360;