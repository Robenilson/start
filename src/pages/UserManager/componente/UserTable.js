import React from 'react';
import { Table, Button } from 'react-bootstrap';

const UserTable = ({ users, columns, onEdit, onDelete }) => (
  <div className="table-responsive">
    <Table striped bordered hover responsive>
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
            <td>{index + 1}</td>
            <td>{user.nome}</td>
            <td>{user.sobrenome}</td>
            <td>{user.email}</td>
            <td>{user.cpf}</td>
            <td>{user.telefone}</td>
            <td>{user.role}</td>
            <td>
              <Button variant="warning" onClick={() => onEdit(user)}>Editar</Button>
              {' '}
              <Button variant="danger" onClick={() => onDelete(user)}>Excluir</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default UserTable;
