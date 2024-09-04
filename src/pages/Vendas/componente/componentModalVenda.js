import React from 'react';

const componentModalVenda = ({
  confirmationData,
  quantity,
  saleType,
  handleQuantityChange,
  handleConfirm,
  handleCancel
}) => {
  if (!confirmationData) return null;

  return (
    <center>
      <div className="detalhes">
        <h4>Confirmação de Venda</h4>
        <p>
          <strong>Tipo de Venda:</strong> {confirmationData.saleType}
        </p>
        <p>
          <strong>Item:</strong> {confirmationData.item.nome}
        </p>
        <p>
          <strong>Preço Unitário:</strong> R${confirmationData.item.valor?.toFixed(2)}
        </p>

        {saleType === 'serviço' && (
          <p>     
            <strong>Quantidade tempo alugado :</strong> {confirmationData.item.horaMinima}
          </p>
        )}

        {/* Se for produto, exibe o input de quantidade */}
        {saleType === 'produto' && (
          <div className="form-group">
            <label>Quantidade</label>
            <input
              type="number"
              min={0}
              value={quantity}
              onChange={handleQuantityChange}
              className="form-control"
            />
          </div>
        )}

        {saleType === 'produto' && (
          <p>     
             <strong>Valor Total:</strong> R${confirmationData.total.toFixed(2)}
          </p>
        )}

       
        <button onClick={handleConfirm} className="btn btn-success me-2">
          Confirmar Venda
        </button>
        <button onClick={handleCancel} className="btn btn-danger">
          Cancelar
        </button>
      </div>
    </center>
  );
};

export default componentModalVenda;
