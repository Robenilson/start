import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { FetchUserCPF } from '../../services/functions/RequestPeople';
import { FetchBoxUserId } from '../../services/functions/RequestBox';
import { Button, Modal, Form, Table, Dropdown } from 'react-bootstrap';

const AcompanhaServico = () => {
  const [showModal, setShowModal] = useState(false);
  const [servicos, setServicos] = useState([]);
  const [cpf, setCpf] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [selectedServico, setSelectedServico] = useState(null);
  const [historicoServicos, setHistoricoServicos] = useState([]);

  async function filterOrdersWithProductsByType(productType) {
    const data = await FetchBoxUserId();
    const filteredOrders = data
      .map((order) => {
        const filteredProducts = order.produtos.filter(
          (product) => product.productType === productType
        );
        if (filteredProducts.length > 0) {
          return { ...order, produtos: filteredProducts };
        }
        return null;
      })
      .filter((order) => order !== null);
    return filteredOrders;
  }

  const handlePesquisarCPF = async () => {
    const user = await FetchUserCPF(cpf);
    setUsuario(user); // Atualize o estado com os dados do usuário

    if (user) {
      const productTypeToFilter = 2;
      filterOrdersWithProductsByType(productTypeToFilter)
        .then((filteredOrders) => {
          const novosServicos = [];
          filteredOrders.forEach((order) => {
            order.produtos.forEach((product) => {
              novosServicos.push({
                nomeServico: product.name,
                tempoAlugado: parseInt(`${product.quantity}00`), // valor exemplo, ajuste conforme necessário
                orderId: order.id,
                productId: product.productId,
                productType: product.productType,
                dtSale: order.dtSale,
                clientId: order.clientId,
              });
            });
          });
          setUsuario({ ...user, servicos: novosServicos }); // Atualize o estado com os serviços filtrados
        })
        .catch((error) => {
          console.error('Error filtering orders:', error);
        })
        .finally(() => {
          console.log('Filtering complete.');
        });
    }
  };

  const handleIniciarServico = () => {
    if (selectedServico) {
      const novoServico = {
        nomeUsuario: usuario.nome,
        cpf: usuario.cpf,
        nomeServico: selectedServico.nomeServico,
        tempoAlugado: selectedServico.tempoAlugado,
        ativo: true,
      };
      setServicos([...servicos, novoServico]);
      setShowModal(false);
      setSelectedServico(null);
    }
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
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Card>
        <div className="card-header">Acompanhar de Serviços</div>
        <div className="card-body">
          <div className="d-flex justify-content-end mr-3">
            <Button className="me-2" onClick={() => setShowModal(true)}>
              Iniciar
            </Button>
          </div>
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
