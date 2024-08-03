import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { Button, Modal, Form, Table } from 'react-bootstrap';

const AcompanhaServico = () => {
  const [showModal, setShowModal] = useState(false);
  const [servicos, setServicos] = useState([]);
  const [cpf, setCpf] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [historicoServicos, setHistoricoServicos] = useState([]);

  const mockUsuario = {
    nome: 'João da Silva',
    cpf: '123.456.789-00',
  };

  const mockServico = {
    nomeServico: 'Serviço Exemplo',
    tempoAlugado: 3600, // 1 hora em segundos
  };

  const handlePesquisarCPF = () => {
    if (cpf === '123.456.789-00') {
      setUsuario(mockUsuario);
    }
  };

  const handleIniciarServico = () => {
    const novoServico = {
      nomeUsuario: usuario.nome,
      cpf: usuario.cpf,
      nomeServico: mockServico.nomeServico,
      tempoAlugado: mockServico.tempoAlugado,
      ativo: true,
    };
    setServicos([...servicos, novoServico]);
    setShowModal(false);
  };

  const handlePararServico = (index) => {
    const servicoParaParar = servicos[index];
    setHistoricoServicos([...historicoServicos, servicoParaParar]);
    setServicos(servicos.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setServicos((prevServicos) =>
        prevServicos.map((servico) =>
          servico.ativo && servico.tempoAlugado > 0
            ? { ...servico, tempoAlugado: servico.tempoAlugado - 1 }
            : servico
        )
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Card>
        <div className="card-header">Acompanhar de Serviços</div>
        <div className="card-body d-flex flex-column align-items-center">
          <Button onClick={() => setShowModal(true)}>Iniciar</Button>

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
                <Button onClick={handlePesquisarCPF}>Pesquisar</Button>
                {usuario && (
                  <div>
                    <p>Nome: {usuario.nome}</p>
                    <p>CPF: {usuario.cpf}</p>
                    <Button onClick={handleIniciarServico}>Iniciar Serviço</Button>
                  </div>
                )}
              </Form>
            </Modal.Body>
          </Modal>

          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Serviço</th>
                <th>Tempo Alugado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {servicos.map((servico, index) => (
                <tr key={index}>
                  <td>{servico.nomeUsuario}</td>
                  <td>{servico.cpf}</td>
                  <td>{servico.nomeServico}</td>
                  <td>{formatTime(servico.tempoAlugado)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handlePararServico(index)}
                      disabled={!servico.ativo}
                    >
                      Parar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </>
  );
};

export default AcompanhaServico;
