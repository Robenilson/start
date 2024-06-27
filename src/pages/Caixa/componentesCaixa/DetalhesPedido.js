
import React, { useState, useEffect } from 'react';
import { FetchUserByID } from '../../../services/functions/RequestPeople';

const DetalhesPedido = ({ pedido }) => {
  const [cliente, setCliente] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(  ()  => {
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

  if (!pedido) return null;

  return (
    <div>
      <h5>Detalhes do Pedido</h5>
      <p>ID: {pedido.id}</p>
      <p>Cliente: {cliente ? cliente.nome : 'Carregando...'}</p>
      <p>Valor: R${pedido.valor}</p>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {/* Adicione outros detalhes relevantes do pedido aqui */}
    </div>
  );
};

export default DetalhesPedido;