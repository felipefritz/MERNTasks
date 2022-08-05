const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

//crear el servidor
const app = express();

//conectar a base de datos
conectarDB();

//habilitar cors
app.use(cors());

//Habilitar express.json : permite leer datos que el usuario coloque
app.use(express.json({ extended: true }));

//CONFIGURAR PUERTO EN 4000 si no existe process en .env
const PORT = process.env.PORT || 4000;

// Importar Rutas de las api
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));

// arrancar la app Y IMPRIMIR CON COMILLAS ` `
app.listen(PORT, () => {
  console.log(`eL SERVIDOR ESTA FUNCIONANDO EN EL PUERTO ${PORT}`);
});
