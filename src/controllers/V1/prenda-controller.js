//modules required
var Validator = require("jsonschema").Validator;
const conectar = require("../../modules/conexion");
const blocks = require("../../modules/blocks");

//Blocks definitions
let { respuesta, prenda, esquemaPOST } = blocks.defineBlocks();

const getPrenda = (req,res)=>{
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: ""
      };
      var connection = conectar.conectarConBD();
      if (req.query.codigoBarras == null) {
        var query = connection.query(
          "SELECT * FROM producto " +
            "JOIN marca ON marca.id_marca = producto.id_producto " +
            "JOIN color ON color.id_color = producto.id_color " +
            "JOIN talle ON talle.id_talle = producto.id_talle " +
            "JOIN familia ON familia.id_familia = producto.id_familia",
          function(error, result) {
            if (error) {
              throw error;
            } else {
              var resultado = result;
              if (resultado.length > 0) {
                let aux = [];
                for (var i = 0; i < resultado.length; i++) {
                  let prendaaux = {
                    nombre: "",
                    stock: "",
                    codigoBarras: "",
                    marca: "",
                    color: "",
                    talle: "",
                    familia: ""
                  };
                  prendaaux.nombre = resultado[i].descripcion_producto;
                  prendaaux.stock = resultado[i].stock;
                  prendaaux.codigoBarras = resultado[i].codigoBarra;
                  prendaaux.marca = resultado[i].descripcion_marca;
                  prendaaux.color = resultado[i].descripcion_color;
                  prendaaux.talle = resultado[i].descripcion_talle;
                  prendaaux.familia = resultado[i].descripcion_familia;
                  aux[i] = prendaaux;
                }
                respuesta = {
                  error: false,
                  codigo: 200,
                  mensaje: "Prendas Encontradas",
                  respuesta: aux
                };
              } else {
                res.status(400);
                respuesta = {
                  error: true,
                  codigo: 400,
                  mensaje: "Sin Pendas Cargadas en Inventario"
                };
              }
            }
            res.send(respuesta);
          }
        );
      } else {
        var query = connection.query(
          "SELECT * FROM producto " +
            "JOIN marca ON marca.id_marca = producto.id_producto " +
            "JOIN color ON color.id_color = producto.id_color " +
            "JOIN talle ON talle.id_talle = producto.id_talle " +
            "JOIN familia  f ON f.id_familia = producto.id_familia " +
            "WHERE producto.stock > 0 AND f.id_familia = (SELECT id_familia FROM producto WHERE codigoBarra = ?)",
          req.query.codigoBarras,
          function(error, result) {
            if (error) {
              throw error;
            } else {
              var resultado = result;
              if (resultado.length > 0) {
                let aux = [];
                for (var i = 0; i < resultado.length; i++) {
                  let prendaaux = {
                    nombre: "",
                    stock: "",
                    codigoBarras: "",
                    marca: "",
                    color: "",
                    talle: "",
                    familia: ""
                  };
                  prendaaux.nombre = resultado[i].descripcion_producto;
                  prendaaux.stock = resultado[i].stock;
                  prendaaux.codigoBarras = resultado[i].codigoBarra;
                  prendaaux.marca = resultado[i].descripcion_marca;
                  prendaaux.color = resultado[i].descripcion_color;
                  prendaaux.talle = resultado[i].descripcion_talle;
                  prendaaux.familia = resultado[i].descripcion_familia;
                  aux[i] = prendaaux;
                }
                respuesta = {
                  error: false,
                  codigo: 200,
                  mensaje: "Prendas Encontradas",
                  respuesta: aux
                };
              } else {
                res.status(400);
                respuesta = {
                  error: true,
                  codigo: 400,
                  mensaje: "Sin stock de productos o Producto no válido"
                };
              }
            }
            res.send(respuesta);
          }
        );
      }
      connection.end();
};


const createPrenda = (req,res)=>{
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: ""
      };


      //validación del request
      var v = new Validator();
      var valid = v.validate(req.body, esquemaPOST);
      console.log(valid);


      /* var connection = conectar.conectarConBD();
     
     var query = connection.query('INSERT INTO producto VALUES (?,?,?,?,?,'?',?,?,?)',req.body.marca,req.body.proveedor,req.body.industria,req.body.color,req.body.talle,req.body.familia,codigoBarras,req.body.nombre,req.body.precio,req.body.stock,req.body.iva,  function (error, result) {
        if (error) {
           throw error;
        } else {
           var resultado = result;
           if (resultado.length > 0) {
              prenda.nombre = resultado[0].descripcion_producto;
              prenda.stock = resultado[0].stock;
              prenda.codigoBarras = resultado[0].codigoBarra;
              prenda.marca = resultado[0].descripcion;
              respuesta = {
                 error: false,
                 codigo: 200,
                 mensaje: 'Prenda Encontrada',
                 respuesta: prenda
              };
           } else {
              res.status(400);
              respuesta = {
                 error: true,
                 codigo: 400,
                 mensaje: 'Prenda no encontrada'
              };
           }
        }
        res.send(respuesta);
     }
     );
     connection.end();*/
};

const deletePrenda = (req,res)=>{

};

const updatePrenda = (req,res)=>{

};


module.exports = {createPrenda, deletePrenda, getPrenda, updatePrenda};