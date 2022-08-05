import {
  AGREGAR_TAREA,
  ELIMINAR_TAREA,
  TAREAS_PROYECTO,
  VALIDAR_TAREA,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasProyecto: state.tareas.filter(
          (tarea) => tarea.proyectoId === action.payload
        ),
      };
    case AGREGAR_TAREA:
      //SE AGREGAN AL STATE PRINCIPAL NO EN TAREAS PROYECTO
      return {
        ...state,
        tareas: [action.payload, ...state.tareas],
        errorTarea: false,
      };
    case VALIDAR_TAREA:
      return {
        ...state,
        errorTarea: true,
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareas: state.tareas.filter((tarea) => tarea.id !== action.payload),
      };

    default:
      return state;
  }
};
