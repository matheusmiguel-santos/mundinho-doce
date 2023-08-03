import React, { useState } from 'react';

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity, value) => {
    setCartItems([...cartItems, { product, quantity, value }]);
  };

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter(item => item.product !== product));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
