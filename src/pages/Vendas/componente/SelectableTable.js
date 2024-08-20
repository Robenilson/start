import React from 'react';

const SelectableTable = ({ data, saleType, handleItemClick }) => {
  return (
    <div  className="table-container">
    <table className="user-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Preço</th>
          {saleType === 'serviço' && <th>Valor Mínimo por Hora</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} onClick={() => handleItemClick(item)}>
            <td>{index + 1}</td>
            <td>{item.nome}</td>
            <td>R${item.valor?.toFixed(2)}</td>
            {saleType === 'serviço' && <td>{item.horaMinima}</td>}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default SelectableTable;
