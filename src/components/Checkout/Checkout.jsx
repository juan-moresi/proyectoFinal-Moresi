import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart, totalPrice, clear } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    comments: ''
  });
  
  const [errors, setErrors] = useState({});
  const [orderStatus, setOrderStatus] = useState({
    loading: false,
    success: false,
    error: null,
    orderId: null
  });

  // Redirigir al carrito si está vacío
  if (cart.length === 0 && !orderStatus.success) {
    return (
      <div className="checkout-empty">
        <h2>No hay productos en tu carrito</h2>
        <p>Agrega productos antes de proceder al checkout</p>
        <Link to="/" className="back-to-shop-btn">Ir a la tienda</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validar nombre
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }
    
    // Validar apellido
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }
    
    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validar confirmación de email
    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Los emails no coinciden';
    }
    
    // Validar teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^[0-9]{9,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Teléfono inválido (mínimo 9 dígitos)';
    }
    
    // Validar dirección
    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }
    
    // Validar ciudad
    if (!formData.city.trim()) {
      newErrors.city = 'La ciudad es requerida';
    }
    
    // Validar código postal
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'El código postal es requerido';
    } else if (!/^[0-9]{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Código postal inválido (5 dígitos)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setOrderStatus({ ...orderStatus, loading: true, error: null });
    
    try {
      // Simulamos una llamada a API con un timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generar un ID de orden aleatorio
      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // Simulamos una respuesta exitosa
      setOrderStatus({
        loading: false,
        success: true,
        error: null,
        orderId: orderId
      });
      
      // Limpiar el carrito después de una orden exitosa
      clear();
      
    } catch (error) {
      setOrderStatus({
        loading: false,
        success: false,
        error: 'Hubo un error al procesar tu orden. Por favor intenta nuevamente.',
        orderId: null
      });
    }
  };

  // Mostrar pantalla de éxito si la orden fue procesada
  if (orderStatus.success) {
    return (
      <div className="order-success">
        <div className="success-icon">✓</div>
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu orden ha sido procesada correctamente.</p>
        <p className="order-id">ID de orden: <strong>{orderStatus.orderId}</strong></p>
        <p>Recibirás un email con los detalles de tu compra.</p>
        <div className="success-actions">
          <Link to="/" className="back-to-shop-btn">Volver a la tienda</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>
      
      <div className="checkout-content">
        <div className="checkout-form-container">
          <h3>Información de Contacto y Envío</h3>
          
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Nombre *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Apellido *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmEmail">Confirmar Email *</label>
                <input
                  type="email"
                  id="confirmEmail"
                  name="confirmEmail"
                  value={formData.confirmEmail}
                  onChange={handleChange}
                  className={errors.confirmEmail ? 'error' : ''}
                />
                {errors.confirmEmail && <span className="error-message">{errors.confirmEmail}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Teléfono *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Dirección *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Ciudad *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="postalCode">Código Postal *</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={errors.postalCode ? 'error' : ''}
                />
                {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="comments">Comentarios (opcional)</label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
            
            {orderStatus.error && (
              <div className="form-error">
                {orderStatus.error}
              </div>
            )}
            
            <div className="checkout-actions">
              <Link to="/cart" className="back-to-cart-btn">Volver al carrito</Link>
              <button 
                type="submit" 
                className="place-order-btn"
                disabled={orderStatus.loading}
              >
                {orderStatus.loading ? 'Procesando...' : 'Finalizar compra'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="checkout-summary">
          <h3>Resumen de Compra</h3>
          
          <div className="checkout-items">
            {cart.map((item) => (
              <div key={item.id} className="checkout-item">
                <div className="checkout-item-image">
                  <img src={item.pictureUrl} alt={item.title} />
                </div>
                <div className="checkout-item-details">
                  <h4>{item.title}</h4>
                  <div className="checkout-item-meta">
                    <span>Cantidad: {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="checkout-totals">
            <div className="checkout-subtotal">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="checkout-shipping">
              <span>Envío:</span>
              <span>Gratis</span>
            </div>
            <div className="checkout-total">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;