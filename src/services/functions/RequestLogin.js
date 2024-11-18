import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";

const getUsuarioLoginUrl = (email, password) => `${endPoints.usuarioLogin}?email=${email}&password=${password}`;


export async function loginUser(email, password) { // Renomear a função
    var config = serviceRetornarConfig(
      "post",
      getUsuarioLoginUrl(email,password),
      true
    );
    try {
      console.log((await axios(config)).data)
      return (await axios(config)).data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
}



