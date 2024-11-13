import React, { useState, useEffect } from 'react';
import ModalComponent from '../../components/ModalComponet';
import Tabela from '../../components/GenericTabel';

const OrderItemManager = ({ 
  showModal, 
  onClose, 
  selectedProduct, 
  itemDataToOrder, 
  onAddItem, 
  onRemoveItem, 
  totalValue, 
  onClearOrder, 
  onConfirmOrder 
}) => {
  const [quantity, setQuantity] = useState(0);
  const [calculatedTotal, setCalculatedTotal] = useState(selectedProduct?.valor || 0);

  useEffect(() => {
    setQuantity(0);
  }, []);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    const validValue = isNaN(newQuantity) ? 0 : newQuantity;
    setQuantity(validValue);
    setCalculatedTotal(validValue * (selectedProduct?.valor || 0));
  };

  const handleConfirmItem = () => {
    onAddItem(selectedProduct, quantity, calculatedTotal);
    setQuantity(0); // Reset da quantidade após a confirmação
  };

  return (
    <ModalComponent
      show={showModal}
      onHide={onClose}
      title={selectedProduct ? `Adicionar ${selectedProduct.nome} ao Pedido` : "Lista de Compras"}
    >
      <div>
        {/* Seção de Adição de Produto */}
        {selectedProduct && (
          <div style={{ flex: 1 }}>
            <p>Preço Unitário: R$ {selectedProduct.valor}</p>
            <label>Quantidade:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="form-control"
            />
            <p>Valor Total: R$ {calculatedTotal.toFixed(2)}</p>
            <button 
              className="btn primary-btn" 
              onClick={handleConfirmItem} // Chamada da função modificada
            >
              Confirmar
            </button>
          </div>
        )}

        {/* Lista de Produtos já Adicionados */}
        <div>
          <h5>Itens no Pedido</h5>
          <Tabela
            columns={[
              { key: 'nome', label: 'Nome' },
              { key: 'quantity', label: 'Quantidade' },
              { key: 'valorTotal', label: 'Valor Total', render: (item) => `R$ ${item.valorTotal.toFixed(2)}` }
            ]}
            data={itemDataToOrder}
            actions={[
              {
                label: 'Deletar',
                className: 'btn btn-danger btn-sm',
                onClick: onRemoveItem
              }
            ]}
            keyField="id" // Use o campo de ID do item para chave única
          />
        </div>
        <br />
        <h5>Total da Compra: R$ {totalValue.toFixed(2)}</h5>
      </div>

      {/* Botões de Ação */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button className="btn btn-danger" onClick={onClearOrder}>Cancelar compra</button>
        <button className="btn btn-success" onClick={onConfirmOrder}>Concluir compra</button>
      </div>
    </ModalComponent>
  );
};

export default OrderItemManager;
