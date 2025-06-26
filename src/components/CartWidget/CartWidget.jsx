import React, { useContext } from 'react';
import './CartWidget.css';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {
  const { totalItems } = useContext(CartContext);

  return (
    <div className="cart-widget">
      <ShoppingCart />
      <span className="cart-notification">{totalItems}</span>
    </div>
  );
};

export default CartWidget;