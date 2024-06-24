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
      console.log(response.data)    
      if (response.data && Array.isArray(response.data)) {
        const product = response.data.map(product => ({
          id: product.id,
          nome: product.name,
          valor: product.price,
          quantidade: product.quantity || 0,
          descricao: product.description,
        }));
         return product;
      } else {
        console.error("Dados recebidos não são válidos:", response.data);
      }
    } catch (error) {
      return serviceRetornarErro(error)
    }
  }


  
//Adiciona um novo Produto
export async function newProduct(data) {
    console.log(endPoints.urlProduct)
    var config = serviceRetornarConfig(
      "post",
      endPoints.urlAddNewProduct,
      data,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }
  
  