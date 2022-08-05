// Rutas para crear usuarios

const express = require("express");

const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

const { check } = require("express-validator");
//crea un unsuario
//api/usuarios
// aca se pasa la url del endpoint
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(), // reglas a validar
    check("email", "Agrega email valido").isEmail(),
    check("password", "minimo 6 caracteres").isLength({ min: 6 }),
  ], // esto se debe validar luego en controller
  usuarioController.crearUsuario
);

module.exports = router;
