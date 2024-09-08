import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";
import   { FetchUserByID} from"./RequestPeople";


//Abrir o caixa
export async function OpenBox(initialBalance,employeerId) {
    var config = serviceRetornarConfig(
      "post",
      `${endPoints.urlOpenBox}/open?employeerId=${employeerId}`,
      initialBalance,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }


//fechar o caixa
export async function CloseBox(useid) {
  var config = serviceRetornarConfig(
    "put",
    `${endPoints.fecharCaixa}/${useid}`,
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


//Lista pedidos do caixa por id do cliente
export async function FetchBoxUserId(id) {
 const pedidos= await FetchBox();
 

 return pedidos
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



  function getPaymentOption(value) {
    const paymentOptions = {
        1: "Cédulas",
        2: "Cartão de Débito",
        3: "Cartão de Crédito",
        4: "Pix"
    };
    return paymentOptions[value];
  }

  export async function createDataObjectEditBox(pedido, formaPagamento, desconto,user) {
    try {

      const data = {
        id: pedido.id,
        dtSale: new Date().toISOString(),
        produtos: pedido.produto.map(prod => ({
          productId: prod.productId || '',
          quantity: prod.quantity || 0,
          orderId: prod.orderId || '',
          productType: prod.productType || 0,
          name: prod.name || ''
        })),
        clientId: pedido.clientId || 0,
        employeerId: parseInt(user.EmployeerId) || 0,
        precoTotal: pedido.precoTotal || 0,
        desconto: parseFloat(desconto) || 0,
        credito: pedido.credito || 0,
        saleStatus: 4,
        payments: [
          {
            value: pedido.precoTotal || 0,
            paymentMethod: getPaymentOption(formaPagamento)   || '',
            orderId: pedido.id || '',
            PaymentType: parseInt(formaPagamento) || 0
          }
        ]
      };
    
      return data;
    } catch (error) {
      console.error('Erro ao converter dados:', error);
      throw error;
    }
  }























  



  


  
 
  export async function ViewDataObjectBox(data) {
    try {
      let value = [];
  
      if (data && Array.isArray(data)) {
        value = await Promise.all(data.map(async s => {
          // Ignora objetos com saleStatus 4 ou produto null
          if (s.saleStatus === 4 || s.saleStatus === '4' || !s.produtos || s.produtos.length === 0) {
            return null;
          }
  
          const clientName = s.clientId !== undefined ? await FetchUserByID(s.clientId) : { nome: "Unknown" };
  
          return {
            id: s.id,
            clientId: s.clientId !== undefined ? s.clientId : 0,
            clientName: clientName.nome, // Adiciona o nome do cliente aqui
            tipo: s.tipo || "null",// Garante que produto não seja null
            desconto: s.desconto !== undefined ? s.desconto : 0,
            precoTotal: s.precoTotal !== undefined ? s.precoTotal : 0,
            credito: s.credito !== undefined ? s.credito : 0,
            payments: s.payments && s.payments.length > 0 ? s.payments : null,
            saleStatus: s.saleStatus !== undefined ? s.saleStatus : 0,
            produto: s.produtos, 
            dtSale: s.dtSale 
          };
        }));
        
        value = value.filter(item => item !== null); // Remove os objetos nulos
      }
  
      return value;
    } catch (error) {
      console.error('Erro ao converter dados:', error);
      throw error;
    }
  }
  
  















//Put  Box
export async function PutCompletBox(data) {
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


export async function PutCanceltBox(data) {
  var config = serviceRetornarConfig(
    "put",
    `${endPoints.urlPutBox}/${data}/cancel`,
    data,
    true
  );

  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}




