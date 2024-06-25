import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Alert, Tabs, Tab } from 'react-bootstrap';
import Card from '../../components/Card';
import PedidosTab from './componentesCaixa/PedidosTab'; // Atualize a importação correta para PedidosTab
import ConcluidosTab from './componentesCaixa/ConcluidosTab';
import ServicosUtilizadosTab from './componentesCaixa/ServicosUtilizadosTab';
import { OpenBox,  FetchBox, CloseBox ,FetchBoxById} from "../../services/functions/RequestBox";
const user = JSON.parse(localStorage.getItem('user'));


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
  const [dataAbertura, setDataAbertura] = useState(null);
  const [showModalPagamento, setShowModalPagamento] = useState(false);
  const [showModalConfirmacaoVenda, setShowModalConfirmacaoVenda] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState('');
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  useEffect(() => {
    const dataAberturaSalva = localStorage.getItem('dataAbertura');
    if (dataAberturaSalva) {
      setDataAbertura(new Date(dataAberturaSalva));
      setCaixaAberto(true);
      setSaldo(parseFloat(localStorage.getItem('saldo')));
    }
  }, []);

  const updateBox = async() =>{
   const data = await FetchBox();
   console.log(data);
  // setPedidos(data)
     
  }

  useEffect(() => {
    if (caixaAberto) {
      updateBox()     
    }
  }, [caixaAberto]);

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

  const handleConfirmarAbrirCaixa =  async() => {
    const valor = parseFloat(valorInicial);
    if (valor >= 100) {
      const agora = new Date();
      await OpenBox(user.EmployeerId, valor.toString())

      
      setSaldo(valor);
      setCaixaAberto(true);
      setDataAbertura(agora);
      
      localStorage.setItem('dataAbertura', agora.toISOString());
      localStorage.setItem('saldo', valor.toString());
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      handleCloseAbrirCaixa();
    } else {
      alert('O valor inicial deve ser igual ou maior que 100.');
    }
  };

  const handleConfirmarFecharCaixa =  async() => {
    const agora = new Date();

    //await CloseBox(user.EmployeerId, agora )



    setCaixaAberto(false);
    setHoraFechamento(new Date().toLocaleString());
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    localStorage.removeItem('dataAbertura');
    localStorage.removeItem('saldo');
    handleCloseFecharCaixa();
  };

  const handlePedidoFormaPagamento = (index) => {
    setPedidoSelecionado(index);
    setShowModalPagamento(true);
  };

  const handleClosePagamento = () => {
    setShowModalPagamento(false);
    setFormaPagamento('');
  };

  const handleConfirmarPagamento = () => {

    setShowModalPagamento(false);
    setShowModalConfirmacaoVenda(true);
  };

  const handleCloseConfirmacaoVenda = () => {
    setShowModalConfirmacaoVenda(false);
  };

  const handleVendaConcluida = () => {
    axios.post('http://localhost:8080/VendaConcluida', {
      pedidoId: pedidos[pedidoSelecionado].id,
      formaPagamento: formaPagamento
    })
    .then(response => {
      console.log('Venda concluída com sucesso:', response.data);
      const valor = parseFloat(valorInicial);
      
      
    

     //    localStorage.setItem('saldo', (valor+ valorVenda));
      return axios.delete(`http://localhost:8080/Venda/${pedidos[pedidoSelecionado].id}`);
    })
    .then(response => {

      
      setPedidos(prevPedidos => prevPedidos.filter(pedido => pedido.id !== pedidos[pedidoSelecionado].id));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      handleCloseConfirmacaoVenda();
    })
    .catch(error => {
      console.error('Erro ao concluir ou deletar a venda:', error);
    });
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

        <Modal show={showModalPagamento} onHide={handleClosePagamento}>
          <Modal.Header closeButton>
            <Modal.Title>Forma de Pagamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Selecione a forma de pagamento</Form.Label>
                <Form.Control
                  as="select"
                  value={formaPagamento}
                  onChange={(e) => setFormaPagamento(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="pix">Pix</option>
                  <option value="cedulas">Cédulas</option>
                  <option value="debito">Cartão de Débito</option>
                  <option value="credito">Cartão de Crédito</option>
                </Form.Control>
              </Form.Group>
              <Button variant="success" onClick={handleConfirmarPagamento}>
                Confirmar
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showModalConfirmacaoVenda} onHide={handleCloseConfirmacaoVenda}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmação de Venda</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>A venda foi concluída ou cancelada?</p>
            <Button variant="success" onClick={handleVendaConcluida}>
              Concluída
            </Button>
            <Button variant="danger" onClick={handleCloseConfirmacaoVenda} className="ms-2">
              Cancelada
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

        {dataAbertura && (
          <div className="mt-3">
            <Alert variant="info">
              Caixa aberto em {dataAbertura.toLocaleString()}
            </Alert>
          </div>
        )}

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
