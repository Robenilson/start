import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";





export async function createDataObjecSales(userValues) {
  try {
    const data = 
     {
      "dtSale": userValues.dtSale ,
      "produtos": [
        {
          "productId": toString(userValues.productId),
          "quantity": parseInt(userValues.quantity),
          "orderId": userValues.orderId.toISOString(),
          "productType": parseInt(userValues.productType)
        }
      ],
      "clientId": parseInt(userValues.clientId),
      "employeerId": parseInt(userValues.employeerId),
      "precoTotal": parseFloat(userValues.precoTotal),
      "desconto": parseInt(userValues.desconto),
      "credito": parseInt(userValues.credito),
      "saleStatus": parseInt(userValues.saleStatus),
      "payments": [
        {
          "id": 0,
          "value": 0,
          "paymentMethod": "string",
          "orderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
      ]
    }

    return data;
  } catch (error) {
    console.error('Erro ao converter dados:', error);
    throw error;
  }
}











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
  