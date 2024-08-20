import React, { useState, useEffect } from 'react';
import ModalComponent from '../../components/ModalComponet';
import PedidosTab from './componentesCaixa/PedidosTab';
import Card from '../../components/Card';
import DetalhesPedido from './componentesCaixa/DetalhesPedido';
import LoadingModal from '../../components/LoadingModal';
import Vendas from '../Vendas/vendas';
import { OpenBox, FetchBox, CloseBox, PutCompletBox, ViewDataObjectBox, createDataObjectEditBox, PutCanceltBox } from "../../services/functions/RequestBox";

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

  const handleClose = () => {
    updateBox();
    setShowModalVenda(false);
  };

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
    const valor = parseFloat(valorInicial);
    if (valor >= 100) {
      setLoading(true);
      const agora = new Date();
      await OpenBox(valor, user.EmployeerId);
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
    setSaldo(0);
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

  const handleConfirmarPagamento = (pedido, formaPagamento, desconto) => {
    setLoading(true);
    createDataObjectEditBox(pedido, formaPagamento, desconto, user)
      .then(data => PutCompletBox(data))
      .then(() => {
        setShowPedidoSuccess(true);
        updateBox();
        setTimeout(clearState, 4000);
      })
      .catch(error => {
        console.error('Erro ao concluir a venda:', error);
        alert('Erro ao concluir a venda.');
      });
    setLoading(false);
    handleCloseConfirmacaoVenda();
  };

  const handlCancelOrder = async (pedido) => {
    setLoading(true);
    await PutCanceltBox(pedido.id);
    setShowPedidoSuccess(true);
    updateBox();
    setLoading(false);
    setTimeout(clearState, 3000);
  };

  const clearState = () => {
    setShowPedidoSuccess(false);
  };

  return (
    <>
      <Card>
        
        <div className="user-manager-container">

          <center>
       
          <button onClick={handleNWeVendas} className="btn primary-btn">
            Nova Venda
          </button>
          <button onClick={handleAbrirCaixa} className="btn primary-btn">
            Abrir Caixa
          </button>
          <button className="btn primary-btn" onClick={handleFecharCaixa}>
            Fechar Caixa
          </button>

          </center>

          <ModalComponent
            show={showModalAbrirCaixa}
            onHide={handleCloseAbrirCaixa}
            save={handleConfirmarAbrirCaixa}
            title="Abrir Caixa"
          >
            <form>
              <div >
                <label className='titles'>Valor Inicial</label>
                <input
                  type="text"
                  value={valorInicial}
                  onChange={(e) => setValorInicial(e.target.value)}
                  placeholder="Valor Inicial"
                />
              </div>
            </form>
          </ModalComponent>

          <ModalComponent
            show={showModalFecharCaixa}
            onHide={handleCloseFecharCaixa}
            save={handleConfirmarFecharCaixa}
            title="Fechar Caixa"
          >
            <p>Você está prestes a fechar o caixa. Deseja continuar?</p>
          </ModalComponent>

          <ModalComponent
            show={showModalConfirmacaoVenda}
            onHide={handleCloseConfirmacaoVenda}
            title="Confirmar Pagamento"
            save={handleConfirmarPagamento}
            hideButtons={false}
          >
            {pedidoSelecionado !== null && (
              <DetalhesPedido
                pedido={pedidos[pedidoSelecionado]}
                onHide={handleCloseConfirmacaoVenda}
                handleConfirmarPagamento={handleConfirmarPagamento}
                cancel={handlCancelOrder}
              />
            )}
          </ModalComponent>

          {showSuccess && (
            <div className="alert alert-success mt-3">
              Operação concluída com sucesso!
            </div>
          )}

          {showPedidoSuccess && (
            <div className="alert alert-success mt-3">
              Operação realizada com sucesso!
            </div>
          )}

          <div className="mt-3">
            <h5>Saldo: R${saldo.toFixed(2)}</h5>
          </div>

          {dataAbertura && (
            <div className="mt-3">
              <div className="alert alert-info">
                Caixa aberto em {dataAbertura.toLocaleString()}
              </div>
            </div>
          )}

          {!caixaAberto && horaFechamento && (
            <div className="alert alert-info mt-3">
              Caixa fechado em {horaFechamento} com saldo de R${saldo.toFixed(2)}
            </div>
          )}

          {caixaAberto && (
            <div className="mt-3">
              <ul>
                <li>
                  <PedidosTab pedidos={pedidos} handlePedidoFormaPagamento={handlePedidoFormaPagamento} />
                </li>
              </ul>
            </div>
          )}
          <LoadingModal show={loading} />
        </div>
      </Card>
      <ModalComponent
        show={showModalVenda}
        onHide={handleClose}
        title="Nova Venda"
        hideButtons={true}
      >
        <Vendas />
        
      </ModalComponent>
    </>
  );
};

export default Caixa;
