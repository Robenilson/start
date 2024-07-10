import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import Card from '../../components/Card';
import { fetchService } from '../../services/functions/RequestService';
import { fetchProduct } from '../../services/functions/RequestProduct';
import { FetchUserCPF } from '../../services/functions/RequestPeople';
import { NewSale } from '../../services/functions/RequestSales';
import SelectableTable from './componente/SelectableTable';

const Vendas = () => {
  const [cliente, setCliente] = useState(null);
  const [cpf, setCpf] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [saleType, setSaleType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(0); // Iniciando com 0
  const [confirmationData, setConfirmationData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [services, setServices] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dtSale: new Date().toISOString(),
    produtos: [],
    clientId: 0,
    employeerId: 0,
    precoTotal: 0,
    desconto: 0,
    credito: 0,
    saleStatus: 1,
    payments: [
      {
        id: 0,
        value: 0,
        paymentMethod: "string",
        orderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    ]
  });

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function fetchData() {
      await UpdateServece();
      await UpdateProduct();
    }
    fetchData();
  }, []);

  const UpdateServece = async () => {
    const fetchedServices = await fetchService();
    setServices(fetchedServices);
  };

  const UpdateProduct = async () => {
    const fetchedProducts = await fetchProduct();
    setProdutos(fetchedProducts);
  };

  const handleButtonClick = (type) => {
    setSaleType(type);
    setShowModal(true);
    setQuantity(0); // Iniciando com 0
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(false);
    setConfirmationData({
      saleType,
      item,
      quantity: quantity, // Inicializando com a quantidade digitada
      total: item.valor ? item.valor * quantity : 0, // Calculando o total com base na quantidade inicial
    });
  };

  useEffect(() => {
    if (selectedItem && confirmationData) {
      const updatedTotal = selectedItem.valor ? selectedItem.valor * quantity : 0;
      setConfirmationData((prevConfirmationData) => ({
        ...prevConfirmationData,
        total: updatedTotal,
      }));
    }
  }, [quantity, selectedItem]);

  const handleConfirm = async () => {
    if (!selectedItem) {
      console.error('Nenhum item selecionado.');
      return;
    }

    const productType = saleType === 'produto' ? 1 : 2;

    const newProduct = {
      productId: selectedItem.id,
      quantity: quantity,
      orderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      productType: productType,
      name: selectedItem.nome
    };

    const newData = {
      ...formData,
      produtos: [...formData.produtos, newProduct],
      clientId: parseInt(cliente.id),
      employeerId: parseInt(user.EmployeerId),
      precoTotal: parseInt(confirmationData.total),
      payments: [
        {
          ...formData.payments[0],
          value: parseInt(confirmationData.total),
        }
      ]
    };

    const validData = {
      id: newData.id,
      dtSale: newData.dtSale,
      produtos: newData.produtos.map(produto => ({
        productId: String(produto.productId),
        quantity: Number(produto.quantity),
        orderId: String(produto.orderId),
        productType: Number(produto.productType),
        name: String(produto.name)
      })),
      clientId: Number(newData.clientId),
      employeerId: Number(newData.employeerId),
      precoTotal: Number(newData.precoTotal),
      desconto: Number(newData.desconto),
      credito: Number(newData.credito),
      saleStatus: 2,
      payments: newData.payments.map(payment => ({
        id: Number(payment.id),
        value: Number(payment.value),
        paymentMethod: String(payment.paymentMethod),
        orderId: String(payment.orderId)
      }))
    };

    setFormData(validData);

    try {
      await NewSale(validData);
      setShowSuccess(true);
      setTimeout(clearState, 3000);
    } catch (error) {
      console.error('Erro ao criar nova venda:', error);
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
    setQuantity(0); // Iniciando com 0
    setShowSuccess(false);
    setCliente(null);
    setFormData({
      dtSale: new Date().toISOString(),
      produtos: [],
      clientId: 0,
      employeerId: 0,
      precoTotal: 0,
      desconto: 0,
      credito: 0,
      saleStatus: 0,
      payments: [
        {
          id: 0,
          value: 0,
          paymentMethod: "string",
          orderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
      ]
    });
  };

  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);

    // Atualiza o total com base na nova quantidade digitada
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
        setCliente(user);
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
                min={0} // Ajusta para iniciar em 0
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
              Cancelar
            </Button>
          </div>
        )}

        {showSuccess && (
          <Alert variant="success" className="mt-3">
            Venda realizada com sucesso!
          </Alert>
        )}
      </div>
    </Card>
  );
};

export default Vendas;
