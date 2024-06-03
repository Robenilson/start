import React, { useState } from 'react';
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

  const products = [
    { name: 'Produto A', price: 100 },
    { name: 'Produto B', price: 200 },
    { name: 'Produto C', price: 300 },
  ];

  const consoles = [
    { name: 'Console X', hourlyRate: 50, minHours: 1 },
    { name: 'Console Y', hourlyRate: 75, minHours: 2 },
    { name: 'Console Z', hourlyRate: 100, minHours: 1 },
  ];

  const handleButtonClick = (type) => {
    setSaleType(type);
    setShowModal(true);
    setQuantity(1); // Reset quantity
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(false); // Fecha o modal imediatamente
    const minQuantity = saleType === 'produto' ? 1 : item.minHours;
    setQuantity(minQuantity);
    setConfirmationData({
      saleType,
      item,
      quantity: minQuantity,
      total: item.price ? item.price * minQuantity : item.hourlyRate * minQuantity,
    });
  };

  const handleConfirm = () => {
    // Enviar dados para o caixa
    console.log('Venda confirmada:', confirmationData);
    // Exibir mensagem de sucesso
    setShowSuccess(true);
    // Ocultar mensagem de sucesso após 5 segundos
    // Limpar estado após um tempo
    setTimeout(clearState, 1000);
  };

  const handleCancel = () => {
    // Limpar estado ao cancelar
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
      setConfirmationData({
        ...confirmationData,
        quantity: newQuantity,
        total: selectedItem.price ? selectedItem.price * newQuantity : selectedItem.hourlyRate * newQuantity,
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
                {(saleType === 'produto' ? products : consoles).map((item, index) => (
                  <tr key={index} onClick={() => handleItemClick(item)}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      R$
                      {saleType === 'produto'
                        ? item.price.toFixed(2)
                        : item.hourlyRate.toFixed(2)}
                    </td>
                    {saleType === 'serviço' && <td>{item.minHours} hora(s)</td>}
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
              <strong>Item:</strong> {confirmationData.item.name}
            </p>
            <p>
              <strong>Preço Unitário:</strong> R$
              {confirmationData.item.price
                ? confirmationData.item.price.toFixed(2)
                : confirmationData.item.hourlyRate.toFixed(2)}
            </p>
            <Form.Group>
              <Form.Label>
                {saleType === 'produto' ? 'Quantidade' : 'Horas de Uso'}
              </Form.Label>
              <Form.Control
                type="number"
                min={saleType === 'produto' ? 1 : confirmationData.item.minHours}
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
