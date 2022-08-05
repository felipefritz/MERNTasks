import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";
const NuevaCuenta = (props) => {
  // crear context para usar las funciones de alerta
  const alertaContext = useContext(AlertaContext);

  //extraer alerta y mostrarAlerta del context
  const { alerta, mostrarAlerta } = alertaContext;

  //auth. importar mensaje y autenticado para validar con useEfect({})
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  // en caso de que el usuario se haya autenticado o registrado o sea un registro
  useEffect(() => {
    if (autenticado) {
      console.log("redirection");
      props.history.push("/proyectos"); // para redireccionar
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
  }, [mensaje, autenticado, props.history]);

  //STATE PARA INICIAR SESION
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //cuando el usuario quiere iniciar sesion
  const onSubmit = (e) => {
    e.preventDefault();

    //validar campos vacios
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    //password minimo 6 caracteres
    if (password > 6) {
      mostrarAlerta(
        "Password debe contener minimo 6 caracteres",
        "alerta-error"
      );
      return;
    }
    //2 password iguales
    if (password !== confirmar) {
      mostrarAlerta("Password no coinciden", "alerta-error");
      return;
    }
    //pasarlo a la accion : creaer context de autenticacion /context/autenticacion
    registrarUsuario({ nombre, email, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crear nueva cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="nombre"
              onChange={onChange}
              value={nombre}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu password"
              onChange={onChange}
              value={password}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="repite tu password"
              onChange={onChange}
              value={confirmar}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Volver a Iniciar Sesion
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
