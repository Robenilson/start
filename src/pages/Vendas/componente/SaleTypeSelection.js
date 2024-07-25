import React from 'react';
import { Button, Form } from 'react-bootstrap';

const SaleTypeSelection = ({ handleButtonClick }) => {
  return (
    <Form.Group className="mt-3">
      <Form.Label>Tipo de Venda</Form.Label>
      <div>
        <Button variant="primary" onClick={() => handleButtonClick('produto')} className="me-2">
          Produto
        </Button>
        <Button variant="secondary" onClick={() => handleButtonClick('serviço')}>
          Serviço
        </Button>
      </div>
    </Form.Group>
  );
};

export default SaleTypeSelection;
