import React, { Fragment, useContext, useState } from "react";
import ProyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //obtener el state del formulario
  const proyectoContext = useContext(ProyectoContext); // con esta linea se le pasa el context desde proyecto context en una sola variable
  const {
    formulario,
    errorFormulario,
    mostrarError,
    mostrarFormulario,
    agregarProyecto,
  } = proyectoContext; // aqui se puede extraer el formulario del state o cualquier variable

  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;

  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //cuando el usuario envia el proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();

    //validar
    if (nombre === "") {
      mostrarError();
      return;
    }
    //agregar al state
    agregarProyecto(proyecto); // esto se va a proyecto state,
    //reiniciar el form
    guardarProyecto({ nombre: "" }); // esto limpia los campos del formulario
  };

  // si formulario es true entonces muestralo
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => mostrarFormulario()}
      >
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="nombre proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}

      {errorFormulario ? (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
