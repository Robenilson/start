import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";


//Adiciona um novo Produto
export async function OpenBox(data) {
    var config = serviceRetornarConfig(
      "post",
      endPoints.urlOpenBox,
      data,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }



  export async function FetchBox() {
    var config = serviceRetornarConfig(
      "get",
      endPoints.urlGetBox,
      true
    );
  
    try {
      const response= await axios(config);
      return response.data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }

