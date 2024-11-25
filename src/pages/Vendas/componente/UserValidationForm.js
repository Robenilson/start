import React from 'react';
import { Form, Button } from 'react-bootstrap';
const UserValidationForm = ({ cpf, setCpf, nomeUsuario, handleValidateUser }) => {
  return (
    <Form.Group>
      <Form.Label>Cpf do Cliente</Form.Label>
      <Form.Control
        type="text"
        value={cpf || ''}
        onChange={(e) => setCpf(e.target.value)}
        placeholder="Cpf do Cliente"
        disabled={!!nomeUsuario}
      />
      <button onClick={handleValidateUser} className="btn primary-btn" disabled={!!nomeUsuario}>
        Validar Usuário
      </button>
      {nomeUsuario && (
        <Form.Group className="mt-3">
          <Form.Label>Nome do Cliente</Form.Label>
          <Form.Control
            type="text"
            value={nomeUsuario}
            readOnly
          />
        </Form.Group>
      )}
    </Form.Group>
  );
};
export default UserValidationForm;
