import React, { useState, useEffect } from 'react';

const DetalhesPedido = ({ pedido, onHide, handleConfirmarPagamento, cancel }) => {
  const [formaPagamento, setFormaPagamento] = useState('');
  const [desconto, setDesconto] = useState('');
  const [valorTotal, setValorTotal] = useState(0);
  const [erro, setErro] = useState(''); // Estado para armazenar a mensagem de erro

  useEffect(() => {
    if (pedido && pedido.produto && pedido.produto.length > 0) {
      const total = pedido.produto.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);
      setValorTotal(total);
    } else {
      setValorTotal(0);
    }
  }, [pedido]);

  const handleFormaPagamentoChange = (e) => {
    setFormaPagamento(e.target.value);
  };

  const handleDescontoChange = (e) => {
    setDesconto(e.target.value);
  };

  const handleConfirmar = () => {
    // Verifica se os campos obrigatórios foram preenchidos
    if (!formaPagamento) {
      setErro('Por favor, selecione a forma de pagamento.');
      return;
    }
    if (!desconto) {
      setErro('Por favor, insira um desconto.');
      return;
    }

    // Limpa a mensagem de erro se tudo estiver preenchido
    setErro('');
    
    // Chama a função de confirmação de pagamento
    handleConfirmarPagamento(pedido, formaPagamento, desconto);
  };

  const handleCancel = () => {
    cancel(pedido);
    onHide();
  };

  const formatTime = (horaMinima) => {
    console.log(horaMinima)
    if (horaMinima === 60 &&  horaMinima === 1) {
      return '1 hora';
    }
    return `${horaMinima} minutos`;
  };
  
  return (
    <div className="detalhes-pedido">
      <h5>Detalhes do Pedido</h5>
      {console.log(pedido)}
      <p>Cliente: {pedido.clientName}</p>
      <p>Preço Total: R${pedido.precoTotal}</p>
      <h6>Produtos:</h6>
      {pedido.produto && pedido.produto.length > 0 ? (
        <ul>
          {pedido.produto.map((produto, index) => (
            <li key={index}>
              <div>
                <p>{produto.productType === 1 ? "Detalhes do Produto" : "Detalhes do Serviço"}</p>
                <p>Nome: {produto.name}</p>
                <p>{produto.productType === 1 ? "Quantidade" : "Tempo Alugado"}:{produto.productType === 1 ? `${produto.quantity} Unidades` : formatTime(produto.quantity)}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum produto disponível.</p>
      )}

      <div className="form-group">
        <label htmlFor="formaPagamento">Forma de Pagamento</label>
        <select id="formaPagamento" value={formaPagamento} onChange={handleFormaPagamentoChange}>
          <option value="">Selecione</option>
          <option value="1">Cédulas</option>
          <option value="2">Cartão de Débito</option>
          <option value="3">Cartão de Crédito</option>
          <option value="4">Pix</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="desconto">Desconto</label>
        <input
          type="number"
          id="desconto"
          value={desconto}
          onChange={handleDescontoChange}
          placeholder="Desconto"
        />
      </div>

      {erro && <p style={{ color: 'red' }}>{erro}</p>} {/* Exibe a mensagem de erro, se houver */}

      <div className="actions">
        <button className="btn cancel" onClick={handleCancel}>
          Cancelar
        </button>
        <button className="btn confirm" onClick={handleConfirmar}>
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default DetalhesPedido;
