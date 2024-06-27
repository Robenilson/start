import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ProdutosTab = ({ produtos, handleEditProduto, handleDeleteProduto }) => {
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Quantidade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{produto.nome}</td>
            <td>{produto.descricao}</td>
            <td>R${produto.valor.toFixed(2)}</td>
            <td>{produto.quantidade}</td>
            <td>
              <Button variant="warning" onClick={() => handleEditProduto(index)} className="me-2">Editar</Button>
              <Button variant="danger" onClick={() => handleDeleteProduto(index)}>Excluir</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProdutosTab;
