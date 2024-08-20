import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import ModalComponent from '../../components/ModalComponet';
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
      <div className="user-manager-container">
      {showSuccess && (<div className="alert alert-success mt-3"> Venda realizada com sucesso!</div>)}     

        <form>

          <div className="form-group">
            <center>
            <label>Cpf do Cliente</label>
            <input
              type="text"
              value={cpf || ''}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Cpf do Cliente"
              disabled={!!nomeUsuario}
              className="form-control"
            />
            <button  type='button' onClick={handleValidateUser} disabled={!!nomeUsuario} className="btn primary-btn">
              Validar Usuário
            </button>
            </center>
          </div>
          {nomeUsuario && (
            <div className="form-group mt-3">
              <label>Nome do Cliente</label>
              <input
                type="text"
                value={nomeUsuario}
                readOnly
                className="form-control"
              />
            </div>
          )}
           <center>
          <div className="form-group mt-3">
            <label>Tipo de Venda</label>
            <div>
             
              <button type='button' onClick={() => handleButtonClick('produto')} className="btn primary-btn">
                Produto
              </button>
              <button type='button' onClick={() => handleButtonClick('serviço')} className="btn primary-btn">
                Serviço
              </button>

              
              
            </div>
          </div>
          </center>
        </form>
        <ModalComponent
          show={showModal}
          onHide={() => setShowModal(false)}
          title={`Selecione um ${saleType}`}
          save={() => handleItemClick(selectedItem)}
        >
          <SelectableTable
            data={saleType === 'produto' ? produtos : services}
            saleType={saleType}
            handleItemClick={handleItemClick}
          />
        </ModalComponent>

        {confirmationData && (
          <center>
          <div className="detalhes">
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

            <div className="form-group">
              <label>
                {saleType === 'produto' ? 'Quantidade' : 'Horas de Uso'}
              </label>
              <input
                type="number"
                min={0}
                value={quantity}
                onChange={handleQuantityChange}
                className="form-control"
              />
            </div>
            <p>
              <strong>Valor Total:</strong> R${confirmationData.total.toFixed(2)}
            </p>
            <button onClick={handleConfirm} className="btn btn-success me-2">
              Confirmar Venda
            </button>
            <button onClick={handleCancel} className="btn btn-danger">
              Cancelar
            </button>
            
          </div>
          </center>
        )}


      </div>
    </Card>
  );
};

export default Vendas;
