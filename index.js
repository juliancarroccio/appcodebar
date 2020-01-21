const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let prenda = {
 nombre:'',
 stock: '',
 codigoBarras: ''
};
let respuesta = {
 error: false,
 codigo: 200,
 mensaje: ''
};
app.get('/', function(req, res) {
 respuesta = {
  error: true,
  codigo: 200,
  mensaje: 'Punto de inicio'
 };
 res.send(respuesta);
});

app.route('/prenda').get(function (req, res) {
 respuesta = {
  error: false,
  codigo: 200,
  mensaje: ''
 };
var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'dbappscanner',
   port: 3306
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});
console.log('request que puse:' + req.body.codigoBarras)
var query = connection.query('SELECT * FROM producto WHERE codigoBarra = ?', req.body.codigoBarras, function(error, result){
  if(error){
     throw error;
  }else{
     var resultado = result;
     if(resultado.length > 0){
       prenda.nombre = resultado[0].descripcion_producto;
       prenda.stock = resultado[0].stock;
       prenda.codigoBarras = resultado[0].codigoBarra;
       respuesta = {
          error: false,
          codigo: 200,
          mensaje: 'Prenda Encontrada',
          respuesta: prenda
         };
     }else{
      respuesta = {
        error: true,
        codigo: 501,
        mensaje: 'Prenda no encontrada'
       };
     }
  }
  res.send(respuesta);
}
);
 
 connection.end();
})
.post(function (req, res) {
 if(!req.body.nombre || !req.body.stock || !req.body.codigoBarras) {
  respuesta = {
   error: true,
   codigo: 502,
   mensaje: 'Los campos nombre, stock y codigoBarras son requeridos'
  };
 } else {
  if(prenda.nombre !== '' || prenda.stock !== '' || prenda.codigoBarras !== '') {
   respuesta = {
    error: true,
    codigo: 503,
    mensaje: 'La prenda ya fue creada previamente'
   };
  } else {
   prenda = {
    nombre: req.body.nombre,
    stock: req.body.stock,
    codigoBarras: req.body.codigoBarras
   };
   respuesta = {
    error: false,
    codigo: 200,
    mensaje: 'prenda creada',
    respuesta: prenda
   };
  }
 }
 
 res.send(respuesta);
})
.put(function (req, res) {
 if(!req.body.nombre || !req.body.stock || !req.body.codigoBarras) {
  respuesta = {
   error: true,
   codigo: 502,
   mensaje: 'Los campos nombre, stock y codigoBarras son requeridos'
  };
 } else {
  if(prenda.nombre === '' || prenda.stock === '' || prenda.codigoBarras === '') {
   respuesta = {
    error: true,
    codigo: 501,
    mensaje: 'La prenda no ha sido creada'
   };
  } else {
   prenda = {
    nombre: req.body.nombre,
    stock: req.body.stock,
    codigoBarras: req.body.codigoBarras
   };
   respuesta = {
    error: false,
    codigo: 200,
    mensaje: 'prenda actualizada',
    respuesta: prenda
   };
  }
 }
 
 res.send(respuesta);
})
.delete(function (req, res) {
 if(prenda.nombre === '' || prenda.stock === '' || prenda.codigoBarras === '') {
  respuesta = {
   error: true,
   codigo: 501,
   mensaje: 'La prenda no ha sido creada'
  };
 } else {
  respuesta = {
   error: false,
   codigo: 200,
   mensaje: 'prenda eliminada'
  };
  prenda = { 
   nombre: '', 
   stock: '',
   codigoBarras: '' 
  };
 }
 res.send(respuesta);
});
app.use(function(req, res, next) {
 respuesta = {
  error: true, 
  codigo: 404, 
  mensaje: 'URL no encontrada'
 };
 res.status(404).send(respuesta);
});
app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});