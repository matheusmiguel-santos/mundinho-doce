import React, { useState , useContext} from 'react';
import productsData from './db.json';
import './body.css';

import { CartContext } from './CartContext';


function Body() {
    
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleQuantityChange = (id, event) => {
    const newQuantity = event.target.value;
    // Aqui você pode atualizar a quantidade do produto no estado/banco de dados
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
              <p>Preço: ${product.price}</p> {/* Adicione o preço aqui */}
              <input 
                type="number" 
                min="0" 
                value={product.quantity} 
                onChange={(event) => handleQuantityChange(product.id, event)}
              /> {/* Adicione a quantidade aqui */}
            </div>
            <button className="button">COMPRE</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Body;
