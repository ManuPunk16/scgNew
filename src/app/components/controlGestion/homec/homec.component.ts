import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';
import { Document } from 'src/app/models/document';
import { Global } from 'src/app/service/global';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../service/user.service';
import { TokenStorageService } from '../../../service/token-storage.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Instrumentos } from 'src/app/models/instrumento';
import { Asignacion } from 'src/app/models/areas';
import { Estatus } from 'src/app/models/estatus';
import { InstitucionOrigen } from 'src/app/models/institucion';

//Telerik
import { DataBindingDirective, GridComponent } from "@progress/kendo-angular-grid";
import { PageChangeEvent, PageSizeItem } from "@progress/kendo-angular-grid";
import { NotificationService } from "@progress/kendo-angular-notification";

@Component({
  selector: 'app-homec',
  templateUrl: './homec.component.html',
  styleUrls: ['./homec.component.css'],
  providers: [DocumentService]
})
export class HomecComponent implements OnInit {

  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;

  public pageSize = 10;
  public skip = 0;
  public pageSizes: (PageSizeItem | number)[] = [
    10,
    50,
    100,
    {
      text: "All",
      value: "all",
    },
  ];

  public formGroup!: FormGroup;

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  public title: string;
  public instrumento = Instrumentos.instrumentos;
  public asignacion = Asignacion.asignacion;
  public estat = Estatus.estatus;
  public variable: Array<any>;
  public ubicacion = InstitucionOrigen.institucion;
  public documents: Document[] = [];
  public gridView: Document[] = [];
  public pdfEntry: Array<File> = [];
  public pdfExit: Array<File> = [];

  public doc: Document;
  public document!: Document;
  public docEdit: Document;
  public docDelete: Document;
  public status: string = "";
  public selectedId: any;

  content?: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".pdf,.PDF",
    uploadAPI: {
      url: Global.url + 'subir-entrada/',
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Subir pdf de entrada',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  closeResult!: string;
  getDismissReason: any;

  documentInsertData = new FormGroup({
    num_folio: new FormControl('', Validators.required),
    num_folio_hijo: new FormControl(''),
    num_oficio: new FormControl('', Validators.required),
    fecha_oficio: new FormControl('', Validators.required),
    fecha_vencimiento: new FormControl(''),
    fecha_recepcion: new FormControl('', Validators.required),
    ins_juridico: new FormControl('', Validators.required),
    remitido: new FormControl('', Validators.required),
    origen: new FormControl('', Validators.required),
    asunto: new FormControl('', Validators.required),
    asignado: new FormControl('', Validators.required),
    estatus: new FormControl('', Validators.required),
    observacion: new FormControl(''),
    editCount: new FormControl(0),
    create_user: new FormControl(this.tokenStorageService.getUser())
  });

  constructor(
    public formulario: FormBuilder,
    private _documentService: DocumentService,
    private _router: Router,
    private zone: NgZone,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    public modal: NgbModal,
    private notificationService: NotificationService
  ) {

    this.title = "Gestor";

    this.doc = new Document;
    this.docEdit = new Document;
    this.docDelete = new Document;

    this.asignacion;
    this.instrumento;
    this.estat;
    this.ubicacion;

    this.variable = this.ubicacion.sort((a, b) => (a.institucion > b.institucion) ? 1 : -1);
  }

  pdfUploadEntry(data: any) {
    let document_data = JSON.parse(data.response);
    this.doc.pdf_entrada = document_data.pdf_entrada;
  }

  ngOnInit(): void {
    this.gridView = this.documents;
    this.getDocs();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }

  getDocs() {
    //Mostrar contenido tabla principal
    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        this.documents.sort(
          (a, b) => (a.num_folio > b.num_folio) ? -1 : 1
        );
        // console.log(this.documents);
      },
      err => console.log(err)
    );
  }

  onSubmit() {
    this._documentService.create(this.documentInsertData.value).subscribe(
      response => {
        if (response.status === 'Success') {
          this.status = 'success';
          this.zone.runOutsideAngular(() => {
            location.reload();
          });
        } else {
          this.showSubmitError();
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

  capturarEntrada(event: any): any {
    const entradaCapturada = event.target.files[0];
    console.log(entradaCapturada);
  }

  capturarSalida(event: any): any {
    const entradaCapturada = event.target.files[0];
    console.log(entradaCapturada);
  }

  public opened = false;

  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

  public sliderChange(pageIndex: number): void {
    this.skip = (pageIndex - 1) * this.pageSize;
  }

  public onPageChange(state: PageChangeEvent): void {
    this.pageSize = state.take;
  }

  openEdit(content: any) {
    this.modal.open(content, { size: 'lg' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason}`;
      }
    );
  }

  getDocumentById(dataItem: any): void {
    let documentEdit = dataItem;
    const object = dataItem;
    const deepClone = JSON.parse(JSON.stringify(object));
    this.document = deepClone;
    this.docEdit = documentEdit;
    this.docEdit.editor_user = this.tokenStorageService.getUser();
    this.docEdit.editCount = dataItem.editCount + 1;
    console.log(this.docEdit);
  }

  deleteDocumentById(dataItem: any): void{
    this.docDelete = dataItem;
    this._documentService.delete(this.docDelete._id).subscribe(
      response => {
        console.log(response);
        this.zone.runOutsideAngular(() => {
          location.reload();
        });
      },
      error => {
        console.log(error);
        this.zone.runOutsideAngular(() => {
          location.reload();
        });
      }
    );
  }

  onEdit(){
    if (
      // (this.depEdit.num_folio !== this.departure.num_folio) ||
      (this.docEdit.num_folio_hijo !== this.document.num_folio_hijo) ||
      (this.docEdit.num_oficio !== this.document.num_oficio) ||
      (this.docEdit.fecha_oficio !== this.document.fecha_oficio) ||
      (this.docEdit.fecha_vencimiento !== this.document.fecha_vencimiento) ||
      (this.docEdit.fecha_recepcion !== this.document.fecha_recepcion) ||
      (this.docEdit.ins_juridico !== this.document.ins_juridico) ||
      (this.docEdit.remitido !== this.document.remitido) ||
      (this.docEdit.origen !== this.document.origen) ||
      (this.docEdit.asunto !== this.document.asunto) ||
      (this.docEdit.asignado !== this.document.asignado) ||
      (this.docEdit.estatus !== this.document.estatus) ||
      (this.docEdit.observacion !== this.document.observacion)
    ) {
      this._documentService.update(this.docEdit._id, this.docEdit).subscribe(
        res => {
          this.docEdit.editor_user = this.tokenStorageService.getUser();
          this.docEdit.editCount + 1;
          this.showEditSuccess();
          this.modal.dismissAll();
        },
        error => {
          console.log(error);
          this.showEditError();
        }
      );
    } else {
      this.showWarningError();
      this.modal.dismissAll();
    }
  }

  public showSubmitError(): void {
    this.notificationService.show({
      content: "Verifica que tu información que insertas sea la correcta!",
      hideAfter: 900,
      position: { horizontal: "left", vertical: "top" },
      animation: { type: "fade", duration: 700 },
      type: { style: "warning", icon: true, },
    });
  }

  public showEditSuccess(): void {
    this.notificationService.show({
      content: "Documento Editado con Exito!",
      hideAfter: 900,
      position: { horizontal: "left", vertical: "top" },
      animation: { type: "fade", duration: 700 },
      type: { style: "success", icon: true },
    });
  }

  public showEditError(): void {
    this.notificationService.show({
      content: "Hay un error!",
      hideAfter: 900,
      position: { horizontal: "left", vertical: "top" },
      animation: { type: "fade", duration: 700 },
      type: { style: "error", icon: true },
    });
  }

  public showWarningError(): void {
    this.notificationService.show({
      content: "No se realizo ninguna modificación!",
      hideAfter: 900,
      position: { horizontal: "left", vertical: "top" },
      animation: { type: "fade", duration: 700 },
      type: { style: "warning", icon: true },
    });
  }

}
