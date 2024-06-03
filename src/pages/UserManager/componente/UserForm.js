import React from 'react';
import { Form } from 'react-bootstrap';

const UserForm = ({ userValues, handleInputChange }) => (
  <Form>
    <Form.Group controlId="nome">
      <Form.Label>Nome</Form.Label>
      <Form.Control type="text" name="nome" value={userValues.nome} onChange={handleInputChange} />
    </Form.Group>
    <Form.Group controlId="sobrenome">
      <Form.Label>Sobrenome</Form.Label>
      <Form.Control type="text" name="sobrenome" value={userValues.sobrenome} onChange={handleInputChange} />
    </Form.Group>
    <Form.Group controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" name="email" value={userValues.email} onChange={handleInputChange} />
    </Form.Group>
    <Form.Group controlId="cpf">
      <Form.Label>CPF</Form.Label>
      <Form.Control type="text" name="cpf" value={userValues.cpf} onChange={handleInputChange} />
    </Form.Group>
    <Form.Group controlId="dataNascimento">
      <Form.Label>Data de Nascimento</Form.Label>
      <Form.Control type="date" name="dataNascimento" value={userValues.dataNascimento} onChange={handleInputChange} />
    </Form.Group>
    <Form.Group>
      <Form.Label>Tipo de Pessoa</Form.Label>
      <div>
        <Form.Check
          inline
          label="Cliente"
          type="radio"
          name="tipoPessoa"
          value="cliente"
          checked={userValues.tipoPessoa === 'cliente'}
          onChange={handleInputChange}
        />
        <Form.Check
          inline
          label="Funcionário"
          type="radio"
          name="tipoPessoa"
          value="funcionario"
          checked={userValues.tipoPessoa === 'funcionario'}
          onChange={handleInputChange}
        />
      </div>
    </Form.Group>
    {userValues.tipoPessoa === 'funcionario' && (
      <Form.Group controlId="role">
        <Form.Label>Role</Form.Label>
        <Form.Control as="select" name="role" value={userValues.role} onChange={handleInputChange}>
          <option value="">Selecione uma função</option>
          <option value="vendedor">Vendedor</option>
          <option value="caixa">Caixa</option>
          <option value="adm">ADM</option>
        </Form.Control>
      </Form.Group>
    )}
  </Form>
);

export default UserForm;
