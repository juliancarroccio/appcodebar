const prendaRoutes = require("./prenda-routes");

module.exports = (app)=>{
    
    app.use('/v1/prenda', prendaRoutes);

    //Respuesta en caso de tener un URL Invalido (404)
    app.use(function(req, res, next) {
    respuesta = {
      error: true,
      codigo: 404,
      mensaje: "URL no encontrada"
    };
    res.status(404).send(respuesta);
  });
}