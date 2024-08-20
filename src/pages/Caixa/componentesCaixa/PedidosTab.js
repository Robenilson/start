import React from 'react';

const PedidosTab = ({ pedidos, handlePedidoFormaPagamento }) => {
  return (
    <div  className="table-container" >
      <table className="user-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido, index) => (
            <tr className="user-table" key={pedido.id}>
              <td>{pedido.clientName}</td>
              <td>{pedido.payments === null ? 'Aguardando Pagamento' : 'Pago'}</td>
              <td>
                <button className="action-btn edit-btn" onClick={() => handlePedidoFormaPagamento(index)}>
                  Ver Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PedidosTab;
