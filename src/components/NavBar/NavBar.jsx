import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import { getCategories } from '../../services/firebaseService';
import logo from '../../assets/logo.png';
import './NavBar.css';

const NavBar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    if (menuActive) setMenuActive(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand-container">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="Logo" className="navbar-logo" />
          </Link>
          <Link to="/" className="navbar-brand" onClick={closeMenu}>Sneakers Shop</Link>
        </div>
        
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span>☰</span>
        </button>
        
        <ul className={`navbar-menu ${menuActive ? 'active' : ''}`}>
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? 'active-link' : ''} onClick={closeMenu}>Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({isActive}) => isActive ? 'active-link' : ''} onClick={closeMenu}>Productos</NavLink>
          </li>
          <li className="dropdown">
            <span className="dropdown-toggle">Categorías</span>
            <ul className="dropdown-menu">
              {categories.map((category) => (
                <li key={category}>
                  <NavLink 
                    to={`/category/${category}`} 
                    className={({isActive}) => isActive ? 'active-link' : ''}
                    onClick={closeMenu}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <NavLink to="/contact" className={({isActive}) => isActive ? 'active-link' : ''} onClick={closeMenu}>Contacto</NavLink>
          </li>
        </ul>
        
        <div className="navbar-right">
          <Link to="/cart" onClick={closeMenu}>
            <CartWidget />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;