import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";


//Faz um get na tabela Produtos 
  export async function fetchProduct() {
    var config = serviceRetornarConfig(
      "get",
      endPoints.urlProduct,
      true
    );
  
    try {
      const response= await axios(config);
      return response.data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }



//Adiciona um novo Produto
export async function newProduct(data) {
    console.log(endPoints.urlProdut)
    var config = serviceRetornarConfig(
      "post",
      endPoints.urlProduct,
      data,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }
  
  