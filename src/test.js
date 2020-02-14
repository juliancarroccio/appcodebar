let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
const conectar = require("./modules/conexion");
const dotenv = require("dotenv");

var enviromentVariables = dotenv.config();
chai.use(chaiHttp);

//const url = "http://localhost:3000"
const url = "http://".concat(process.env.APPHOST,":",process.env.APPPORT);

var con = conectar.conectarConBD();


describe("Prueba GET: ", () => {

  it("Obtiene status 200 OK", done => {
    chai
      .request(url)
      .get("/v1/prenda/obtener")
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Obtiene todas las prendas en BD", done => {
    chai
      .request(url)
      .get("/v1/prenda/obtener")
      .end(function(err, res) {
        con.query("SELECT * FROM producto", function(err, result, fields) {
          if (err) throw err;
          var cantTuplas = Object.keys(result).length;
          expect(res.body)
            .to.have.property("respuesta")
            .to.have.lengthOf(cantTuplas);
        });
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Obtiene todas las prendas de su familia", done => {
    chai
      .request(url)
      .get("/v1/prenda/obtener?codigoBarras=9113245")
      .end(function(err, res) {
        if (err) throw err;
        con.query(
          "SELECT COUNT(id_familia) AS cantidad FROM producto WHERE id_familia IN (SELECT id_familia FROM producto WHERE codigoBarra = 9113245)",
          function(err, result, fields) {
            if (err) throw err;
            expect(res.body)
              .to.have.property("respuesta")
              .to.have.lengthOf(result[0].cantidad);
          }
        );
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Busca Codigo de Barras Inexistente", done => {
    chai
      .request(url)
      .get("/v1/prenda/obtener?codigoBarras=911324554445")
      .end(function(err, res) {
        if (err) throw err;
        con.query(
          "SELECT * FROM producto WHERE codigoBarra = 911324554445",
          function(err, result, fields) {
            if (err) throw err;
            expect(res.body)
              .to.have.property("mensaje")
              .to.be.equal("Sin stock de productos o Producto no válido");
            var resultado = result;
            expect(resultado.length).to.equal(0);
          }
        );
        expect(res).to.have.status(400);
        done();
      });
  });

  it("No Obtiene prendas con Stock Cero", done => {
    chai
      .request(url)
      .get("/v1/prenda/obtener?codigoBarras=9119321")
      .end(function(err, res) {
        if (err) throw err;
        con.query(
          "SELECT COUNT(*) AS cantidad FROM producto WHERE id_familia IN (SELECT id_familia FROM producto WHERE codigoBarra = 9119321) AND stock NOT IN(0)",
          function(err, result, fields) {
            if (err) throw err;
            expect(res.body)
              .to.have.property("respuesta")
              .to.have.lengthOf(result[0].cantidad);
          }
        );
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Prueba en BD vacía", done => {
    con.query("DELETE from producto", function(err, result, fields) {
      if (err) throw err;
    });

    chai
      .request(url)
      .get("/v1/prenda/obtener")
      .end(function a(err, res) {
        expect(res.body)
          .to.have.property("mensaje")
          .to.be.equal("Sin Pendas Cargadas en Inventario");
        expect(res.body)
          .to.have.property("error")
          .to.be.equal(true);

        expect(res).to.have.status(400);

        con.query(
          "insert  into producto(id_producto,id_marca,id_proveedor,id_industria,id_color,id_talle,id_familia,codigoBarra,descripcion_producto,precio,stock,iva) values (1,1,1,1,1,4,1,9113245,'Chomba Casual Verde',650,8,21),(2,4,2,2,2,1,2,9116754,'Cartera Animal Print',1580,4,21),(3,2,2,1,5,3,3,9119321,'Pantalon Capri',1840,10,21),(4,3,2,1,4,4,3,9117431,'Pantalon Oxford',860,0,21),(5,1,1,1,1,4,1,911439,'Chomba Formal V',975,2,21)",
          function(err, result, fields) {
            if (err) throw err;
          }
        );
        done();
      });
  });
});

describe("Prueba POST: ", () => {
  it("Obtiene status 200 OK", done => {
    chai
      .request(url)
      .get("/v1/prenda/obtener")
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Prueba PUT: ", () => {
  it("Obtiene status 200 OK", done => {
    chai
      .request(url)
      .get("/v1/prenda/obtener")
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Prueba DELETE: ", () => {
  it("Obtiene status 200 OK", done => {
    chai
      .request(url)
      .get("/v1/prenda/obtener")
      .end(function(err, res) {
        console.log(process.env.APPHOST);
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Pruebas Varias: ", () => {
  it("URL invalida", done => {
    chai
      .request(url)
      .get("/v1/prenda/pathinvalido")
      .end(function(err, res) {
        expect(res).to.have.status(404);
        expect(res.body)
          .to.have.property("mensaje")
          .to.be.equal("URL no encontrada");
        expect(res.body)
          .to.have.property("error")
          .to.be.equal(true);
        done();
      });
  });
});

