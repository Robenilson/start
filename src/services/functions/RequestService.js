import axios from "axios";
import { serviceRetornarConfig, serviceRetornarErro,TenetId } from "./config/functions";
import { endPoints } from "./config/endpoints";

const listAll =           endPoints.URL_GET_SERVICE_ALL_SERVICES+TenetId();
const addNew=             endPoints.urlAddNewService+TenetId();
const editServiceUrl =    `${endPoints.URL_DELETE_SERVICE}/editService${TenetId()}`;
const deletServiceUrl=    (id) => `${endPoints.URL_DELETE_SERVICE}/deleteService?id=${id+TenetId()}`


console.log(TenetId())


// Adiciona um novo serviço
export async function newService(data) {
  const config = serviceRetornarConfig(
    "post",
    addNew,
    data,
    true
  );

  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}


const formatTime = (horaMinima) => {
  if (horaMinima === 60) {
    return '1 hora';
  }
  return `${horaMinima} minutos`;
};

// Faz um get na tabela Serviços
export async function fetchService() {
  const config = serviceRetornarConfig("get", 
  listAll,
   true);

  try {
    const response = await axios(config);
    if (response.data && Array.isArray(response.data)) {
      const service = response.data.map((service) => ({
        id: service.id,
        nome: service.name,
        valor: parseFloat(service.price),
        horaMinima:formatTime(service.quantityHours ) || 'N/A',
        descricao: service.description,
      }));
      return service;
    } else {
      console.error("Dados recebidos não são válidos:", response.data);
    }
  } catch (error) {
    return serviceRetornarErro(error);
  }
}

export async function createDataServicoEdit(servicoValues) {
  try {
    const [horas, minutos, segundos] = servicoValues.tempo.split(':').map(Number);
    const updatedService = {
    
        id: servicoValues.id,
        name: servicoValues.nomeServico,
        description: servicoValues.descricaoServico,
        price: parseFloat(servicoValues.valorServico),
        quantityHours: horas * 3600 + minutos * 60 + segundos,
        quantityEquipament: servicoValues.quantidade,
    
      
    };
    return  updatedService;
  } catch (error) {
    console.error("Erro ao converter dados:", error);
    throw error; // Corrigido: sem newline após throw
  }
}

export async function editService(data) {
  const config = serviceRetornarConfig(
    "put",
    editServiceUrl,
    data,
    true
  );

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}


//Adiciona um novo Produto
export async function DeleteService(data) {
  var config = serviceRetornarConfig( "delete",deletServiceUrl(data.id), true);
  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}
