const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departureSchema = new Schema({
    num_folio : { type : Number, required: true },
    num_oficio : { type : String, required : true },
    fecha_oficio : { type : String, required : true },
    fecha_vencimiento : { type : String, required : false },
    fecha_recepcion : { type : String, required : false },
    ins_juridico : { type : String, required : true },
    dirigido : { type : String, required : true },
    dependencia: { type: String, required: true },
    asunto : { type : String, required : true },
    anexo : { type : String, required : false },
    firma_visado: { type: String, required : false },
    observacion : { type : String, required : false },
    pdf_salida : { type: String, required : false },
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

module.exports = mongoose.model('Departure', departureSchema);
