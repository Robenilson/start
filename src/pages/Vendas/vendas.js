import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import Card from '../../components/Card';
import { fetchService } from '../../services/functions/RequestService';
import { fetchProduct } from '../../services/functions/RequestProduct';
import { FetchUserCPF } from '../../services/functions/RequestPeople';
import { NewSale } from '../../services/functions/RequestSales';
import SelectableTable from './componente/SelectableTable'; 

const Vendas = () => {
  const [cpf, setCpf] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [saleType, setSaleType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [confirmationData, setConfirmationData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [services, setServices] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const UpdateServece = async () => {
    setServices(await fetchService());   
  };

  useEffect(() => {
    UpdateServece();
  }, []);

  const UpdateProduct = async () => {
    setProdutos(await fetchProduct());
  };

  useEffect(() => {
    UpdateProduct();
  }, []);

  const handleButtonClick = (type) => {
    setSaleType(type);
    setShowModal(true);
    setQuantity(1);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(false);
    const minQuantity = saleType === 'produto' ? 1 : parseInt(item.horaMinima);
    setQuantity(minQuantity);
    setConfirmationData({
      saleType,
      item,
      quantity: minQuantity,
      total: item.valor ? item.valor * minQuantity : 0,
    });
  };

  const handleConfirm = async () => {
   

    if (!selectedItem) {
      console.error('Nenhum item selecionado.');
      return;
    }

    // Definindo o tipo do produto com base no saleType
    const productType = saleType === 'produto' ? 1 : 2;

    const data = {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      dtSale: new Date().toISOString(),
      produtos: [
        {
          productId: selectedItem.id,  
          quantity: quantity,
          orderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",  
          productType: productType,  // Aqui atribuímos o valor de productType
        }
      ],
      clientId: parseInt(cpf),
      employeerId: user.EmployeerId,
      precoTotal: confirmationData.total,
      desconto: 0,
      credito: 0,
      saleStatus: 0,
      payments: [
        {
          id: 0,
          value: confirmationData.total,
          paymentMethodId: 0,
          paymentMethod: {
            id: 0,
            nome: "string"
          }
        }
      ]
    };

    try {
      const response = await NewSale(data);

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(clearState, 5000);
      } else {
        const errorData = await response.json();
        console.error('Erro ao criar a venda:', errorData);
      }
    } catch (error) {
      console.error('Erro de rede ao criar a venda:', error);
    }
  };

  const handleCancel = () => {
    clearState();
  };

  const clearState = () => {
    setCpf('');
    setNomeUsuario('');
    setSelectedItem(null);
    setSaleType('');
    setConfirmationData(null);
    setQuantity(1);
    setShowSuccess(false);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);
    if (selectedItem) {
      const updatedTotal = selectedItem.valor ? selectedItem.valor * newQuantity : 0;
      setConfirmationData((prevConfirmationData) => ({
        ...prevConfirmationData,
        quantity: newQuantity,
        total: updatedTotal,
      }));
    }
  };

  const handleValidateUser = async () => {
    try {
      const user = await FetchUserCPF(cpf);

      if (user) {
        setNomeUsuario(user.nome);
      } else {
        alert('Usuário não cadastrado');
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  };

  return (
    <Card>
      <div className="form-group row text-center m-0 mb-1">
        <Form>
          <Form.Group>
            <Form.Label>Cpf do Cliente</Form.Label>
            <Form.Control
              type="text"
              value={cpf || ''}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Cpf do Cliente"
              disabled={!!nomeUsuario}
            />
            <Button onClick={handleValidateUser} disabled={!!nomeUsuario}>
              Validar Usuário
            </Button>
          </Form.Group>
          {nomeUsuario && (
            <Form.Group className="mt-3">
              <Form.Label>Nome do Cliente</Form.Label>
              <Form.Control
                type="text"
                value={nomeUsuario}
                readOnly
              />
            </Form.Group>
          )}
          <Form.Group className="mt-3">
            <Form.Label>Tipo de Venda</Form.Label>
            <div>
              <Button variant="primary" onClick={() => handleButtonClick('produto')} className="me-2">
                Produto
              </Button>
              <Button variant="secondary" onClick={() => handleButtonClick('serviço')}>
                Serviço
              </Button>
            </div>
          </Form.Group>
        </Form>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Selecione um {saleType}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SelectableTable
              data={saleType === 'produto' ? produtos : services}
              saleType={saleType}
              handleItemClick={handleItemClick}
            />
          </Modal.Body>
        </Modal>

        {confirmationData && (
          <div className="mt-5">
            <h4>Confirmação de Venda</h4>
            <p>
              <strong>Tipo de Venda:</strong> {confirmationData.saleType}
            </p>
            <p>
              <strong>Item:</strong> {confirmationData.item.nome}
            </p>
            <p>
              <strong>Preço Unitário:</strong> R${confirmationData.item.valor?.toFixed(2)}
            </p>
            <Form.Group>
              <Form.Label>
                {saleType === 'produto' ? 'Quantidade' : 'Horas de Uso'}
              </Form.Label>
              <Form.Control
                type="number"
                min={saleType === 'produto' ? 1 : confirmationData.item.horaMinima}
                value={quantity}
                onChange={handleQuantityChange}
              />
            </Form.Group>
            <p>
              <strong>Valor Total:</strong> R${confirmationData.total.toFixed(2)}
            </p>
            <Button variant="success" onClick={handleConfirm} className="me-2">
              Confirmar Venda
            </Button>
            <Button variant="danger" onClick={handleCancel}>
              Cancelar Venda
            </Button>
          </div>
        )}

        {showSuccess && (
          <Alert variant="success" className="mt-3">
            Pedido concluído com sucesso!
          </Alert>
        )}
      </div>
    </Card>
  );
};

export default Vendas;
