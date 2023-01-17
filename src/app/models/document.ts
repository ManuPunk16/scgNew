export class Document{
  public _id!: string;
  public anio!: number;
  public num_folio!: number;
  public num_folio_hijo?: string;
  public num_oficio?: string;
  public ins_juridico?: string;
  public fecha_recepcion: any;
  public hora_recepcion: any;
  public fecha_oficio?: string;
  public fecha_vencimiento?: string;
  public remitido?: string;
  public origen?: string;
  public asignado?: string;
  public asunto?:string;
  public estatus?: string;
  public observacion?: string;
  public pdf_entrada?: null;
  public editCount!: number;
  public create_user?: {
    id: String,
    username: String,
    email: String,
    accessToken: String,
  };
  public editor_user?: {
    id: String,
    username: String,
    email: String,
    accessToken: String,
  }
  updatedAt!: Date;
}
