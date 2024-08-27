import React from 'react';

const ServicoTable = ({ servicos, handlePararServico, formatTime }) => (
  <div className="table-container" > 
  <table className="user-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>CPF</th>
        <th>Serviço</th>
        <th>Tempo Alugado</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {servicos.map((servico, index) => (
        <tr key={index}>
          <td>{servico.nomeUsuario}</td>
          <td>{servico.cpf}</td>
          <td>{servico.nomeServico}</td>
          <td>{formatTime(servico.tempoAlugado)}</td>
          <td>
         
            <button
             className="action-btn delete-btn"
              onClick={() => handlePararServico(index)}
            >
              Parar
            </button>



          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
);

export default ServicoTable;
