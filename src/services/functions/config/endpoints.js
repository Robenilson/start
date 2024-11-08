var backHost =
  process.env.REACT_APP_BACKEND_HOST != null
    ? process.env.REACT_APP_BACKEND_HOST
    : "http://localhost:8005";

const  URL_PRODUCT = "/api/SalesProduct";
const  URL_CASHIER_ORDER ="/api/CashierOrder";
const  URL_CONTROLL_SERVICE ="/api/ControllService";
const  URL_USER ="/api/User";

export const endPoints = {

  // URL User
  URL_GET_ListAllUser: backHost  + URL_USER,
  URL_POST_AddNewUser: backHost  + URL_USER,
  URL_PUT_AddNewUser:  backHost  + URL_USER,
  URL_GET_UserCPF:     backHost  + URL_USER+"getByCPF?cpf=",
  URL_GET_UserByid:    backHost  + URL_USER,
  URL_DELETE_UserByid: backHost  + URL_USER,

  // URL Product
  URL_POST_NEW_PRODUCT:         backHost + URL_PRODUCT+ "/product",
  URL_PUT_PRODUCT:              backHost + URL_PRODUCT + "/editProduct",
  URL_DELETE_PRODUCT:           backHost + URL_PRODUCT + "/deleteProduct",
  URL_GET_PRODUCT_BYCODEBAR:    backHost + URL_PRODUCT + "/GetProductByCodeBar",  
  URL_GET_PRODUCT_BYID:         backHost + URL_PRODUCT + "/GetProductById",
  URL_GET_PRODUCT_ALL_PRODUCT:  backHost + URL_PRODUCT + "/AllProducts",
 
  // URL SERVICE
  URL_PUT_SERVICE:              backHost + URL_PRODUCT + "/editService",
  URL_DELETE_SERVICE:           backHost + URL_PRODUCT + "/deleteService",
  URL_GET_SERVICE_BYID:         backHost + URL_PRODUCT + "/GetServiceById",
  URL_GET_SERVICE_ALL_SERVICES: backHost + URL_PRODUCT + "/AllServices",

  //URL_CONTROLL_SERVICE
  URL_GET_URL_SERVICE:         backHost + URL_CONTROLL_SERVICE,
  URL_POST_URL_NEW_SERVICE:    backHost + URL_CONTROLL_SERVICE,
  URL_PUT_URL_STOP:            backHost + URL_CONTROLL_SERVICE +"/stop/",
  URL_GET_URL_STREAM_TIMERS:   backHost + URL_CONTROLL_SERVICE +"/streamTimers/",
  URL_GET_URL_CURRENT_TIMERS:  backHost + URL_CONTROLL_SERVICE +"/currentTimers/",
  
  // URL Cashier Order
  URL_POST_OPENBOX:  backHost + URL_CASHIER_ORDER +"/open",
  URL_PUT_CLOSEBOX:  backHost + URL_CASHIER_ORDER +"/close",
  URL_GET_BOX:       backHost + URL_CASHIER_ORDER +"/getCashier",



  // URL Service
  urlServiceAll:    backHost + "/api/SalesProduct/AllServices",
  urlAddNewService: backHost + "/api/SalesProduct/service",

  // URL SalesOrder
  urlNewSale: backHost + "/api/SalesOrder",
  urlGetBox:  backHost + "/api/SalesOrder",
  urlPutBox:  backHost + "/api/SalesOrder",



  // URL Notification
  urlNotification: backHost + "/api/Notification/stream",

  // Role
  urlRole: backHost + "/api/Role",

  // Misc
  usuarioLogin: backHost + "/login",
  novoPedido: backHost + "/api/SalesOrder",
  cancelarPedido: backHost + "/api/SalesOrder/",
  abriCaixa: backHost + "/api/open?",
  fecharCaixa: backHost + "/api/CashierOrder/close"
};
