import React from 'react';


const DataTable = ({ data }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Índice</th>
          <th>Dados</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Exibe o índice da linha */}
              <td>{item.nome}</td> {/* Exibe os dados em formato JSON */}
              <td>
                <button> adiciona</button>
                </td> {/* Exibe os dados em formato JSON */}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2">Nenhum dado encontrado</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
