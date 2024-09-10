import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { fetchService } from '../../services/functions/RequestService';
import { fetchProduct } from '../../services/functions/RequestProduct';
import DataTable from './componente/genericTabel'; // Importa o novo componente de tabela

const Vendas = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [filterText, setFilterText] = useState(''); // Estado para armazenar o texto digitado
  const [itemDataToOrder, setItemDataToOrder] = useState([]); // Estado para os itens adicionados ao pedido

  // Função para adicionar item ao pedido
  const addItemToOrder = (item) => {
    setItemDataToOrder(prevItems => [...prevItems, item]); // Adiciona o novo item ao array de itens
    setCombinedData(prevItems => prevItems.filter(i => i !== item)); // Remove o item filtrando
  };

  // Função para remover item do pedido
  const removeItemFromOrder = (item) => {
    setItemDataToOrder(prevItems => prevItems.filter(i => i !== item)); // Remove o item filtrando
  };

  // Função para limpar o filtro
  const removeInput = () => {
    setFilterText(''); // Limpa o texto do filtro
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productResponse = await fetchProduct();
      const serviceResponse = await fetchService();

      // Combina os dados de produto e serviço em um único array
      const combined = [...(productResponse || []), ...(serviceResponse || [])];
      setCombinedData(combined);
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  };

  // Função para filtrar o array baseado no texto digitado
  const filteredData = combinedData.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Card>
      <center>
        <div className="user-manager-container">
          <div className="card-header">Montar Pedido</div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Digite para filtrar..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="form-control input-pequeno "
            />
            {/* Use o evento onClick para o botão */}
            <button className="btn primary-btn" onClick={removeInput}>
              Limpar filtro
            </button>
            <button className="btn primary-btn" >
            Inserir código de barra
            </button>
          </div>

          {/* Exibe a tabela com base nos dados filtrados */}
          {filterText && <DataTable data={filteredData} button={addItemToOrder} acao="COMPRAR" />}

          {/* Exibe os itens adicionados ao pedido */}
          <div className="card-header">Pedido</div>
          <DataTable
            data={itemDataToOrder}
            button={removeItemFromOrder} // Passa a função de remoção ao botão da tabela
            acao="REMOVER" // Aqui você pode mudar o texto do botão para "REMOVER"
          />
        </div>
      </center>
    </Card>
  );
};

export default Vendas;
