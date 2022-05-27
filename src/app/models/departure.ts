export class Departure{
  public _id!: string;
  public num_folio!: number;
  public num_oficio?: string;
  public ins_juridico?: string;
  public fecha_recepcion: any;
  public fecha_oficio: any;
  public fecha_vencimiento: any;
  public dirigido!: string;
  public dependencia!: string;
  public anexo!: string;
  public asunto!: string;
  public firma_visado!: string;
  public observacion!: string;
  public pdf_salida!: null;
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
}
