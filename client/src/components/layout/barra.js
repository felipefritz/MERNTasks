import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/autenticacion/authContext";

const Barra = () => {
  //extraer la info del usuario autenticado
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, usuario, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);
  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola <span> {usuario.nombre}!</span>
        </p>
      ) : null}

      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => cerrarSesion()}
        >
          Cerrar sesion
        </button>
      </nav>
    </header>
  );
};

export default Barra;
