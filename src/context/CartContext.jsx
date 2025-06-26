import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Estado inicial del carrito desde localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error al cargar el carrito desde localStorage:', error);
      return [];
    }
  });
  
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Actualizar localStorage y totales
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      
      const items = cart.reduce((total, item) => total + item.quantity, 0);
      setTotalItems(items);
      
      const price = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      setTotalPrice(price);
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }, [cart]);

  // Agregar producto al carrito
  const addItem = (item, quantity) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  // Remover producto del carrito
  const removeItem = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  // Limpiar carrito
  const clear = () => {
    setCart([]);
  };

  // Verificar si existe en carrito
  const isInCart = (itemId) => {
    return cart.some(item => item.id === itemId);
  };

  // Actualizar cantidad
  const updateItemQuantity = (itemId, quantity) => {
    const updatedCart = cart.map(item => 
      item.id === itemId ? { ...item, quantity: quantity } : item
    );
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{
      cart,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      clear,
      isInCart,
      updateItemQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};