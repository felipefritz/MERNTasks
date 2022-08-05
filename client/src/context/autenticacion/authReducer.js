import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTRO_EXITOSO:
      // el token se pasa por el payload y se almacenara
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
      };

    case LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false,
      };
    case CERRAR_SESION:
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
      //para remover el token del storage si hay error
      localStorage.removeItem("token");
      return {
        ...state,
        usuario: null,
        autenticado: null,
        token: null,
        cargando: false,
        mensaje: action.payload,
      };
    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false,
      };
    default:
      return state;
  }
};
