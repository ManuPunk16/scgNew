export class documents{
    public num_oficio: number;
    public ins_juridico: string;
    public fecha_oficio:string;
    public remitido:string;
    public origen:string;
    public asunto:string;
    public estatus:string;
    public observacion:string;
    
    constructor(
        num_oficio:number,
        ins_juridico: string,
        fecha_oficio:string,
        remitido:string,
        origen:string,
        asunto:string,
        estatus:string,
        observacion:string) {
            this.num_oficio = num_oficio;
            this.ins_juridico = ins_juridico;
            this.fecha_oficio = fecha_oficio;
            this.remitido = remitido;
            this.origen = origen;
            this.asunto = asunto;
            this.estatus = estatus;
            this.observacion = observacion;
    }
}