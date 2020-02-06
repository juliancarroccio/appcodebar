function conectarConBD() {
    var mysql = require("mysql");
    var connection = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "root",
       database: "dbappscanner",
       port: 3306
    });
    connection.connect(function (error) {
       if (error) {
          throw error;
       }
       else {
          console.log("Conexion correcta.");
       }
    });
    return connection;
 }

 module.exports = {conectarConBD};