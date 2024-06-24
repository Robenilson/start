var backHost =
  process.env.REACT_APP_BACKEND_HOST != null
    ? process.env.REACT_APP_BACKEND_HOST
    : "https://localhost:7276";


export const endPoints = {
    //urlUSer
    urlAddNewUser: backHost +"/api/User",
    urlListAllUser:backHost + "/api/User ",
    //Url
    


    urlService: backHost +"/api/SalesProduct/AllServices",
    urlProduct:backHost+"/api/SalesProduct/Allproducts",
    urlAddNewProduct:backHost+"/api/SalesProduct/product",

    urlUserCPF:backHost + "  ",
    urlNewSale:backHost + "/api/SalesOrder",


    usuarioLogin: backHost + "/login",
    novoPedido: backHost + "/api/SalesOrder",
    cancelarPedido: backHost + "api/SalesOrder/",
    abriCaixa: backHost + "/api/open?",
    fecharCaixa: backHost + "/api/close?cashierId="

};
