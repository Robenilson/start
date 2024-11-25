import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";
export async function loginUser(email, password) { // Renomear a função
    var config = serviceRetornarConfig(
      "post",
      `${endPoints.usuarioLogin}?email=${email}&password=${password}`,
      true
    );
    try {
      return (await axios(config)).data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
}
