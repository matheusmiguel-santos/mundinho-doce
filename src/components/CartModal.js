import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './CartModal.css';

function CartModal({ isOpen, closeModal }) {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.value * item.quantity, 0);

  return (
    <div className={isOpen ? 'modal open' : 'modal'}>
      <h1>Seu Carrinho</h1>
      {cartItems.map((item, index) => (
        <div key={index}>
          <h2>{item.product}</h2>
          <p>Quantidade: {item.quantity}</p>
          <p>Valor: {item.value.toFixed(2)}</p>
          <button onClick={() => removeFromCart(item.product)}>Remover</button>
        </div>
      ))}
      <h2>Total: {total.toFixed(2)}</h2>
      <p>Qual a forma de pagamento?</p>
      <select id="paymentMethod">
        <option value="credit">Crédito</option>
        <option value="debit">Débito</option>
        <option value="pix">PIX</option>
        <option value="cash">Dinheiro</option>
      </select>
      <button onClick={closeModal}>Finalizar Compra</button>
    </div>
  );
}

export default CartModal;
