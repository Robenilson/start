import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import   Card  from './../../components/Card';
import { fetchService } from '../../services/functions/RequestService';
import { fetchProduct } from '../../services/functions/RequestProduct';
import { FetchUserCPF } from '../../services/functions/RequestPeople';
import { NewSale } from '../../services/functions/RequestSales';
import UserValidationForm from './componente/UserValidationForm';
import SaleTypeSelection from './componente/SaleTypeSelection';
import ConfirmationModal from './componente/ConfirmationModal';
import ConfirmationDetails from './componente/ConfirmationDetails';
import SuccessAlert from './componente/SuccessAlert';

const Vendas = () => {
  const [cliente, setCliente] = useState(null);
  const [cpf, setCpf] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [saleType, setSaleType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
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
    setQuantity(0);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(false);
    setConfirmationData({
      saleType,
      item,
      quantity: quantity,
      total: item.valor ? item.valor * quantity : 0,
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
    setQuantity(0);
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
          <UserValidationForm
            cpf={cpf}
            setCpf={setCpf}
            nomeUsuario={nomeUsuario}
            handleValidateUser={handleValidateUser}
          />
          <SaleTypeSelection handleButtonClick={handleButtonClick} />
        </Form>

        <ConfirmationModal
          showModal={showModal}
          setShowModal={setShowModal}
          saleType={saleType}
          produtos={produtos}
          services={services}
          handleItemClick={handleItemClick}
        />

        {confirmationData && (
          <ConfirmationDetails
            confirmationData={confirmationData}
            quantity={quantity}
            handleQuantityChange={handleQuantityChange}
            handleConfirm={handleConfirm}
            handleCancel={handleCancel}
            saleType={saleType}
          />
        )}

        <SuccessAlert showSuccess={showSuccess} />
      </div>
    </Card>
  );
};

export default Vendas;