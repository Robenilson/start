import React from 'react';

const ServicosUtilizadosTab = ({ servicosUtilizados }) => {
  return (
    <table className="tabela-servicos mt-3">
      <thead>
        <tr>
          <th>Nome do Serviço</th>
          <th>Horas Totais Compradas</th>
          <th>Horas Utilizadas</th>
          <th>Horas Restantes</th>
        </tr>
      </thead>
      <tbody>
        {servicosUtilizados.map((servico, index) => (
          <tr key={index}>
            <td>{servico.nome}</td>
            <td>{servico.horasTotais}</td>
            <td>{servico.horasUtilizadas}</td>
            <td>{servico.horasRestantes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ServicosUtilizadosTab;
