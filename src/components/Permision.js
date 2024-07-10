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
        <OptionNav key="newProduto" url={urls.newProdutoPage} name="Novo Produto" />
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
        <OptionNav key="relatorio" url={urls.relatorio} name="Relatorio" />,
        <OptionNav key="venda" url="/venda" name="Vendas" />,
        <OptionNav key="newProduto" url={urls.newProdutoPage} name="Produto" />,
        <OptionNav key="roleManeger" url={urls.roleManager} name="Role" />
      ];
  }

  return (
    <>{message}</>
  );
};

export default Permision;
