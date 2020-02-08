function conectarConBD() {
    var mysql = require("mysql");
    var connection = mysql.createConnection({
       host: process.env.MYSQLHOST,
       user: process.env.MYSQLUSER,
       password: process.env.MYSQLPASSWORD,
       database: process.env.MYSQLDATABASE,
       port: process.env.MYSQLPORT
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