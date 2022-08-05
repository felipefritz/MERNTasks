//1: importar modelo
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator"); // para revisar si hay errores
const { request } = require("express");

//2: Crear funcion asyncriona que reibe request y response
exports.CrearProyecto = async (req, res) => {
  try {
    //validar errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      //si errores no esta vacio, se envia un arreglo con todos los errores
      return res.status(400).json({ errores: errores.array() });
    }
    //crear nuevo proyecto
    const proyecto = new Proyecto(req.body);
    // guardar creador via jwt
    proyecto.creador = req.usuario.id;
    // Guardar proytecto en db
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    res.status(500).send("Hubo un error" + error);
  }
};

// Obtener proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
  try {
    console.log(req.usuario);
    // query a base de datos : todos los proyectos del usuario ordenados
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });
    res.json({ proyectos });
  } catch (error) {
    res.status(500).send("Hubo el siguiente error: " + error);
  }
};

exports.actualizarProyecto = async (req, res) => {
  //validar
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //extraer proyecto
  const { nombre } = req.body;
  // instanciar un proyecto vacio
  const nuevoProyecto = {};
  //
  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }
  // si se utiliza async, siempre se debe utilizar await al hacer la consulta ala bd
  try {
    //revisar el id
    let proyecto = await Proyecto.findById(req.params.id);
    console.log(proyecto.id);
    //si el proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //verificar creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // actualizar
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );
    res.json({ proyecto });
  } catch (error) {
    res.status(500).send("error en el servidor: " + error);
  }
};

// Elimina proyecto por id
exports.eliminarProyecto = async (req, res) => {
  try {
    //revisar el id
    let proyecto = await Proyecto.findById(req.params.id);
    //si el proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //verificar creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }
  } catch (error) {
    res.status(500).send("error en el servidor: " + error);
  }
  //Eliminar proyecto
  console.log(req.params.id);

  await Proyecto.findOneAndRemove({ _id: req.params.id });

  res.json({ msg: "Proyecto eliminado" });
};
