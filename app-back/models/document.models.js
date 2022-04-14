const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({ 
    num_folio : { type : Number, required: true },
    num_oficio : { type : String, required : true },
    ins_juridico : { type : String, required : true },
    fecha_recepcion : { type : String, required : true },
    fecha_oficio : { type : String, required : true },
    remitido : { type : String, required : true },
    origen : { type : String, required : true },
    asignado : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
    asunto : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
    estatus : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
    observacion : { type : String, required : false },
    pdf_entrada : { type: String, required : false }
},
{
    timestamps: { 
        createdAt: 'createdAt', 
        updatedAt: 'updatedAt' 
    },
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