import React from 'react';
import Item from '../Item/Item';
import './ItemList.css';

const ItemList = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <h3>No hay productos disponibles</h3>
        <p>Intenta con otra categoría o vuelve más tarde.</p>
      </div>
    );
  }

  return (
    <div className="item-list" style={{ minHeight: `${Math.ceil(products.length / 4) * 400}px` }}>
      {products.map((product) => (
        <div className="item-list-card" key={product.id}>
          <Item
            id={product.id}
            title={product.title}
            price={product.price}
            pictureUrl={product.pictureUrl}
            category={product.category}
            stock={product.stock}
          />
        </div>
      ))}
    </div>
  );
};

export default ItemList;