import React, { useReducer } from "react";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";

import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR,
} from "../../types"; // Si el archivo es index no es necesario indicar el archivo al importar
//import { v4 as uuidv4 } from "uuid/dist/v4";
import clienteAxions from "../../config/axios";
const ProyectoState = (props) => {
  const proyectos = [];

  const initialState = {
    proyectos: [],
    mensaje: null,
    formulario: false, // cuando el usuario haga click en nuevo proyecto esto cambiara a true
    errorFormulario: false, //con esto, al iniciar siempre sera falso el error
    proyecto: null,
  };
  //use reducer es similar a usar use state, ( obtiene el estado y funcion anterior)
  //dispatch va a ser para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //seria de funciones para el CRUD del proyecto
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  //obtener proyectos
  const obtenerProyectos = async () => {
    //lo que tome la funcion es lo que tomara el payload (objetos)
    try {
      const resultado = await clienteAxions.get("/api/proyectos");
      console.log(resultado);
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data.proyectos,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const agregarProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxions.post("/api/proyectos", proyecto);
      console.log(resultado);
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Valida formulario
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO, // no toma payload
    });
  };

  // Seleccion el proyecto que el usuario dio click
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  //ELIMINAR PROYECTO
  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxions.delete(`/api/proyectos/${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      const alerta = { msg: "hubo un error", categoria: "alerta-error" };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario, // esto crea el context y se debe consumir en la app
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario, // Al llamar esta funcion se va a llamar al type FORMULARIO_PROYECTO
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
