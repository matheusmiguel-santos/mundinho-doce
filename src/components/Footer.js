import React from 'react';
import './Footer.css';
import logo from './logo.png'; // Substitua pelo caminho correto

function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="Mundinho Doce" className="footer-logo" />
      <div className="footer-content">
        <p>Telefone: (14) 99770-2116 (14) 99814-1078</p>
        <p>Entregas e Pedidos pelo WhatsApp ;)</p>
        <p className="footer-credits">Lojinha e Painel Administrativo desenvolvido por Matheus M. Santos</p>
      </div>
    </footer>
  );
}

export default Footer;
