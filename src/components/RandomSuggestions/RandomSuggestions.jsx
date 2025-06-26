import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/firebaseService';
import './RandomSuggestions.css';

const RandomSuggestions = ({ currentProductId, category, count = 4, title = "También te puede interesar" }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const products = await getProducts();
        
        // Filtrar productos para excluir el producto actual y priorizar la misma categoría
        const filteredProducts = products.filter(product => product.id !== currentProductId);
        
        // Dividir productos entre los de la misma categoría y otros
        const sameCategory = category 
          ? filteredProducts.filter(product => product.category === category)
          : [];
        const otherCategories = category 
          ? filteredProducts.filter(product => product.category !== category)
          : filteredProducts;
        
        // Mezclar los arrays para obtener resultados aleatorios
        const shuffledSameCategory = [...sameCategory].sort(() => 0.5 - Math.random());
        const shuffledOthers = [...otherCategories].sort(() => 0.5 - Math.random());
        
        // Priorizar productos de la misma categoría, pero completar con otros si es necesario
        const selectedSuggestions = [
          ...shuffledSameCategory.slice(0, count),
          ...shuffledOthers.slice(0, Math.max(0, count - shuffledSameCategory.length))
        ].slice(0, count);
        
        setSuggestions(selectedSuggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };
    
    fetchSuggestions();
  }, [currentProductId, category, count]);

  if (suggestions.length === 0) return null;

  return (
    <div className="random-suggestions">
      <h3 className="suggestions-title">{title}</h3>
      <div className="suggestions-container">
        {suggestions.map(product => (
          <Link to={`/item/${product.id}`} key={product.id} className="suggestion-card">
            <div className="suggestion-image-container">
              <img src={product.pictureUrl} alt={product.title} className="suggestion-image" />
            </div>
            <div className="suggestion-info">
              <h4 className="suggestion-title">{product.title}</h4>
              <p className="suggestion-price">${product.price.toFixed(2)}</p>
              <span className="suggestion-category">{product.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RandomSuggestions;