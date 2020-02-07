function defineBlocks() {

    let prenda = {
      nombre: "",
      stock: "",
      codigoBarras: "",
      marca: "",
      color: "",
      talle: "",
      familia: ""
    };

    let respuesta = {
      error: false,
      codigo: 200,
      mensaje: ""
    };

    var esquemaPOST = {
      "id": "/All",
      "type": "object",
      "properties": {
            "marca": {
              "type": "integer",
              "required": true,
              "minimum": 0
            },
            "proveedor": {
              "type": "integer",
              "required": true,
              "minimum": 0
            },
            "industria": {
              "type": "integer",
              "required": true,
              "minimum": 0
            },
            "color": {
              "type": "integer",
              "required": true,
              "minimum": 0
            },
            "talle": {
              "type": "integer",
              "required": true,
              "minimum": 0
            },
            "familia": {
              "type": "integer",
              "required": true,
              "minimum": 0
            },
            "codigoBarras": {
              "type": "integer",
              "required": true,
              "minimum": 0
            },
            "nombre": {
              "type": "string",
              "required": true,
              "minLength": 1,
              "maxLength": 50
            },
            "precio": {
              "type": "number",
              "required": true,
              "minimum": 0       
            },
            "stock": {
              "type": "integer",
              "required": true,
              "minimum": 0
            },
            "iva": {
              "type": "integer",
              "required": true,
              "minimum": 0
            }
        }
    };
    return { respuesta, prenda, esquemaPOST};
  }

  module.exports = {defineBlocks};
