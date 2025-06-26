import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProducts } from '../../services/firebaseService';
import ItemList from '../ItemList/ItemList';
import './HomePage.css';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Precargar imagen del banner
    const bannerImg = new Image();
    bannerImg.fetchPriority = 'high';
    bannerImg.src = 'https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80';
    
    bannerImg.onload = () => {
      const heroBanner = document.querySelector('.hero-banner');
      if (heroBanner) {
        heroBanner.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bannerImg.src})`;
      }
    };
    
    const fetchData = async () => {
      try {
        // Obtener datos en paralelo
        const [allCategories, allProducts] = await Promise.all([
          getCategories(),
          getProducts()
        ]);
        
        setCategories(allCategories);

        // Agrupar productos por categoría
        const productsByCategory = {};
        allCategories.forEach(category => {
          productsByCategory[category] = [];
        });

        // Clasificar productos
        allProducts.forEach(product => {
          if (productsByCategory[product.category]) {
            productsByCategory[product.category].push(product);
          }
        });

        // Seleccionar productos destacados
        const featured = [];
        allCategories.forEach(category => {
          const categoryProducts = productsByCategory[category].slice(0, 2);
          featured.push(...categoryProducts);
        });

        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      {/* Banner principal */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>¡Bienvenido a nuestra tienda en línea!</h1>
          <p className="slogan">"Cada paso cuenta, cada estilo importa"</p>
          <Link to="/products" className="cta-button">Ver todos los productos</Link>
        </div>
      </div>

      {/* Categorías */}
      <section className="categories-section">
        <h2>Explora nuestras categorías</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <Link key={category} to={`/category/${category}`} className="category-card">
              <div className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section className="featured-products">
        <h2>Productos destacados</h2>
        {loading ? (
          <div className="loading-spinner">Cargando productos destacados...</div>
        ) : (
          <ItemList products={featuredProducts} />
        )}
        <div className="view-all-container">
          <Link to="/products" className="view-all-button">Ver todos los productos</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
