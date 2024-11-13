import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro,TenetId} from "./config/functions";
import { endPoints } from "./config/endpoints";



//fechar o caixa
export async function BarCod(code) {
    var config = serviceRetornarConfig(
      "get",
      `${endPoints.URL_GET_PRODUCT_BYCODEBAR}/${code}/${TenetId()}`,
      true
    );
  
    try {

     const response= await axios(config);
     return response.data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }
  