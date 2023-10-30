import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './CartModal.css';

function CartModal({ isOpen, closeModal }) {
  const { cartItems, removeFromCart } = useContext(CartContext);

  // Agrupa os produtos
  const groupedItems = cartItems.reduce((acc, item) => {
    acc[item.product] = acc[item.product] || { ...item, quantity: 0 };
    acc[item.product].quantity += item.quantity;
    return acc;
  }, {});

  // Calcula o total com base nos itens do carrinho
  const total = cartItems.reduce((sum, item) => sum + item.value * item.quantity, 0);

  return (
    <center>
    <div className={isOpen ? 'modal-backdrop show' : 'modal-backdrop'}></div>
    <div className={isOpen ? 'modal open' : 'modal'}>
      <h1>Seu Carrinho 🛒</h1>
      {cartItems.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div className="cart-table-wrapper">
        <table className="cart-table">
          <thead>
            <tr>
              <th></th>  {/* Coluna para a imagem */}
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedItems).map((item, index) => (
              <tr key={index}>
                <td><img src={item.image} alt={item.product} className="cart-item-image" /></td>  {/* Célula para a imagem */}
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>{(item.value * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeFromCart(item.product)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      <h2>Total: {total.toFixed(2)}</h2>
      <div className="cart-actions">
        <button onClick={closeModal}>Continuar Comprando</button>
        <button onClick={() => { /* Adicione a lógica de compra aqui */ }}>Finalizar Compra</button>
      </div>
    </div>
    </center>
  );
}

export default CartModal;
