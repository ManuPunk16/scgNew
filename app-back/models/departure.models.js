const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departureSchema = new Schema({ 
    num_folio : { type : Number, required: true },
    num_oficio : { type : String, required : true },
    fecha_oficio : { type : String, required : true },
    fecha_recepcion : { type : String, required : true },
    ins_juridico : { type : String, required : true },
    remitido : { type : String, required : true },
    // origen : { type : String, required : true },
    asunto : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
    asignado : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
    estatus : { type : String, required : true, max : [127, "Max Length is 127 characters"] },
    observacion : { type : String, required : false },
    pdf_salida : { type: String, required : false }
});

module.exports = mongoose.model('Departure', departureSchema);