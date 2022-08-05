import React, { useContext } from "react";
import Proyectos from "./Proyectos";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaConext";

const Proyecto = ({ proyecto }) => {
  const proyectoContext = useContext(ProyectoContext); // con esta linea se le pasa el context desde proyecto context en una sola variable

  const { proyectoActual } = proyectoContext; // aqui se puede extraer el formulario del state o cualquier variable

  //obtener funcion del context de tarea
  const tareasContext = useContext(TareaContext);
  const { obtenerTareas } = tareasContext; // con esto se obtiene la funcion
  //FUNCION PARA AGREGAR EL PROYECTO ACTUAL
  const seleccionarProyecto = (id) => {
    proyectoActual(id);
    obtenerTareas(id); //filtrar tareas cuando se de click
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};
export default Proyecto;
