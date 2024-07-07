
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const user = JSON.parse(localStorage.getItem('user'));

const DetalhesPedido = ({ pedido, onHide, handleConfirmarPagamento }) => {
  const [formaPagamento, setFormaPagamento] = useState('');
  const [desconto, setDesconto] = useState('');
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    if (pedido && pedido.produto && pedido.produto.length > 0) {
      const total = pedido.produto.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);
      setValorTotal(total);
    } else {
      setValorTotal(0);
    }
  }, [pedido]);

  const handleFormaPagamentoChange = (e) => {
    setFormaPagamento(e.target.value);
  };

  const handleDescontoChange = (e) => {
    setDesconto(e.target.value);
  };

  const handleConfirmar = () => {
    handleConfirmarPagamento(pedido, formaPagamento, desconto);
  };

  return (
    <div>
      <div>
        <h5>Detalhes do Pedido</h5>
        <p>Cliente: {pedido.clientName}</p>
        <p>Preço Total: R${pedido.precoTotal}</p>
        <h6>Produtos:</h6>
        {pedido.produto && pedido.produto.length > 0 ? (
          <ul>
            {pedido.produto.map((produto, index) => (
              <li key={index}>
                {produto.productType === 1 && (
                  <div>
                    <p>Detalhes do Produto:</p>
                    <p>Nome: {produto.name}</p>
                    <p>Quantidade: {produto.quantity}</p>
                  </div>
                )}
                {produto.productType === 2 && (
                  <div>
                    <p>Detalhes do Serviço:</p>
                    <p>Nome: {produto.name}</p>
                    <p>Quantidade: {produto.quantity}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum produto disponível.</p>
        )}
      </div>

      <Form>
        <Form.Group controlId="formaPagamento">
          <Form.Label>Forma de Pagamento</Form.Label>
          <Form.Control as="select" value={formaPagamento} onChange={handleFormaPagamentoChange}>
            <option value="">Selecione</option>
            <option value="1">Cédulas</option>
            <option value="2">Cartão de Débito</option>
            <option value="3">Cartão de Crédito</option>
            <option value="4">Pix</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="desconto">
          <Form.Label>Desconto</Form.Label>
          <Form.Control
            type="number"
            value={desconto}
            onChange={handleDescontoChange}
            placeholder="Desconto"
          />
        </Form.Group>
      </Form>

      <Button variant="success" onClick={handleConfirmar}>
        Confirmar Pagamento
      </Button>
      <Button variant="danger" onClick={onHide}>
        Cancelar
      </Button>
    </div>
  );
};
export default DetalhesPedido;



