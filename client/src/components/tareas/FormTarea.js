import React, { useContext, useState } from "react";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import tareaReducer from "../../context/tareas/tareaReducer";
import { AGREGAR_TAREA } from "../../types";
import TareaContext from "../../context/tareas/tareaConext";

const FormTarea = () => {
  // extraer si un proyecto esta activo
  const proyectosContext = useContext(ProyectoContext); // se debe importar usecontext
  const { proyecto } = proyectosContext;

  //obtener context de tareas
  const tareasContext = useContext(TareaContext);
  const {
    errorTarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
  } = tareasContext; // con esto se obtiene la funcion

  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  //extraer nombre proyecto desde la tarea
  const { nombre } = tarea;

  if (!proyecto) return null;

  //array destructuring para extraer el proyecto acual
  const [proyeactoActual] = proyecto;

  //leer valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //pasar validacion en el reducer de agregar tarea: errorTarea: false
    //agregar tarea al state de tareas
    tarea.proyectoId = proyeactoActual.id;
    tarea.estado = false;
    agregarTarea(tarea);

    //obtener y filtrar tareas del proyecto
    obtenerTareas(proyeactoActual.id);

    //reiniciar form
    guardarTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="nombre tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value="Agregar Tarea"
          />
        </div>
      </form>
      {errorTarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
