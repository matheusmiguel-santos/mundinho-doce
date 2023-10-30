import React, { useState, useContext, useEffect } from 'react';
import productsData from './db.json';  // Certifique-se de que o caminho para db.json está correto
import './body.css';
import { CartContext } from './CartContext';

function Body() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clickedProduct, setClickedProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (clickedProduct !== null) {
      setTimeout(() => {
        setClickedProduct(null);
      }, 1000);  // Reset após 1 segundo
    }
  }, [clickedProduct]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleQuantityChange = (id, event) => {
    // Você pode adicionar lógica aqui para atualizar a quantidade do produto no estado ou banco de dados
  };

  const handleAddToCart = (product) => {
    addToCart(product.title, 1, product.price, product.image);  // Inclua product.image aqui
    setClickedProduct(product.id);
  };
  

  const filteredProducts = productsData.products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar produtos"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="container">
        {filteredProducts.map(product => (
          <div key={product.id} className="column">
            <img src={product.image} alt="Produto" className="image" />
            <div className="text">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Preço: ${product.price}</p>
              <input 
                type="number" 
                min="0" 
                defaultValue="1"
                onChange={(event) => handleQuantityChange(product.id, event)}
              />
            </div>
            <button 
              className={`button ${clickedProduct === product.id ? 'button-clicked' : ''}`} 
              onClick={() => handleAddToCart(product)}
            >
              {clickedProduct === product.id ? '✔ Produto Adicionado' : 'Adicionar ao Carrinho'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Body;
