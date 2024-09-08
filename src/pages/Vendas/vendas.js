import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { fetchService } from '../../services/functions/RequestService';
import { fetchProduct } from '../../services/functions/RequestProduct';
import DataTable from './componente/genericTabel'; // Importa o novo componente de tabela

const Vendas = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [filterText, setFilterText] = useState(''); // Estado para armazenar o texto digitado

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
      <h2>Dados Combinados de Serviço e Produto</h2>

      {/* Input para o usuário digitar e filtrar os dados */}
      <input
        type="text"
        placeholder="Digite para filtrar..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)} // Atualiza o estado do filtro conforme o usuário digita
      />

      {/* Exibe a tabela com base nos dados filtrados */}
      {filterText && <DataTable data={filteredData} />}
    </Card>
  );
};

export default Vendas;
