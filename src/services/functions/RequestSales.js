import axios from "axios";
import { serviceRetornarConfig , serviceRetornarErro,TenetId} from "./config/functions";
import { endPoints } from "./config/endpoints";


const addNew = endPoints.urlNewSale+TenetId();

//Adiciona um nova Venda
export async function NewSale(data) {
    var config = serviceRetornarConfig(
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
 
  export async function createSaleOrder(clientId, employeerId, products, discount, payment) {
    // Configurações iniciais do pedido
    const saleOrder = {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Gerador de UUID único
        dtSale: new Date().toISOString(),
        produtos: [],
        clientId: parseInt(clientId),
        employeerId: parseInt(employeerId),
        precoTotal: 0,
        desconto: discount || 0,
        credito: 0,
        saleStatus: 0, // 0: Pendente, 1: Concluído, 2: Cancelado
        payments: []
    };

    // Adiciona produtos ao pedido e calcula o preço total
    products.forEach(product => {
        if (product) { // Verifica se o produto existe
            saleOrder.produtos.push({
                productId: parseInt(product.id),
                quantity: parseInt(product.quantidade),
                orderId:parseInt(saleOrder.id),
                productType: product.productType || "defaultType", // Defina um valor padrão para tipo de produto
                name: product.nome,
                valor: parseFloat(product.valorTotal)  // Calcula o valor unitário
            });
            
            // Atualiza o preço total com base na quantidade e valor total do produto
            saleOrder.precoTotal += parseFloat(product.valorTotal);
            
            
        }
    });

    // Aplica desconto ao preço total, se houver
    saleOrder.precoTotal = Math.max(saleOrder.precoTotal - saleOrder.desconto, 0);

    // Adiciona pagamento ao pedido
    saleOrder.payments.push({
        id: 1,
        value: payment.value,
        paymentMethod: payment.method,
        orderId: saleOrder.id,
        paymentType: payment.type
    });

    // Define status da venda como "Concluído"
    saleOrder.saleStatus = 1;

    return saleOrder;
}

