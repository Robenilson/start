import React from 'react';

const UserTable = ({ columns, data, onEdit, onDelete, creditos }) => {
  if (!data) {
    return <p>Loading...</p>;
  }


  const getRoleName = (role) => {
    switch (role) {
      case 1:
        return 'Cliente';
      case 2:
        return 'Admin';
      case 3:
        return 'Vendedor';
      case 4:
        return 'Caixa';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.sobrenome}</td>
              <td>{user.email}</td>
              <td>{user.cpf}</td>
              <td>{user.telefone}</td>
              <td>{getRoleName(user.role)}</td>
              <td>
                <button className="action-btn edit-btn" onClick={() => onEdit(user)}>Editar</button>
                <button className="action-btn delete-btn" onClick={() => onDelete(user)}>Excluir</button>
                <button className="action-btn credit-btn" onClick={() => creditos()}>Créditos</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
