import React, { useReducer } from "react";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
} from "../../types";
import TareaContext from "./tareaConext";
import TareaReducer from "./tareaReducer";

const TareaState = (props) => {
  // el state inicial siempre sera un objeto
  const initialState = {
    tareas: [
      { id: 1, nombre: "Elegir plataforma", estado: true, proyectoId: 1 },
      { id: 2, nombre: "Elegir Colores", estado: false, proyectoId: 2 },
      {
        id: 3,
        nombre: "Elegir plataforma de pago",
        estado: true,
        proyectoId: 3,
      },
      { id: 4, nombre: "Elegir Hosting", estado: false, proyectoId: 4 },
      { id: 5, nombre: "Elegir plataforma", estado: true, proyectoId: 4 },
      { id: 6, nombre: "Elegir Colores", estado: false, proyectoId: 3 },
      {
        id: 7,
        nombre: "Elegir plataforma de pago",
        estado: true,
        proyectoId: 2,
      },
      { id: 8, nombre: "Elegir Hosting", estado: false, proyectoId: 1 },
    ],
    tareasProyecto: null, //se inicia null al comenzar
    errorTarea: false,
  };

  //crear dispatch y state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //crear las funciones

  //obtener tareas del proyecto
  const obtenerTareas = (proyectoId) => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId,
    });
  };

  const agregarTarea = (tarea) => {
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea,
    });
  };

  //VALIDA Y MUESTRA ERROR SI ES NECESARIO

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  // eliminar tarea por id
  //se le pasa el id a la funcion y luego se elimina en el reducer
  const eliminarTarea = (id) => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id,
    });
  };

  //este es el context de tarea y se le pasan los props
  //en value se pasan las funciones y objetos para poder utilizarlos en el context
  return (
    <TareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        agregarTarea,
        obtenerTareas,
        validarTarea,
        eliminarTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
