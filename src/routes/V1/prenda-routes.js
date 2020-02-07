const express = require("express");

const prendaController = require("../../controllers/V1/prenda-controller");

const routes = express.Router();

routes.get('/obtener', prendaController.getPrenda);
routes.post('/crear', prendaController.createPrenda);
routes.put('/actualizar', prendaController.updatePrenda);
routes.delete('/borrar', prendaController.deletePrenda);

module.exports = routes;

