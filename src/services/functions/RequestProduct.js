import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro,TenetId} from "./config/functions";
import { endPoints } from "./config/endpoints";
const user = JSON.parse(localStorage.getItem('user'));


const listAll_URL = `${endPoints.URL_GET_PRODUCT_ALL_PRODUCT}?tenantId=${TenetId()}`;
const addNew_URL  =`${endPoints.URL_POST_NEW_PRODUCT}?tenantId=${TenetId()}`;
const edit_Url    =`${ endPoints.URL_PUT_PRODUCT}?tenantId=${TenetId()}`;
const delete_Url  =`${endPoints.URL_DELETE_PRODUCT}?tenantId=${TenetId()}`
const deleteProductUrl = (id) => `${endPoints.URL_DELETE_PRODUCT}?id=${id}&TenantId=${TenetId()}`;


//Faz um get na tabela Produtos 
  export async function fetchProduct() {
    var config = serviceRetornarConfig(
    "get",
    listAll_URL,
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
        return removeSingleQuotesFromList(product);
      } else {
       console.error("Dados recebidos não são válidos:", response.data);
      }
    } catch (error) {
      return serviceRetornarErro(error)
    }
    
  }

  function removeSingleQuotesFromList(objList) {
    return objList.map(obj => {
      const newObj = {};
  
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
          newObj[key] = value.replace(/'/g, ""); // Remove aspas simples
        } else {
          newObj[key] = value;
        }
      }
  
      return newObj;
    });
  }

  export function createProductObject(productValues) {
    try {
      const data = {
        id:  productValues.id?.toString() || "3fa85f64-5717-4562-b3fc-2c963f66afa6",           // ID do produto, ou string vazia se indefinido
        name: productValues.name?.toString() || '',       // Nome do produto
        description: productValues.description?.toString() || '', // Descrição do produto
        price: parseFloat(productValues.price) || 0,      // Preço, convertido para número, padrão 0
        quantity: parseInt(productValues.quantity) || 0,  // Quantidade, convertida para número, padrão 0
        dueDate: productValues.dueDate || new Date().toISOString(), // Data de vencimento ou data atual
        barCode: productValues.barCode?.toString() || " "  // Código de barras
      };
      
      return data;
    } catch (error) {
      console.error('Erro ao montar objeto do produto:', error);
      throw error;
    }
  }
  

export async function newProduct(data) {
  var config = serviceRetornarConfig(
    "POST",
    addNew_URL,
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
export async function DeleteProduct(id) {
  var config = serviceRetornarConfig(
    "DELETE",
    deleteProductUrl(id),
    true
  );
  try {
    console.log( deleteProductUrl(id))
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

  console.log(data)
  const config = serviceRetornarConfig(
    "PUT",  
    edit_Url,         
    data, // Dados do produto que será editado
    true // Se você precisa passar tokens ou cabeçalhos adicionais
  );

  try {
    const response = await axios(config);

    
    return axios.put("https://pos-bff-production.up.railway.app/api/SalesProduct/editProduct?TenantId=6e5a1265-47fc-42a8-ad70-74307b0ab834",data);

  } catch (error) {
    console.error('Erro ao editar o produto:', error);
    return serviceRetornarErro(error);
  }
}
