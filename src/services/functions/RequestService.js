import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";


//Adiciona um novo serviço
export async function newService(data) {
  
  var config = serviceRetornarConfig(
    "post",
    endPoints.urlService,
    data,
    true
  );

  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}

//Faz um get na tabela Serviços
export async function fetchService() {
  var config = serviceRetornarConfig(
    "get",
    endPoints.urlService,
    true
  );

  try {
    const response= await axios(config);
    return response.data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}












