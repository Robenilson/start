import React, { useState, useEffect } from 'react';
import { FetchUserByID } from '../../../services/functions/RequestPeople';
import { GetByIdProdutos, GetByIdServicos, PutCompletBox } from '../../../services/functions/RequestBox';
import { Form, Button, Table } from 'react-bootstrap';

const DetalhesPedido = ({ pedido  , onHide }) => {
  const [cliente, setCliente] = useState(null);
  const [erro, setErro] = useState(null);
  const [formaPagamento, setFormaPagamento] = useState('');
  const [desconto, setDesconto] = useState('');
  const [produtoDetalhado, setProdutoDetalhado] = useState(null); // Estado para armazenar os detalhes do produto

  useEffect(() => {
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
  }, [pedido]);

  const fetchProdutoDetalhado = (orderId) => {
    GetByIdProdutos(orderId)
      .then(detalhes => {
        setProdutoDetalhado(detalhes);
      })
      .catch(error => {
        setErro('Erro ao buscar detalhes do produto.');
        console.error(error);
      });
  };

  useEffect(() => {
    // Verifica se há produtos para buscar detalhes
    if (pedido && pedido.produto) {
      pedido.produto.forEach(produto => {
        if (produto.productType === 1) { // Verifica se é do tipo produto
          fetchProdutoDetalhado(produto.orderId);
        }
      });
    }
  }, [pedido]);

  const handleFormaPagamentoChange = (e) => {
    setFormaPagamento(e.target.value);
  };

  const handleDescontoChange = (e) => {
    setDesconto(e.target.value);
  };

  const handleConfirmarPagamento = () => {
    console.log('Forma de Pagamento:', formaPagamento);
    console.log('Desconto:', desconto);

    // Montando o objeto data conforme especificado
    const data = {
      dtSale: new Date().toISOString(),
      produtos: pedido.produto.map(prod => ({
        productId: prod.orderId,
        quantity: prod.quantity,
        orderId: prod.orderId,
        productType: prod.productType
      })),
      clientId: pedido.clientId || 0,
      employeerId: 0, // Defina o employeerId conforme necessário
      precoTotal: pedido.precoTotal || 0,
      desconto: parseFloat(desconto) || 0,
      credito: 0,
      saleStatus: 0,
      payments: [{
        id: 0,
        value: 0,
        paymentMethodId: 0,
        paymentMethod: {
          id: 0,
          nome: formaPagamento
        }
      }]
    };


    // Chamar a função PutCompletBox com os dados montados
    PutCompletBox(data)
      .then(response => {
        console.log('Venda concluída com sucesso:');
        // Lógica adicional após a conclusão da venda, se necessário
      })
      .catch(error => {
        console.error('Erro ao concluir a venda:');
        // Lógica para tratamento de erro, se necessário
      });

      onHide()
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
                <p>Product ID: {produto.orderId}</p>
                <p>Quantidade: {produto.quantity}</p>
                <p>Tipo do Produto: {produto.productType}</p>
                {produto.productType === 1 && produtoDetalhado && (
                  <div>
                    <p>Detalhes do Produto:</p>
                    <p>ID: {produtoDetalhado.id}</p>
                    <p>Nome: {produtoDetalhado.name}</p>
                    <p>Descrição: {produtoDetalhado.description}</p>
                    <p>Preço: R${produtoDetalhado.price}</p>
                    <p>Quantidade: {produtoDetalhado.quantity}</p>
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
