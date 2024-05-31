var backHost =
  process.env.REACT_APP_BACKEND_HOST != null
    ? process.env.REACT_APP_BACKEND_HOST
    : "http://localhost:7276";

export const endPoints = {
    usuarioLogin: backHost + "/login",
};
