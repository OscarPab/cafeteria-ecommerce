import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const getStockStatus = () => {
    if (product.stock > 10) return { text: 'Disponible', class: '' };
    if (product.stock > 0) return { text: 'Últimas unidades', class: 'bajo' };
    return { text: 'Agotado', class: 'agotado' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.imagen_portada || product.image || 'https://images.unsplash.com/photo-1442512595331-e89e73853f31'} 
            alt={product.nombre || product.name} 
            className="product-image"
          />
          {product.destacado && (
            <span className="product-badge">⭐ Destacado</span>
          )}
          {product.presentaciones && product.presentaciones.length > 0 && (
            <span className="product-badge secondary">
              {product.presentaciones.length} presentaciones
            </span>
          )}
        </div>

        <div className="product-info">
          <span className="product-category">{product.categoria || product.category}</span>
          <h3 className="product-name">{product.nombre || product.name}</h3>
          <p className="product-description">{product.descripcion_corta || product.description}</p>
          
          <div className="product-footer">
            <span className="product-price">${product.precio || product.price} MXN</span>
            <span className={`product-stock ${stockStatus.class}`}>
              {stockStatus.text}
            </span>
          </div>

          {product.origen && (
            <div className="product-origen">
              <span>📍 {product.origen}</span>
              {product.tostado && <span>🔥 {product.tostado}</span>}
            </div>
          )}
        </div>
      </Link>

      <button 
        className="add-to-cart-btn-card"
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
      >
        {product.stock > 0 ? (
          <>
            <span>🛒</span>
            Agregar al Carrito
          </>
        ) : (
          'Sin Stock'
        )}
      </button>
    </div>
  );
};

export default ProductCard;