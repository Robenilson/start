import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";


//Faz um get na tabela Produtos 
export async function FetchUser() {
    var config = serviceRetornarConfig(
      "get",
      endPoints.urlListAllUser,
      true
    );
  
    try {
      const response= await axios(config);
      return response.data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }




//Faz  uma pesquisa na tabela usuario 
export async function FetchUserCPF(data) {
  var config = serviceRetornarConfig(
    "get",
    `${endPoints.urlUserCPF}${data}`,
    true
  );

  try {
    const response= await axios(config);
    return response.data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}

//Faz  uma pesquisa por id na  tabela usuario 
export async function FetchUserByID(data) {
  var config = serviceRetornarConfig(
    "get",
    `${endPoints.urlUserByid}/${data}`,
    true
  );

  try {
    const response= await axios(config);
    
    return response.data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}




//Faz  uma pesquisa por id na  tabela usuario 
export async function deleteUserByID(data) {
  var config = serviceRetornarConfig(
    "delete",
    `${endPoints.urlUserByid}/${data}`,
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
export async function NewUser(data) {
    var config = serviceRetornarConfig(
      "post",
      endPoints.urlAddNewUser,
      data,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }
  
  

  export async function createDataObjectUser(userValues) {
    try {
      const data = {
        id: 0,  // Adiciona o campo 'id' conforme a especificação
        nome: userValues.nome?.toString() ?? '',
        sobrenome: userValues.sobrenome?.toString() ?? '',
        dtNascimento: userValues.dataNascimento?.toString() ?? '',
        email: userValues.email?.toString() ?? '',
        cpf: userValues.cpf?.toString() ?? '',
        phone: userValues.telefone?.toString() ?? '',
        userType: parseInt(1),  // Define o 'userType' conforme especificado
        address: {
          id: 0,  // Adiciona o campo 'id' conforme a especificação
          zipCode: userValues.endereco.cep?.toString() ?? '',
          cityName: userValues.endereco.cidade?.toString() ?? '',
          state: userValues.endereco.estado?.toString() ?? '',
          road: userValues.endereco.bairro?.toString() ?? '',
          number: userValues.endereco.numero ? parseInt(userValues.endereco.numero) : parseInt(0),
        },
        roleIds: [userValues.role?.toString() ?? ''],
        password: userValues.password?.toString() ?? '',
      };
  
      return data;
    } catch (error) {
      console.error('Erro ao converter dados:', error);
      throw error;
    }
  }
  
  


  export async function editUser(data) {
   
    var config = serviceRetornarConfig(
      "put",
      `${endPoints.urlUserByid}`,
      data,
      true
    );
  
    try {
      const response= await axios(config);
      return response.data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }
 
