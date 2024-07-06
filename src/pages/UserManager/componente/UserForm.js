import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const UserForm = ({ userValues, handleInputChange }) => {
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={userValues.nome}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formSobrenome">
          <Form.Label>Sobrenome</Form.Label>
          <Form.Control
            type="text"
            name="sobrenome"
            value={userValues.sobrenome}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userValues.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formDataNascimento">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            name="dataNascimento"
            value={userValues.dataNascimento}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formCpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            name="cpf"
            value={userValues.cpf}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formTelefone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="text"
            name="telefone"
            value={userValues.telefone}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group controlId="formPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={userValues.password}
            onChange={handleInputChange}
            placeholder="Digite a senha"
          />
        </Form.Group>
      </Row>

      <h5>Endereço</h5>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formCep">
          <Form.Label>CEP</Form.Label>
          <Form.Control
            type="text"
            name="endereco.cep"
            value={userValues.endereco.cep}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formCidade">
          <Form.Label>Cidade</Form.Label>
          <Form.Control
            type="text"
            name="endereco.cidade"
            value={userValues.endereco.cidade}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formEstado">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            type="text"
            name="endereco.estado"
            value={userValues.endereco.estado}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formBairro">
          <Form.Label>Bairro</Form.Label>
          <Form.Control
            type="text"
            name="endereco.bairro"
            value={userValues.endereco.bairro}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formNumero">
          <Form.Label>Número</Form.Label>
          <Form.Control
            type="text"
            name="endereco.numero"
            value={userValues.endereco.numero}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formRole">
          <Form.Label>Tipo de Usuário</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={userValues.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione uma role</option>
            <option value="1">Cliente</option>
            <option value="2">Admin</option>
            <option value="3">Vendedor</option>
            <option value="4">Caixa</option>
          </Form.Control>
        </Form.Group>
      </Row>
    </Form>
  );
};

export default UserForm;
