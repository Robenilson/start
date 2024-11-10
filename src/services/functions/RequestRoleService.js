import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";




//Adiciona um novo Produto
export async function DeleteProduct(data) {
  var config = serviceRetornarConfig(
    "delete",
    `${endPoints.URL_DELETE_PRODUCT}/deleteProduct?id=${data.id}` ,
    true
  );
  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}







export async function newRole(data) {
    var config = serviceRetornarConfig(
      "post",
      endPoints.urlRole,
      data,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }
  


  export async function deleteRole(id) {
    var config = serviceRetornarConfig(
      "delete",
      `${endPoints.urlRole}/${id}`,
      true
    );
  
    try {
      const response= await axios(config);
      
      return response.data;   ;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }







export async function fetchRoles() {
    var config = serviceRetornarConfig(
      "get",
      endPoints.urlRole,
      true
    );
  
    try {
      const response= await axios(config);
      
      return response.data;   ;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }
