import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { createSaleOrder, NewSale, SalesOrderByID } from '../../services/functions/RequestSales';
import { fetchProduct } from '../../services/functions/RequestProduct';
import { fetchService } from '../../services/functions/RequestService';
import Tabela from '../../components/GenericTabel';
import BarcodeScanner from '../../components/BarcodeScanner';
import OrderItemManager from '../Vendas/OrderItemManager';
import ListaVendas from './ListaVendas';
const Vendas = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [itemDataToOrder, setItemDataToOrder] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [showOrderListModal, setShowOrderListModal] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [objValue, setObjValue] = useState(null);
  const [activeTab, setActiveTab] = useState('order'); // Estado para controlar a aba ativa

  const fetchData = async () => {
    try {
      const productResponse = await fetchProduct();
      const serviceResponse = await fetchService();
      const combinedArray = [
        ...(Array.isArray(productResponse) ? productResponse : []),
        ...(Array.isArray(serviceResponse) ? serviceResponse : []),
      ];
      setCombinedData(combinedArray);
    } catch (error) {
      console.error('Erro ao buscar dados', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        paymentMethod: 'cash',
        orderId: '0',
        paymentType: 1,
      };

      const newVenda = await createSaleOrder('1', '22', itemDataToOrder, 0, paymentData);
      const result = await SalesOrderByID(await NewSale(newVenda));

      if (result && typeof result === 'object') {
        setObjValue(result); 
      } else {
        console.error('Erro: Dados inválidos retornados.');
      }

      clearOrder();
      setShowQuantityModal(false);
      setShowOrderListModal(true); 

    } catch (error) {
      console.error('Erro ao confirmar pedido:', error);
    }
  };

  const filteredData = combinedData.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Card>
      <div className="user-manager-container">
        <center>
        

         {/* Abas de Navegação */}
         <div className="tabs">
            <button
              className={`btn primary-btn ${activeTab === 'order' ? 'active' : ''}`}
              onClick={() => setActiveTab('order')}
            >
              Vendas 
            </button>
            <button
              className={`btn primary-btn ${activeTab === 'history' ? 'active' : ' '}`}
              onClick={() => setActiveTab('history')}
            >
               Caixa
            </button>
          </div>



          {/* Condicional para exibir conteúdo com base na aba ativa */}
          {activeTab === 'order' && (
            <>
       
          <div className="form-group input-pequeno respon">
            <input
              type="text"
              placeholder="Digite para filtrar..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="form-control"
            />
          </div>

           <button
                className="btn primary-btn"
                onClick={() => setScanning((prev) => !prev)}
              >
                {scanning ? 'Parar Scanner' : 'Iniciar Scanner'}
              </button>
              {scanning && (
                <BarcodeScanner
                  active={scanning}
                  onDetected={(code) => {
                    setScanning(false);
                    // Lógica de processamento do código de barras pode ser adicionada aqui
                  }}
                />
              )}

              <button className="btn btn-info" onClick={() => setShowQuantityModal(true)}>
                Exibir Lista de Compras
              </button>

              {showOrderListModal && objValue && (
                <>
               <div className="card-header">Venda</div>
                <ListaVendas dadosDetalhados={objValue}  onCloseListaVendas={() => setShowOrderListModal(false)}/>
                </>
              )}

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
            

              
              </>
          )}  
            
              








        
          {/* Aba de Histórico de Vendas */}
          {activeTab === 'history' && (
            <div className="historico-vendas">
              {/* Conteúdo para o Histórico de Vendas */}
              
              <ListaVendas />
              {/* Aqui você pode adicionar o componente ou funcionalidade relacionada ao histórico de vendas */}
            </div>
          )}
        
        </center>
      </div>
    </Card>
  );
};

export default Vendas;