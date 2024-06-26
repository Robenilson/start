import React from 'react';
import { Table, Button } from 'react-bootstrap';

const formatHoraMinima = (seconds) => {
  const horas = Math.floor(seconds / 3600);
  const minutos = Math.floor((seconds % 3600) / 60);
  const segundos = seconds % 60;
  return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
};

const ServicosTab = ({ servicos, handleEditServico, handleDeleteServico }) => {
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Hora Mínima</th>
          <th>Quantidade</th>
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
            <td>{formatHoraMinima(servico.horaMinima)}</td>
            <td>{servico.quantidade}</td>
            <td>
              <Button variant="warning" onClick={() => handleEditServico(index)} className="me-2">Editar</Button>
              <Button variant="danger" onClick={() => handleDeleteServico(index)}>Excluir</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ServicosTab;
