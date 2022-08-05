import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR,
} from "../../types"; //aca es donde se mapea o se cambia de state

export default (state, action) => {
  switch (action.type) {
    case FORMULARIO_PROYECTO:
      return {
        ...state, // toma una copia del state y lo cambia a true
        formulario: true,
      };

    case OBTENER_PROYECTOS:
      console.log(action.payload);
      return {
        ...state, // toma una copia del state y lo cambia a true
        proyectos: action.payload,
      };

    case AGREGAR_PROYECTO:
      return {
        ...state, // toma una copia del state y lo cambia a true
        proyectos: [...state.proyectos, action.payload], // esto seria un objeto que se agregara al listado de objetos
        formulario: false, // esto para ocultar el formulario una vez se agrega un proyecto
        errorFormulario: false, //con eso se RESETEA EL ERROR Y SE OCULTA
      };

    case VALIDAR_FORMULARIO:
      return {
        ...state, // esta linea hace una copia del state para que se mantenga
        errorFormulario: true, // aca se muestra el error del formulario
      };

    case PROYECTO_ACTUAL:
      //esto itera los proyectos y selecciona el que el usuario selecciono
      //proyecto seria un nuevo arreglo(objeto con los datos del proyecto selec.)
      return {
        ...state,
        proyecto: state.proyectos.filter(
          (proyecto) => proyecto._id === action.payload
        ),
      };
    case ELIMINAR_PROYECTO:
      //traera todos los proyectos excepto el que se elimino
      return {
        ...state,
        proyectos: state.proyectos.filter(
          (proyecto) => proyecto._id !== action.payload
        ),
        proyecto: null,
      };
    case PROYECTO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };

    default:
      return state;
  }
};
