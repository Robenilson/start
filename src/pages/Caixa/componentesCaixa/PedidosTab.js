
import React from 'react';
import { Table, Button } from 'react-bootstrap';

const PedidosTab = ({ pedidos, handlePedidoFormaPagamento }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Cliente ID</th>
          <th>Tipo</th>
          <th>Preço Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.map((pedido, index) => (
          <tr key={pedido.id}>
            <td>{pedido.clientId}</td>
            <td>{pedido.tipo}</td>
            <td>{pedido.saleStatus}</td>
            <td>
              <Button onClick={() => handlePedidoFormaPagamento(index)}>Detalhes do Pedido</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PedidosTab;