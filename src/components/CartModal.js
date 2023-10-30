import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import './CartModal.css';

function CartModal({ isOpen, closeModal }) {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('PIX'); // Novo estado para o método de pagamento

  // Funções para diferentes métodos de pagamento
  const handlePIXPayment = () => {
    console.log("Pagamento via PIX");
    // Sua lógica aqui
  };

  const handleCardPayment = () => {
    console.log("Pagamento via Cartão");
    // Sua lógica aqui
  };

  const handleMercadoPagoPayment = async () => {
    // Montando o objeto de itens para enviar para o backend
    const items = cartItems.map(item => ({
      title: item.product,
      quantity: item.quantity,
      unit_price: item.value
    }));
  
    try {
      const response = await fetch('/api/mercadopago', { // Substitua '/api/mercadopago' pelo caminho real da sua rota serverless
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items,
          total
        })
      });
  
      const data = await response.json();
  
      if (data.status === 'success') {
        // Redirecione o usuário para a página de pagamento do Mercado Pago
        window.location.href = data.init_point;
      } else {
        console.error('Ocorreu um erro ao criar a ordem de pagamento');
      }
    } catch (error) {
      console.error('Erro ao comunicar com a API', error);
    }
  };
  
  

  const handleCashPayment = () => {
    console.log("Pagamento em dinheiro");
    // Sua lógica aqui
  };

  const finalizePurchase = () => {
    switch(paymentMethod) {
      case 'PIX':
        handlePIXPayment();
        break;
      case 'Cartão':
        handleCardPayment();
        break;
      case 'MercadoPago':
        handleMercadoPagoPayment();
        break;
      case 'Dinheiro':
        handleCashPayment();
        break;
      default:
        console.error("Método de pagamento não suportado");
    }
  };

  // Agrupa os produtos
  const groupedItems = cartItems.reduce((acc, item) => {
    acc[item.product] = acc[item.product] || { ...item, quantity: 0 };
    acc[item.product].quantity += item.quantity;
    return acc;
  }, {});

  // Calcula o total com base nos itens do carrinho
  const total = cartItems.reduce((sum, item) => sum + item.value * item.quantity, 0);

  // Salvar e recuperar dados do localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('paymentMethod', paymentMethod);
    
    const storedCartItems = localStorage.getItem('cartItems');
    const storedPaymentMethod = localStorage.getItem('paymentMethod');
    if (storedCartItems && storedPaymentMethod) {
      // Você pode adicionar lógica aqui para atualizar o estado do carrinho e da forma de pagamento
    }
  }, [cartItems, paymentMethod]);

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
                  <th></th>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Valor</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Object.values(groupedItems).map((item, index) => (
                  <tr key={index}>
                    <td><img src={item.image} alt={item.product} className="cart-item-image" /></td>
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
        <h3>Forma de Pagamento:</h3>
        <select className="payment-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="PIX">PIX</option>
          <option value="Cartão">Cartão de Crédito/Débito</option>
          <option value="MercadoPago">Mercado Pago</option>
          <option value="Dinheiro">Dinheiro</option>
        </select>
        <div className="cart-actions">
          <button onClick={closeModal}>Continuar Comprando</button>
          <button onClick={finalizePurchase}>Finalizar Compra</button>
        </div>
      </div>
    </center>
  );
}

export default CartModal;
