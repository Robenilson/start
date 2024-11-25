import { endPoints } from "./config/endpoints";
import {  TenetId} from "./config/functions";
export function FetchNotification(onMessageCallback, onErrorCallback) {
  let lastNotification = null; // Variável para armazenar a última notificação
  const createEventSource = () => {
    const eventSource = new EventSource(`${endPoints.urlNotification}?TenantId=${TenetId()}`);
    eventSource.onmessage = function(event) {
      try {
        const notification = event.data; // Atribuição correta, sem await
        lastNotification = notification; // Armazena a última notificação recebida
        onMessageCallback(notification); // Chama o callback com a notificação
      } catch (error) {
        console.error("Erro ao processar a notificação:", error);
      }
    };
    eventSource.onerror = function(error) {
      if (onErrorCallback) {
        onErrorCallback(error);
      }
      eventSource.close(); // Fechar a conexão em caso de erro
      // Tentativa de reconexão
      setTimeout(createEventSource, 5000); // Espera 5 segundos antes de tentar reconectar
    };
    return eventSource;
  };
  const eventSource = createEventSource();
  // Retorna uma função que permite obter a última notificação recebida
  return {
    getLastNotification: () => lastNotification,
    eventSource, // Retorna o eventSource também para manter a funcionalidade original
  };
}
