import React from 'react';
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';

const ModalPesquisarCPF = ({ showModal, setShowModal, cpf, setCpf, usuario, setUsuario, handlePesquisarCPF, selectedServico, setSelectedServico, handleIniciarServico }) => (
  <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Pesquisar CPF</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formCpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-3" onClick={handlePesquisarCPF}>
          Pesquisar
        </Button>
        {usuario && (
          <div>
            <p>Nome: {usuario.nome}</p>
            <p>CPF: {usuario.cpf}</p>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Selecionar Serviço
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {usuario.servicos && usuario.servicos.map((servico, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => setSelectedServico(servico)}
                  >
                    {servico.nomeServico}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {selectedServico && (
              <div>
                <p>Serviço Selecionado: {selectedServico.nomeServico}</p>
                <Button onClick={handleIniciarServico}>
                  Iniciar Serviço
                </Button>
              </div>
            )}
          </div>
        )}
      </Form>
    </Modal.Body>
  </Modal>
);

export default ModalPesquisarCPF;
