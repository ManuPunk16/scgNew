const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    num_oficio : { type : String, required : true },
    ins_juridico : { type : String, required : true},
    fecha_recepcion : { type : String, default: Date.now.toString('DD-MM-YYYY') },
    remitido : { type : String, required : true },
    origen : { type : String, required : true },
    direccion : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
    director : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
    asunto : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
    estatus : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
    observacion : { type : String, required : false },
    pdf_entrada : { type: String, required : false },
    pdf_salida : { type: String, required : false }
});

//moment javascript

// const Document = mongoose.model(
//   "Document",
//   new mongoose.Schema({
//       num_oficio: String,
//       ins_juridico: String,
//       fecha_recepcion: {
//           type: Date, default: Date.now
//       },
//       remitido: String,
//       origen: String,
//       direccion: String,
//       director: String,
//       asunto: String,
//       estatus: String,
//       observacion: String
//   })  
// );

// module.export = Document;

module.exports = mongoose.model('Document', documentSchema);