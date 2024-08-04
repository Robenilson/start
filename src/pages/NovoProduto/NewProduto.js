import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import Card from '../../components/Card';
import ModalComponent from '../../components/ModalComponet';
import GenericForm from './component/GenericForm';
import {
  newService,
  fetchService,
  editService,
  DeleteService
} from '../../services/functions/RequestService';
import {
  newProduct,
  fetchProduct,
  DeleteProduct,
  editProduct
} from '../../services/functions/RequestProduct';

import ConfirmationModal from './component/ConfirmationModal';
import SuccessAlert from './component/SuccessAlert';
import LoadingModal from '../../components/LoadingModal';
import CadastroTabs from './component/CadastroTabs';





const NewCadastro = () => {
  const [showModalProduto, setShowModalProduto] = useState(false);
  const [showModalServico, setShowModalServico] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [produtoValues, setProdutoValues] = useState({ id: '', nomeProduto: '', valorProduto: '', quantidade: '', descricaoProduto: '' });
  const [servicoValues, setServicoValues] = useState({ id: '', nomeServico: '', valorServico: '', tempo: '15', quantidade: '', descricaoServico: '', computador:'false' });
  const [searchTermProduto, setSearchTermProduto] = useState('');
  const [searchTermServico, setSearchTermServico] = useState('');
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('');
  const [confirmDeleteProduto, setConfirmDeleteProduto] = useState({ show: false, produto: null });
  const [confirmDeleteServico, setConfirmDeleteServico] = useState({ show: false, servico: null });
  const [loading, setLoading] = useState(false);

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
    { name: 'computador', label: 'Computador', type: 'radio', options: [{ value: 'true', label: 'Sim' }, { value: 'false', label: 'Não' }] },
  ];
  const updateTabelProduct = async () => {
    setLoading(true);
    try {
      const data = await fetchProduct();
      setProdutos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error updating products:', error);
      setProdutos([]);
    }
    setLoading(false);
  };

  const updateTabelServicos = async () => {
    setLoading(true);
    try {
      const data = await fetchService();
      setServicos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error updating services:', error);
      setServicos([]);
    }
    setLoading(false);
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
    setServicoValues({ id: '', nomeServico: '', valorServico: '', tempo: '15', quantidade: '', descricaoServico: '', computador:"false" });
  };

  const handleCadastroProduto = async () => {
    const data = {
      name: produtoValues.nomeProduto,
      price: parseFloat(produtoValues.valorProduto),
      quantity: parseInt(produtoValues.quantidade),
      description: produtoValues.descricaoProduto,
    };

    await newProduct(data);
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
      quantityHours: parseInt(tempoEmMinutos),
      quantityEquipament: parseInt(servicoValues.quantidade),
      description: servicoValues.descricaoServico,
      isComputer: Boolean(servicoValues.computador), // Conversão para booleano
    };
    console.log(data)
  
    await newService(data);
    await updateTabelServicos();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    handleCloseServico();
  };

  const handleEditProduto = (produto) => {
    setProdutoValues({
      id: produto.id,
      nomeProduto: produto.nome,
      valorProduto: produto.valor,
      quantidade: produto.quantidade,
      descricaoProduto: produto.descricao,
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

  const confirmDeleteServicoHandler = async () => {
    await DeleteService(confirmDeleteServico.servico);
    await updateTabelServicos();
    setConfirmDeleteServico({ show: false, servico: null });
  };

  const updateSeviceSave = async () => {
    const tempoEmMinutos = parseInt(servicoValues.tempo);

    const data = {
      name: servicoValues.nomeServico,
      price: parseFloat(servicoValues.valorServico),
      quantityHours: tempoEmMinutos,
      quantityEquipament: servicoValues.quantidade,
      description: servicoValues.descricaoServico,
    };

    await editService(data);
    await updateTabelServicos();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    handleCloseServico();
  };

  const updateProductSave = async () => {
    const data = {    
      id: produtoValues.id,
      name: produtoValues.nomeProduto,
      description: produtoValues.descricaoProduto,
      price: parseFloat(produtoValues.valorProduto),
      quantity: parseInt(produtoValues.quantidade)    
    };
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    handleCloseProduto();
    await editProduct(data);
    await updateTabelProduct();
    
  };

  return (
    <Card>
      <div className="col-md-12">

     <div className="row ">
       <div className="col-1">
           <Button variant="primary" className="mt-3" onClick={handleShowProduto}>Cadastrar Produto</Button>
       </div> 

      <div className="col-1">
         <Button variant="primary" className="mt-3 ml-6" onClick={handleShowServico}>Cadastrar Serviço
          </Button>
      </div>
    </div>
      

        

        <ModalComponent show={showModalProduto} onHide={handleCloseProduto} title="Cadastrar Produto">
          <GenericForm
            fields={produtoFields}
            values={produtoValues}
            handleSave={handleCadastroProduto}
            handleChange={handleInputChange(setProdutoValues)}
            mode={mode}
            handleUpdate={updateProductSave}
            handleClose={handleCloseProduto}
          />
        </ModalComponent>

        <ModalComponent show={showModalServico} onHide={handleCloseServico} title="Cadastrar Serviço">
          <GenericForm
            fields={servicoFields}
            values={servicoValues}
            handleSave={handleCadastroServico}
            handleChange={handleInputChange(setServicoValues)}
            mode={mode}
            handleUpdate={updateSeviceSave}
            handleClose={handleCloseServico}
          />
        </ModalComponent>

        <ConfirmationModal
          show={confirmDeleteProduto.show}
          onHide={() => setConfirmDeleteProduto({ show: false, produto: null })}
          onConfirm={confirmDeleteProdutoHandler}
          title="Confirmar Exclusão"
          body={`Tem certeza que deseja excluir o produto "${confirmDeleteProduto.produto?.nome}"?`}
        />

        <ConfirmationModal
          show={confirmDeleteServico.show}
          onHide={() => setConfirmDeleteServico({ show: false, servico: null })}
          onConfirm={confirmDeleteServicoHandler}
          title="Confirmar Exclusão"
          body={`Tem certeza que deseja excluir o serviço "${confirmDeleteServico.servico?.nome}"?`}
        />

        <SuccessAlert show={showSuccess} />

        <CadastroTabs
          produtos={produtos}
          servicos={servicos}
          searchTermProduto={searchTermProduto}
          searchTermServico={searchTermServico}
          setSearchTermProduto={setSearchTermProduto}
          setSearchTermServico={setSearchTermServico}
          handleEditProduto={handleEditProduto}
          handleDeleteProduto={handleDeleteProduto}
          handleEditServico={handleEditServico}
          handleDeleteServico={handleDeleteServico}
        />

        <LoadingModal show={loading} />
      </div>
    </Card>
  );
};

export default NewCadastro;
