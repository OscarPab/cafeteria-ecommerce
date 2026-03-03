import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

  // Asegurar que cartTotal sea un número
  const total = cartTotal || 0;
  const shippingCost = total > 500 ? 0 : 50;
  const finalTotal = total + shippingCost;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <span className="cart-empty-icon">🛒</span>
        <h2>Tu carrito está vacío</h2>
        <p>¡Explora nuestros productos y encuentra tu café favorito!</p>
        <Link to="/products" className="continue-shopping">
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Carrito de Compras</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map(item => {
            // Asegurar que item.price sea número
            const price = Number(item.price) || 0;
            const subtotal = price * (item.quantity || 1);
            
            return (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.imagen || item.image || 'https://images.unsplash.com/photo-1442512595331-e89e73853f31'} 
                  alt={item.nombre || item.name} 
                  className="cart-item-image" 
                />
                
                <div className="cart-item-info">
                  <h3>{item.nombre || item.name}</h3>
                  <p className="cart-item-price">${price.toFixed(2)} MXN</p>
                </div>
                
                <div className="cart-item-quantity">
                  <button 
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    className="quantity-btn"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity || 1}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                
                <div className="cart-item-subtotal">
                  ${subtotal.toFixed(2)} MXN
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-item"
                  aria-label="Eliminar"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
        
        <div className="cart-summary">
          <h3>Resumen del Pedido</h3>
          
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)} MXN</span>
          </div>
          
          <div className="summary-row">
            <span>Envío:</span>
            <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)} MXN`}</span>
          </div>
          
          <div className="summary-row total">
            <span>Total:</span>
            <span>${finalTotal.toFixed(2)} MXN</span>
          </div>
          
          <div className="cart-actions">
            <button onClick={clearCart} className="clear-cart">
              Vaciar Carrito
            </button>
            <Link to="/checkout" className="checkout-btn">
              Proceder al Pago
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;