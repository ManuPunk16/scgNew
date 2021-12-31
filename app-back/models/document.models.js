const mongoose = require("mongoose");

const Document = mongoose.model(
  "Document",
  new mongoose.Schema({
      num_oficio: String,
      ins_juridico: String,
      fecha_recepcion: {
          type: Date, default: Date.now
      },
      remitido: String,
      origen: String,
      direccion: String,
      director: String,
      asunto: String,
      estatus: String,
      observacion: String
  })  
);

module.export = Document;