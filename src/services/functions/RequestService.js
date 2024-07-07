import axios from "axios";
import { serviceRetornarConfig, serviceRetornarErro } from "./config/functions";
import { endPoints } from "./config/endpoints";

// Adiciona um novo serviço
export async function newService(data) {
  const config = serviceRetornarConfig(
    "post",
    endPoints.urlAddNewService,
    data,
    true
  );

  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}

// Faz um get na tabela Serviços
export async function fetchService() {
  const config = serviceRetornarConfig("get", endPoints.urlServiceAll, true);

  try {
    const response = await axios(config);
    if (response.data && Array.isArray(response.data)) {
      const service = response.data.map((service) => ({
        id: service.id,
        nome: service.name,
        valor: parseFloat(service.price),
        horaMinima: service.quantityHours || 'N/A',
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
      productType: 2,
      virtualProduct: {
        id: servicoValues.id,
        name: servicoValues.nomeServico,
        description: servicoValues.descricaoServico,
        price: parseFloat(servicoValues.valorServico),
        quantityHours: horas * 3600 + minutos * 60 + segundos,
        quantityEquipament: servicoValues.quantidade,
      },
      physiqueProduct: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "string",
        description: "string",
        price: 0,
        quantity: 0,
      },
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
    `${endPoints.urlDeletProduct}`,
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
