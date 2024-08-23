var backHost =
  process.env.REACT_APP_BACKEND_HOST != null
    ? process.env.REACT_APP_BACKEND_HOST
    : "http://localhost:44363";


export const endPoints = {

    //url User
    urlAddNewUser: backHost +"/api/User",
    urlListAllUser:backHost + "/api/User ",
    urlUserCPF:backHost + "/api/User/getByCPF?cpf=",
    urlUserByid:backHost +  "/api/User",


    
   
    //Url Product
    urlProductAll:backHost+"/api/SalesProduct/Allproducts",
    urlAddNewProduct:backHost+"/api/SalesProduct/product",
    urlDeletProduct:backHost+"/api/SalesProduct",
    urlGetByIdProdutos:backHost+"/api/SalesProduct/GetProductById?id=",
    urlGetByIdServicos:backHost+"/api/SalesProduct/GetServiceById?id=",




    //Url service
    urlServiceAll: backHost +"/api/SalesProduct/AllServices",
    urlAddNewService:backHost+"/api/SalesProduct/service",

    //Url SalesOrder
    urlNewSale:backHost +"/api/SalesOrder",
    urlGetBox:backHost  +"/api/SalesOrder",
    urlPutBox:backHost + "/api/SalesOrder",
    
    
    //Url Cashier Order
    urlOpenBox:backHost + "/api/CashierOrder",
    urlCloseBox:backHost +"/api/CashierOrder/close",

    ControllService:backHost +"/api/ControllService",

  
    
     //Notification
    urlNotification:backHost +"/api/Notification/stream",


   



    ///Role
    urlRole:backHost +"/api/Role",


   



   
//?    


    usuarioLogin: backHost + "/login",
    novoPedido: backHost + "/api/SalesOrder",
    cancelarPedido: backHost + "api/SalesOrder/",
    abriCaixa: backHost + "/api/open?",
    fecharCaixa: backHost + "/api/CashierOrder/close"

};
