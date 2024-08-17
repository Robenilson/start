import React from 'react';

const UserTable = ({ users, columns, onEdit, onDelete, creditos }) => {
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
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.nome}</td>
              <td>{user.sobrenome}</td>
              <td>{user.email}</td>
              <td>{user.cpf}</td>
              <td>{user.telefone}</td>
              <td>{getRoleName(user.role)}</td>
              <td>
                <div className="table-actions">
                  <button className="btn btn-warning" onClick={() => onEdit(user)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => onDelete(user)}>Excluir</button>
                  <button className="btn btn-success" onClick={() => creditos(user)}>Créditos</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
