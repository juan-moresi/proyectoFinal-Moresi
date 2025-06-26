import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import ProductFilters from '../ProductFilters/ProductFilters';
import { getProducts, getProductsByCategory, getCategories } from '../../services/firebaseService';
import './ItemListContainer.css';

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();
  
  // Estados para filtros
  const [selectedCategory, setSelectedCategory] = useState(categoryId || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  // Cargar productos y categorías
  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        // Obtener categorías
        const allCategories = await getCategories();
        setCategories(allCategories);
        
        // Obtener productos según categoría
        let result;
        if (categoryId) {
          result = await getProductsByCategory(categoryId);
          setSelectedCategory(categoryId);
        } else {
          result = await getProducts();
        }
        
        setProducts(result);
        
        // Establecer rango de precios
        if (result.length > 0) {
          const prices = result.map(p => p.price);
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          setMinPrice(min);
          setMaxPrice(max);
          setPriceRange(max);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error al cargar los productos. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  // Aplicar filtros
  useEffect(() => {
    if (products.length === 0) return;
    
    let filtered = [...products];
    
    // Filtrar por categoría
    if (selectedCategory && selectedCategory !== categoryId) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Filtrar por precio
    filtered = filtered.filter(p => p.price <= priceRange);
    
    // Filtrar por talle
    if (selectedSize) {
      const isFootwearCategory = ['running', 'casual', 'basketball', 'skate', 'training', 'lifestyle'].includes(
        selectedCategory || categoryId || filtered[0]?.category
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, selectedSize, categoryId]);

  // Limpiar filtros
  const clearFilters = () => {
    setSelectedCategory(categoryId || '');
    setSelectedSize('');
    setPriceRange(maxPrice);
  };

  return (
    <div className="item-list-container">
      <div className="greeting">
        <h2>{greeting}</h2>
        {categoryId && (
          <div className="category-badge">
            Categoría: <span>{categoryId}</span>
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="no-products-container">
          <p>No hay productos disponibles en esta categoría.</p>
        </div>
      ) : (
        <div className="products-container">
          <div className="products-with-filters">
            <div className="products-content">
              <ItemList products={filteredProducts.length > 0 ? filteredProducts : products} />
            </div>
            <ProductFilters 
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              clearFilters={clearFilters}
              categoryFromUrl={categoryId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;