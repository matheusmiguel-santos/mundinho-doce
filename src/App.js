import React from 'react';
import { CartProvider } from './components/CartContext';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

function App() {
  return (
    <CartProvider>
      <Header />
      <Body />
      <Footer />
    </CartProvider>
  );
}

export default App;
