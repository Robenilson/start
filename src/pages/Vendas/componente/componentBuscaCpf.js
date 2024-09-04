import { FetchUserCPF } from '../../services/functions/RequestPeople';

import React from 'react';


const [cpf, setCpf] = useState('');
const [nomeUsuario, setNomeUsuario] = useState('');



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


const ConfirmationModal = ({}) => {
  return (
  <>
   
  </>
  );
};

export default componentBuscaCpf;
