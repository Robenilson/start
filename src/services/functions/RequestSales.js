import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro,TenetId} from "./config/functions";
import { endPoints } from "./config/endpoints";
const user = JSON.parse(localStorage.getItem('user'));



const addNew = endPoints.urlNewSale+TenetId();

//Adiciona um nova Venda
export async function NewSale(data) {
    var config = serviceRetornarConfig(
      "post",
      "https://pos-bff-production.up.railway.app/api/SalesOrder?tenantId=6e5a1265-47fc-42a8-ad70-74307b0ab834",
      data,
      true
    );
    try {
      
      return await axios(config);
    } catch (error) {
      return serviceRetornarErro(error);
    }
  }
  export async function createSaleOrder(clientId, employeerId, products, discount, payment) {
    // Configurações iniciais do pedido
    const saleOrder = {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Gerador de UUID único
        dtSale: new Date().toISOString(), // Data da venda
        produtos: [], // Lista de produtos no pedido
        clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Cliente: agora um UUID como string
        employeerId: user.UserId, // Empregador: agora um UUID como string
        precoTotal: 0, // Preço total da venda
        desconto: discount || 0, // Desconto aplicado na venda
        credito: 0, // Crédito aplicado (se houver)
        saleStatus: 0, // 0: Pendente, 1: Concluído, 2: Cancelado
        payments: [] // Lista de pagamentos realizados
    };

    // Adiciona produtos ao pedido e calcula o preço total
    products.forEach(product => {
        if (product) { // Verifica se o produto existe
            saleOrder.produtos.push({
                productId: product.id, // productId agora é um UUID como string
                quantity: product.quantidade, // Quantidade do produto
                orderId: saleOrder.id, // ID do pedido, mantendo como string
                productType: product.productType || 1, // Definindo tipo de produto, com valor padrão 1
                name: product.nome || "Produto sem nome", // Nome do produto (valor padrão caso não tenha)
            });
            
            // Atualiza o preço total com base na quantidade e valor total do produto
            saleOrder.precoTotal += parseFloat(product.valorTotal);
        }
    });

    // Aplica desconto ao preço total, se houver
    saleOrder.precoTotal = Math.max(saleOrder.precoTotal - saleOrder.desconto, 0);

    // Adiciona pagamento ao pedido
    saleOrder.payments.push({
        id: 0, // ID do pagamento (default 0 para o primeiro pagamento)
        value: payment.value, // Valor do pagamento
        paymentMethod: payment.method || "Método não especificado", // Método de pagamento, com valor padrão
        orderId: saleOrder.id, // ID do pedido
        paymentType: payment.type || 1 // Tipo de pagamento (valor padrão 1)
    });

    // Define status da venda como "Concluído"
    saleOrder.saleStatus = 1;

    return saleOrder;
}


