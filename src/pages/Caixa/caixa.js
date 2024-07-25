import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Tabs, Tab } from 'react-bootstrap';
import Card from '../../components/Card';
import PedidosTab from './componentesCaixa/PedidosTab';
import { OpenBox, FetchBox, CloseBox, PutCompletBox, ViewDataObjectBox, createDataObjectEditBox, PutCanceltBox } from "../../services/functions/RequestBox";
import DetalhesPedido from './componentesCaixa/DetalhesPedido';
import LoadingModal from '../../components/LoadingModal';
import Vendas from '../Vendas/vendas';


const user = JSON.parse(localStorage.getItem('user'));

const Caixa = () => {
  const [loading, setLoading] = useState(false);
  const [showModalAbrirCaixa, setShowModalAbrirCaixa] = useState(false);
  const [showModalFecharCaixa, setShowModalFecharCaixa] = useState(false);
  const [valorInicial, setValorInicial] = useState('');
  const [saldo, setSaldo] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPedidoSuccess, setShowPedidoSuccess] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [caixaAberto, setCaixaAberto] = useState(false);
  const [horaFechamento, setHoraFechamento] = useState(null);
  const [dataAbertura, setDataAbertura] = useState(null);
  const [showModalConfirmacaoVenda, setShowModalConfirmacaoVenda] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [showModalVenda, setShowModalVenda] = useState(false);


  const handleClose = () => setShowModalVenda(false);

  useEffect(() => {
    const dataAberturaSalva = localStorage.getItem('dataAbertura');
    if (dataAberturaSalva) {
      setDataAbertura(new Date(dataAberturaSalva));
      setCaixaAberto(true);
      setSaldo(parseFloat(localStorage.getItem('saldo')));
    }
  }, []);

  const updateBox = async () => {
    setLoading(true);
    const boxData = await FetchBox();
    const viewData = await ViewDataObjectBox(boxData);
    setPedidos(viewData);
    setLoading(false);
   
  };

  useEffect(() => {
    if (caixaAberto) {
      updateBox();
    }
  }, [caixaAberto]);

  useEffect(() => {
    updateBox();
  }, []);

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


  const handleNWeVendas = () => {
    setShowModalVenda(true);
  };

  const handleConfirmarAbrirCaixa = async () => {
    console.log()
    const valor = parseFloat(valorInicial);
    if (valor >= 100) {
      setLoading(true);
      const agora = new Date();
      const   valueOpenBox =await OpenBox(valor, user.EmployeerId);
      

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
    setLoading(false);
  };

  const handleConfirmarFecharCaixa = async () => {
    setLoading(true);
    const agora = new Date();
    await CloseBox(user.EmployeerId);
    setCaixaAberto(false);
    setSaldo(0); // Zera o saldo após fechar o caixa
    setHoraFechamento(new Date().toLocaleString());
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    localStorage.removeItem('dataAbertura');
    localStorage.removeItem('saldo');
    setLoading(false);
    handleCloseFecharCaixa();
  };
  const handlePedidoFormaPagamento = (index) => {
    setPedidoSelecionado(index);
    setShowModalConfirmacaoVenda(true);
  };

  const handleCloseConfirmacaoVenda = () => {
    setShowModalConfirmacaoVenda(false);
  };


  const handleVendas = () => {
   
  };

  const handleConfirmarPagamento = (pedido, formaPagamento, desconto) => {
    setLoading(true);
    createDataObjectEditBox(pedido, formaPagamento, desconto, user).then(data=>{
        PutCompletBox(data)
        .then(response => {
          setShowPedidoSuccess(true);
          updateBox(); // Atualize a lista de pedidos após a venda ser concluída
          setTimeout(clearState, 4000);
        })
        .catch(error => {
          console.error('Erro ao concluir a venda:', error);
          alert('Erro ao concluir a venda.');
        });
      }
    )
    setLoading(false);

    handleCloseConfirmacaoVenda();
  };

  const handlCancelOrder = async(pedido) => {
    setLoading(true);
    await PutCanceltBox(pedido.id);
    setShowPedidoSuccess(true);
    updateBox(); // Atualize a lista de pedidos após a venda ser concluída
    setLoading(false);
    setTimeout(clearState, 3000);
  }

  const clearState = () => {
    setShowPedidoSuccess(false);
  };

  return (
    <>

    
    <Card>
      
      <div className="card-header">Caixa</div>
      <div className="card-body">
      <Button variant="primary" onClick={handleNWeVendas} className="me-2 btn btn-info">
          Nova  Venda
        </Button>
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

        <Modal show={showModalConfirmacaoVenda} onHide={handleCloseConfirmacaoVenda}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Pagamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {pedidoSelecionado !== null && (
              <DetalhesPedido
                pedido={pedidos[pedidoSelecionado]}
                onHide={handleCloseConfirmacaoVenda}
                handleConfirmarPagamento={handleConfirmarPagamento}
                cancel={handlCancelOrder}
              />
            )}
          </Modal.Body>
        </Modal>

        {showSuccess && (
          <Alert variant="success" className="mt-3">
            Operação concluída com sucesso!
          </Alert>
        )}

        {showPedidoSuccess && (
          <Alert variant="success" className="mt-3">
            Operação realizada com sucesso!
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
          
          </Tabs>
        )}
        <LoadingModal show={loading} />
      </div>
    </Card>




    <Modal show={showModalVenda} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Nova Venda </Modal.Title>
      </Modal.Header>
        <Vendas  />
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>

   

    </>
  );
};

export default Caixa;
