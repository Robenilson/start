import React, { useState, useEffect } from 'react';
import { Button, Alert, Tabs, Tab, Form, Modal } from 'react-bootstrap';
import Card from '../../components/Card';
import ModalComponent from '../../components/ModalComponet';
import ProdutosTab from './component/ProdutosTab';
import ServicosTab from './component/ServicosTab';
import GenericForm from './component/GenericForm';
import { newService, fetchService, editService ,createDataServicoEdit , DeleteService} from '../../services/functions/RequestService';
import { newProduct, fetchProduct, DeleteProduct ,editProduct, createDataProductEdit} from "../../services/functions/RequestProduct";

const NewCadastro = () => {
  const [showModalProduto, setShowModalProduto] = useState(false);
  const [showModalServico, setShowModalServico] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [produtoValues, setProdutoValues] = useState({ id: '', nomeProduto: '', valorProduto: '', quantidade: '', descricaoProduto: '' });
  const [servicoValues, setServicoValues] = useState({ id: '', nomeServico: '', valorServico: '', tempo: '', quantidade: '', descricaoServico: '' });
  const [searchTermProduto, setSearchTermProduto] = useState('');
  const [searchTermServico, setSearchTermServico] = useState('');
  const [error, setError] = useState(null);
  const [mode, setMode] = useState(''); // Adicionado estado `mode`
  const [confirmDeleteProduto, setConfirmDeleteProduto] = useState({ show: false, produto: null }); // Estado para confirmar exclusão de produto
  const [confirmDeleteServico, setConfirmDeleteServico] = useState({ show: false, servico: null }); // Estado para confirmar exclusão de serviço

  const produtoFields = [
    { name: 'nomeProduto', label: 'Nome do Produto', type: 'text', placeholder: 'Nome do Produto' },
    { name: 'valorProduto', label: 'Valor', type: 'number', placeholder: 'R$0,00', step: '0.01' },
    { name: 'quantidade', label: 'Quantidade', type: 'number', placeholder: 'Quantidade' },
    { name: 'descricaoProduto', label: 'Descrição', type: 'text', placeholder: 'Descrição do Produto' },
  ];

  const servicoFields = [
    { name: 'nomeServico', label: 'Nome do Serviço', type: 'text', placeholder: 'Nome do Serviço' },
    { name: 'valorServico', label: 'Valor', type: 'number', placeholder: 'R$0,00', step: '0.01' },
    { name: 'tempo', label: 'Tempo (HH:MM:SS)', type: 'text', placeholder: '00:00:00' }, // Campo combinado
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

  const handleShowProduto = () => {
    setMode('cadastrar'); // Define o modo como 'cadastrar'
    setShowModalProduto(true);
  };

  const handleShowServico = () => {
    setMode('cadastrar'); // Define o modo como 'cadastrar'
    setShowModalServico(true);
  };

  const handleCloseProduto = () => {
    setShowModalProduto(false);
    setProdutoValues({ id: '', nomeProduto: '', valorProduto: '', quantidade: '', descricaoProduto: '' });
  };

  const handleCloseServico = () => {
    setShowModalServico(false);
    setServicoValues({ id: '', nomeServico: '', valorServico: '', tempo: '', quantidade: '', descricaoServico: '' });
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
    const [horas, minutos, segundos] = servicoValues.tempo.split(':').map(Number); // Divida o valor do tempo

    const data = {
      name: servicoValues.nomeServico,
      price: parseFloat(servicoValues.valorServico),
      quantityHours: horas * 3600 + minutos * 60 + segundos,
      quantityEquipament: servicoValues.quantidade,
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
    setProdutoValues({ id: produto.id, nomeProduto: produto.nome, valorProduto: produto.valor, quantidade: produto.quantidade, descricaoProduto: produto.descricao });
    setMode('editar'); // Define o modo como 'editar'
    setShowModalProduto(true);
  };

  const handleDeleteProduto = (produto) => {
    setConfirmDeleteProduto({ show: true, produto: produto });
  };

  const confirmDeleteProdutoHandler = () => {
    DeleteProduct(confirmDeleteProduto.produto).then(updateTabelProduct());
    setConfirmDeleteProduto({ show: false, produto: null });
  };

  const handleEditServico = (servico) => {
    const horas = Math.floor(servico.quantityHours / 3600);
    const minutos = Math.floor((servico.quantityHours % 3600) / 60);
    const segundos = servico.quantityHours % 60;

    setServicoValues({
      id: servico.id,
      nomeServico: servico.nome,
      valorServico: servico.valor,
      tempo: `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`, // Valor combinado
      quantidade: servico.quantidade,
      descricaoServico: servico.descricao,
    });
    setMode('editar'); // Define o modo como 'editar'
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
    await createDataServicoEdit(servicoValues).
      then(data => { editService(data) }).
      then(
        setShowSuccess(true),
        setTimeout(() => setShowSuccess(false), 5000),
        handleCloseServico(),
      )
  };

  const updateProductSave = async () => {

    await createDataProductEdit(produtoValues).
      then(data => { editProduct(data) }).
      then(
        setShowSuccess(true),
        setTimeout(() => setShowSuccess(false), 5000),
        handleCloseProduto()
      )

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

        <ModalComponent show={showModalProduto} onHide={handleCloseProduto} title="Cadastrar Produto" save={handleCadastroProduto} hideButtons='false'>
          <GenericForm fields={produtoFields} values={produtoValues} handleSave={handleCadastroProduto} handleUpdate={updateProductSave} handleChange={handleInputChange(setProdutoValues)} mode={mode} />
        </ModalComponent>

        <ModalComponent show={showModalServico} onHide={handleCloseServico} title="Cadastrar Serviço" hideButtons='false'>
          <GenericForm fields={servicoFields} values={servicoValues} handleSave={handleCadastroServico} handleUpdate={updateSeviceSave} handleChange={handleInputChange(setServicoValues)} mode={mode} />
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
    </Card>
  );
};

export default NewCadastro;
