import React, { useState, useEffect } from 'react';
import Tabela from '../../../components/GenericTabel'; // Substitua pelo caminho correto

const DetalhesPedido = ({ pedido, onHide, handleConfirmarPagamento, cancel }) => {
  const [formaPagamento, setFormaPagamento] = useState('');
  const [desconto, setDesconto] = useState('');
  const [valorTotal, setValorTotal] = useState(0);
  const [erro, setErro] = useState('');

  // Calcula o valor total do pedido ao carregar o componente ou quando o pedido muda
  useEffect(() => {
     console.log(pedido)

    if (pedido && pedido.produto && pedido.produto.length > 0) {
      const total = pedido.precoTotal;
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
    if (!formaPagamento) {
      setErro('Por favor, selecione a forma de pagamento.');
      return;
    }
    if (!desconto) {
      setErro('Por favor, insira um desconto.');
      return;
    }
    setErro('');
    handleConfirmarPagamento(pedido, formaPagamento, desconto);
  };

  const handleCancel = () => {
    cancel(pedido);
    onHide();
  };

  const formatTime = (horaMinima) => {
    if (horaMinima === 60) {
      return '1 hora';
    }
    return `${horaMinima} minutos`;
  };

  // Definindo as colunas da tabela
  const columns = [
    { key: 'name', label: 'Nome' },
,    {
      key: 'quantity',
      label: 'Quantidade/Tempo',
      render: (item) =>
        item.productType === 1
          ? `${item.quantity} Unidades`
          : formatTime(item.quantity),
    }
  ];

  // Ações (opcional, caso precise implementar botões para cada linha)
  const actions = [
    {
      label: 'Editar',
      className: 'btn-edit',
      onClick: (item) => alert(`Editar item: ${item.name}`),
    },
    {
      label: 'Remover',
      className: 'btn-remove',
      onClick: (item) => alert(`Remover item: ${item.name}`),
    },
  ];

  return (
    <div className="detalhes-pedido">
      <h5>Detalhes do Pedido</h5>
      <p>Cliente: {pedido.clientName}</p>
      <p>Preço Total: R${valorTotal.toFixed(2)}</p>

      {/* Tabela para exibir os produtos/serviços */}
      <Tabela
        columns={columns}
        data={pedido.produto || []}
        actions={actions} // Opcional, remova se não necessário
        keyField="id" // Ajuste conforme o campo único de cada item
      />

      {/* Formulário para pagamento */}
      <div className="form-group">
        <label htmlFor="formaPagamento">Forma de Pagamento</label>
        <select
          id="formaPagamento"
          value={formaPagamento}
          onChange={handleFormaPagamentoChange}
        >
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

      {/* Exibindo mensagem de erro, se houver */}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

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
