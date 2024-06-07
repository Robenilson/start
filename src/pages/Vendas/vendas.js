import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Alert } from 'react-bootstrap';
import Card from '../../components/Card';

const Vendas = () => {
  const [cpf, setCpf] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [saleType, setSaleType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [confirmationData, setConfirmationData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [services, setServices] = useState([]);
  const [produtos, setProdutos] = useState([]);

  // Função axios tipo GET que chama o endpoint de Serviço
  const fetchService = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Service');
      setServices(response.data);  // Atualizar o estado com os dados recebidos
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  useEffect(() => {
    fetchService();  // Chamada para buscar serviços ao montar o componente
  }, []);

  // Função axios tipo GET que chama o endpoint de Produto
  const fetchProduct = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Product');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProduct();  // Chamada para buscar produtos ao montar o componente
  }, []);

  const handleButtonClick = (type) => {
    setSaleType(type);
    setShowModal(true);
    setQuantity(1); // Reset quantity
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(false); // Fecha o modal imediatamente
    const minQuantity = saleType === 'produto' ? 1 : parseInt(item.horaMinima);
    setQuantity(minQuantity);
    setConfirmationData({
      saleType,
      item,
      quantity: minQuantity,
      total: item.valor ? item.valor * minQuantity : 0,
    });
  };

  const handleConfirm = () => {
    // Enviar dados para o caixa
    console.log('Venda confirmada:', confirmationData,'cpf:',cpf);
   
    setShowSuccess(true);
    setTimeout(clearState, 5000);
  };

  const handleCancel = () => {
    clearState();
  };

  const clearState = () => {
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
      setConfirmationData({
        ...confirmationData,
        quantity: newQuantity,
        total: updatedTotal,
      });
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
            />
          </Form.Group>

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
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Preço</th>
                  {saleType === 'serviço' && <th>Valor Mínimo por Hora</th>}
                </tr>
              </thead>
              <tbody>
                {(saleType === 'produto' ? produtos : services).map((item, index) => (
                  <tr key={index} onClick={() => handleItemClick(item)}>
                    <td>{index + 1}</td>
                    <td>{item.nome}</td>
                    <td>
                      R$
                      {item.valor?.toFixed(2)}
                    </td>
                    {saleType === 'serviço' && <td>{item.horaMinima}</td>}
                  </tr>
                ))}
              </tbody>
            </Table>
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
              <strong>Preço Unitário:</strong> R$
              {confirmationData.item.valor?.toFixed(2)}
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
            <Button
              variant="success"
              onClick={handleConfirm}
              className="me-2"
            >
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
