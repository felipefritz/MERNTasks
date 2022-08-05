// Rutas para crear usuarios

const express = require("express");

const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

// Crea proyectos
// api/proyectos
// en controller esta la logica de crear proyecto
router.post(
  "/",
  auth, // este controller verifica el auth token luego se va al siguiente middleware
  [check("nombre", "El nombre del proyecto es requerido").not().isEmpty()],
  proyectoController.CrearProyecto
);

//1 traer proyectos de un usuario autenticado
//2 validar usuario autenticado
router.get(
  "/",
  auth, // este controller verifica el auth token luego se va al siguiente middleware
  proyectoController.obtenerProyectos
);

// Actualizar proyecto: recibe id
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es requerido").not().isEmpty()],
  proyectoController.actualizarProyecto
);
// Actualizar proyecto: recibe id
router.delete("/:id", auth, proyectoController.eliminarProyecto);
module.exports = router;
