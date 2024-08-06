import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ServicoTable = ({ servicos, handlePararServico, formatTime }) => (
  <Table striped bordered hover className="mt-4">
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
            <Button
              variant="danger"
              onClick={() => handlePararServico(index)}
            >
              Parar
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default ServicoTable;
