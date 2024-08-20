import React from 'react';

const ProdutosTab = ({ produtos, handleEditProduto, handleDeleteProduto }) => {
  return (
    <div className="table-container">
    <table className="user-table">
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
              <button
                className="custom-button warning action-btn edit-btn"
                onClick={() => handleEditProduto(produto)}
              >
                Editar
              </button>
              <button
                className="custom-button danger action-btn delete-btn"
                onClick={() => handleDeleteProduto(produto)}
              >
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

export default ProdutosTab;
