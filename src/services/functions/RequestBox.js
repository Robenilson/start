import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";


//Abrir o caixa
export async function OpenBox(useid,data) {
    var config = serviceRetornarConfig(
      "post",
      `${endPoints.urlOpenBox}employeerId=${useid}`,
      data,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }


//fechar o caixa
export async function CloseBox(useid,data) {
  var config = serviceRetornarConfig(
    "post",
    `${endPoints.fecharCaixa}/${useid}`,
    data,
    true
  );

  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}


//Lista pedidos do caixa
  export async function FetchBox() {
    var config = serviceRetornarConfig(
      "get",
      endPoints.urlGetBox,
      true
    );
  
    try {
      const response= await axios(config);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }



  //Lista pedidoscom o id 
  export async function FetchBoxById(data) {
    var config = serviceRetornarConfig(
      "get",
      `${endPoints.urlGetBox}/${data}`,
      true
    );
  
    try {
      const response= await axios(config);
      return response.data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }



//Put Complite Box
export async function PutCompletBox(data) {
  var config = serviceRetornarConfig(
    "post",
    `${endPoints.fecharCaixa}/${data}/complete`,
    true
  );

  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}


