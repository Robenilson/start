import React from 'react';
import { Table } from 'react-bootstrap';

const UserTable = ({ users, columns }) => (
  <Table striped bordered hover className="mt-3 col-md-6">
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th key={index}>{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          {columns.slice(1).map((col, idx) => (
            <td key={idx}>
              {col === 'Data de Nascimento'
                ? new Date(user.dataNascimento).toLocaleDateString()
                : user[col.toLowerCase()]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default UserTable;
