import React from 'react';
import { Table } from 'react-bootstrap';

const PedidosTab = ({ pedidos }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>CPF Vendedor</th>
          <th>CPF Cliente</th>
          <th>Tipo</th>
          <th>Detalhes</th>
          <th>Valor</th>
          <th>Quantidade</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.map((pedido, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{pedido.cpfVendedor}</td>
            <td>{pedido.cpfCliente}</td>
            <td>{pedido.tipo}</td>
            <td>{pedido.tipo === 'Serviço' ? pedido.detalhes.nomeServico : 'Produto'}</td>
            <td>{pedido.valor}</td>
            <td>{pedido.tipo === 'Serviço' ? pedido.detalhes.horas : pedido.quantidade}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PedidosTab;
