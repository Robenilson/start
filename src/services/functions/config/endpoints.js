var backHost =
  process.env.REACT_APP_BACKEND_HOST != null
    ? process.env.REACT_APP_BACKEND_HOST
    : "http://localhost:7276";

    

export const endPoints = {
    urlService: backHost +"/api/SalesProduct",
    urlProduct:backHost+"/api/SalesProduct",
    urlUser:backHost + "/api/SalesClient/clients ",


    usuarioLogin: backHost + "/login",
    novoPedido: backHost + "/api/SalesOrder",
    cancelarPedido: backHost + "api/SalesOrder/",
    abriCaixa: backHost + "/api/open?",
    fecharCaixa: backHost + "/api/close?cashierId="

};
