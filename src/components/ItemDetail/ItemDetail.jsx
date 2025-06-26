import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';
import RandomSuggestions from '../RandomSuggestions/RandomSuggestions';
import './ItemDetail.css';

const ItemDetail = ({ product }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const [selectedSize, setSelectedSize] = useState('9');
  const { addItem, isInCart } = useContext(CartContext);

  // Determinar si es calzado por categoría
  const isFootwear = product && ['running', 'casual', 'basketball', 'skate', 'training', 'lifestyle'].includes(product.category);
  
  // Opciones de talle según tipo de producto
  const sizeOptions = isFootwear 
    ? ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13']
    : ['S', 'M', 'L', 'XL'];

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);
    
    if (product) {
      const itemToAdd = {
        ...product,
        size: product.category !== 'accesorios' ? selectedSize : null
      };
      addItem(itemToAdd, quantity);
    }
  };

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Producto no encontrado</h2>
        <p>El producto que estás buscando no existe o ha sido removido.</p>
        <Link to="/" className="back-button">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      <div className="item-detail-card">
        <div className="item-detail-image-container">
          <img src={product.pictureUrl} alt={product.title} className="item-detail-image" />
          <span className="item-detail-category">{product.category}</span>
        </div>
        <div className="item-detail-info">
          <h2 className="item-detail-title">{product.title}</h2>
          <p className="item-detail-price">${product.price.toFixed(2)}</p>
          <p className="item-detail-description">{product.description}</p>
          
          {/* Selector de talle */}
          {product.category !== 'accesorios' && (
            <div className="item-detail-size-selector">
              <label htmlFor={`detail-size-select-${product.id}`}>
                {isFootwear ? 'Talle US:' : 'Talle:'}
              </label>
              <select 
                id={`detail-size-select-${product.id}`} 
                value={selectedSize} 
                onChange={(e) => setSelectedSize(e.target.value)}
                className="detail-size-select"
              >
                {sizeOptions.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          )}
          
          <div className="item-detail-stock">
            <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
              {product.stock > 0 ? `Stock disponible: ${product.stock}` : 'Sin stock'}
            </span>
          </div>
          
          {quantityAdded > 0 ? (
            <div className="item-detail-actions">
              <p className="added-message">¡Producto agregado al carrito!</p>
              <div className="item-detail-buttons">
                <Link to="/" className="continue-shopping">Seguir comprando</Link>
                <Link to="/cart" className="go-to-cart">Ir al carrito</Link>
              </div>
            </div>
          ) : (
            <div className="item-detail-actions">
              <ItemCount stock={product.stock} initial={1} onAdd={handleOnAdd} />
              <Link to="/" className="back-to-products">Volver al catálogo</Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Sugerencias relacionadas */}
      <RandomSuggestions 
        currentProductId={product.id} 
        category={product.category} 
        count={4} 
        title="Productos relacionados"
      />
    </div>
  );
};

export default ItemDetail;