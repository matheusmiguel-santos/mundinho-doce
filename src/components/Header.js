import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <img src="http://placekitten.com/200/300" alt="Logo" className='logo' />
      <h1>Mundinho Doce</h1>
      <div className='checkout'>
        <button className='checkout-button'>
          <img src="https://imgur.com/J56hqd5.png" alt="Carrinho" className='checkout-image' height='50px'/>
        </button>
      </div>
    </header>
  );
}

export default Header;
