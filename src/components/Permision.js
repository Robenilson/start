import React from 'react';
import OptionNav from './optionNav';
import { urls } from "../services/functions/config/urls";

const Permision = (props) => {
  const userType = props.userType;
  let message;
  switch (userType) {
    case 'adm':
      message = [
        <OptionNav key="relatorio" url={urls.relatorio} name="Relatorio" />
      ];
      break;
    case 'vendedor':
      message = [
        <OptionNav key="venda" url="/venda" name="Vendas" />,
        <OptionNav key="newProduto" url={urls.newProdutoPage} name="Estoque" />
      ];
      break;
    case 'caixa':
      message = [
        <OptionNav key="caixa" url={urls.caixaPage} name="Caixa" />
      ];
      break;
    default:
      message = [
        <OptionNav key="caixa" url={urls.caixaPage} name="Caixa" />,
        <OptionNav key="creditos" url={urls.credito} name="Acompanhar Serviços" />,
        <OptionNav key="venda" url="/venda" name="Vendas" />,
        <OptionNav key="newProduto" url={urls.newProdutoPage} name="Estoque" />,
      ];
  }

  return (
    <>{message}</>
  );
};

export default Permision;
