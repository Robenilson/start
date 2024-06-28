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
        <OptionNav url="/venda"  name=" Tipo Vendas" />,
        <OptionNav url={urls.newProdutoPage}  name="Novo Produto" />
      ];
      break;
    case 'caixa':
      message = [<OptionNav url={urls.caixaPage}  name="Caixa" />];
      break;
    default:
      message = [
        <OptionNav url={urls.caixaPage}  name="Caixa" />,
        <OptionNav url={urls.relatorio}  name="Relatorio" />,
        <OptionNav url="/venda"  name=" Tipo Vendas" />,
        <OptionNav url={urls.newProdutoPage}  name=" Produto " />



      ];
  }

  return (
   <>{message}</>
  )
}

export default Permision