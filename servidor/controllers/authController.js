const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator"); // para revisar si hay errores
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    //si errores no esta vacio, se envia un arreglo con todos los errores
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer email y password del req.
  const { email, password } = req.body;

  try {
    // Revisar que sea un usuario registrado
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    // si el usuario existe, se valida password
    // esta linea compara el usuario del request con el pass de la base de datos
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Password incorrecto" });
    }
    //si todo es correcto se genera el token
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token }); // se retorna el token si no hubo errores y se envia token
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//obtiene que usuario esta autenticado
exports.usuarioAtenticado = async (req, res) => {
  try {
    // req tiene almacenado el usuario en el middleware
    // -password es para no traer el password
    const usuario = await Usuario.findById(req.usuario.id).select("-password");
    return res.json({ usuario });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: " Hubo un error" });
  }
};
