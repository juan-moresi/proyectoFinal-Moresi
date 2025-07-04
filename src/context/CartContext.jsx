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

  // Función helper para crear ID único
  const createUniqueId = (productId, size) => {
    return size ? `${productId}-${size}` : `${productId}`;
  };
  
  // Agregar producto al carrito
  const addItem = (item, quantity) => {
    const uniqueId = createUniqueId(item.id, item.size);
    const existingItemIndex = cart.findIndex(cartItem => 
      createUniqueId(cartItem.id, cartItem.size) === uniqueId
    );
    
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity, uniqueId }]);
    }
  };

  // Verificar si existe en carrito
  const isInCart = (itemId, size = null) => {
    const uniqueId = createUniqueId(itemId, size);
    return cart.some(item => createUniqueId(item.id, item.size) === uniqueId);
  };

  // Actualizar cantidad
  const updateItemQuantity = (itemId, quantity, size = null) => {
    if (quantity <= 0) return; // Prevenir cantidades negativas
    
    const uniqueId = createUniqueId(itemId, size);
    const updatedCart = cart.map(item => {
      const itemUniqueId = createUniqueId(item.id, item.size);
      return itemUniqueId === uniqueId ? { ...item, quantity: quantity } : item;
    });
    setCart(updatedCart);
  };

  // Remover producto del carrito
  const removeItem = (itemId, size = null) => {
    const uniqueId = createUniqueId(itemId, size);
    const updatedCart = cart.filter(item => {
      const itemUniqueId = createUniqueId(item.id, item.size);
      return itemUniqueId !== uniqueId;
    });
    setCart(updatedCart);
  };

  // Limpiar carrito
  const clear = () => {
    setCart([]);
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