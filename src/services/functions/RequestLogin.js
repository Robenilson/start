import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";



export async function loginUser(email, password) { // Renomear a função


  console.log(` Endpoint - Login${endPoints.usuarioLogin}?email=${email}&password=${password}`);
    var config = serviceRetornarConfig(
      "post",
      `${endPoints.usuarioLogin}?email=${email}&password=${password}`,
      true
    );
    
    try {

      console.log((await axios(config)).data)

      return (await axios(config)).data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
}



