import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro,TenetId} from "./config/functions";
import { endPoints } from "./config/endpoints";
export async function SalesOrderByID(data) {
  var config = serviceRetornarConfig(
    "GET",
    `${endPoints.urlNewSale}/${data}?tenantId=${TenetId()}`,
    true
  );
  try {
    return await (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}
// Função para cancelar o caixa
export async function PutCanceltBox(data) {
  var config = serviceRetornarConfig(
    "PUT",
    `${endPoints.urlPutBox}/${data.id}/cancel?tenantId=${TenetId()}`,
    true
  );
  try { 
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}
export async function NewSale(data) {
  const config = serviceRetornarConfig(
    "POST",
    `${endPoints.urlNewSale}?tenantId=${TenetId()}`,
    data,
    true
  );
  try {
    const response = await axios(config);
    return response.data
  } catch (error) {
    return serviceRetornarErro(error);
  }
}
// Função para marcar o caixa como completo
export async function Put_Sales_Complete(data) {
  var config = serviceRetornarConfig(
    "PUT",
    `${endPoints.urlPutBox}/${data.id}/complete?tenantId=${TenetId()}`,
    data,
    true
  );
  try {
    return (await axios(config)).data;
  } catch (error) {
    return serviceRetornarErro(error);
  }
}
  export async function createSaleOrder(clientId, employeerId, products, discount, payment) {   
    // Configurações iniciais do pedido no formato esperado
    const saleOrder = {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // ID do pedido como UUID
        dtSale: new Date().toISOString(), // Data e hora da venda no formato ISO
        produtos: [], // Inicializa a lista de produtos no pedido
        clientId:"3fa85f64-5717-4562-b3fc-2c963f66afa6",// ID do cliente passado como argumento
        employeerId: "d9fe5471-9807-4878-98bb-69e2dfa48924", // ID do empregado passado como argumento
        precoTotal: 0, // Preço total da venda
        desconto: discount || 0, // Desconto aplicado (caso não especificado, 0)
        credito: 0, // Crédito aplicado, default 0
        saleStatus: 0, // Status da venda: 0 - Pendente
        payments: [] // Inicializa a lista de pagamentos
    };
    // Adiciona produtos ao pedido e calcula o preço total
    products.forEach(product => {
        if (product) {
            saleOrder.produtos.push({
                productId: product.id || "3fa85f64-5717-4562-b3fc-2c963f66afa6", // ID do produto como UUID
                quantity: product.quantity || 0, // Quantidade do produto, default 0
                orderId: saleOrder.id, // ID do pedido
                productType: product.productType || 1, // Tipo do produto, default 1
                name: product.nome || "Produto sem nome" // Nome do produto
            });
            // Calcula o preço total com base no valor total de cada produto
            saleOrder.precoTotal += parseFloat(product.valorTotal || 0);
        }
    });
    // Aplica o desconto ao preço total (mantendo no mínimo zero)
    saleOrder.precoTotal = Math.max(saleOrder.precoTotal - saleOrder.desconto, 0);
    // Adiciona pagamento ao pedido
    saleOrder.payments.push({
        id:2, // ID do pagamento inicial (0 para o primeiro pagamento)
        value: payment.value || 0, // Valor do pagamento
        paymentMethod: payment.method || "string", // Método de pagamento
        orderId: saleOrder.id, // ID do pedido
        paymentType: payment.type || 1 // Tipo de pagamento, default 1
    });
    return saleOrder;
}
