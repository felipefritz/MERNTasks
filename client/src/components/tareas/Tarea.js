import React, { Fragment, useContext } from "react";
import TareaContext from "../../context/tareas/tareaConext";
import ProyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({ tarea }) => {
  //obtener context de tareas y proyecto
  const tareasContext = useContext(TareaContext);
  const { eliminarTarea, obtenerTareas } = tareasContext;
  const proyectoContext = useContext(ProyectoContext); // con esta linea se le pasa el context desde proyecto context en una sola variable
  const { proyecto } = proyectoContext; // aqui se puede extraer el formulario del state o cualquier variable

  //extraer proyecto ( para obtenerlo como objeto y no como array)
  const [proyectoActual] = proyecto;

  //funcion que se ejecuta cuandfo el usuario presiona el boton eliminar tarea
  const tareaEliminar = (id) => {
    eliminarTarea(id);
    obtenerTareas(proyectoActual.id);
  };

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button type="button" className="completo">
            Completo
          </button>
        ) : (
          <button type="button" className="incompleto">
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button type="button" className="btn btn-primario">
          Editar
        </button>
        <button
          onClick={() => tareaEliminar(tarea.id)}
          type="button"
          className="btn btn-secundario"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
