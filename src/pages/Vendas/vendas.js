import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { createSaleOrder, NewSale, SalesOrderByID } from '../../services/functions/RequestSales';
import { fetchProduct } from '../../services/functions/RequestProduct';
import { fetchService } from '../../services/functions/RequestService';
import { BarCod } from '../../services/functions/RequestBarCod';
import Tabela from '../../components/GenericTabel';
import BarcodeScanner from '../../components/BarcodeScanner';
import OrderItemManager from './OrderItemManager';
import ListaVendas from '../Caixa/ListaVendas';

const Vendas = ({ props}) => {
  const [combinedData, setCombinedData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [itemDataToOrder, setItemDataToOrder] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [showOrderListModal, setShowOrderListModal] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [objValue, setObjValue] = useState(null);

  // Função chamada quando o código de barras é detectado
  const codeBar = async (code) => {
    setScanning(false);

    try {
      const produto = await BarCod(code);

      // Validação para garantir que 'produto' é válido
      if (!produto || typeof produto !== 'object') {
        console.error("Produto inválido ou não encontrado");
        return;
      }

      // Comparação baseada em propriedades (evita comparação direta de objetos)
      if (selectedProduct && selectedProduct.id === produto.id) {
        return;
      }

      setSelectedProduct(produto);
      setShowQuantityModal(true);

    } catch (error) {
      console.error("Erro ao processar código de barras:", error);
    }
  };

  // Função para buscar os produtos e serviços
  const fetchData = async () => {
    try {
      const productResponse = await fetchProduct();
      const serviceResponse = await fetchService();  // Se necessário

      // Combina as respostas em um único array
      const combinedArray = [
        ...(Array.isArray(productResponse) ? productResponse : []),
        // ...(Array.isArray(serviceResponse) ? serviceResponse : []), // Descomente se necessário
      ];
      setCombinedData(combinedArray);
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Funções para adicionar, remover e confirmar o pedido
  const addItemToOrder = (product, quantity, calculatedTotal) => {
    const itemWithQuantity = { ...product, quantity, valorTotal: calculatedTotal };
    setItemDataToOrder((prevItems) => [...prevItems, itemWithQuantity]);
    setCombinedData((prevItems) => prevItems.filter((i) => i.id !== product.id));
    setTotalValue((prevTotal) => prevTotal + calculatedTotal);
    setShowQuantityModal(false);
  };

  const removeItemFromOrder = (item) => {
    setItemDataToOrder((prevItems) => prevItems.filter((i) => i.id !== item.id));
    setTotalValue((prevTotal) => prevTotal - item.valorTotal);
  };

  const clearOrder = () => {
    setItemDataToOrder([]);
    setTotalValue(0);
  };

  const confirmOrder = async () => {
    try {
      const paymentData = {
        id: 1,
        value: totalValue,
        paymentMethod: "cash",
        orderId: "0",
        paymentType: 1,
      };
      const newVenda = await NewSale(await createSaleOrder('1', '22', itemDataToOrder, totalValue, paymentData));
      setShowQuantityModal(false);
      setShowOrderListModal(false);
      if (props === "caixa") {
        setObjValue(await SalesOrderByID(newVenda));
        clearOrder();
        setShowOrderListModal(true);
      }
    } catch (error) {
      console.error("Erro ao confirmar pedido:", error);
    }
  };

  const filteredData = combinedData.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Card>
      <div className="user-manager-container">
        <center>
          <div className="card-header">Vendas</div>

          {/* Caixa de filtro */}
          <div className="form-group input-pequeno respon">
            <input
              type="text"
              placeholder="Digite para filtrar..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="form-control"
            />
          </div>

          {/* Botão para alternar o scanner */}
          <button
            className="btn primary-btn"
            onClick={() => setScanning((prev) => !prev)}
          >
            {scanning ? 'Parar Scanner' : 'Iniciar Scanner'}
          </button>

          {/* Exibe o BarcodeScanner quando 'scanning' for verdadeiro */}
          {scanning && (
            <BarcodeScanner
              onDetected={(code) => {
                codeBar(code);
              }}
            />
          )}

          {/* Exibe a lista de compras */}
          <button className="btn btn-info" onClick={() => setShowOrderListModal(true)}>
            Exibir Lista de Compras
          </button>

          {/* Modais de itens e lista de compras */}
          <OrderItemManager
            showModal={showQuantityModal}
            onClose={() => setShowQuantityModal(false)}
            selectedProduct={selectedProduct}
            itemDataToOrder={itemDataToOrder}
            onAddItem={addItemToOrder}
            onRemoveItem={removeItemFromOrder}
            totalValue={totalValue}
            onClearOrder={clearOrder}
            onConfirmOrder={confirmOrder}
          />
          <OrderItemManager
            showModal={showOrderListModal}
            onClose={() => setShowOrderListModal(false)}
            itemDataToOrder={itemDataToOrder}
            totalValue={totalValue}
            onRemoveItem={removeItemFromOrder}
            onClearOrder={clearOrder}
            onConfirmOrder={confirmOrder}
          />

          {/* Exibe a tabela filtrada */}
          {filterText && (
            <Tabela
              columns={[
                { key: 'nome', label: 'Nome' },
                { key: 'valor', label: 'Preço', render: (item) => `R$ ${item.valor.toFixed(2)}` },
              ]}
              data={filteredData}
              actions={[
                {
                  label: 'COMPRAR',
                  className: 'btn btn-primary btn-sm',
                  onClick: (product) => {
                    setSelectedProduct(product);
                    setShowQuantityModal(true);
                  },
                },
              ]}
              keyField="id"
            />
          )}
        </center>
      </div>

      {/* Exibe a lista de vendas se disponível */}
      {showOrderListModal && objValue && (
        <ListaVendas dadosDetalhados={objValue} onCloseListaVendas={() => setShowOrderListModal(false)} />
      )}
    </Card>
  );
};

export default Vendas;
