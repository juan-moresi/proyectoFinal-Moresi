import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import RandomSuggestions from '../RandomSuggestions/RandomSuggestions';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import './Cart.css';

const Cart = () => {
  const { cart, removeItem, clear, totalItems, totalPrice, updateItemQuantity } = useContext(CartContext);
  const [showClearCartModal, setShowClearCartModal] = useState(false);

  if (totalItems === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p>¿No sabes qué comprar? ¡Miles de productos te esperan!</p>
        <Link to="/" className="continue-shopping-btn">Ir a comprar</Link>
        
        {/* Sugerencias para carrito vacío */}
        <RandomSuggestions 
          count={4} 
          title="Productos Relacionados"
        />
      </div>
    );
  }

  const handleQuantityChange = (itemId, currentQuantity, stock, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0 && newQuantity <= stock) {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const handleClearCartConfirm = () => {
    clear();
    setShowClearCartModal(false);
  };

  const handleClearCartCancel = () => {
    setShowClearCartModal(false);
  };

  // Obtener categorías para sugerencias
  const cartCategories = [...new Set(cart.map(item => item.category))];
  // Obtener IDs para excluirlos de sugerencias
  const cartProductIds = cart.map(item => item.id);

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      
      <div className="cart-header">
        <div className="cart-header-product">Producto</div>
        <div className="cart-header-price">Precio</div>
        <div className="cart-header-quantity">Cantidad</div>
        <div className="cart-header-subtotal">Subtotal</div>
        <div className="cart-header-actions">Acciones</div>
      </div>
      
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-product">
              <img src={item.pictureUrl} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-category">{item.category}</p>
                {item.size && <p className="cart-item-size">Talle: {item.size}</p>}
              </div>
            </div>
            
            <div className="cart-item-price">${item.price.toFixed(2)}</div>
            
            <div className="cart-item-quantity">
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(item.id, item.quantity, item.stock, -1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(item.id, item.quantity, item.stock, 1)}
                disabled={item.quantity >= item.stock}
              >
                +
              </button>
            </div>
            
            <div className="cart-item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            
            <div className="cart-item-actions">
              <button 
                className="remove-item-btn"
                onClick={() => removeItem(item.id)}
                aria-label="Eliminar producto"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <button className="clear-cart-btn" onClick={() => setShowClearCartModal(true)}>Vaciar carrito</button>
        
        <div className="cart-totals">
          <div className="cart-total-items">
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          <div className="cart-total-price">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="cart-actions">
        <Link to="/" className="continue-shopping-btn">Seguir comprando</Link>
        <Link to="/checkout" className="checkout-btn">Finalizar compra</Link>
      </div>
      
      {/* Sugerencias basadas en categorías */}
      <RandomSuggestions 
        currentProductId={cartProductIds} 
        category={cartCategories[0]}
        count={4} 
        title="Completa tu compra con estos productos"
      />

      {showClearCartModal && (
        <ConfirmationModal
          message="¿Estás seguro de que quieres vaciar el carrito? Esta acción es irreversible."
          onConfirm={handleClearCartConfirm}
          onCancel={handleClearCartCancel}
        />
      )}
    </div>
  );
};

export default Cart;
