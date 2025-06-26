import React from 'react';
import './ProductFilters.css';

const ProductFilters = ({ 
  categories, 
  priceRange, 
  setPriceRange, 
  selectedCategory, 
  setSelectedCategory,
  selectedSize,
  setSelectedSize,
  clearFilters,
  minPrice,
  maxPrice
}) => {
  // Opciones de talle para calzado y ropa
  const footwearSizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'];
  const clothingSizes = ['S', 'M', 'L', 'XL'];
  
  // Determinar qué opciones de talle mostrar según la categoría seleccionada
  const isFootwearCategory = ['running', 'casual', 'basketball', 'skate', 'training', 'lifestyle'].includes(selectedCategory);
  const isClothingCategory = ['ropa', 'camisetas', 'pantalones'].includes(selectedCategory);
  const showSizeFilter = isFootwearCategory || isClothingCategory;
  
  // Opciones de talle según el tipo de producto
  const sizeOptions = isFootwearCategory ? footwearSizes : clothingSizes;

  return (
    <div className="product-filters">
      <h3>Filtros</h3>
      
      {/* Filtro por categoría */}
      <div className="filter-section">
        <h4>Categoría</h4>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
          id='category-filter'
        >
          <option value="">Todas las categorías</option>
          {categories.map(category => (
            <option key={category} value={category} >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      {/* Filtro por precio */}
      <div className="filter-section">
        <h4>Precio</h4>
        <div className="price-range">
          <span>${minPrice.toLocaleString()}</span>
          <span>${maxPrice.toLocaleString()}</span>
        </div>
        <input 
          type="range" 
          min={minPrice} 
          max={maxPrice} 
          value={priceRange} 
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="price-slider"
        />
        <div className="price-value">
          Hasta: ${priceRange.toLocaleString()}
        </div>
      </div>
      
      {/* Filtro por talle (solo si aplica según la categoría) */}
      <div className={`filter-section ${!showSizeFilter ? 'hidden-filter' : ''}`}>
        <h4>Talle</h4>
        <select 
          value={selectedSize} 
          onChange={(e) => setSelectedSize(e.target.value)}
          className="filter-select"
          id='size-filter'
        >
          <option value="">Todos los talles</option>
          {sizeOptions.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      
      {/* Botón para limpiar filtros */}
      <button onClick={clearFilters} className="clear-filters-btn">
        Limpiar filtros
      </button>
    </div>
  );
};

export default ProductFilters;