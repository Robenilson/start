import React from 'react';

const ServicosTab = ({ servicos, handleEditServico, handleDeleteServico }) => {
  return (
    <div className="table-container">
    <table className="user-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Hora Mínima</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {servicos.map((servico, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{servico.nome}</td>
            <td>{servico.descricao}</td>
            <td>R${servico.valor.toFixed(2)}</td>
            <td>{servico.horaMinima} minutos</td>
            <td>
              <button 
                className="custom-button warning me-2" 
                onClick={() => handleEditServico(servico)}>
                Editar
              </button>
              <button 
                className="custom-button danger" 
                onClick={() => handleDeleteServico(servico)}>
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default ServicosTab;
