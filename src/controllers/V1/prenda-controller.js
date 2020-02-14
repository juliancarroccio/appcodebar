//modules required
var Validator = require("jsonschema").Validator;
const conectar = require("../../modules/conexion");
const blocks = require("../../modules/blocks");

//Blocks definitions
let { respuesta, prenda, esquemaPOST } = blocks.defineBlocks();

const getPrenda = (req, res) => {
  //conecto con base de datos
  var connection = conectar.conectarConBD();
  //pregunto si el GET es parametrizado
  if (req.query.codigoBarras == null) {
    //Si no es parametrizado obtengo todos los productos de la base de datos
    connection.query(
      "SELECT * FROM producto " +
        "JOIN marca ON marca.id_marca = producto.id_marca " +
        "JOIN color ON color.id_color = producto.id_color " +
        "JOIN talle ON talle.id_talle = producto.id_talle " +
        "JOIN familia ON familia.id_familia = producto.id_familia",
      function(error, result) {
        if (error) {
          throw error;
        } else {
          var resultado = result;
          if (resultado.length > 0) {
            //si no hubo error en la query y obtuve por lo menos un resultado los muestro en el Response
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
            //Respuesta con productos encontrados
            respuesta = {
              error: false,
              codigo: 200,
              mensaje: "Prendas Encontradas",
              respuesta: aux
            };
          } else {
            //Si la query no encuentra coincidencias la base de datos está vacia
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
    //Si el response es parametrizado busco los productos de la misma familia y con stock mayor a cero
    connection.query(
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
            //Si no hay error en la query y el resultado tiene al menos una coincidencia las muestro en el Response
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
            //Respuesta con coincidencias encontradas
            respuesta = {
              error: false,
              codigo: 200,
              mensaje: "Prendas Encontradas",
              respuesta: aux
            };
          } else {
            //Si no se encontró productos en la query el producto no es valido o no hay stock de ningun producto de su familia
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

const createPrenda = (req, res) => {

  //validación del request
  var v = new Validator();
  var validschema = v.validate(req.body, esquemaPOST);
  console.log(validschema.valid);
  
  if (validschema.valid) {
    //Si el esquema está bien busco en BD si ya existe el codigo de barras
    var connection = conectar.conectarConBD();
    connection.query(
      "SELECT id_producto FROM producto WHERE codigoBarra = ?",
      req.body.codigoBarras,
      function(error, result,) {
        if (error) {
          throw error;
        } else {
          var resultado = result;
          if (resultado.length > 0) {
            //Si obtengo resultado el producto está en BD y no debo ingresarlo
            res.status(400);
            respuesta = {
              error: true,
              codigo: 400,
              mensaje: "La Prenda ya existe en el inventario."
            };
            res.send(respuesta);
          } else {
            //Si la query no obtiene resultado entonces ingreso la Prenda
            connection.query("INSERT INTO producto (id_marca,id_proveedor,id_industria,id_color,id_talle,id_familia,codigoBarra,descripcion_producto,precio,stock,iva) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
              [req.body.marca, req.body.proveedor, req.body.industria, req.body.color, req.body.talle,  req.body.familia,  req.body.codigoBarras, req.body.nombre, req.body.precio, req.body.stock, req.body.iva],
              function(error, result) {
                if (error) {
                  throw error;
                } else {
                  respuesta = {
                    error: false,
                    codigo: 200,
                    mensaje: "Prenda Ingresada Correctamente en inventario"
                  };
                  res.send(respuesta);
                }       
              }
            );
            
          }
          
        }
        
      }
      
    );
    
  } else {
    //Error en validación de JsonSchema
    res.status(400);
    respuesta = {
      error: true,
      codigo: 400,
      mensaje: validschema.errors
    };
    res.send(respuesta);
  }
};

const deletePrenda = (req, res) => {};

const updatePrenda = (req, res) => {};

module.exports = { createPrenda, deletePrenda, getPrenda, updatePrenda };
