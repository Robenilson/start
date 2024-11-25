import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro,TenetId} from "./config/functions";
import { endPoints } from "./config/endpoints";

// Função para obter produto pelo código de barras e formatar a resposta
export async function BarCod(code) {
  var config = serviceRetornarConfig(
    "get",
    `${endPoints.URL_GET_PRODUCT_BYCODEBAR}?barcode=${code}&TenantId=${TenetId()}`,
    true
  );
  try {
    const product = await (await axios(config)).data;
    
    // Formatar o produto conforme a estrutura desejada
    const formattedProduct = {
      id: product.id, // ou conforme o nome do campo na resposta da API
      nome: product.name, // ou conforme o nome do campo na resposta da API
      valor: parseFloat(product.price), // Garantir que o preço é um número
      quantidade: product.quantity || 0, // Garantir que a quantidade é 0 caso não exista
      descricao: product.description // ou conforme o nome do campo na resposta da API
    };


    return formattedProduct;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}
