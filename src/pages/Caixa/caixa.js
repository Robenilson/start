import React, { useState, useEffect } from 'react';
import ModalComponent from '../../components/ModalComponet';
import Tabela from '../../components/GenericTabel';
import Card from '../../components/Card';
import DetalhesPedido from './components/DetalhesPedido';
import LoadingModal from '../../components/LoadingModal';
import Vendas from '../Vendas/vendas';
import {
  OpenBox,
  FetchBox,
  CloseBox,
  PutCompletBox,
  transformOrder,
  ViewDataObjectBox,
  createDataObjectEditBox,
  PutCanceltBox,
} from "../../services/functions/RequestBox";
import CaixaActionComponent from './components/AbrirCaixaComponent'; // Importação do componente genérico

const user = JSON.parse(localStorage.getItem('user'));

const Caixa = () => {
  const [loading, setLoading] = useState(false);
  const [showModalAbrirCaixa, setShowModalAbrirCaixa] = useState(false);
  const [showModalFecharCaixa, setShowModalFecharCaixa] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPedidoSuccess, setShowPedidoSuccess] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [caixaAberto, setCaixaAberto] = useState(false);
  const [horaFechamento, setHoraFechamento] = useState(null);
  const [dataAbertura, setDataAbertura] = useState(null);
  const [showModalConfirmacaoVenda, setShowModalConfirmacaoVenda] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [showModalVenda, setShowModalVenda] = useState(false);
  const [saldo, setSaldo] = useState(0);

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

    console.log(viewData)

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

  const handleAbrirCaixa = () => setShowModalAbrirCaixa(true);
  const handleFecharCaixa = () => setShowModalFecharCaixa(true);
  const handleCloseAbrirCaixa = () => setShowModalAbrirCaixa(false);
  const handleCloseFecharCaixa = () => setShowModalFecharCaixa(false);
  const handleNWeVendas = () => setShowModalVenda(true);

  const handlePedidoFormaPagamento = (index) => {
    setPedidoSelecionado(index);
    setShowModalConfirmacaoVenda(true);
  };

  const handleCloseConfirmacaoVenda = () => setShowModalConfirmacaoVenda(false);

  const handleConfirmarPagamento = (pedido, formaPagamento, desconto) => {
    setLoading(true);

    const data = createDataObjectEditBox(pedido, formaPagamento, desconto, user);
    data.then((data) => PutCompletBox(data.id, data));

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
            {caixaAberto ? (
              <>
                <button onClick={handleNWeVendas} className="btn primary-btn">
                  Nova Venda
                </button>
                <button className="btn primary-btn" onClick={handleFecharCaixa}>
                  Fechar Caixa
                </button>
              </>
            ) : (
              <button onClick={handleAbrirCaixa} className="btn primary-btn">
                Abrir Caixa
              </button>
            )}
          </center>

          <ModalComponent
            show={showModalAbrirCaixa}
            onHide={handleCloseAbrirCaixa}
            hideButtons="true"
            title="Abrir Caixa"
          >
            <CaixaActionComponent
              actionType="abrir"
              onSuccess={({ valor, dataAbertura }) => {
                setSaldo(valor);
                setCaixaAberto(true);
                setDataAbertura(dataAbertura);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);
              }}
              onClose={handleCloseAbrirCaixa}
            />
          </ModalComponent>

          <ModalComponent
            show={showModalFecharCaixa}
            onHide={handleCloseFecharCaixa}
            title="Fechar Caixa"
          >
            <CaixaActionComponent
              actionType="fechar"
              user={user}
              onSuccess={({ horaFechamento }) => {
                setCaixaAberto(false);
                setSaldo(0);
                setHoraFechamento(horaFechamento.toLocaleString());
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);
              }}
              onClose={handleCloseFecharCaixa}
            />
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
