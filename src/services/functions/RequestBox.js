import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";
import   { FetchUserByID} from"./RequestPeople";


//Abrir o caixa
export async function OpenBox(initialBalance,employeerId) {
    var config = serviceRetornarConfig(
      "post",
      `${endPoints.urlOpenBox}initialBalance=${initialBalance}&employeerId=${employeerId}`,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }


//fechar o caixa
export async function CloseBox(useid,data) {
  var config = serviceRetornarConfig(
    "post",
    `${endPoints.fecharCaixa}/${useid}`,
    data,
    true
  );

  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}





export async function Name(clientId) {
  // Simulação de uma chamada à API ou banco de dados
  try {
    const response = FetchUserByID(clientId).then(
      data=>{
        return data;

      }
    )
  
   // const cliente = await response.json();
 //   return response;
  } catch (error) {
    console.error('Erro ao buscar o cliente:', error);
    return undefined;
  }
};






const getRole = (roleNumber) => {
  return roleNumber === 1 ? 'Iniciada' :
         roleNumber === 2 ? 'AguardandoPagamento' :
         roleNumber === 3 ? '' :
         roleNumber === 4 ? 'vendedor' :
         'Role não reconhecido';
};



//Lista pedidos do caixa
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



  //Lista pedidoscom o id 
  export async function FetchBoxById(data) {
    var config = serviceRetornarConfig(
      "get",
      `${endPoints.urlGetBox}/${data}`,
      true
    );
  
    try {
      const response= await axios(config);
      return response.data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }

    //Lista  Produtos por id 
    export async function GetByIdProdutos(data) {
      var config = serviceRetornarConfig(
        "get",
        `${endPoints.urlGetByIdProdutos}${data}`,
        true
      );
    
      try {
        const response= await axios(config);
        return response.data;
      } catch (error) {
        return serviceRetornarErro(error);
      }
    }


  //Lista Serviços por   id 
  export async function GetByIdServicos(data) {
    var config = serviceRetornarConfig(
      "get",
      `${endPoints.urlGetByIdServicos}${data}`,
      true
    );
  
    try {
      const response= await axios(config);
      return response.data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }



















  //Converte para Inserir no banco
  export async function createDataObjectBox(userValues) {
    try {
      const  data = {
        "dtSale": "2024-06-25T13:59:49.314Z",
        "produtos": [
          {
            "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "quantity": 0,
            "orderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "productType": 1
          }
        ],
        "clientId": 0,
        "employeerId": 0,
        "precoTotal": 0,
        "desconto": 0,
        "credito": 0,
        "saleStatus": 0,
        "payments": [
          {
            "id": 0,
            "value": 0,
            "paymentMethodId": 0,
            "paymentMethod": {
              "id": 0,
              "nome": "string"
            }
          }
        ]
      }
      return data;
    } catch (error) {
      console.error('Erro ao converter dados:', error);
      throw error;
    }
  }




  

 // Converte para exibir na tela
export async function ViewDataObjectBox(data) {
  try {
    let value; 

    if (data && Array.isArray(data)) {
      value = data.map(s => ({
        id: s.id || "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        clientId: s.clientId !== undefined ? s.clientId : 0,
        tipo: s.tipo || "null",
        desconto: s.desconto !== undefined ? s.desconto : 0,
        precoTotal: s.precoTotal !== undefined ? s.precoTotal : 0,
        credito: s.credito !== undefined ? s.credito : 0,
        payments: s.payments && s.payments.length > 0 ? s.payments : null,
        saleStatus: s.saleStatus !== undefined ? s.saleStatus : 0,
        produto: s.produtos && s.produtos.length > 0 ? s.produtos : null,
        dtSale: s.dtSale || "2024-06-28T13:51:16.976Z"
      }));
    }
    
    return value;
  } catch (error) {
    console.error('Erro ao converter dados:', error);
    throw error;
  }
}

















//Put  Box
export async function PutCompletBox(data) {
  console.log(data)
  var config = serviceRetornarConfig(
    "put",
    `${endPoints.urlPutBox}/${data.id}/complete`,
    data,
    true
  );

  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}


