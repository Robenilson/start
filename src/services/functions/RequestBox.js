// Importações devem estar sempre no topo do arquivo
import axios from "axios";
import { serviceRetornarConfig, serviceRetornarErro, TenetId } from "./config/functions";
import { endPoints } from "./config/endpoints";
import { FetchUserByID } from "./RequestPeople";

// Funções para montar as URLs
const getOpenBoxUrl = (employeerId) => `${endPoints.urlOpenBox}/open?employeerId=${employeerId + TenetId()}`;
const getFecharCaixaUrl = (useid) => `${endPoints.fecharCaixa}/${useid + TenetId()}`;
const getBoxUrl = () => endPoints.urlGetBox + TenetId();
const getBoxUrlWithDate = (data) => `${endPoints.urlGetBox}/${data + TenetId()}`;
const getProdutoByIdUrl = (data) => `${endPoints.urlGetByIdProdutos}${data + TenetId()}`;
const getServicoByIdUrl = (data) => `${endPoints.urlGetByIdServicos}${data + TenetId()}`;
const getCompleteBoxUrl = (data) => `${endPoints.urlPutBox}/${data.id}/complete${TenetId()}`;
const getCancelBoxUrl = (data) => `${endPoints.urlPutBox}/${data}/cancel${TenetId()}`;

const getCashierData = (employeerId, tenantId) => {
  return `https://pos-bff-production.up.railway.app/api/CashierOrder/open?employeerId=${employeerId}&tenantId=${tenantId}`;
};

// Função para abrir o caixa
export async function OpenBox() {
  const user = JSON.parse(localStorage.getItem('user'));
  var config = serviceRetornarConfig(
    "post",
    getCashierData(user.UserId, user.TenantId),
    true
  );

  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}

// Função para fechar o caixa
export async function CloseBox(useid) {
  var config = serviceRetornarConfig(
    "put",
    getFecharCaixaUrl(useid),
    true
  );
  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}

// Função para buscar o nome do cliente
export async function Name(clientId) {
  try {
    const response = await FetchUserByID(clientId);
    return response;
  } catch (error) {
    console.error('Erro ao buscar o cliente:', error);
    return undefined;
  }
}

// Função para determinar o papel baseado no número
const getRole = (roleNumber) => {
  return roleNumber === 1 ? 'Iniciada' :
         roleNumber === 2 ? 'AguardandoPagamento' :
         roleNumber === 3 ? '' :
         roleNumber === 4 ? 'vendedor' :
         'Role não reconhecido';
};

// Função para listar pedidos do caixa
export async function FetchBox() {
  var config = serviceRetornarConfig(
    "get",
    getBoxUrl(),
    true
  );
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}

// Função para listar pedidos por ID de usuário
export async function FetchBoxUserId(id) {
  const pedidos = await FetchBox();
  return pedidos;
}

// Função para listar pedidos com ID específico
export async function FetchBoxById(data) {
  var config = serviceRetornarConfig(
    "get",
    getBoxUrlWithDate(data),
    true
  );

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}

// Função para listar produtos por ID
export async function GetByIdProdutos(data) {
  var config = serviceRetornarConfig(
    "get",
    getProdutoByIdUrl(data),
    true
  );

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}

// Função para listar serviços por ID
export async function GetByIdServicos(data) {
  var config = serviceRetornarConfig(
    "get",
    getServicoByIdUrl(data),
    true
  );

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}

// Função para obter a opção de pagamento
function getPaymentOption(value) {
  const paymentOptions = {
    1: "Cédulas",
    2: "Cartão de Débito",
    3: "Cartão de Crédito",
    4: "Pix"
  };
  return paymentOptions[value];
}

// Função para criar objeto de dados para edição do caixa
export async function createDataObjectEditBox(pedido, formaPagamento, desconto, user) {
  try {
    const data = {
      id: pedido.id,
      dtSale: new Date().toISOString(),
      produtos: pedido.produto.map(prod => ({
        productId: prod.productId || '',
        quantity: prod.quantity || 0,
        orderId: prod.orderId || '',
        productType: prod.productType || 0,
        name: prod.name || ''
      })),
      clientId: pedido.clientId || 0,
      employeerId: parseInt(user.EmployeerId) || 0,
      precoTotal: pedido.precoTotal || 0,
      desconto: parseFloat(desconto) || 0,
      credito: pedido.credito || 0,
      saleStatus: 4,
      payments: [
        {
          value: pedido.precoTotal || 0,
          paymentMethod: getPaymentOption(formaPagamento) || '',
          orderId: pedido.id || '',
          PaymentType: parseInt(formaPagamento) || 0
        }
      ]
    };

    return data;
  } catch (error) {
    console.error('Erro ao converter dados:', error);
    throw error;
  }
}

// Função para visualizar dados do caixa
export async function ViewDataObjectBox(data) {
  try {
    let value = [];

    if (data && Array.isArray(data)) {
      value = await Promise.all(data.map(async s => {
        if (s.saleStatus === 4 || s.saleStatus === '4' || !s.produtos || s.produtos.length === 0) {
          return null;
        }

        const clientName = s.clientId !== undefined ? await FetchUserByID(s.clientId) : { nome: "Unknown" };

        return {
          id: s.id,
          clientId: s.clientId !== undefined ? s.clientId : 0,
          clientName: clientName.nome,
          tipo: s.tipo || "null",
          desconto: s.desconto !== undefined ? s.desconto : 0,
          precoTotal: s.precoTotal !== undefined ? s.precoTotal : 0,
          credito: s.credito !== undefined ? s.credito : 0,
          payments: s.payments && s.payments.length > 0 ? s.payments : null,
          saleStatus: s.saleStatus !== undefined ? s.saleStatus : 0,
          produto: s.produtos,
          dtSale: s.dtSale
        };
      }));

      value = value.filter(item => item !== null); // Remove os objetos nulos
    }

    return value;
  } catch (error) {
    console.error('Erro ao converter dados:', error);
    throw error;
  }
}

// Função para marcar o caixa como completo
export async function PutCompletBox(data) {
  var config = serviceRetornarConfig(
    "put",
    getCompleteBoxUrl(data),
    data,
    true
  );

  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}

// Função para cancelar o caixa
export async function PutCanceltBox(data) {
  var config = serviceRetornarConfig(
    "put",
    getCancelBoxUrl (data),
    data,
    true
  );

  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}
