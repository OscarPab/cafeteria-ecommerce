import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedPresentation, setSelectedPresentation] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('descripcion');

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      // Simulación - en producción usar API
      const mockProducts = {
        1: {
          id: 1,
          nombre: 'Café Premium Altura',
          descripcion_corta: 'Grano seleccionado de nuestras mejores cosechas',
          descripcion_larga: 'Café arábica cultivado a más de 1,500 msnm en las montañas de Xicotepec de Juárez, Puebla. Notas a chocolate, nuez y caramelo. Tueste medio que resalta la dulzura natural del grano. Proceso de beneficio húmedo y secado al sol. Certificado orgánico y de comercio justo.',
          precio: 250,
          stock: 50,
          categoria: 'Café en Grano',
          origen: 'Xicotepec de Juárez, Puebla, México',
          tostado: 'Medio',
          imagen_portada: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31',
          imagenes_extra: [
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd'
          ],
          destacado: true,
          presentaciones: [
            { tipo: 'Medio kg', precio_extra: 0, stock: 30 },
            { tipo: '1 kg', precio_extra: 120, stock: 20 }
          ],
          especificaciones: {
            'Altitud': '1,500 - 1,700 msnm',
            'Variedad': 'Typica, Bourbon',
            'Proceso': 'Lavado',
            'Secado': 'Sol',
            'Certificaciones': 'Orgánico, Comercio Justo',
            'Puntaje taza': '85+'
          },
          reviews: [
            { usuario: 'Carlos G.', calificacion: 5, comentario: 'Excelente café, muy aromático', fecha: '2024-02-15' },
            { usuario: 'María L.', calificacion: 4, comentario: 'Buen sabor, llegó rápido', fecha: '2024-02-10' }
          ]
        },
        2: {
          id: 2,
          nombre: 'Café Molido Fino',
          descripcion_corta: 'Perfecto para preparaciones en casa',
          descripcion_larga: 'Café molido de granos seleccionados, ideal para cafeteras de filtro y prensa francesa. Sabor equilibrado y aroma intenso. Molienda media optimizada para extracción perfecta.',
          precio: 230,
          stock: 35,
          categoria: 'Café Molido',
          origen: 'Chiapas, México',
          tostado: 'Medio-Oscuro',
          imagen_portada: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
          imagenes_extra: [
            'https://images.unsplash.com/photo-1442512595331-e89e73853f31',
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'
          ],
          destacado: false,
          presentaciones: [
            { tipo: '250g', precio_extra: 0, stock: 15 },
            { tipo: '500g', precio_extra: 110, stock: 12 },
            { tipo: '1 kg', precio_extra: 250, stock: 8 }
          ],
          especificaciones: {
            'Altitud': '1,400 - 1,600 msnm',
            'Variedad': 'Catuaí, Mundo Novo',
            'Proceso': 'Semi-lavado',
            'Molienda': 'Media',
            'Certificaciones': 'Rainforest Alliance'
          },
          reviews: [
            { usuario: 'Ana S.', calificacion: 5, comentario: 'Mi café favorito para las mañanas', fecha: '2024-02-14' }
          ]
        },
        3: {
          id: 3,
          nombre: 'Licor de Café Artesanal',
          descripcion_corta: 'Elaborado con nuestra receta familiar',
          descripcion_larga: 'Licor de café elaborado artesanalmente con granos de nuestra finca. Proceso de maceración de 6 meses. Ideal para postres o solo. Notas a chocolate amargo y caramelo.',
          precio: 350,
          stock: 20,
          categoria: 'Licor de Café',
          origen: 'Xicotepec de Juárez, Puebla, México',
          imagen_portada: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
          imagenes_extra: [
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'
          ],
          destacado: true,
          presentaciones: [
            { tipo: '750 ml', precio_extra: 0, stock: 20 }
          ],
          especificaciones: {
            'Graduación': '25% alcohol',
            'Proceso': 'Maceración 6 meses',
            'Notas': 'Chocolate, caramelo',
            'Maridaje': 'Postres, solo'
          },
          reviews: [
            { usuario: 'Javier R.', calificacion: 5, comentario: 'Excelente licor, perfecto para postres', fecha: '2024-02-12' }
          ]
        }
      };

      const productData = mockProducts[id] || mockProducts[1];
      setProduct(productData);
      
      // Productos relacionados (misma categoría)
      const related = Object.values(mockProducts)
        .filter(p => p.categoria === productData.categoria && p.id !== productData.id)
        .slice(0, 4);
      setRelatedProducts(related);
      
      // Seleccionar primera presentación por defecto
      if (productData.presentaciones && productData.presentaciones.length > 0) {
        setSelectedPresentation(productData.presentaciones[0]);
      }
    } catch (error) {
      console.error('Error cargando producto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    const precioFinal = product.precio + (selectedPresentation?.precio_extra || 0);
    const presentacionTexto = selectedPresentation ? ` (${selectedPresentation.tipo})` : '';
    
    addToCart({
      id: product.id,
      nombre: product.nombre + presentacionTexto,
      precio: precioFinal,
      imagen: product.imagen_portada
    }, quantity);

    // Mostrar notificación
    alert(`✅ ${quantity} ${quantity === 1 ? 'producto agregado' : 'productos agregados'} al carrito`);
  };

  const incrementQuantity = () => {
    const maxStock = selectedPresentation?.stock || product?.stock || 0;
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const getStockStatus = () => {
    const stock = selectedPresentation?.stock || product?.stock || 0;
    if (stock > 10) return { text: 'Disponible', class: 'success', icon: '✅' };
    if (stock > 0) return { text: `Últimas ${stock} unidades`, class: 'warning', icon: '⚠️' };
    return { text: 'Agotado', class: 'danger', icon: '❌' };
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <span className="not-found-icon">😕</span>
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no está disponible</p>
        <Link to="/products" className="btn-primary">
          Ver todos los productos
        </Link>
      </div>
    );
  }

  const stockStatus = getStockStatus();

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> / 
        <Link to="/products">Productos</Link> / 
        <Link to={`/products?categoria=${product.categoria.toLowerCase().replace(' ', '-')}`}>
          {product.categoria}
        </Link> / 
        <span>{product.nombre}</span>
      </div>

      <div className="product-detail-container">
        {/* Galería de imágenes */}
        <div className="product-gallery">
          <div className="main-image">
            <img 
              src={activeImage === -1 ? product.imagen_portada : (product.imagenes_extra?.[activeImage] || product.imagen_portada)} 
              alt={product.nombre}
            />
            {product.destacado && (
              <span className="product-badge">⭐ Destacado</span>
            )}
          </div>
          
          {product.imagenes_extra && product.imagenes_extra.length > 0 && (
            <div className="thumbnail-grid">
              <div 
                className={`thumbnail ${activeImage === -1 ? 'active' : ''}`}
                onClick={() => setActiveImage(-1)}
              >
                <img src={product.imagen_portada} alt="Principal" />
              </div>
              {product.imagenes_extra.map((img, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`Vista ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="product-info">
          <span className="product-category">{product.categoria}</span>
          <h1 className="product-title">{product.nombre}</h1>
          
          <div className="product-rating">
            <span className="stars">{renderStars(4.5)}</span>
            <span className="reviews-count">(12 reseñas)</span>
          </div>

          <div className="product-price-container">
            <span className="product-price">${product.precio.toFixed(2)} MXN</span>
            {selectedPresentation?.precio_extra > 0 && (
              <span className="price-extra">
                + ${selectedPresentation.precio_extra} MXN ({selectedPresentation.tipo})
              </span>
            )}
          </div>

          <div className="product-stock">
            <span className={`stock-badge ${stockStatus.class}`}>
              {stockStatus.icon} {stockStatus.text}
            </span>
          </div>

          <div className="product-short-description">
            <p>{product.descripcion_corta}</p>
          </div>

          {/* Presentaciones */}
          {product.presentaciones && product.presentaciones.length > 0 && (
            <div className="product-presentaciones">
              <h3>Presentaciones disponibles</h3>
              <div className="presentaciones-grid">
                {product.presentaciones.map((pres, index) => (
                  <div
                    key={index}
                    className={`presentacion-card ${selectedPresentation === pres ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedPresentation(pres);
                      setQuantity(1);
                    }}
                  >
                    <span className="presentacion-tipo">{pres.tipo}</span>
                    <span className="presentacion-precio">
                      ${product.precio + pres.precio_extra} MXN
                    </span>
                    <span className="presentacion-stock">
                      Stock: {pres.stock}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cantidad y compra */}
          <div className="product-purchase">
            <div className="quantity-selector">
              <button 
                onClick={decrementQuantity} 
                className="quantity-btn"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button 
                onClick={incrementQuantity} 
                className="quantity-btn"
                disabled={quantity >= (selectedPresentation?.stock || product.stock)}
              >
                +
              </button>
            </div>

            <button 
              onClick={handleAddToCart} 
              className="add-to-cart-btn"
              disabled={(selectedPresentation?.stock || product.stock) <= 0}
            >
              <span>🛒</span>
              {(selectedPresentation?.stock || product.stock) > 0 
                ? 'Agregar al Carrito' 
                : 'Sin Stock'
              }
            </button>
          </div>

          {/* Información adicional */}
          <div className="product-extra-info">
            <div className="info-item">
              <span>🚚</span>
              <div>
                <strong>Envío gratis</strong>
                <p>En compras mayores a $500 MXN</p>
              </div>
            </div>
            <div className="info-item">
              <span>🔄</span>
              <div>
                <strong>Devolución gratis</strong>
                <p>30 días para cambios</p>
              </div>
            </div>
            <div className="info-item">
              <span>🔒</span>
              <div>
                <strong>Pago seguro</strong>
                <p>Tus datos protegidos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de información */}
      <div className="product-tabs">
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'descripcion' ? 'active' : ''}`}
            onClick={() => setActiveTab('descripcion')}
          >
            Descripción
          </button>
          <button 
            className={`tab-btn ${activeTab === 'especificaciones' ? 'active' : ''}`}
            onClick={() => setActiveTab('especificaciones')}
          >
            Especificaciones
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reseñas' ? 'active' : ''}`}
            onClick={() => setActiveTab('reseñas')}
          >
            Reseñas ({product.reviews?.length || 0})
          </button>
        </div>

        <div className="tabs-content">
          {activeTab === 'descripcion' && (
            <div className="tab-panel">
              <h3>Descripción del producto</h3>
              <p>{product.descripcion_larga}</p>
              <p className="product-origen">
                <strong>Origen:</strong> {product.origen}
              </p>
            </div>
          )}

          {activeTab === 'especificaciones' && (
            <div className="tab-panel">
              <h3>Especificaciones técnicas</h3>
              <table className="specs-table">
                <tbody>
                  {Object.entries(product.especificaciones || {}).map(([key, value]) => (
                    <tr key={key}>
                      <td className="spec-label">{key}:</td>
                      <td className="spec-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reseñas' && (
            <div className="tab-panel">
              <h3>Reseñas de clientes</h3>
              {product.reviews && product.reviews.length > 0 ? (
                <div className="reviews-list">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="review-item">
                      <div className="review-header">
                        <span className="review-user">{review.usuario}</span>
                        <span className="review-rating">{renderStars(review.calificacion)}</span>
                      </div>
                      <p className="review-comment">{review.comentario}</p>
                      <span className="review-date">{review.fecha}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No hay reseñas aún. ¡Sé el primero en opinar!</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Productos relacionados */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2>Productos relacionados</h2>
          <div className="related-products-grid">
            {relatedProducts.map(product => (
              <div 
                key={product.id} 
                className="related-product-card"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="related-product-image">
                  <img src={product.imagen_portada} alt={product.nombre} />
                </div>
                <div className="related-product-info">
                  <h3>{product.nombre}</h3>
                  <p className="related-product-price">${product.precio} MXN</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;