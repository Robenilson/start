import axios from 'axios';
import { endPoints } from "./static/js/endpoints";
import * as functions from "./static/js/functions";

export async function novoPedido(data) {
    var config = functions.serviceRetornarConfig(
      "post",
      endPoints.novoPedido,
      data,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return functions.serviceRetornarErro(error);
    }
  }


  

  export async function cancelarPedido(id) {
    var config = functions.serviceRetornarConfig(
      "put",
      endPoints.cancelarPedido + id + "/cancel",
      null,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return functions.serviceRetornarErro(error);
    }
  }

