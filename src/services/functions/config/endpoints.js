var backHost =
  process.env.REACT_APP_BACKEND_HOST != null
    ? process.env.REACT_APP_BACKEND_HOST
    : "https://localhost:7278";

    var backHost2 =
    process.env.REACT_APP_BACKEND_HOST != null
      ? process.env.REACT_APP_BACKEND_HOST
      : "https://pos-bff-production.up.railway.app";




const  URL_PRODUCT = "/api/SalesProduct";
const  URL_CASHIER_ORDER ="/api/CashierOrder";
const  URL_CONTROLL_SERVICE ="/api/ControllService";
const  URL_USER ="/api/CompanyEmployeer";

export const endPoints = {

  // URL User
  URL_GET_ListAllUser: backHost2  + URL_USER,
  URL_POST_AddNewUser: backHost2 + URL_USER,
  URL_PUT_AddNewUser:  backHost2  + URL_USER,
  URL_GET_UserCPF:     backHost2  + URL_USER+"getByCPF?cpf=",
  URL_GET_UserByid:    backHost2  + URL_USER,
  URL_DELETE_UserByid: backHost2  + URL_USER,

  // URL Product
  URL_POST_NEW_PRODUCT:         backHost2 + URL_PRODUCT+ "/product",
  URL_PUT_PRODUCT:              backHost2 + URL_PRODUCT + "/editProduct",
  URL_DELETE_PRODUCT:           backHost2 + URL_PRODUCT + "/deleteProduct",
  URL_GET_PRODUCT_BYCODEBAR:    backHost2 + URL_PRODUCT + "/GetProductByCodeBar",  
  URL_GET_PRODUCT_BYID:         backHost2 + URL_PRODUCT + "/GetProductById",
  URL_GET_PRODUCT_ALL_PRODUCT:  backHost2 + URL_PRODUCT + "/AllProducts",
 
  // URL SERVICE
  URL_PUT_SERVICE:              backHost2 + URL_PRODUCT + "/editService",
  URL_DELETE_SERVICE:           backHost2 + URL_PRODUCT + "/deleteService",
  URL_GET_SERVICE_BYID:         backHost2 + URL_PRODUCT + "/GetServiceById",
  URL_GET_SERVICE_ALL_SERVICES: backHost2 + URL_PRODUCT + "/AllServices",

  //URL_CONTROLL_SERVICE
  URL_GET_URL_SERVICE:         backHost2 + URL_CONTROLL_SERVICE,
  URL_POST_URL_NEW_SERVICE:    backHost2 + URL_CONTROLL_SERVICE,
  URL_PUT_URL_STOP:            backHost2 + URL_CONTROLL_SERVICE +"/stop/",
  URL_GET_URL_STREAM_TIMERS:   backHost2 + URL_CONTROLL_SERVICE +"/streamTimers/",
  URL_GET_URL_CURRENT_TIMERS:  backHost2 + URL_CONTROLL_SERVICE +"/currentTimers/",
  
  // URL Cashier Order
  URL_POST_OPENBOX:  backHost2 + URL_CASHIER_ORDER +"/open",
  URL_PUT_CLOSEBOX:  backHost2 + URL_CASHIER_ORDER +"/close",
  URL_GET_BOX:       backHost2 + URL_CASHIER_ORDER +"/getCashier",



  // URL Service
  urlServiceAll:    backHost2 + "/api/SalesProduct/AllServices",
  urlAddNewService: backHost2 + "/api/SalesProduct/service",

  // URL SalesOrder
  urlNewSale: backHost2 + "/api/SalesOrder",
  urlGetBox:  backHost2 + "/api/SalesOrder",
  urlPutBox:  backHost2 + "/api/SalesOrder",



  // URL Notification
  urlNotification: backHost2 + "/api/Notification/stream",

  // Role
  urlRole: backHost + "/api/Role",

  // Misc
  usuarioLogin: backHost + "/login",
  novoPedido: backHost + "/api/SalesOrder",
  cancelarPedido: backHost + "/api/SalesOrder/",
  abriCaixa: backHost + "/api/open?",
  fecharCaixa: backHost + "/api/CashierOrder/close"
};
