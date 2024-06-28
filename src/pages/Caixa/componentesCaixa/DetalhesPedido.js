import React, { useState, useEffect } from 'react';
import { FetchUserByID } from '../../../services/functions/RequestPeople';
import { PutCompletBox } from '../../../services/functions/RequestBox';
import { Form, Button } from 'react-bootstrap';

const DetalhesPedido = ({ pedido, onHide }) => {
  const [cliente, setCliente] = useState(null);
  const [erro, setErro] = useState(null);
  const [formaPagamento, setFormaPagamento] = useState('');
  const [desconto, setDesconto] = useState('');
  const [valorTotal, setValorTotal] = useState(0); // Novo estado para capturar o valor total do pedido
  const [paymentMethod, setPaymentMethod] = useState(''); // Novo estado para capturar o método de pagamento selecionado

  useEffect(() => {
    console.log(pedido);
    if (pedido && pedido.clientId) {
      FetchUserByID(pedido.clientId)
        .then(response => {
          setCliente(response);
        })
        .catch(error => {
          setErro('Erro ao buscar o cliente.');
          console.error(error);
        });
    }

    // Calcular o valor total do pedido apenas se houver produtos
    if (pedido && pedido.produto && pedido.produto.length > 0) {
      const total = pedido.produto.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);
      setValorTotal(total);
    } else {
      setValorTotal(0); // Define como zero se não houver produtos
    }
  }, [pedido]);

  const handleFormaPagamentoChange = (e) => {
    setFormaPagamento(e.target.value);
  };

  const handleDescontoChange = (e) => {
    setDesconto(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleConfirmarPagamento = () => {
    console.log('Forma de Pagamento:', formaPagamento);
    console.log('Desconto:', desconto);

    // Montando o objeto data conforme especificado
    const data = {
      id: pedido.id, // ID do pedido ou algum identificador único
      dtSale: new Date().toISOString(), // Data da venda
      produtos: pedido.produto.map(prod => ({
        productId: prod.orderId,
        quantity: prod.quantity,
        orderId: prod.orderId,
        productType: 1, // Valor fixo conforme especificado
        name: prod.name // Nome do produto
      })),
      clientId: pedido.clientId || 0,
      employeerId: 0, // Defina o employeerId conforme necessário
      precoTotal: pedido.precoTotal || 0,
      desconto: parseFloat(desconto) || 0,
      credito: 0,
      saleStatus: 0,
      payments: [
        {
          id: 0, // ID do pagamento (se necessário)
          value: valorTotal || 0, // Valor total do pedido
          paymentMethod: paymentMethod, // Método de pagamento selecionado
          orderId: pedido.id // ID do pedido ou algum identificador único
        }
      ]
    };

    // Chamar a função PutCompletBox com os dados montados

    console.log(data)
    PutCompletBox(data)
      .then(response => {
        console.log('Venda concluída com sucesso:', response.data);
        // Lógica adicional após a conclusão da venda, se necessário
      })
      .catch(error => {
        console.error('Erro ao concluir a venda:', error);
        // Lógica para tratamento de erro, se necessário
      });

    onHide();
  };

  return (
    <div>
      <div>
        <h5>Detalhes do Pedido</h5>
        <p>Cliente: {cliente ? cliente.nome : 'Carregando...'}</p>
        <p>Preço Total: R${pedido.precoTotal}</p>
        <h6>Produtos:</h6>
        {pedido.produto && pedido.produto.length > 0 ? (
          <ul>
            {pedido.produto.map((produto, index) => (
              <li key={index}>
                {produto.productType === 1 && (
                  <div>
                    <p>Detalhes do Produto:</p>
                    <p>Nome: {produto.name}</p>
                    <p>Descrição: {produto.description}</p>
                    <p>Preço: R${produto.price}</p>
                    <p>Quantidade: {produto.quantity}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum produto disponível.</p>
        )}
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
      </div>

      <Form>
        <Form.Group controlId="formaPagamento">
          <Form.Label>Forma de Pagamento</Form.Label>
          <Form.Control as="select" value={formaPagamento} onChange={handleFormaPagamentoChange}>
            <option value="">Selecione</option>
            <option value="cedulas">Cédulas</option>
            <option value="debito">Cartão de Débito</option>
            <option value="credito">Cartão de Crédito</option>
            <option value="pix">Pix</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="desconto">
          <Form.Label>Desconto</Form.Label>
          <Form.Control
            type="number"
            value={desconto}
            onChange={handleDescontoChange}
            placeholder="Desconto"
          />
        </Form.Group>

        <Button variant="primary" onClick={handleConfirmarPagamento}>
          Confirmar Pagamento
        </Button>
      </Form>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );
};

export default DetalhesPedido;
