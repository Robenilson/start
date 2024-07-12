import React from 'react';
import { Tabs, Tab, Form } from 'react-bootstrap';
import ProdutosTab from './ProdutosTab';
import ServicosTab from './ServicosTab';

const CadastroTabs = ({
  produtos,
  servicos,
  searchTermProduto,
  searchTermServico,
  setSearchTermProduto,
  setSearchTermServico,
  handleEditProduto,
  handleDeleteProduto,
  handleEditServico,
  handleDeleteServico
}) => (
  <Tabs defaultActiveKey="produtos" id="tabela-abas" className="mt-3">
    <Tab eventKey="produtos" title="Produtos">
      <Form.Control
        type="text"
        placeholder="Buscar Produtos"
        value={searchTermProduto}
        onChange={(e) => setSearchTermProduto(e.target.value)}
        className="mb-3"
      />
      <ProdutosTab
        produtos={produtos.filter(produto => produto.nome && produto.nome.toLowerCase().includes(searchTermProduto.toLowerCase()))}
        handleEditProduto={handleEditProduto}
        handleDeleteProduto={handleDeleteProduto}
      />
    </Tab>
    <Tab eventKey="servicos" title="Serviços">
      <Form.Control
        type="text"
        placeholder="Buscar Serviços"
        value={searchTermServico}
        onChange={(e) => setSearchTermServico(e.target.value)}
        className="mb-3"
      />
      <ServicosTab
        servicos={servicos.filter(servico => servico.nome && servico.nome.toLowerCase().includes(searchTermServico.toLowerCase()))}
        handleEditServico={handleEditServico}
        handleDeleteServico={handleDeleteServico}
      />
    </Tab>
  </Tabs>
);

export default CadastroTabs;
