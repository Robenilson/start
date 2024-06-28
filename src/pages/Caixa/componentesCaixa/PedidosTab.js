import React from 'react';
import { Table, Button } from 'react-bootstrap';

const PedidosTab = ({ pedidos, handlePedidoFormaPagamento }) => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido, index) => (
            <tr key={pedido.id}>
              <td>{pedido.clientId}</td>
              <td>{pedido.payments === null ? 'Aguardando Pagamento' : 'Pago'}</td>
              <td>
                <Button variant="primary" onClick={() => handlePedidoFormaPagamento(index)}>
                  Ver Detalhes
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PedidosTab;
