import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro,TenetId} from "./config/functions";
import { endPoints } from "./config/endpoints";





//Faz um get na tabela Produtos 
  export async function fetchProduct() {
    var config = serviceRetornarConfig(
    "get",
    endPoints.URL_GET_PRODUCT_ALL_PRODUCT+TenetId(),
    true
    );
    
    try {
      const response= await (await (axios(config))).data;     
      if (Array.isArray(response)) {
        const product = response.map(product => ({
          id: product.id,
          nome: product.name,
          valor: parseFloat(product.price),
          quantidade: product.quantity || 0,
          descricao: product.description,
        }));
   //      return product;
      } else {
       console.error("Dados recebidos não são válidos:", response.data);
      }
    } catch (error) {
      return serviceRetornarErro(error)
    }
    
  }


  
//Adiciona um novo Produto
/*
export async function newProduct(data) {
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
*/

export async function newProduct(data) {
  var config = serviceRetornarConfig(
    "POST",
    endPoints.URL_POST_NEW_PRODUCT+TenetId(),
    data,
    true
  );
  try {
    return await axios(config);
  } catch (error) {
    return serviceRetornarErro(error);
  }
}


//Apagar um novo Produto
export async function DeleteProduct(data) {
  var config = serviceRetornarConfig(
    "delete",
    endPoints.URL_DELETE_PRODUCT,
    data,
    true
  );
  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}

export async function createDataProductEdit(produtoValues) {
  try {
    const updatedProduct = {      
        id: produtoValues.id,
        name: produtoValues.nomeProduto,
        description: produtoValues.descricaoProduto,
        price: parseFloat(produtoValues.valorProduto),
        quantity: parseInt(produtoValues.quantidade)
    };
    return   updatedProduct;
  } catch (error) {
    console.error("Erro ao converter dados:", error);
    throw error; // Corrigido: sem newline após throw
  }
}

export async function editProduct(data) {
  const config = serviceRetornarConfig(
    "put",
    endPoints.URL_PUT_SERVICE,
    data,
    true
  );
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}
