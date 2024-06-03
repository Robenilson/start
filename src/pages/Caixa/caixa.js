import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Tabs, Tab } from 'react-bootstrap';
import Card from '../../components/Card';
import PedidosTab from './componentesCaixa/ConcluidosTab';
import ConcluidosTab from './componentesCaixa/ConcluidosTab';
import ServicosUtilizadosTab from './componentesCaixa/ServicosUtilizadosTab';

const Caixa = () => {
  const [showModalAbrirCaixa, setShowModalAbrirCaixa] = useState(false);
  const [showModalFecharCaixa, setShowModalFecharCaixa] = useState(false);
  const [valorInicial, setValorInicial] = useState('');
  const [saldo, setSaldo] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [servicosUtilizados, setServicosUtilizados] = useState([]);
  const [caixaAberto, setCaixaAberto] = useState(false);
  const [horaFechamento, setHoraFechamento] = useState(null);

  const handleAbrirCaixa = () => {
    setShowModalAbrirCaixa(true);
  };

  const handleFecharCaixa = () => {
    setShowModalFecharCaixa(true);
  };

  const handleCloseAbrirCaixa = () => {
    setShowModalAbrirCaixa(false);
    setValorInicial('');
  };

  const handleCloseFecharCaixa = () => {
    setShowModalFecharCaixa(false);
  };

  const handleConfirmarAbrirCaixa = () => {
    const valor = parseFloat(valorInicial);
    if (valor >= 100) {
      setSaldo(valor);
      setCaixaAberto(true);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      handleCloseAbrirCaixa();
    } else {
      alert('O valor inicial deve ser igual ou maior que 100.');
    }
  };

  const handleConfirmarFecharCaixa = () => {
    setCaixaAberto(false);
    setHoraFechamento(new Date().toLocaleString());
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    handleCloseFecharCaixa();
  };

  const handlePedidoFormaPagamento = (index) => {
    alert(`Pedido ${index + 1}: Solicitar forma de pagamento`);
  };

  const adicionarServicoUtilizado = (servico) => {
    setServicosUtilizados([...servicosUtilizados, servico]);
  };

  return (
    <Card>
      <div className="card-header">Caixa</div>
      <div className="card-body">
        <Button variant="primary" onClick={handleAbrirCaixa} className="me-2">
          Abrir Caixa
        </Button>
        <Button variant="secondary" onClick={handleFecharCaixa}>
          Fechar Caixa
        </Button>

        <Modal show={showModalAbrirCaixa} onHide={handleCloseAbrirCaixa}>
          <Modal.Header closeButton>
            <Modal.Title>Abrir Caixa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Valor Inicial</Form.Label>
                <Form.Control
                  type="number"
                  value={valorInicial}
                  onChange={(e) => setValorInicial(e.target.value)}
                  placeholder="Valor Inicial"
                />
              </Form.Group>
              <Button variant="success" onClick={handleConfirmarAbrirCaixa}>
                Confirmar
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showModalFecharCaixa} onHide={handleCloseFecharCaixa}>
          <Modal.Header closeButton>
            <Modal.Title>Fechar Caixa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Você está prestes a fechar o caixa. Deseja continuar?</p>
            <Button variant="success" onClick={handleConfirmarFecharCaixa}>
              Confirmar
            </Button>
          </Modal.Body>
        </Modal>

        {showSuccess && (
          <Alert variant="success" className="mt-3">
            Operação concluída com sucesso!
          </Alert>
        )}

        <div className="mt-3">
          <h5>Saldo: R${saldo.toFixed(2)}</h5>
        </div>

        {!caixaAberto && horaFechamento && (
          <Alert variant="info" className="mt-3">
            Caixa fechado em {horaFechamento} com saldo de R${saldo.toFixed(2)}
          </Alert>
        )}

        {caixaAberto && (
          <Tabs defaultActiveKey="pedidos" id="tabela-abas" className="mt-3">
            <Tab eventKey="pedidos" title="Pedidos">
              <PedidosTab pedidos={pedidos} handlePedidoFormaPagamento={handlePedidoFormaPagamento} />
            </Tab>
            <Tab eventKey="concluidos" title="Concluídos">
              <ConcluidosTab />
            </Tab>
            <Tab eventKey="servicos-utilizados" title="Serviços Utilizados">
              <ServicosUtilizadosTab servicosUtilizados={servicosUtilizados} />
            </Tab>
          </Tabs>
        )}
      </div>
    </Card>
  );
};

export default Caixa;
