import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";













//Adiciona um nova Venda
export async function NewSale(data) {
    var config = serviceRetornarConfig(
      "post",
      endPoints.urlNewSale,
      data,
      true
    );
    try {
      return (await axios(config)).data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }
 