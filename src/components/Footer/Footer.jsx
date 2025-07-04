import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 Sneakers Shop - Todos los derechos reservados</p>
        <Link to="/admin" className="admin-link">
          Admin - Ver Resumen Compras
        </Link>
      </div>
    </footer>
  );
};

export default Footer;