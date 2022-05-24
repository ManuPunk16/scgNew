const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// var options = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];
var _date  = new Date();
var _date2  = new Date().toLocaleString('en-es', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

const documentSchema = new Schema({
    num_folio : { type : Number, required: true },
    num_folio_hijo : { type : String, required: false },
    num_oficio : { type : String, required : true },
    ins_juridico : { type : String, required : true },
    fecha_recepcion : {
        type : String,
        required : true,
        default : _date2
    },
    fecha_oficio : {
        type : String,
        required : true
    },
    fecha_vencimiento : {
      type : String,
      required : false
  },
    remitido : { type : String, required : true },
    origen : { type : String, required : true },
    asignado : { type : String, required : true },
    asunto : { type : String, required : true },
    estatus : { type : String, required : true },
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
