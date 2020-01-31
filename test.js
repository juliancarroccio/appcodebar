let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000';


describe('Prueba GET: ', () => {
    it('Obtiene status 200 OK', (done) => {
        chai.request(url)
            .get('/prenda')
            .end(function (err, res) {

                expect(res).to.have.status(200);
                done();
            });
    });
    it('Obtiene todas las prendas en BD', (done) => {
        chai.request(url)
            .get('/prenda')
            .end(function (err, res) {
                var cantidadPrendas = Object.keys(res.body).length;
                var mysql = require('mysql');

                var con = mysql.createConnection({
                    host: "localhost",
                    user: "root",
                    password: "root",
                    database: "dbappscanner"
                });

                con.connect(function (err) {
                    if (err) throw err;
                    con.query("SELECT * FROM producto", function (err, result, fields) {
                        if (err) throw err;
                        var cantTuplas = Object.keys(result).length
                        expect(res.body).to.have.property('respuesta').to.have.lengthOf(cantTuplas);
                    });
                });
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Obtiene todas las prendas de su familia', (done) => {
        chai.request(url)
        
            .get('/prenda?codigoBarras=9119321')
            .end(function (err, res) {
                var mysql = require('mysql');

                var con = mysql.createConnection({
                    host: "localhost",
                    user: "root",
                    password: "root",
                    database: "dbappscanner"
                });

                con.connect(function (err) {
                    if (err) throw err;
                    con.query("SELECT COUNT(id_familia) AS cantidad FROM producto WHERE id_familia IN (SELECT id_familia FROM producto WHERE codigoBarra = 9119321)", function (err, result, fields) {
                        if (err) throw err;
                        expect(res.body).to.have.property('respuesta').to.have.lengthOf(result[0].cantidad);
                    });
                });
                expect(res).to.have.status(200);
                done();
            });
    });
    it('No Obtiene prendas con Stock Cero', (done) => {
        chai.request(url)
        
            .get('/prenda?codigoBarras=9113245')
            .end(function (err, res) {
                var mysql = require('mysql');

                var con = mysql.createConnection({
                    host: "localhost",
                    user: "root",
                    password: "root",
                    database: "dbappscanner"
                });

                con.connect(function (err) {
                    if (err) throw err;
                    con.query("SELECT COUNT(id_familia) AS cantidad FROM producto WHERE id_familia IN (SELECT id_familia FROM producto WHERE codigoBarra = 9113245) AND stock NOT IN(0)", function (err, result, fields) {
                        if (err) throw err;
                        expect(res.body).to.have.property('respuesta').to.have.lengthOf(result[0].cantidad);
                    });
                });
                expect(res).to.have.status(200);
                done();
            });
    });
});
describe('Prueba POST: ', () => {
    
    it('Obtiene status 200 OK', (done) => {
        chai.request(url)
            .get('/prenda')
            .end(function (err, res) {

                expect(res).to.have.status(200);
                done();
            });
    });

});

describe('Prueba PUT: ', () => {
    
    it('Obtiene status 200 OK', (done) => {
        chai.request(url)
            .get('/prenda')
            .end(function (err, res) {

                expect(res).to.have.status(200);
                done();
            });
    });

});

describe('Prueba DELETE: ', () => {
    
    it('Obtiene status 200 OK', (done) => {
        chai.request(url)
            .get('/prenda')
            .end(function (err, res) {

                expect(res).to.have.status(200);
                done();
            });
    });
});
