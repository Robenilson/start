import React from 'react';
import { Table, Button } from 'react-bootstrap';

const PedidosTab = ({ pedidos, handlePedidoFormaPagamento }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Cliente ID</th>
          <th>Tipo</th>
          <th>Produto</th>
          <th>Preço Total</th>
          <th>Desconto</th>
          <th>Crédito</th>
          <th>Status</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.map((pedido, index) => (
          <tr key={pedido.id}>
            <td>{pedido.clientId}</td>
            <td>{pedido.tipo}</td>
            <td>{pedido.produto}</td>
            <td>R${pedido.precoTotal.toFixed(2)}</td>
            <td>R${pedido.desconto.toFixed(2)}</td>
            <td>R${pedido.credito.toFixed(2)}</td>
            <td>{pedido.saleStatus}</td>
            <td>
              <Button onClick={() => handlePedidoFormaPagamento(index)}>Forma de Pagamento</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PedidosTab;
