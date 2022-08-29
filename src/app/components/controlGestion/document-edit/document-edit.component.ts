import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Document } from 'src/app/models/document';
import { Global } from 'src/app/service/global';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
  providers: [DocumentService]
})
export class DocumentEditComponent implements OnInit {

  public title: string;
  public instrumento: Array<any>;
  public asignacion: Array<any>;
  public estat: Array<any>;
  public variable: Array<any>;
  public ubicacion: Array<any>;
  documents: Document[] = [];
  public pdfEntry: Array<File> = [];
  public pdfExit: Array<File> = [];
  public url: string;

  public doc: Document;
  public status: string = "";

  constructor(
    public formulario: UntypedFormBuilder,
    private _documentService: DocumentService,
    private _route: ActivatedRoute,
    private _router: Router,
    private zone: NgZone,
    private sanitizer: DomSanitizer
  ) {

    this.title = "Gestor";
    this.url = Global.url;
    this.doc = new Document;

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
      },
      {
        name: "Otros..."
      }
    ];

    this.asignacion = [
      {
        direccion: "Consejero Jurídico"
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

  ngOnInit(): void {
    this.getDocs();
    this.getDoc();
  }

  getDocs() {
    //Mostrar contenido tabla principal
    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
      },
      err => console.log(err)
    );
  }

  onSubmit() {
    this._documentService.update(this.doc._id, this.doc).subscribe(
      response => {
        this.status = 'success';
        this.doc = response.documentUpdated;
        this._router.navigate(['/Entradas']);
        // console.log("Bien", response);
      },
      error => {
        console.log(error, "Es el error");
        this.status = 'error';
      }
    );
    // console.log(this.doc);
  }

  getDoc() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      // console.log(id);

      this._documentService.getDocument(id).subscribe(
        response => {
          if (response.document) {
            this.doc = response.document;
            // console.log(response);
          } else {
            this._router.navigate(['Entradas']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['Entradas']);
        }
      );
    });
  }

  capturarEntrada(event: any): any {
    const entradaCapturada = event.target.files[0];
    console.log(entradaCapturada);

    this._documentService.uploadExit(entradaCapturada, this.doc._id).subscribe(
      response => {
        console.log("Lo bueno: ", response);
      },
      error => {
        console.log("Lo malo:", error);
      }
    );
  }

  capturarSalida(event: any): any {
    const salidaCapturada = event.target.files[0];
    console.log(salidaCapturada);
  }
}
