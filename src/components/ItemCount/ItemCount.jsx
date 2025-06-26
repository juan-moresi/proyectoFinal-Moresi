import React, { useState } from 'react';
import './ItemCount.css';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleIncrease = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="item-count">
      <div className="count-controls">
        <button 
          className="count-button" 
          onClick={handleDecrease} 
          disabled={count <= 1}
        >
          -
        </button>
        <span className="count-display">{count}</span>
        <button 
          className="count-button" 
          onClick={handleIncrease} 
          disabled={count >= stock}
        >
          +
        </button>
      </div>
      <button 
        className="add-to-cart-button" 
        onClick={() => onAdd(count)} 
        disabled={stock <= 0}
      >
        {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
      </button>
    </div>
  );
};

export default ItemCount;