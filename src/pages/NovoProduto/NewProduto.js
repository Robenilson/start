import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Alert, Tabs, Tab, Form } from 'react-bootstrap';
import Card from '../../components/Card';
import ModalComponent from '../../components/ModalComponet';
import ProdutosTab from './component/ProdutosTab';
import ServicosTab from './component/ServicosTab';
import GenericForm from './component/GenericForm';
import { newService, fetchService } from '../../services/functions/RequestService';
import { newProduct, fetchProduct, DeletProduct } from "../../services/functions/RequestProduct";

const NewCadastro = () => {
  const [showModalProduto, setShowModalProduto] = useState(false);
  const [showModalServico, setShowModalServico] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [produtoValues, setProdutoValues] = useState({ nomeProduto: '', valorProduto: '', quantidade: '', descricaoProduto: '' });
  const [servicoValues, setServicoValues] = useState({ nomeServico: '', valorServico: '', horas: '', minutos: '', segundos: '', quantidade: '', descricaoServico: '' });
  const [searchTermProduto, setSearchTermProduto] = useState('');
  const [searchTermServico, setSearchTermServico] = useState('');
  const [error, setError] = useState(null);

  const produtoFields = [
    { name: 'nomeProduto', label: 'Nome do Produto', type: 'text', placeholder: 'Nome do Produto' },
    { name: 'valorProduto', label: 'Valor', type: 'number', placeholder: 'R$0,00', step: '0.01' },
    { name: 'quantidade', label: 'Quantidade', type: 'number', placeholder: 'Quantidade' },
    { name: 'descricaoProduto', label: 'Descrição', type: 'text', placeholder: 'Descrição do Produto' },
  ];

  const servicoFields = [
    { name: 'nomeServico', label: 'Nome do Serviço', type: 'text', placeholder: 'Nome do Serviço' },
    { name: 'valorServico', label: 'Valor', type: 'number', placeholder: 'R$0,00', step: '0.01' },
    { name: 'horas', label: 'Horas', type: 'number', placeholder: 'Horas' },
    { name: 'minutos', label: 'Minutos', type: 'number', placeholder: 'Minutos' },
    { name: 'segundos', label: 'Segundos', type: 'number', placeholder: 'Segundos' },
    { name: 'quantidade', label: 'Quantidade', type: 'number', placeholder: 'Quantidade' },
    { name: 'descricaoServico', label: 'Descrição', type: 'text', placeholder: 'Descrição do Serviço' },
  ];

  const updateTabelProduct = async () => {
    try {
      const data = await fetchProduct();
      setProdutos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error updating products:', error);
      setProdutos([]);
    }
  };

  const updateTabelServicos = async () => {
    try {
      const data = await fetchService();
      console.log(data)
      setServicos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error updating services:', error);
      setServicos([]);
    }
  };

  useEffect(() => {
    updateTabelProduct();
  }, []);

  useEffect(() => {
    updateTabelServicos();
  }, []);

  const handleInputChange = (setter) => (name, value) => {
    setter(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleShowProduto = () => setShowModalProduto(true);
  const handleShowServico = () => setShowModalServico(true);

  const handleCloseProduto = () => {
    setShowModalProduto(false);
    setProdutoValues({ nomeProduto: '', valorProduto: '', quantidade: '', descricaoProduto: '' });
  };

  const handleCloseServico = () => {
    setShowModalServico(false);
    setServicoValues({ nomeServico: '', valorServico: '', horas: '', minutos: '', segundos: '', quantidade: '', descricaoServico: '' });
  };

  const handleCadastroProduto = async () => {
    const novoProduto = {
      name: produtoValues.nomeProduto,
      description: produtoValues.descricaoProduto,
      price: parseFloat(produtoValues.valorProduto),
      quantity: parseInt(produtoValues.quantidade),
    };
    
    console.log(novoProduto)

    
    await newProduct(novoProduto);
    await updateTabelProduct();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    handleCloseProduto();
  };

  const handleCadastroServico = async () => {
    const data = {
      name: servicoValues.nomeServico,
      price: parseInt(servicoValues.valorServico),
      quantityHours: parseInt(servicoValues.horas) * 3600 + parseInt(servicoValues.minutos) * 60 + parseInt(servicoValues.segundos),
      description: servicoValues.descricaoServico,
    };

    await newService(data);
    await updateTabelServicos();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    handleCloseServico();
  };

  const handleEditProduto = (index) => {
    const produto = produtos[index];
    setProdutoValues({ nomeProduto: produto.nome, valorProduto: produto.valor, quantidade: produto.quantidade, descricaoProduto: produto.descricao });
    setProdutos(produtos.filter((_, i) => i !== index));
    setShowModalProduto(true);
  };

  const handleDeleteProduto = (index) => {
    

    let foundObjects = produtos.filter(item => console.log(item));

    console.log(foundObjects)

    
   // const a = produtos.filter((_, i) => i !== index)
      
    
  };

  const handleEditServico = (index) => {
    const servico = servicos[index];
    const [horas, minutos, segundos] = servico.horaMinima.split(':');
    setServicoValues({ nomeServico: servico.nome, valorServico: servico.valor, horas, minutos, segundos, quantidade: servico.quantidade, descricaoServico: servico.descricao });
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
      </div>
    </Card>
  );
};

export default NewCadastro;
