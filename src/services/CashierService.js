import axios from 'axios';
import { endPoints } from "./static/js/endpoints";
import * as functions from "./static/js/functions";

export async function abrirCaixa(initialBalance, employeerId) {
    var config = functions.serviceRetornarConfig(
      "post",
      endPoints.abriCaixa  + "InitialBalance=" + initialBalance + "&EmployeerId=" + employeerId,
      null,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return functions.serviceRetornarErro(error);
    }
  }

  export async function fecharCaixa(id) {
    var config = functions.serviceRetornarConfig(
      "post",
      endPoints.abriCaixa  + id,
      null,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return functions.serviceRetornarErro(error);
    }
  }