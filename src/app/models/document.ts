export class Document{
        public _id!: string;
        public num_folio!: number;
        public num_folio_hijo!: number;
        public num_oficio?: string;
        public ins_juridico?: string;
        public fecha_recepcion: any;
        public fecha_oficio: any;
        public fecha_vencimiento: any;
        public remitido?: string;
        public origen?: string;
        public asignado?: string;
        public asunto?:string;
        public estatus?: string;
        public observacion?: string;
        public pdf_entrada?: null;
}
