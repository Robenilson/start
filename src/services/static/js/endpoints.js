var backHost =
  process.env.REACT_APP_BACKEND_HOST != null
    ? process.env.REACT_APP_BACKEND_HOST
    : "https://localhost:44363";

export const endPoints = {
    usuarioLogin: backHost + "/login",
    obterRole: backHost + "/api/Role",
    novoPedido: backHost + "/api/SalesOrder",
    cancelarPedido: backHost + "api/SalesOrder/",
    abriCaixa: backHost + "/api/open?",
    fecharCaixa: backHost + "/api/close?cashierId="

};
