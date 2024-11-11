import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro} from "./config/functions";
import { endPoints } from "./config/endpoints";
//*//

const getControllServiceUrl = (id) => `${endPoints.ControllService}/${id}`;
const getStopServiceUrl = (id, data) => `${endPoints.ControllService}/stop/${id}?timeLeft=${data}`;




export async function ControllServiceGet(id) {
  var config = serviceRetornarConfig(
    "get",
    getControllServiceUrl(id),
    true
  );

  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}


export async function ControllServiceStop(id, data) {
    var config = serviceRetornarConfig(
      "put",
      getStopServiceUrl(id,data),
      true
    );
    try {
      return (await axios(config)).data;
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }
  