//modules required
const express = require("express");
const routesV1 = require("./routes/V1")
//const routes = require("./routes");
const bodyParser = require("body-parser");
const blocks = require("./modules/blocks");
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
//routes(app);

//Listen del puerto
app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});