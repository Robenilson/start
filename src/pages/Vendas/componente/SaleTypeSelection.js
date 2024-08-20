import React from 'react';
import {  Form } from 'react-bootstrap';

const SaleTypeSelection = ({ handleButtonClick }) => {
  return (
    <Form.Group className="mt-3">
      <Form.Label>Tipo de Venda</Form.Label>
      <div>
        <button variant="primary" onClick={() => handleButtonClick('produto')} className="btn primary-btn">
          Produto
        </button>
        <button variant="secondary" onClick={() => handleButtonClick('serviço')} className="btn primary-btn">
          Serviço
        </button>
      </div>
    </Form.Group>
  );
};

export default SaleTypeSelection;
