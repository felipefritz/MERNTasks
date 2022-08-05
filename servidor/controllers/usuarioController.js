const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator"); // para revisar si hay errores
const jwt = require("jsonwebtoken");

//se pone async para que sea asincrona
exports.crearUsuario = async (req, res) => {
  //validar si hay errores ( estos se validan en routes)
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    //si errores no esta vacio, se envia un arreglo con todos los errores
    return res.status(400).json({ errores: errores.array() });
  }
  // extraer email y password para validar que sea unico
  const { email, password } = req.body;

  // aca se conecta con la base de datos

  try {
    // validar que el usuario sea unico
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "Usuario ya existe" });
    }
    // crea instancia del nuevo usuario
    usuario = new Usuario(req.body);

    // Hashear password ( se debe importar byscriptjs)
    const salt = await bcryptjs.genSalt(10); // el salt codifica el password
    usuario.password = await bcryptjs.hash(password, salt); //has toma el password y el salt

    //guardar usuario
    await usuario.save();

    // crear y firmar el JWT con el id del usuario
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    //firmar el jwt 1 param: payload y la plalabra secreta
    //luego es la configuracion
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

    // mensaje de confirmacion
    //res.json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).send("hubo un error");
  }
};
