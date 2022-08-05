// Rutas para crear autenticar usuarios
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

//api/auth
//iniciar usuario
router.post(
  "/",
  // esto se debe validar luego en controller
  authController.autenticarUsuario // aca se pasa el controller al request post
);
////obtiene usuario autenticado
router.get("/", auth, authController.usuarioAtenticado);

module.exports = router;
