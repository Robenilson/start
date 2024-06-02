import React from 'react'
import OptionNav from './optionNav';
import  {urls} from"../services/static/js/urls";


const Permision = (props) => {
  
  const userType = props.userType; 
  let message;
  switch (userType) {
    case 'adm':
      message = [
        <OptionNav url={urls.relatorio}  name="Relatorio" />
      ];
      break;
    case 'vendedor':
      message = [
        <OptionNav url="/venda"  name="vendas" />,
        <OptionNav url={urls.newProdutoPage}  name="Novo Produto" />
      ];
      break;
    case 'caixa':
      message = [<OptionNav url={urls.caixaPage}  name="Caixa" />];
      break;
    default:
      message = 'Seu tipo de usuário não foi reconhecido.';
  }

  return (
   <>{message}</>
  )
}

export default Permision