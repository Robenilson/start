import axios from 'axios';
import { endPoints } from "./static/js/endpoints";
import * as functions from "./static/js/functions";

/*
export async function login(data) {
 


    var config = functions.serviceRetornarConfig(
      "post",
      endPoints.usuarioLogin,
      data,
      false
    );
    try {   
      return (await axios(config)).data;
    } catch (error) {
      return functions.serviceRetornarErro(error);
    }
  }*/


  export async function login(data) {
    var config = functions.serviceRetornarConfig("post", endPoints.usuarioLogin, data, false);
    
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        const erroProcessado = functions.serviceRetornarErro(error);
        console.error(`Erro: ${erroProcessado.message}`);
        return erroProcessado;
    }
}
  
  export async function alterarSenha(data) {
    var config = functions.serviceRetornarConfig(
      "post",
      endPoints.alterarSenha,
      data,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return functions.serviceRetornarErro(error);
    }
  }
  
  export async function getMeuPerfil() {
    var config = functions.serviceRetornarConfig(
      "get",
      endPoints.getMeuPerfil,
      null,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return functions.serviceRetornarErro(error);
    }
  }
  
  export async function updateMeuPerfil(data) {
    var config = functions.serviceRetornarConfig(
      "post",
      endPoints.updateMeuPerfil,
      data,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return functions.serviceRetornarErro(error);
    }
  }
  
  export async function updateUsuario(data) {
    var config = functions.serviceRetornarConfig(
      "post",
      endPoints.updateUsuario,
      data,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return functions.serviceRetornarErro(error);
    }
  }
  
  
  export async function getAllUsers() {
    var config = functions.serviceRetornarConfig(
      "get",
      endPoints.getAllUsers,
      null,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return functions.serviceRetornarErro(error);
    }
  }
  
  
  export async function deleteUser(userId) {
    var config = functions.serviceRetornarConfig(
      "delete",
      endPoints.deleteUser + `?userId=${userId}`,
      null,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return functions.serviceRetornarErro(error);
    }
  }
  export async function insert(data) {
    var config = functions.serviceRetornarConfig(
      "post",
      endPoints.insert,
      data,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return functions.serviceRetornarErro(error);
    }
  }
  
  export async function recuperarSenha(email) {
    if (typeof email === 'object' && email.email) {
      email = email.email;
    }
    var config = functions.serviceRetornarConfig(
      "post",
      endPoints.recuperarSenha + `?email=${email}`,
      null,
      false
    );
    try {
      return (await axios(config)).data;
    } catch (error) {
      return functions.serviceRetornarErro(error);
    }
  }
  