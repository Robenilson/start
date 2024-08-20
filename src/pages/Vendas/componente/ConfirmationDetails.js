import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ConfirmationDetails = ({ confirmationData, quantity, handleQuantityChange, handleConfirm, handleCancel, saleType }) => {
  return (
    <div >
      <h5 className='detalhes'>Confirmação  Venda</h5>
      <p>
        <strong>Tipo de Venda:</strong> {confirmationData.saleType}
      </p>
      <p>
        <strong>Item:</strong> {confirmationData.item.nome}
      </p>
      <p>
        <strong>Preço Unitário:</strong> R${confirmationData.item.valor?.toFixed(2)}
      </p>
      <Form.Group>
        <Form.Label>
          {saleType === 'produto' ? 'Quantidade' : 'Horas de Uso'}
        </Form.Label>
        <Form.Control
          type="number"
          min={0} // Ajusta para iniciar em 0
          value={quantity}
          onChange={handleQuantityChange}
        />
      </Form.Group>
      <p>
        <strong>Valor Total:</strong> R${confirmationData.total.toFixed(2)}
      </p>
      <button variant="success" onClick={handleConfirm} className="btn primary-btn">
        Confirmar Venda
      </button>
      <button variant="danger" onClick={handleCancel} className="btn primary-btn">
        Cancelar
      </button>
    </div>
  );
};

export default ConfirmationDetails;
