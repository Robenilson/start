import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";


//Faz um get na tabela Produtos 
export async function FetchUser() {
  const config = serviceRetornarConfig(
    "get",
    endPoints.urlListAllUser,
    true
  );
  try {
    const response = await axios(config);
    const users = response.data;
    const updatedUsers = users.map(user => UpdateDataObjectUser(user));
    const resolvedUsers = await Promise.all(updatedUsers);
    return resolvedUsers;  
  } catch (error) {
    return serviceRetornarErro(error);
  }
}

  export async function UpdateDataObjectUser(user) {
    try {
      const data = {
        id: user.id || 0,  // Se id não for fornecido, define como 0
        nome: user.nome?.toString() ?? '',
        sobrenome: user.sobrenome?.toString() ?? '',
        email: user.email?.toString() ?? '',
        dataNascimento: user.dtNascimento?.toString() ?? '',
        cpf: user.cpf?.toString() ?? '',
        telefone: user.phone?.toString() ?? '',
        role: getRoleName(user.userType),  // Define 'role' com 'userType'
        passwordHash: user.passwordHash?.toString() ?? '',
        roleIds: [ "3fa85f64-5717-4562-b3fc-2c963f66afa6"],  // Mantendo este valor como está
      };
  
      return data;
    } catch (error) {
      console.error('Erro ao converter dados:', error);
      throw error;
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



export async function createUpdatedDataObjectUser(userValues) {
  try {
    const dataObject = {
      id: userValues.id ? userValues.id.toString() : '0',  // Converte o ID para string ou define como '0'
      nome: userValues.nome?.toString() ?? '',
      sobrenome: userValues.sobrenome?.toString() ?? '',
      dtNascimento: userValues.dataNascimento?.toString() ?? '',
      email: userValues.email?.toString() ?? '',
      cpf: userValues.cpf?.toString() ?? '',
      phone: userValues.telefone?.toString() ?? '',
      address: {
        id: parseInt(0),  // Mantendo o valor '0' como inteiro
        zipCode: userValues.endereco.cep?.toString() ?? '',
        cityName: userValues.endereco.cidade?.toString() ?? '',
        state: userValues.endereco.estado?.toString() ?? '',
        road: userValues.endereco.bairro?.toString() ?? '',
        number: userValues.endereco.numero ? parseInt(userValues.endereco.numero) : 0,
      },
      roleIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
      password: userValues.password?.toString() ?? ''
    };

    // Adiciona o 'userType' ao objeto, convertendo o nome para o ID correspondente
    const role = getRoleName2(userValues.userType);
    dataObject.userType = role;

    return dataObject;
  } catch (error) {
    console.error('Erro ao converter dados:', error);
    throw error;
  }
};

// Função para mapear o tipo de usuário para o ID correspondente
const getRoleName2 = (userType) => {
  switch (userType) {
    case 'Cliente':
      return 1;
    case 'Admin':
      return 2;
    case 'Vendedor':
      return 3;
    case 'Caixa':
      return 4;
    default:
      return userType;  // Retorna o valor original se não corresponder a nenhum caso
  }
};






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


  const getRoleName = (role) => {
    switch (role) {
      case 1:
        return 'Cliente';
      case 2:
        return 'Admin';
      case 3:
        return 'Vendedor';
      case 4:
        return 'Caixa';
      default:
        return 'Desconhecido';
    }
  };
  
  

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
        userType: parseInt(userValues.role) || 1 ,  // Define o 'userType' conforme especificado
        address: {
          id: 0,  // Adiciona o campo 'id' conforme a especificação
          zipCode: userValues.endereco.cep?.toString() ?? '',
          cityName: userValues.endereco.cidade?.toString() ?? '',
          state: userValues.endereco.estado?.toString() ?? '',
          road: userValues.endereco.bairro?.toString() ?? '',
          number: userValues.endereco.numero ? parseInt(userValues.endereco.numero) : parseInt(0),
        },
        roleIds: [ "3fa85f64-5717-4562-b3fc-2c963f66afa6"],
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
 
