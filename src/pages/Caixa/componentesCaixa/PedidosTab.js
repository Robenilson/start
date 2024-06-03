import React from 'react';
import { Table, Button } from 'react-bootstrap';

const PedidosTab = ({ pedidos, handlePedidoFormaPagamento }) => {
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>CPF Cliente</th>
          <th>Produto/Serviço</th>
          <th>Valor</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.map((pedido, index) => (
          <tr key={index}>
            <td>{pedido.cpf}</td>
            <td>{pedido.produtoServico}</td>
            <td>{pedido.valor}</td>
            <td>
              <Button variant="info" onClick={() => handlePedidoFormaPagamento(index)}>
                Pedir Forma de Pagamento
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PedidosTab;
