import React, { useContext, useEffect } from "react";
import Sidebar from "../layout/sidebar";
import Barra from "../layout/barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
//PARA AUTENTICAR
import AuthContext from "../../context/autenticacion/authContext";

const Proyectos = () => {
  //extraer la info del usuario autenticado
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);
  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <Barra />

        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
