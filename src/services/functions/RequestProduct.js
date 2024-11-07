import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";

function   Token(){
  return "TenantId=";
}


//Faz um get na tabela Produtos 
  export async function fetchProduct() {
   const  data=[
      {
        "id": "d5f1b3e0-4f7a-4f28-b9fc-7e2a0b4e01b6",
        "name": "Headset Gamer Pro X",
        "description": "Fone de ouvido de alta qualidade com cancelamento de ruído e som 7.1 Surround",
        "price": 249.99,
        "quantity": 30,
        "dueDate": "2024-11-10T15:00:00.000Z"
      },
      {
        "id": "c3d2b2a5-6e8b-4a3c-96f8-3b3c7d62d8a7",
        "name": "Monitor UltraWide 29\"",
        "description": "Monitor Full HD com tela ultrawide para melhor visualização e produtividade",
        "price": 599.90,
        "quantity": 15,
        "dueDate": "2025-02-05T09:30:00.000Z"
      },
      {
        "id": "f9a0b1c3-5d8e-4e59-ae9f-1b2e5d4e6f0b",
        "name": "Teclado Mecânico RGB",
        "description": "Teclado mecânico com retroiluminação RGB e teclas de alta durabilidade",
        "price": 349.50,
        "quantity": 20,
        "dueDate": "2024-12-18T13:45:00.000Z"
      },
      {
        "id": "e7b8f0d3-6a7e-4b5a-b1c4-3d7e1c5b2d9f",
        "name": "Mouse Sem Fio Ultra Preciso",
        "description": "Mouse com sensor óptico de alta precisão e conexão Bluetooth",
        "price": 179.90,
        "quantity": 50,
        "dueDate": "2025-03-01T08:15:00.000Z"
      },
      {
        "id": "b5e1c8f3-9d6a-4e57-a2b3-8f1d7e6b4c2e",
        "name": "Cadeira Gamer Luxuosa",
        "description": "Cadeira ergonômica com apoio lombar e ajuste de altura personalizado",
        "price": 849.99,
        "quantity": 10,
        "dueDate": "2024-12-25T18:00:00.000Z"
      }
    ]
    
   
  
    /*

        var config = serviceRetornarConfig(
      "get",
      endPoints.URL_GET_PRODUCT_ALL_PRODUCT+Token(),
      true
    );

*/

    try {
     // const response= await axios(config); 
    

      if (data && Array.isArray(data)) {
      
    
        



      
        const product = data.map(product => ({
          id: product.id,
          nome: product.name,
          valor: parseFloat(product.price),
          quantidade: product.quantity || 0,
          descricao: product.description,
        }));

        
         return product;
      } else {
      //  console.error("Dados recebidos não são válidos:", response.data);
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
    endPoints.URL_POST_NEW_PRODUCT,
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
    endPoints.URL_DELETE_PRODUCT+Token(),
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
    endPoints.URL_PUT_SERVICE+Token(),
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
