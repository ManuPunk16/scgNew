import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';
import { Document } from 'src/app/models/document';
import { Global } from 'src/app/service/global';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../service/user.service';
import { TokenStorageService } from '../../../service/token-storage.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

//Telerik
import { DataBindingDirective, GridComponent } from "@progress/kendo-angular-grid";
import { PageChangeEvent, PageSizeItem } from "@progress/kendo-angular-grid";

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
  public instrumento: Array<any>;
  public asignacion: Array<any>;
  public variable: Array<any>;
  public ubicacion: Array<any>;
  public estat: Array<any>;
  public documents: Document[] = [];
  public gridView: Document[] = [];
  public pdfEntry: Array<File> = [];
  public pdfExit: Array<File> = [];

  public doc: Document;
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

  constructor(
    public formulario: FormBuilder,
    private _documentService: DocumentService,
    private _router: Router,
    private zone: NgZone,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    public modal: NgbModal
  ) {

    this.title = "Gestor";

    this.doc = new Document;
    this.docEdit = new Document;
    this.docDelete = new Document;

    this.asignacion = [
      {
        direccion: "Oficina del Consejero Jurídico"
      },
      {
        direccion: "Secretaria Partiular y de Comunicación Social"
      },
      {
        direccion: "Dirección de Coordinación y Control de Gestión"
      },
      {
        direccion: "Dirección General Contenciosa"
      },
      {
        direccion: "Dirección de Asistencia Técnica y Combate a la Corrupción"
      },
      {
        direccion: "Dirección de Servicios Legales"
      },
      {
        direccion: "Dirección General Consultiva"
      },
      {
        direccion: "Dirección de Estudios Legislativos"
      },
      {
        direccion: "Dirección de Estudios Jurídicos"
      },
      {
        direccion: "Dirección de Compilación Normativa, Archivo e Igualdad de Género"
      },
      {
        direccion: "Dirección Administrativa"
      }
    ];

    this.ubicacion = [
      {
        institucion: "Secretaría de Gobierno"
      },
      {
        institucion: "Secretaría de Administración y Finanzas"
      },
      {
        institucion: "Secretaría de Modernización Administración e Innovación Gubernamental"
      },
      {
        institucion: "Secretaría de Educación"
      },
      {
        institucion: "Secretaría de Salud"
      },
      {
        institucion: "Secretaría de Desarrollo Territorial, Urbano y Obras Públicas"
      },
      {
        institucion: "Secretaría de Desarrollo Económico"
      },
      {
        institucion: "Secretaría de Desarrollo Agropecuario"
      },
      {
        institucion: "Secretaría de Bienestar"
      },
      {
        institucion: "Secretaría de Medio Ambiente, Biodiversidad, Cambio Climático y Energía"
      },
      {
        institucion: "Secretaría de Turismo"
      },
      {
        institucion: "Secretaría de Protección y Seguridad Ciudadana."
      },
      {
        institucion: "Secretaría de Protección Civil"
      },
      {
        institucion: "Secretaria de Contraloría"
      },
      {
        institucion: "Fiscalía General del Estado de Campeche"
      },
      {
        institucion: "Autoridad del Patrimonio Cultural del Estado de Campeche"
      },
      {
        institucion: "Instituto de Pesca y Acuacultura del Estado de Campeche"
      },
      {
        institucion: "Instituto de Cultura y Artes del Estado de Campeche"
      },
      {
        institucion: "Sistema de Televisión y Radio de Campeche"
      },
      {
        institucion: "Instituto de Información Estadística,Geografíca y Catastral del Estado"
      },
      {
        institucion: "Universidad Tecnológica de Campeche"
      },
      {
        institucion: "Universidad Tecnológica de Calakmul"
      },
      {
        institucion: "Universidad Tecnológica de Candelaria"
      },
      {
        institucion: "Instituto Tecnológico Superior de Calkiní"
      },
      {
        institucion: "Instituto Tecnológico Superior de Escárcega"
      },
      {
        institucion: "Instituto Tecnológico Superior de Champotón"
      },
      {
        institucion: "Instituto Tecnológico Superior de Hopelchén"
      },
      {
        institucion: "Instituto Estatal de la Educación para los Adultos"
      },
      {
        institucion: "Instituto de Capacitación para el Trabajo del Estado de Campeche"
      },
      {
        institucion: "Instituto de la Infraestructura Física Educativa del Estado de Campeche"
      },
      {
        institucion: "Colegio de Bachilleres del Estado de Campeche"
      },
      {
        institucion: "Colegio de Estudios Científicos y Técnologicos del Estado de Campeche"
      },
      {
        institucion: "Colegio de Educación Profesional Técnica del Estado de Campeche"
      },
      {
        institucion: "Consejo Estatal de Investigación Científica y Desarrollo Tecnólogico"
      },
      {
        institucion: "Fundación Pablo García"
      },
      {
        institucion: "Hospital 'Dr. Manuel Campos'"
      },
      {
        institucion: "Hospital Psiquiátrico de Campeche"
      },
      {
        institucion: "Sistema de Atención de Niños, Niñas y Adolescentes Farmacodependientes de Campeche 'Vida Nueva'"
      },
      {
        institucion: "Sistema para el Desarrollo Integral de la Familia del Estado de Campeche"
      },
      {
        institucion: "Instituto de la Mujer del Estado de Campeche"
      },
      {
        institucion: "Instituto de la Juventud del Estado de Campeche"
      },
      {
        institucion: "Instituto del Deporte del Estado de Campeche"
      },
      {
        institucion: "Instituto de Desarrollo y Formación Social del Estado de Campeche"
      },
      {
        institucion: "Comisión Estatal de Desarrollo de Suelo y Vivienda"
      },
      {
        institucion: "Instituto Estatal para el Fomento de las Actividades Artesanales en Campeche"
      },
      {
        institucion: "Comisión de Agua Potable y Alcantarillado del Estado de Campeche"
      },
      {
        institucion: "Promotora de Eventos Artísticos, Culturales y de Convenciones del Estado de Campeche"
      },
      {
        institucion: "Agencia de Energía del Estado Campeche"
      },
      {
        institucion: "Instituto Campechano"
      },
      {
        institucion: "Secretaría Ejecutiva del Sistema Anticorrupción"
      },
      {
        institucion: "Administración Portuaria Integral de Campeche, S.A. de C.V."
      },
      {
        institucion: "Fideicomiso Fondo Campeche"
      },
      {
        institucion: "Fideicomiso de Inversión del Impuesto del 2% sobre Nómina"
      },
      {
        institucion: "Fondo Estatal de Fomento Industrial del Estado de Campeche"
      },
      {
        institucion: "Instituto de Servicios Descentralizados de Salud"
      },
      {
        institucion: "Régimen Estatal de Protección Social en Salud de Campeche"
      },
      {
        institucion: "Promotora para la Conservación y Desarrollo Sustentable del Estado de Campeche "
      },
      {
        institucion: "Centro de Conciliación laboral del Estado de Campeche"
      },
      {
        institucion: "Instituto de Lenguas Indígenas del Estado de Campeche"
      },
      {
        institucion: "Fideicomiso para el Desarrollo de Parques Industriales en el Estado de Campeche"
      }
    ];

    this.variable = this.ubicacion.sort((a, b) => (a.institucion > b.institucion) ? 1 : -1);

    this.instrumento = [
      {
        name: "Leyes"
      },
      {
        name: "Reglamentos"
      },
      {
        name: "Acuerdos"
      },
      {
        name: "Decretos"
      },
      {
        name: "Lineamientos"
      },
      {
        name: "Órdenes"
      },
      {
        name: "Convenios"
      },
      {
        name: "Contratos"
      },
      {
        name: "Actas"
      }
    ];

    this.estat = [
      {
        id: 1,
        name: "En Tramite",
      },
      {
        id: 2,
        name: "Concluido"
      },
      {
        id: 3,
        name: "Para Conocimiento"
      }
    ];
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
    console.log(this.doc);
    this._documentService.create(this.doc).subscribe(
      response => {
        // console.log(response);
        if (response.status === 'Success') {
          this.status = 'success';
          this.doc = response.doc;
          this.zone.runOutsideAngular(() => {
            location.reload();
          });
        } else {
          // console.log(response);
          // this.zone.runOutsideAngular(() => {
          //   location.reload();
          // });
        }
      },
      error => {
        // console.log(error);
        this.status = 'error';
      }
    );
    // console.log(this.doc);
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
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  getDocumentById(dataItem: any): void {
    let documentEdit = dataItem;
    this.docEdit = documentEdit;
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
    this._documentService.update(this.docEdit._id, this.docEdit).subscribe(
      res => {
        console.log(res);
        this.modal.dismissAll();
      },
      error => {
        console.log(error);
      }
    );
  }

}
