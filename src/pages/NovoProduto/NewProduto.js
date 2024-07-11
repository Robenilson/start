import React, { useState, useEffect } from 'react';
import { Button, Alert, Tabs, Tab, Form, Modal, Spinner } from 'react-bootstrap';
import Card from '../../components/Card';
import ModalComponent from '../../components/ModalComponet';
import ProdutosTab from './component/ProdutosTab';
import ServicosTab from './component/ServicosTab';
import GenericForm from './component/GenericForm';
import { newService, fetchService, editService, createDataServicoEdit, DeleteService } from '../../services/functions/RequestService';
import { newProduct, fetchProduct, DeleteProduct, editProduct, createDataProductEdit } from "../../services/functions/RequestProduct";

const NewCadastro = () => {
  const [showModalProduto, setShowModalProduto] = useState(false);
  const [showModalServico, setShowModalServico] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [produtoValues, setProdutoValues] = useState({ id: '', nomeProduto: '', valorProduto: '', quantidade: '', descricaoProduto: '' });
  const [servicoValues, setServicoValues] = useState({ id: '', nomeServico: '', valorServico: '', tempo: '15', quantidade: '', descricaoServico: '' });
  const [searchTermProduto, setSearchTermProduto] = useState('');
  const [searchTermServico, setSearchTermServico] = useState('');
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('');
  const [confirmDeleteProduto, setConfirmDeleteProduto] = useState({ show: false, produto: null });
  const [confirmDeleteServico, setConfirmDeleteServico] = useState({ show: false, servico: null });
  const [loading, setLoading] = useState(false); // Estado para controlar o modal de loading

  const produtoFields = [
    { name: 'nomeProduto', label: 'Nome do Produto', type: 'text', placeholder: 'Nome do Produto' },
    { name: 'valorProduto', label: 'Valor', type: 'number', placeholder: 'R$0,00', step: '0.01' },
    { name: 'quantidade', label: 'Quantidade', type: 'number', placeholder: 'Quantidade' },
    { name: 'descricaoProduto', label: 'Descrição', type: 'text', placeholder: 'Descrição do Produto' },
  ];

  const servicoFields = [
    { name: 'nomeServico', label: 'Nome do Serviço', type: 'text', placeholder: 'Nome do Serviço' },
    { name: 'valorServico', label: 'Valor', type: 'number', placeholder: 'R$0,00', step: '0.01' },
    { name: 'tempo', label: 'Tempo', type: 'select', options: [{ value: '15', label: '15 minutos' }, { value: '30', label: '30 minutos' }, { value: '60', label: '1 hora' }] },
    { name: 'quantidade', label: 'Quantidade', type: 'number', placeholder: 'Quantidade' },
    { name: 'descricaoServico', label: 'Descrição', type: 'text', placeholder: 'Descrição do Serviço' },
  ];

  const updateTabelProduct = async () => {
    setLoading(true); // Mostrar modal de loading
    try {
      const data = await fetchProduct();
      setProdutos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error updating products:', error);
      setProdutos([]);
    }
    setLoading(false); // Ocultar modal de loading
  };

  const updateTabelServicos = async () => {
    setLoading(true); // Mostrar modal de loading
    try {
      const data = await fetchService();
      setServicos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error updating services:', error);
      setServicos([]);
    }
    setLoading(false); // Ocultar modal de loading
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

  const handleShowProduto = () => {
    setMode('cadastrar');
    setShowModalProduto(true);
  };

  const handleShowServico = () => {
    setMode('cadastrar');
    setShowModalServico(true);
  };

  const handleCloseProduto = () => {
    setShowModalProduto(false);
    setProdutoValues({ id: '', nomeProduto: '', valorProduto: '', quantidade: '', descricaoProduto: '' });
  };

  const handleCloseServico = () => {
    setShowModalServico(false);
    setServicoValues({ id: '', nomeServico: '', valorServico: '', tempo: '15', quantidade: '', descricaoServico: '' });
  };

  const handleCadastroProduto = async () => {
    const novoProduto = {
      name: produtoValues.nomeProduto,
      description: produtoValues.descricaoProduto,
      price: parseFloat(produtoValues.valorProduto),
      quantity: parseInt(produtoValues.quantidade),
    };
    await newProduct(novoProduto);
    await updateTabelProduct();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    handleCloseProduto();
  };

  const handleCadastroServico = async () => {
    const tempoEmMinutos = parseInt(servicoValues.tempo);

    const data = {
      name: servicoValues.nomeServico,
      price: parseFloat(servicoValues.valorServico),
      quantityHours: tempoEmMinutos, // Valor em minutos
      quantityEquipament: servicoValues.quantidade,
      description: servicoValues.descricaoServico,
    };

    await newService(data);
    await updateTabelServicos();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    handleCloseServico();
  };

  const handleEditProduto = (produto) => {
    setProdutoValues({
      id: produto.id,
      nomeProduto: produto.name,
      valorProduto: produto.price,
      quantidade: produto.quantity,
      descricaoProduto: produto.description,
    });

    setMode('editar');
    setShowModalProduto(true);
  };

  const handleDeleteProduto = (produto) => {
    setConfirmDeleteProduto({ show: true, produto: produto });
  };

  const confirmDeleteProdutoHandler = async () => {
    await DeleteProduct(confirmDeleteProduto.produto);
    await updateTabelProduct();
    setConfirmDeleteProduto({ show: false, produto: null });
  };

  const handleEditServico = (servico) => {
    setServicoValues({
      id: servico.id,
      nomeServico: servico.nome,
      valorServico: servico.valor,
      tempo: servico.horaMinima,
      quantidade: servico.quantityEquipament,
      descricaoServico: servico.descricao,
    });

    setMode('editar');
    setShowModalServico(true);
  };

  const handleDeleteServico = (servico) => {
    setConfirmDeleteServico({ show: true, servico: servico });
  };

  const confirmDeleteServicoHandler = () => {
    DeleteService(confirmDeleteServico.servico).then(updateTabelServicos());
    setConfirmDeleteServico({ show: false, servico: null });
  };

  const updateSeviceSave = async () => {
    const tempoEmMinutos = parseInt(servicoValues.tempo);

    const data = {
      name: servicoValues.nomeServico,
      price: parseFloat(servicoValues.valorServico),
      quantityHours: tempoEmMinutos, // Valor em minutos
      quantityEquipament: servicoValues.quantidade,
      description: servicoValues.descricaoServico,
    };

    await editService(data);
    await updateTabelServicos();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    handleCloseServico();
  };

  return (
    <Card>
      <div className="col-md-12">
        <Button variant="primary" className="mt-3" onClick={handleShowProduto}>
          Cadastrar Produto
        </Button>

        <Button variant="primary" className="mt-3 ml-3" onClick={handleShowServico}>
          Cadastrar Serviço
        </Button>

        <ModalComponent show={showModalProduto} onHide={handleCloseProduto} title="Cadastrar Produto">
          <GenericForm fields={produtoFields} values={produtoValues} handleSave={handleCadastroProduto} handleChange={handleInputChange(setProdutoValues)} mode={mode} handleUpdate={updateSeviceSave} handleClose={handleCloseProduto} />
        </ModalComponent>

        <ModalComponent show={showModalServico} onHide={handleCloseServico} title="Cadastrar Serviço">
          <GenericForm fields={servicoFields} values={servicoValues} handleSave={handleCadastroServico} handleChange={handleInputChange(setServicoValues)} mode={mode} handleUpdate={updateSeviceSave} handleClose={handleCloseServico} />
        </ModalComponent>

        <Modal show={confirmDeleteProduto.show} onHide={() => setConfirmDeleteProduto({ show: false, produto: null })}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que deseja excluir o produto "{confirmDeleteProduto.produto?.nome}"?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setConfirmDeleteProduto({ show: false, produto: null })}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDeleteProdutoHandler}>
              Excluir
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={confirmDeleteServico.show} onHide={() => setConfirmDeleteServico({ show: false, servico: null })}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que deseja excluir o serviço "{confirmDeleteServico.servico?.nome}"?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setConfirmDeleteServico({ show: false, servico: null })}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDeleteServicoHandler}>
              Excluir
            </Button>
          </Modal.Footer>
        </Modal>

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

      {/* Modal de Loading */}
      <Modal show={loading} centered>
        <Modal.Body className="text-center">
          <Spinner animation="border" />
          <div>Carregando...</div>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default NewCadastro;
