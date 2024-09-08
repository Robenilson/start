import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cartItems, onCancelItem }) => {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => setShowCart(!showCart); // Função para abrir/fechar carrinho

  // Calcula o total dos itens no carrinho
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.precoTotal;
  }, 0);

  return (
    <div className="cart-container" onClick={toggleCart}>
      {/* Ícone do carrinho com contador */}
      <FontAwesomeIcon icon={faShoppingCart} size="lg" />
      <span className="cart-count">{cartItems.length}</span>

      {/* Exibição do dropdown do carrinho */}
      {showCart && (
        <div className="cart-dropdown">
          <h3>Itens no Carrinho</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.produto[0].name} - R$ {item.precoTotal}
                
                {/* Botões para Editar e Cancelar */}
                <div className="item-actions">
                
                  <button
                    className="action-btn delete-btn"
                    onClick={() => onCancelItem(item.id)}
                  >
                    Cancelar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Exibição do valor total */}
          <div className="total-price">
            <strong>Total a ser pago: R$ {totalPrice}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
