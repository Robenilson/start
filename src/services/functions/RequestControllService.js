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










export async function ControllServiceStop(id) {
    var config = serviceRetornarConfig(
      "put",
      `${endPoints.ControllService}/stop/${id}`,
      true
    );
  
    try {
      return (await axios(config)).data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }
  