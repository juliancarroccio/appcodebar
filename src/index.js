//modules required
const express = require("express");
const bodyParser = require("body-parser");
const routesV1 = require("./routes/V1")
const blocks = require("./modules/blocks");
const dotenv = require("dotenv");

//init eviroment variables and express app
dotenv.config();
const app = express();

//express definitions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Blocks definitions
let { respuesta, prenda, esquema } = blocks.defineBlocks();

/*
 * API's Documentation in https://app.swaggerhub.com/apis/juliancarroccio4/crudPrendas/1.0.0#/prenda
 */
routesV1(app);

//Listen del puerto
app.listen(process.env.APPPORT, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});