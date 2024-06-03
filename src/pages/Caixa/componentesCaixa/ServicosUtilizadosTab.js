import React from 'react';
import { Table } from 'react-bootstrap';

const ServicosUtilizadosTab = ({ servicosUtilizados }) => {
  return (
    <Table striped bordered hover className="mt-3">
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
    </Table>
  );
};

export default ServicosUtilizadosTab;
