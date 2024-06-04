import React, { useState } from 'react';
import { Button, Alert, Tabs, Tab, Form } from 'react-bootstrap';
import Card from '../../components/Card';
import ModalComponent from '../../components/ModalComponet';
import ProdutosTab from './component/ProdutosTab';
import ServicosTab from './component/ServicosTab';
import GenericForm from './component/GenericForm';

const NewCadastro = () => {
  const [showModalProduto, setShowModalProduto] = useState(false);
  const [showModalServico, setShowModalServico] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [produtoValues, setProdutoValues] = useState({ nomeProduto: '', valorProduto: '', quantidade: '' });
  const [servicoValues, setServicoValues] = useState({ nomeServico: '', valorServico: '', horas: '', minutos: '', segundos: '', quantidade: '' });
  const [searchTermProduto, setSearchTermProduto] = useState('');
  const [searchTermServico, setSearchTermServico] = useState('');

  const produtoFields = [
    { name: 'nomeProduto', label: 'Nome do Produto', type: 'text', placeholder: 'Nome do Produto' },
    { name: 'valorProduto', label: 'Valor', type: 'number', placeholder: 'R$0,00', step: '0.01' },
    { name: 'quantidade', label: 'Quantidade', type: 'number', placeholder: 'Quantidade' },
  ];

  const servicoFields = [
    { name: 'nomeServico', label: 'Nome do Serviço', type: 'text', placeholder: 'Nome do Serviço' },
    { name: 'valorServico', label: 'Valor', type: 'number', placeholder: 'R$0,00', step: '0.01' },
    { name: 'horas', label: 'Horas', type: 'number', placeholder: 'Horas' },
    { name: 'minutos', label: 'Minutos', type: 'number', placeholder: 'Minutos' },
    { name: 'segundos', label: 'Segundos', type: 'number', placeholder: 'Segundos' },
    { name: 'quantidade', label: 'Quantidade', type: 'number', placeholder: 'Quantidade' },
  ];

  const handleInputChange = (setter) => (name, value) => {
    setter((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleShowProduto = () => setShowModalProduto(true);
  const handleShowServico = () => setShowModalServico(true);

  const handleCloseProduto = () => {
    setShowModalProduto(false);
    setProdutoValues({ nomeProduto: '', valorProduto: '', quantidade: '' });
  };

  const handleCloseServico = () => {
    setShowModalServico(false);
    setServicoValues({ nomeServico: '', valorServico: '', horas: '', minutos: '', segundos: '', quantidade: '' });
  };

  const handleCadastroProduto = () => {
    const novoProduto = { 
      nome: produtoValues.nomeProduto, 
      valor: parseFloat(produtoValues.valorProduto), 
      quantidade: parseInt(produtoValues.quantidade, 10) 
    };

 console.log( [...produtos, novoProduto])


    const data={
      "name": novoProduto.nome,
      "description": "string",
      "price": novoProduto.valor,
      "productType": 1,
      "virtualProduct": {
        "quantidadeHoras": 0
      },
      "physiqueProduct": {
        "estoque": novoProduto.quantidade
      }
    }

    //setProdutos([...produtos, novoProduto]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    handleCloseProduto();
  };

  const handleCadastroServico = () => {
    const novoServico = {
      nome: servicoValues.nomeServico,
      valor: parseFloat(servicoValues.valorServico),
      horaMinima: `${servicoValues.horas}:${servicoValues.minutos}:${servicoValues.segundos}`,
      quantidade: parseInt(servicoValues.quantidade, 10)
    };
    setServicos([...servicos, novoServico]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    handleCloseServico();
  };

  const handleEditProduto = (index) => {
    const produto = produtos[index];
    setProdutoValues({ nomeProduto: produto.nome, valorProduto: produto.valor, quantidade: produto.quantidade });
    setProdutos(produtos.filter((_, i) => i !== index));
    setShowModalProduto(true);
  };

  const handleDeleteProduto = (index) => {
    setProdutos(produtos.filter((_, i) => i !== index));
  };

  const handleEditServico = (index) => {
    const servico = servicos[index];
    const [horas, minutos, segundos] = servico.horaMinima.split(':');
    setServicoValues({ nomeServico: servico.nome, valorServico: servico.valor, horas, minutos, segundos, quantidade: servico.quantidade });
    setServicos(servicos.filter((_, i) => i !== index));
    setShowModalServico(true);
  };

  const handleDeleteServico = (index) => {
    setServicos(servicos.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <div className="card-header">Novo Cadastro</div>
      <div className="card-body">
        <Button variant="primary" onClick={handleShowProduto} className="me-2">
          Cadastrar Produto
        </Button>
        <Button variant="secondary" onClick={handleShowServico}>
          Cadastrar Serviço
        </Button>

        <ModalComponent show={showModalProduto} onHide={handleCloseProduto} title="Cadastrar Produto" save={handleCadastroProduto}>
          <GenericForm fields={produtoFields} values={produtoValues} handleChange={handleInputChange(setProdutoValues)} />
        </ModalComponent>

        <ModalComponent show={showModalServico} onHide={handleCloseServico} title="Cadastrar Serviço" save={handleCadastroServico}>
          <GenericForm fields={servicoFields} values={servicoValues} handleChange={handleInputChange(setServicoValues)} />
        </ModalComponent>

        {showSuccess && (
          <Alert variant="success" className="mt-3">
            Cadastro concluído com sucesso!
          </Alert>
        )}
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
              produtos={produtos.filter(produto => produto.nome.toLowerCase().includes(searchTermProduto.toLowerCase()))} 
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
              servicos={servicos.filter(servico => servico.nome.toLowerCase().includes(searchTermServico.toLowerCase()))} 
              handleEditServico={handleEditServico} 
              handleDeleteServico={handleDeleteServico} 
            />
          </Tab>
        </Tabs>
      </div>
    </Card>
  );
};

export default NewCadastro;
