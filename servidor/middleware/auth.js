const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // leer token del header
  const token = req.header("x-auth-token");
  //revisar si no hay token
  if (!token) {
    return res.status(400).json({ msg: "No hay token,no autorizado" });
  }
  // validar token
  try {
    //valida el token junto con la palabra secreta
    const cifrado = jwt.verify(token, process.env.SECRETA);
    // en el payload del usuarioController estaria el id del usuario
    req.usuario = cifrado.usuario;
    next(); // para que se vaya al siguiente middleware
  } catch (error) {
    res.status(400).json({ msg: "Token no valido" });
  }
};
