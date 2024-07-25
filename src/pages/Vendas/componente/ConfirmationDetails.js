import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ConfirmationDetails = ({ confirmationData, quantity, handleQuantityChange, handleConfirm, handleCancel, saleType }) => {
  return (
    <div className="mt-5">
      <h4>Confirmação de Venda</h4>
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
      <Button variant="success" onClick={handleConfirm} className="me-2">
        Confirmar Venda
      </Button>
      <Button variant="danger" onClick={handleCancel}>
        Cancelar
      </Button>
    </div>
  );
};

export default ConfirmationDetails;
