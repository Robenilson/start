import React from 'react';
import Form from 'react-bootstrap/Form'; // Importar o Form do React Bootstrap, se ainda não tiver sido importado
const RoleModalContent = ({ roleName, roleDescription, handleInputChange }) => (
  <>
    <Form.Group controlId="formRoleName">
      <Form.Label>Nome da Role</Form.Label>
      <Form.Control
        type="text"
        placeholder="Digite o nome da role"
        value={roleName}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="formRoleDescription"> {/* Novo campo para a descrição */}
      <Form.Label>Descrição da Role</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        placeholder="Digite a descrição da role"
        value={roleDescription}
        onChange={handleInputChange}
      />
    </Form.Group>
  </>
);
export default RoleModalContent;
