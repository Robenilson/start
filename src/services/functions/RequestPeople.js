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
        nome: userValues.nome.toString(),
        sobrenome: userValues.sobrenome.toString(),
        dtNascimento: userValues.dataNascimento.toString(),
        email: userValues.email.toString(),
        cpf: userValues.cpf.toString(),
        phone: userValues.telefone.toString(),
        userType: userValues.userType,
        address: {
          zipCode: userValues.endereco && userValues.endereco.cep ? userValues.endereco.cep.toString() : " ",
          cityName: userValues.endereco && userValues.endereco.cidade ? userValues.endereco.cidade.toString() : " ",
          state: userValues.endereco && userValues.endereco.estado ? userValues.endereco.estado.toString() : " ",
          road: userValues.endereco && userValues.endereco.bairro ? userValues.endereco.bairro.toString() : " ",
          number: userValues.endereco && userValues.endereco.numero ? userValues.endereco.numero : 0, // Use toString() 
        },        
        roleIds: [
          "84a4f924-5a1b-4c72-8a29-14b3673f1533"
        ],
        password: userValues.password.toString()
      };
  
      return data;
    } catch (error) {
      console.error('Erro ao converter dados:', error);
      throw error;
    }
  }