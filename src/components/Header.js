import React, { useState, useContext } from 'react';  // Adicione useContext
import CartModal from './CartModal';
import './Header.css';
import { CartContext } from './CartContext';  // Adicione este import

function Header() {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { cartItems } = useContext(CartContext);  // Adicione esta linha

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);  // Adicione esta linha

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  return (
    <header className='header'>
      <img src="http://placekitten.com/200/300" alt="Logo" className='logo' />
      <h1 className='title'>Mundinho Doce</h1>
      <div className='checkout'>
        <button className='checkout-button' onClick={openCartModal}>
          <img src="https://imgur.com/J56hqd5.png" alt="Carrinho" className='checkout-image' height='50px'/>
          {totalItems > 0 && <span className="item-count">{totalItems}</span>}  {/* Adicione esta linha */}
        </button>
      </div>
      {isCartModalOpen && <CartModal isOpen={isCartModalOpen} closeModal={closeCartModal} />}
    </header>
  );
}

export default Header;
