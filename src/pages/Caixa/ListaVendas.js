import React, { useState, useEffect } from 'react';
import LoadingModal from '../../components/LoadingModal';
import ModalComponent from '../../components/ModalComponet'; 
import Tabela from '../../components/GenericTabel';
import DetalhesPedido from './components/DetalhesPedido';  // Importe o novo componente

import {
  FetchBox,
  ViewDataObjectBox,
  createDataObjectEditBox,
} from "../../services/functions/RequestBox";
import { PutCanceltBox, Put_Sales_Complete } from '../../services/functions/RequestSales';

const ListaVendas = ({ dadosDetalhados, onCloseListaVendas }) => {  // Nova prop onCloseListaVendas
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [desconto, setDesconto] = useState(0);
  const [formaPagamento, setFormaPagamento] = useState('');

  const updateBox = async () => {
    setLoading(true);
    setPedidos(await ViewDataObjectBox(await FetchBox()));
    setLoading(false);
  };

  const handleCancel = async () => {
    setLoading(true);
    await PutCanceltBox(pedidoSelecionado);
    await updateBox();
    handleCloseModal();
    setLoading(false);
  };

  const handleConfirmar = async () => {
    setLoading(true);
    try {
      if (!pedidoSelecionado) {
        await Put_Sales_Complete(await createDataObjectEditBox(dadosDetalhados, formaPagamento, desconto));
      } else {
        await Put_Sales_Complete(await createDataObjectEditBox(pedidoSelecionado, formaPagamento, desconto));
        await updateBox();
      }

      handleCloseModal();
      if (onCloseListaVendas) onCloseListaVendas();  // Chama a função de retorno
    } catch (error) {
      console.error('Erro ao salvar o pedido:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!dadosDetalhados) {
      updateBox(); // Apenas busca dados se não estiver no modo de detalhes diretos
    }
  }, [dadosDetalhados]);

  const handleCloseModal = () => {
    setShowModal(false);
    setPedidoSelecionado(null);
    setDesconto(0);
    setFormaPagamento('');
  };

  const handleDescontoChange = (event) => {
    const novoDesconto = parseFloat(event.target.value) || 0;
    setDesconto(novoDesconto);
  };

  const handleFormaPagamentoChange = (event) => {
    setFormaPagamento(event.target.value);
  };

  if (dadosDetalhados) {
    return (
      <DetalhesPedido
        pedidoSelecionado={dadosDetalhados}
        formaPagamento={formaPagamento}
        desconto={desconto}
        onClose={handleCloseModal}
        onConfirm={handleConfirmar}
        onCancel={handleCancel}
        onDescontoChange={handleDescontoChange}
        onFormaPagamentoChange={handleFormaPagamentoChange}
        loading={loading}
      />
    );
  }

  return (
    <div className="user-manager-container">
      <Tabela
        columns={[
          { key: 'clientName', label: 'Cliente' },
          {
            key: 'payments',
            label: 'Status',
            render: (item) => (item.payments === null ? 'Aguardando Pagamento' : 'Pago'),
          },
        ]}
        data={pedidos}
        actions={[
          {
            label: 'Ver Detalhes',
            className: 'edit-btn',
            onClick: (pedido) => {
              setPedidoSelecionado(pedido);
              setShowModal(true);
            },
          },
        ]}
        keyField="id"
      />

      {showModal && pedidoSelecionado && (
        <DetalhesPedido
          pedidoSelecionado={pedidoSelecionado}
          formaPagamento={formaPagamento}
          desconto={desconto}
          onClose={handleCloseModal}
          onConfirm={handleConfirmar}
          onCancel={handleCancel}
          onDescontoChange={handleDescontoChange}
          onFormaPagamentoChange={handleFormaPagamentoChange}
          loading={loading}
        />
      )}

      {loading && <LoadingModal />}
    </div>
  );




  
};

export default ListaVendas;