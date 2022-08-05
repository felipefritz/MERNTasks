import React, { useContext, useEffect } from "react";
import Proyecto from "./proyecto";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import AlertaContext from "../../context/alertas/alertaContext";
const ListadoProyectos = () => {
  //extraer proyectos state inicial
  const proyectosContext = useContext(ProyectoContext); // se debe importar usecontext
  const { proyectos, obtenerProyectos, mensaje } = proyectosContext;
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  //use effect siempre es un arrow function y debe ir siempre antes de un return
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos(); // obtener proyectos cuando carga el componente
  }, [mensaje]); // se debe pasar como dependencia el mensaje para mostrar el error

  // revisar si proyectos tiene contenido

  if (proyectos.length === 0) return <p>Np hay proyectos aun</p>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      {proyectos.map((proyecto) => (
        <Proyecto key={proyecto._id} proyecto={proyecto} />
      ))}
    </ul>
  );
};
export default ListadoProyectos;
