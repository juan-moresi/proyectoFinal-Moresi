import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

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
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validar asunto
    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    }
    
    // Validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitStatus({ loading: true, success: false, error: null });
    
    try {
      // Simulamos una llamada a API con un timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulamos una respuesta exitosa
      setSubmitStatus({
        loading: false,
        success: true,
        error: null
      });
      
      // Limpiar el formulario después de envío exitoso
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: 'Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.'
      });
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>Contáctanos</h2>
        <p>¿Tienes alguna pregunta o comentario? Estamos aquí para ayudarte.</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <div className="info-icon">
              <i className="location-icon">📍</i>
            </div>
            <div className="info-text">
              <h3>Ubicación</h3>
              <p>Av. Corrientes 1234, CABA</p>
              <p>Buenos Aires, Argentina</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">
              <i className="email-icon">✉️</i>
            </div>
            <div className="info-text">
              <h3>Email</h3>
              <p>info@sneakersshop.com</p>
              <p>soporte@sneakersshop.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">
              <i className="phone-icon">📞</i>
            </div>
            <div className="info-text">
              <h3>Teléfono</h3>
              <p>+54 11 1234-5678</p>
              <p>Lun - Vie: 9:00 - 18:00</p>
            </div>
          </div>
          
          <div className="social-media">
            <h3>Síguenos</h3>
            <div className="social-icons">
              <a href="#" className="social-icon">FB</a>
              <a href="#" className="social-icon">IG</a>
              <a href="#" className="social-icon">TW</a>
              <a href="#" className="social-icon">YT</a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h3>Envíanos un mensaje</h3>
          
          {submitStatus.success ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h4>¡Mensaje enviado con éxito!</h4>
              <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
              <button 
                className="send-another-btn"
                onClick={() => setSubmitStatus({ loading: false, success: false, error: null })}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nombre *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
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
                <label htmlFor="subject">Asunto *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={errors.message ? 'error' : ''}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
              
              {submitStatus.error && (
                <div className="form-error">
                  {submitStatus.error}
                </div>
              )}
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={submitStatus.loading}
              >
                {submitStatus.loading ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;