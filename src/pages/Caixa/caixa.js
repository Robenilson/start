import React, { useState, useEffect } from 'react';
import ModalComponent from '../../components/ModalComponet';
import Tabela from '../../components/GenericTabel'; // Novo componente Tabela
import Card from '../../components/Card';
import DetalhesPedido from './componentesCaixa/DetalhesPedido';
import LoadingModal from '../../components/LoadingModal';
import Vendas from '../Vendas/vendas';
import { OpenBox, FetchBox, CloseBox, PutCompletBox,transformOrder,getSales, ViewDataObjectBox, createDataObjectEditBox, PutCanceltBox , createSaleOrder } from "../../services/functions/RequestBox";

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
    if (valor >= -1) {
      setLoading(true);
      const agora = new Date();
      await OpenBox();
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


    const  data =  createDataObjectEditBox(pedido, formaPagamento, desconto, user)
    data.then( data =>PutCompletBox(data.id, data))
    //console.log(" AQUI",data)

    

    //console.log(transformOrder(pedido))

    
    setShowPedidoSuccess(true);
     updateBox();
        setTimeout(clearState, 4000);

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

  // Configuração das colunas e ações para o componente Tabela
  const columns = [
    { key: 'clientName', label: 'Cliente' },
    {
      key: 'payments',
      label: 'Status',
      render: (item) => (item.payments === null ? 'Aguardando Pagamento' : 'Pago'),
    },
  ];

  const actions = [
    {
      label: 'Ver Detalhes',
      className: 'edit-btn',
      onClick: (pedido) => handlePedidoFormaPagamento(pedidos.indexOf(pedido)),
    },
  ];

  return (
    <>
      <Card>
        <div className="user-manager-container">
          <div className="card-header">Gestão de Caixa</div>
          <center>
            {caixaAberto && (
              <>
                <button onClick={handleNWeVendas} className="btn primary-btn">Nova Venda</button>
                <button className="btn primary-btn" onClick={handleFecharCaixa}>Fechar Caixa</button>
              </>
            )}
            {!caixaAberto && (
              <button onClick={handleAbrirCaixa} className="btn primary-btn">Abrir Caixa</button>
            )}
          </center>

          <ModalComponent
            show={showModalAbrirCaixa}
            onHide={handleCloseAbrirCaixa}
            hideButtons='true'
            title="Abrir Caixa"
          >
            <form>
              <div>
                <label className='titles'>Valor Inicial</label>
                <input
                  type="number"
                  className="form-control my-2 mb-4"
                  value={valorInicial}
                  onChange={(e) => setValorInicial(e.target.value)}
                  placeholder="Valor Inicial"
                />
              </div>
            </form>
            <div className="btn danger-btn" onClick={handleConfirmarAbrirCaixa}>Salvar</div>
            <div className="btn secondary-btn" onClick={handleCloseAbrirCaixa}>Cancelar</div>
          </ModalComponent>

          <ModalComponent
            show={showModalFecharCaixa}
            onHide={handleCloseFecharCaixa}
            title="Fechar Caixa"
          >
            <p>Você está prestes a fechar o caixa. Deseja continuar?</p>
            <div className="btn danger-btn" onClick={handleConfirmarFecharCaixa}>Salvar</div>
            <div className="btn secondary-btn" onClick={handleCloseFecharCaixa}>Cancelar</div>
          </ModalComponent>

          <ModalComponent
            show={showModalConfirmacaoVenda}
            onHide={handleCloseConfirmacaoVenda}
            title=""
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

          {dataAbertura && (
            <div className="mt-3">
              <div className="alert alert-info">
                Caixa aberto em {dataAbertura.toLocaleString()}
              </div>
            </div>
          )}

          {!caixaAberto && horaFechamento && (
            <div className="alert alert-info mt-3">
              Caixa fechado em {horaFechamento}
            </div>
          )}

          {caixaAberto && (
            <div className="mt-3">
              <Tabela columns={columns} data={pedidos} actions={actions} keyField="id" />
            </div>
          )}

          <LoadingModal show={loading} />
        </div>
      </Card>

      <ModalComponent show={showModalVenda} onHide={handleClose}>
        <Vendas />
      </ModalComponent>
    </>
  );
};

export default Caixa;
