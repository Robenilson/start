import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { createSaleOrder ,NewSale} from '../../services/functions/RequestSales';
import { fetchProduct } from '../../services/functions/RequestProduct';
import { fetchService } from '../../services/functions/RequestService';
import { BarCod } from '../../services/functions/RequestBarCod';
import Tabela from '../../components/GenericTabel';
import BarcodeScanner from '../../components/BarcodeScanner';
import OrderItemManager from './OrderItemManager';

const Vendas = ({ userRole }) => {
  const [combinedData, setCombinedData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [itemDataToOrder, setItemDataToOrder] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [showOrderListModal, setShowOrderListModal] = useState(false);
  const [totalValue, setTotalValue] = useState(0);

  const fetchData = async () => {
    try {

      const productResponse = await fetchProduct();
      const serviceResponse= await fetchService()
    // Combina as respostas em um único array
    const combinedArray = [
      ...(Array.isArray(productResponse) ? productResponse : []),
      ...(Array.isArray(serviceResponse) ? serviceResponse : [])
    ];
    
    setCombinedData(combinedArray);

    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (userRole !== 'admin') {
    return <center><div>Acesso negado</div></center>;
  }

  const addItemToOrder = (product, quantity, calculatedTotal) => {
    const itemWithQuantity = { ...product, quantity, valorTotal: calculatedTotal };
    setItemDataToOrder((prevItems) => [...prevItems, itemWithQuantity]);
    setCombinedData((prevItems) => prevItems.filter((i) => i !== product));
    setTotalValue((prevTotal) => prevTotal + calculatedTotal);
    setShowQuantityModal(false);
  };

  const removeItemFromOrder = (item) => {
    setItemDataToOrder((prevItems) => prevItems.filter((i) => i !== item));
    setTotalValue((prevTotal) => prevTotal - item.valorTotal);
  };

  const clearOrder = () => {
    setItemDataToOrder([]);
    setTotalValue(0);
  };

  const  confirmOrder = () => {
    const paymenty = {
      id: 1,
      value: "0",
      paymentMethod: "0",
      orderId: "0",
      paymentType: "0"
    };

     const   newvenda =createSaleOrder('1', '22', itemDataToOrder, '0', paymenty);

      NewSale(newvenda);


    clearOrder();
    setShowOrderListModal(false);
  };

  const filteredData = combinedData.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Card>
      <div className="user-manager-container">
        <div className="card-header">Gestão de Vendas</div>
        <center>
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
               onDetected= {(code) => {
                setScanning(false);
              }}
            />
          )}

          <button className="btn btn-info" onClick={() => setShowOrderListModal(true)}>
            Exibir Lista de Compras
          </button>

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

          {filterText && (
            <Tabela
              columns={[
                { key: 'nome', label: 'Nome' },
                { key: 'descricao', label: 'Descrição' },
                { key: 'valor', label: 'Preço', render: (item) => `R$ ${item.valor.toFixed(2)}` }
              ]}
              data={filteredData}
              actions={[
                {
                  label: 'COMPRAR',
                  className: 'btn btn-primary btn-sm',
                  onClick: (product) => {
                    setSelectedProduct(product);
                    setShowQuantityModal(true);
                  }
                }
              ]}
              keyField="id"
            />
          )}
        </center>
      </div>
    </Card>
  );
};

export default Vendas;
