import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";
//*//
 
export async function ControllServiceGet(id) {
  var config = serviceRetornarConfig(
    "get",
    `${endPoints.ControllService}/${id}`,
    true
  );

  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}










export async function ControllServiceStop(id, data) {
  console.log( `${endPoints.ControllService}/stop/${id}?timeLeft=${data}`)
    var config = serviceRetornarConfig(
      "put",
      `${endPoints.ControllService}/stop/${id}?timeLeft=${data}`,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }
  