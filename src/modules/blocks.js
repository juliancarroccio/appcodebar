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

    let prendaPOST = {
      marca: "",
      proveedor: "",
      industria: "",
      color: "",
      talle: "",
      familia: "",
      codigoBarras: "",
      nombre: "",
      precio: "",
      stock: "",
      iva: ""
    };
    return { respuesta, prenda, prendaPOST };
  }

  module.exports = {defineBlocks};
