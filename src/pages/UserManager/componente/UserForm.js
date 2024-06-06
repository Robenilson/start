import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const UserForm = ({ userValues, handleInputChange }) => (
  <Form>
    <Row className="mb-3">
      <Form.Group as={Col} controlId="formNome">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="nome"
          value={userValues.nome}
          onChange={handleInputChange}
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
      <Form.Group as={Col}>
        <Form.Label>Tipo de Usuário</Form.Label>
        <div>
          <Form.Check
          type="radio"
          label="Cliente"
          name="role"
          value="cliente"
          checked={userValues.role === 'cliente'}
          onChange={handleInputChange}
        />
        <Form.Check
          type="radio"
          label="Vendedor"
          name="role"
          value="vendedor"
          checked={userValues.role === 'vendedor'}
          onChange={handleInputChange}
        />
        <Form.Check
          type="radio"
          label="Caixa"
          name="role"
          value="caixa"
          checked={userValues.role === 'caixa'}
          onChange={handleInputChange}
        />
        <Form.Check
          type="radio"
          label="Administrador"
          name="role"
          value="administrador"
          checked={userValues.role === 'administrador'}
          onChange={handleInputChange}
        />
      </div>
    </Form.Group>
  </Row>
</Form>
);

export default UserForm;
