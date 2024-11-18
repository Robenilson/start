import { endPoints } from "./config/endpoints";



 const TenetId  = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  // Verifica se user e user.TenantId existem antes de retornar a query string
  return (user && user.TenantId) ? `?TenantId=${user.TenantId}` : '';
};



export function FetchNotification(onMessageCallback, onErrorCallback) {
  let lastNotification = null; // Variável para armazenar a última notificação

  const createEventSource = () => {

    console.log(endPoints.urlNotification+TenetId())
    const eventSource = new EventSource("https://authenticationapi-production-9b49.up.railway.app/api/Notification/stream?TenantId=6e5a1265-47fc-42a8-ad70-74307b0ab834");

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
