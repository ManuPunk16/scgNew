const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;
// var options = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];
var _date  = new Date();
var _date2  = new Date().toLocaleString('en-es', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

const documentSchema = new Schema({
    num_folio : { type : Number, required: true },
    num_folio_hijo : { type : String, required: false, uppercase: true },
    num_oficio : { type : String, required : true, uppercase: true },
    ins_juridico : { type : String, required : true, uppercase: true },
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
    remitido : { type : String, required : true, uppercase: true },
    origen : { type : String, required : true, uppercase: true },
    asignado : { type : String, required : true, uppercase: true },
    asunto : { type : String, required : true, uppercase: true },
    estatus : { type : String, required : true, uppercase: true },
    observacion : { type : String, required : false, uppercase: true },
    pdf_entrada : { type: String, required : false },
    editCount : { type: Number, required : false},
    create_user: {
      id: String,
      username: String,
      email: String,
      accessToken: String,
    },
    editor_user: {
      id: String,
      username: String,
      email: String,
      accessToken: String,
    }
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
