var backHost =
  process.env.REACT_APP_BACKEND_HOST != null
    ? process.env.REACT_APP_BACKEND_HOST
    : "https://localhost:44363";


export const endPoints = {
    urlService: backHost +"/api/SalesProduct/AllServices",
    urlProduct:backHost+"/api/SalesProduct/Allproducts",
    urlUser:backHost + "/api/User ",


    usuarioLogin: backHost + "/login",
    novoPedido: backHost + "/api/SalesOrder",
    cancelarPedido: backHost + "api/SalesOrder/",
    abriCaixa: backHost + "/api/open?",
    fecharCaixa: backHost + "/api/close?cashierId="

};
