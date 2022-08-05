import React, { useContext, useEffect } from "react";

import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../context/autenticacion/authContext";
//crear higher component
//toma un componente y toma una copia de los props del componente hijo
//luego verifica si el usuario esta autenticado, sino esta autenicado se redirecciona al index
// si esta autenticado se redirecciona al componente que lo esta mandando a llamar
const RutaPrivada = ({ component: Component, ...props }) => {
  const authContext = useContext(AuthContext);
  const { autenticado, cargando, usuarioAutenticado } = authContext;
  useEffect(() => {
    usuarioAutenticado();
  });
  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
