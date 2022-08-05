import clienteAxios from "./axios";

// funcion para pasarle el token por headers
const tokernAuth = (token) => {
  if (token) {
    clienteAxios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete clienteAxios.defaults.headers.common["x-auth-token"];
  }
};
export default tokernAuth;
