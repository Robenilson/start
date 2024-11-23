import React from 'react';
import LoadingModal from '../../../components/LoadingModal';
import ModalComponent from '../../../components/ModalComponet';  // Certifique-se de usar o caminho correto

const DetalhesPedido = ({
  pedidoSelecionado,
  formaPagamento,
  desconto,
  onClose,
  onConfirm,
  onCancel,
  onDescontoChange,
  onFormaPagamentoChange,
  loading,
}) => {
  if (!pedidoSelecionado) return null;  // Evita erro caso pedido seja nulo

  return (
    <ModalComponent show={true} onHide={onClose} title="">
      <div className="">
        <center><h4>Detalhes do Pedido</h4></center>
        <p>Cliente: {pedidoSelecionado.clientName}</p>
        <p>Preço Total: R$ {pedidoSelecionado.precoTotal.toFixed(2)}</p>

        <ol className="">
          {pedidoSelecionado.produtos.map((item, index) => (
            <li key={index}>
              <strong>Produto:</strong> {item.name} - <strong>Quantidade:</strong> {item.quantity}
            </li>
          ))}
        </ol>

        {/* Formulário para pagamento */}
        <div className="">
          <label htmlFor="formaPagamento">Forma de Pagamento</label>
          <select
            className="form-control my-2 mb-4"
            id="formaPagamento"
            value={formaPagamento}
            onChange={onFormaPagamentoChange}
          >
            <option value="">Selecione</option>
            <option value="1">Cédulas</option>
            <option value="2">Cartão de Débito</option>
            <option value="3">Cartão de Crédito</option>
            <option value="4">Pix</option>
          </select>
        </div>

        {/* Campo de desconto */}
        <div className="">
          <label htmlFor="desconto">Desconto</label>
          <input
            type="number"
            id="desconto"
            className="form-control my-2 mb-4"
            value={desconto}
            onChange={onDescontoChange}
          />
        </div>

        <div className="actions">
          <button className="btn secondary-btn" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn primary-btn" onClick={onConfirm}>
            Salvar
          </button>
        </div>
      </div>

      {loading && <LoadingModal />}
    </ModalComponent>
  );
};

export default DetalhesPedido;
