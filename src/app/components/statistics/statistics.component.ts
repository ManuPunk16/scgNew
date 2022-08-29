import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { DocumentService } from 'src/app/service/document.service';
import { ChartComponent } from "@progress/kendo-angular-charts";
import { saveAs } from "@progress/kendo-file-saver";
import { SeriesLabels } from "@progress/kendo-angular-charts";
import { Document } from 'src/app/models/document';
import { Category } from 'src/app/models/model.chart';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { FormatSettings } from "@progress/kendo-angular-dateinputs";
import { Asignacion } from 'src/app/models/areas';
import { NotificationService } from "@progress/kendo-angular-notification";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [DocumentService]
})

export class StatisticsComponent implements OnInit {

  @ViewChild("chart")
  private chart!: ChartComponent;

  public doc: Document;
  public minRange1!: string;
  public maxRange1!: string;
  public asignacion = Asignacion.asignacion;
  public loading!: boolean;
  public textOne!: string;
  public textTwo!: string;

  public range = { start: null, end: null };

  public format: FormatSettings = {
    displayFormat: "yyyy/MM/dd",
    inputFormat: "yyyy/MM/dd",
  };

  dateForm = new UntypedFormGroup({
    minDate1: new UntypedFormControl(''),
    maxDate1: new UntypedFormControl(''),
    optionMenu: new UntypedFormControl('')
  });

  public concluidoPrueba: number[] = [];
  public tramitePrueba: number[] = [];
  public conocimientoPrueba: number[] = [];
  public concluidoPrueba2: number[] = [];
  public tramitePrueba2: number[] = [];
  public conocimientoPrueba2: number[] = [];
  public isShown: boolean = false ;
  public isShown2: boolean = false ;

  public documents: Document[] = [];

  public categories: string[] = [
    'CJ',     //0
    'SPCS',   //1
    'DGC',    //2
    'DGdC',   //3
    'DEL',    //4
    'DEJ',    //5
    'DSL',    //6
    'DATCC',  //7
    'DCNAIG', //8
    'DCCG',   //9
    'DA',     //10
    'UT'      //11
  ];

  public categorieArea: string[] = [];

  constructor(
    private _documentService: DocumentService,
    private notificationService: NotificationService,
    private zone: NgZone,
    ){
    this.doc = new Document;
    this.minRange1;
    this.asignacion;
  }

  ngOnInit(): void {
  }

  textBoxDisabled = true;

  toggle(){
    this.textBoxDisabled = !this.textBoxDisabled;
  }

  recargar(){
    this.zone.runOutsideAngular(() => {
      location.reload();
    });
  }

  onSubmit(){
    if (
        this.dateForm.value.minDate1 &&
        this.dateForm.value.maxDate1 &&
        this.dateForm.value.optionMenu != '') {
      this.loading = true;
      // console.log(this.dateForm.value);
      if (this.dateForm.value.optionMenu === 'CONSEJERIA JURÍDICA') {
        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents.filter(
              ({estatus}) => estatus === 'EN TRAMITE'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.tramitePrueba[0] = result;
          },
          err => {
            console.log(err);
          }
        );
        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents.filter(
              ({estatus}) => estatus === 'CONCLUIDO'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.concluidoPrueba[0] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents.filter(
              ({estatus}) => estatus === 'PARA CONOCIMIENTO'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.textOne = "ENTRADA DE DOCUMENTOS DESDE: " + this.dateForm.value.minDate1 + " HASTA: " + this.dateForm.value.maxDate1;
            this.categorieArea[0] = this.dateForm.value.optionMenu;
            this.conocimientoPrueba[0] = result;
            this.isShown = true;
            console.log("Consultando grafica general CJ");
          },
          err => {
            console.log(err);
          }
        );

        this.loading = true;

        //DATOS OTRA GRAFICA GENERAL
        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'EN TRAMITE'
              ).filter(({asignado}) => asignado === 'OFICINA DEL CONSEJERO JURÍDICO'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.tramitePrueba2[0] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'CONCLUIDO'
              ).filter(({asignado}) => asignado === 'OFICINA DEL CONSEJERO JURÍDICO'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.concluidoPrueba2[0] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
              ).filter(({asignado}) => asignado === 'OFICINA DEL CONSEJERO JURÍDICO'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.conocimientoPrueba2[0] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'EN TRAMITE'
              ).filter(({asignado}) => asignado === 'SECRETARIA PARTICULAR Y DE COMUNICACIÓN SOCIAL'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.tramitePrueba2[1] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'CONCLUIDO'
              ).filter(({asignado}) => asignado === 'SECRETARIA PARTICULAR Y DE COMUNICACIÓN SOCIAL'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.concluidoPrueba2[1] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
              ).filter(({asignado}) => asignado === 'SECRETARIA PARTICULAR Y DE COMUNICACIÓN SOCIAL'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.conocimientoPrueba2[1] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'EN TRAMITE'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN GENERAL CONSULTIVA'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.tramitePrueba2[2] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'CONCLUIDO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN GENERAL CONSULTIVA'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.concluidoPrueba2[2] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN GENERAL CONSULTIVA'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.conocimientoPrueba2[2] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'EN TRAMITE'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN GENERAL DE LO CONTENCIOSO'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.tramitePrueba2[3] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'CONCLUIDO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN GENERAL DE LO CONTENCIOSO'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.concluidoPrueba2[3] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN GENERAL DE LO CONTENCIOSO'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.conocimientoPrueba2[3] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'EN TRAMITE'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS LEGISLATIVOS'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.tramitePrueba2[4] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'CONCLUIDO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS LEGISLATIVOS'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.concluidoPrueba2[4] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS LEGISLATIVOS'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.conocimientoPrueba2[4] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'EN TRAMITE'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS JURÍDICOS'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.tramitePrueba2[5] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'CONCLUIDO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS JURÍDICOS'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.concluidoPrueba2[5] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS JURÍDICOS'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.conocimientoPrueba2[5] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'EN TRAMITE'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE SERVICIOS LEGALES'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.tramitePrueba2[6] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'CONCLUIDO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE SERVICIOS LEGALES'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.concluidoPrueba2[6] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE SERVICIOS LEGALES'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.conocimientoPrueba2[6] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'EN TRAMITE'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.tramitePrueba2[7] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'CONCLUIDO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.concluidoPrueba2[7] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.conocimientoPrueba2[7] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'EN TRAMITE'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.tramitePrueba2[8] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'CONCLUIDO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.concluidoPrueba2[8] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.conocimientoPrueba2[8] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'EN TRAMITE'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.tramitePrueba2[9] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'CONCLUIDO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.concluidoPrueba2[9] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.conocimientoPrueba2[9] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'EN TRAMITE'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN ADMINISTRATIVA'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.tramitePrueba2[10] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'CONCLUIDO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN ADMINISTRATIVA'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.concluidoPrueba2[10] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
              ).filter(({asignado}) => asignado === 'DIRECCIÓN ADMINISTRATIVA'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.conocimientoPrueba2[10] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'EN TRAMITE'
              ).filter(({asignado}) => asignado === 'UNIDAD DE TRANSPARENCIA'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.tramitePrueba2[11] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'CONCLUIDO'
              ).filter(({asignado}) => asignado === 'UNIDAD DE TRANSPARENCIA'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.concluidoPrueba2[11] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
              ).filter(({asignado}) => asignado === 'UNIDAD DE TRANSPARENCIA'
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.conocimientoPrueba2[11] = result;
            this.isShown2 = true;
            this.loading = false;
            this.textTwo = "ENTRADA DE DOCUMENTOS POR ÁREA DESDE: " + this.dateForm.value.minDate1 + " HASTA: " + this.dateForm.value.maxDate1;
          },
          err => {
            console.log(err);
          }
        );
      }

      // IF PARA MOSTRAR SOLO UNA GRAFICA
      if(this.dateForm.value.optionMenu != 'CONSEJERIA JURÍDICA') {
        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'CONCLUIDO'
              ).filter(({asignado}) => asignado == this.dateForm.value.optionMenu
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.concluidoPrueba[0] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'EN TRAMITE'
              ).filter(({asignado}) => asignado == this.dateForm.value.optionMenu
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            this.tramitePrueba[0] = result;
          },
          err => {
            console.log(err);
          }
        );

        this._documentService.getDocuments().subscribe(
          res => {
            this.documents = res.document;
            const result = this.documents
              .filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
              ).filter(({asignado}) => asignado == this.dateForm.value.optionMenu
              ).filter(({fecha_recepcion}) => fecha_recepcion >= this.dateForm.value.minDate1 && fecha_recepcion <= this.dateForm.value.maxDate1
            ).length;
            // console.log(result);
            // console.log(this.dateForm.value.optionMenu);
            this.categorieArea[0] = this.dateForm.value.optionMenu;
            this.conocimientoPrueba[0] = result;
            this.textOne = "ENTRADAS DE DOCUMENTOS DEL ÁREA DESDE: " + this.dateForm.value.minDate1 + " HASTA: " + this.dateForm.value.maxDate1;
            this.loading = false;
            this.isShown = true;
          },
          err => {
            console.log(err);
          }
        );
      }
      // FIN IF PARA MOSTRAR SOLO UNA GRAFICA
    } else {
      this.showSubmitError();
    }
  }

  public showSubmitError(): void {
    this.notificationService.show({
      content: "Verifica que tu información que insertas sea la correcta!",
      hideAfter: 1500,
      position: { horizontal: "left", vertical: "top" },
      animation: { type: "fade", duration: 700 },
      type: { style: "warning", icon: true, },
    });
  }

  public exportChart(): void {
    this.chart.exportImage().then((dataURI) => {
      saveAs(dataURI, "chart.png");
    });
  }

  public seriesLabels: SeriesLabels = {
    visible: true, // Note that visible defaults to false
    padding: 3,
    font: "bold 12px Arial, sans-serif",
  };
}
