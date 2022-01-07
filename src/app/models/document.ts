export class Document{
    
    constructor(
        _id = "",
        num_oficio = "",
        ins_juridico = "",
        fecha_recepcion = "",
        remitido = "",
        origen = "",
        direccion = "",
        director = "",
        asunto = "",
        estatus = "",
        observacion = "",
        pdf_entrada = "",
        pdf_salida = "") {
            this._id = _id;
            this.num_oficio = num_oficio;
            this.ins_juridico = ins_juridico;
            this.fecha_recepcion = fecha_recepcion;
            this.remitido = remitido;
            this.origen = origen;
            this.direccion = direccion;
            this.director = director;
            this.asunto = asunto;
            this.estatus = estatus;
            this.observacion = observacion;
            this.pdf_entrada = pdf_entrada;
            this.pdf_salida = pdf_salida;
    }

    _id: string;
    num_oficio: string;
    ins_juridico: string;
    fecha_recepcion: string;
    remitido: string;
    origen: string;
    direccion: string;
    director: string;
    asunto: string;
    estatus: string;
    observacion: string;
    pdf_entrada: string;
    pdf_salida: string;
}