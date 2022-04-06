export class Departure{
    
    constructor(
        _id = "",
        num_folio = 0,
        num_oficio = "",
        ins_juridico = "",
        fecha_recepcion = "",
        fecha_oficio = "",
        remitido = "",
        // origen = "",
        asignado = "",
        asunto = "",
        estatus = "",
        observacion = "",
        pdf_entrada = null,
        pdf_salida = null) {
            this._id = _id;
            this.num_folio = num_folio;
            this.num_oficio = num_oficio;
            this.ins_juridico = ins_juridico;
            this.fecha_recepcion = fecha_recepcion;
            this.fecha_oficio = fecha_oficio;
            this.remitido = remitido;
            // this.origen = origen;
            this.asignado = asignado;
            this.asunto = asunto;
            this.estatus = estatus;
            this.observacion = observacion;
            this.pdf_entrada = pdf_entrada;
            this.pdf_salida = pdf_salida;
    }

    _id: string;
    num_folio: number;
    num_oficio: string;
    ins_juridico: string;
    fecha_recepcion: string;
    fecha_oficio: string;
    remitido: string;
    // origen: string;
    asignado: string;
    asunto: string;
    estatus: string;
    observacion: string;
    pdf_entrada: null;
    pdf_salida: null;
}