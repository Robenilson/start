import React from 'react';
import { Tabs, Tab, Form } from 'react-bootstrap';
import Tabela from '../../../components/GenericTabel';

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
  handleDeleteServico,
}) => (
  <Tabs  defaultActiveKey="produtos" id="tabela-abas" className="mt-3 ">
    {/* Aba Produtos */}
    <Tab  eventKey="produtos" title="Produtos">
      <Form.Control
        type="text"
        placeholder="Buscar Produtos"
        value={searchTermProduto}
        onChange={(e) => setSearchTermProduto(e.target.value)}
        className="mb-3"
      />
      <Tabela
        columns={[

          { key: 'nome', label: 'Nome' ,  className: 'space'},
          { key: 'valor', label: 'Valor', render: (item) => `R$${item.valor.toFixed(2)}` },
          { key: 'quantidade', label: 'Quantidade' ,  className: 'space'},
        ]}
        data={produtos.filter((produto) =>
          produto.nome && produto.nome.toLowerCase().includes(searchTermProduto.toLowerCase())
        )}
        actions={[
          { label: 'Editar', className: 'edit-btn warning', onClick: handleEditProduto },
          { label: 'Excluir', className: 'delete-btn danger', onClick: handleDeleteProduto },
        ]}
        keyField="id"
      />
    </Tab>

    {/* Aba Serviços */}
    <Tab eventKey="servicos" title="Serviços">
      <Form.Control
        type="text"
        placeholder="Buscar Serviços"
        value={searchTermServico}
        onChange={(e) => setSearchTermServico(e.target.value)}
        className="mb-3"
      />
      <Tabela
        columns={[
          { key: 'nome', label: 'Nome' },
          { key: 'descricao', label: 'Descrição' },
          { key: 'valor', label: 'Valor', render: (item) => `R$${item.valor.toFixed(2)}` },
          { key: 'horaMinima', label: 'Hora Mínima', render: (item) => `${item.horaMinima} minutos` },
        ]}
        data={servicos.filter((servico) =>
          servico.nome && servico.nome.toLowerCase().includes(searchTermServico.toLowerCase())
        )}
        actions={[
          { label: 'Editar', className: 'edit-btn warning', onClick: handleEditServico },
          { label: 'Excluir', className: 'delete-btn danger', onClick: handleDeleteServico },
        ]}
        keyField="id"
      />
    </Tab>
  </Tabs>
);

export default CadastroTabs;
