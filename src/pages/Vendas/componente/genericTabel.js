import React, { useState } from 'react';

const DataTable = ({ data, button, acao }) => {
  // Estado para armazenar a quantidade selecionada pelo cliente
  const [quantidades, setQuantidades] = useState({});

  const handleQuantidadeChange = (id, value) => {
    // Certificando-se de que a quantidade inserida seja válida e maior que 0
    if (value > 0) {
      setQuantidades({
        ...quantidades,
        [id]: parseInt(value, 10), // Converte o valor para um número inteiro
      });
    }
  };

  // Calcula o valor total baseado na quantidade para um item específico
  const calcularValorTotalItem = (item) => {
    const quantidade = quantidades[item.id] || 1;
    return (item.valor * quantidade).toFixed(2); // Multiplica o valor pela quantidade e formata para 2 casas decimais
  };

  // Calcula o valor total de todo o pedido somando todos os itens
  const calcularValorTotalPedido = () => {
    return data.reduce((total, item) => {
      const quantidade = quantidades[item.id] || 1;
      return total + item.valor * quantidade;
    }, 0).toFixed(2); // Somamos e formatamos o total para 2 casas decimais
  };

  return (
    <>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Índice</th>
              <th>Nome</th>
              <th>Valor Unitário (R$)</th>
              <th>Quantidade</th>
              <th>Valor Total (R$)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data
                // Filtra os itens com quantidade maior que 0 ou definida
                .filter(item => (quantidades[item.id] || item.quantidade) > 0)
                .map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nome}</td>
                    <td>R${item.valor.toFixed(2)}</td> {/* Exibe o valor unitário formatado */}

                    {/* Condicional para transformar a quantidade em input number se acao for REMOVER */}
                    <td>
                      {acao === 'REMOVER' ? (
                        <input
                          type="number"
                          value={quantidades[item.id] || ''}
                          onChange={(e) => handleQuantidadeChange(item.id, e.target.value)}
                          min="1"
                          placeholder="Quantidade"
                        />
                      ) : (
                        item.quantidade !== undefined ? item.quantidade : '-'
                      )}
                    </td>

                    {/* Exibe o valor total multiplicado pela quantidade */}
                    <td>R${calcularValorTotalItem(item)}</td>

                    <td>
                      {/* Condiciona a exibição do botão "Adicionar" com base no valor de acao */}
                      {acao === 'COMPRAR' && (
                        <button type="button" className="btn primary-btn" onClick={() => button(item)}> Adicionar </button>
                      )}
                      {acao === 'REMOVER' && (
                        <button className="action-btn delete-btn" onClick={() => button(item)}> X </button>
                      )}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="8">Nenhum dado encontrado</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Exibe o valor total do pedido */}
        <center>
          {acao === 'REMOVER' && (
            <div>
              <div className="card-header">Valor Total do Pedido: R${calcularValorTotalPedido()}</div>
              <button
                type="button"
                className="btn primary-btn"
                onClick={() => console.log('Pedido concluído')}
                disabled={Object.keys(quantidades).length === 0} // Desabilitado se não houver itens com quantidade
              >
                Concluir Pedido
              </button>
            </div>
          )}
        </center>
      </div>
    </>
  );
};

export default DataTable;
