const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

//todo esto se requiere para conectarse con mongoDB
const conectarDB = async () => {
  try {
    //leer connection string desde  process.env
    console.log("conectando");

    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log("database conectada");
  } catch (error) {
    console.log(error);
    process.exit(1); // detener app en caso de error
  }
};

module.exports = conectarDB;
