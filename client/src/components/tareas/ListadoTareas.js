import React, { Fragment, useContext } from "react";
import Tarea from "./Tarea";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaConext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {
  const proyectosContext = useContext(ProyectoContext); // se debe importar usecontext
  const { proyecto, eliminarProyecto } = proyectosContext;

  //obtener tareas proyecto
  const tareasContext = useContext(TareaContext);
  const { tareasProyecto } = tareasContext; // con esto se obtiene la funcion
  //si no hay proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;

  //array destructuring para extraer el proyecto acual
  const [proyeactoActual] = proyecto;

  const onClickEliminarProyecto = () => {
    eliminarProyecto(proyeactoActual._id);
  };
  return (
    <Fragment>
      <h2>Proyecto: {proyeactoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasProyecto.map((tarea) => (
              <CSSTransition key={tarea.id} timeout={200} classNames="tarea">
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickEliminarProyecto}
      >
        Eliminar Proyecto
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
