import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from 'src/app/service/document.service';
import { ChartComponent } from "@progress/kendo-angular-charts";
import { saveAs } from "@progress/kendo-file-saver";
import { SeriesLabels } from "@progress/kendo-angular-charts";
import { Document } from 'src/app/models/document';
import { Category } from 'src/app/models/model.chart';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [DocumentService]
})

export class StatisticsComponent implements OnInit {

  @ViewChild("chart")
  private chart!: ChartComponent;

  public concluido: number[] = []; //Concluido
  public tramite: number[] = []; //En Tramite
  public conocimiento: number[] = []; //Para Conocimiento

  public concluidoTrim122: number[] = [];
  public tramiteTrim122: number[] = [];
  public conocimientoTrim122: number[] = [];

  public concluidoTrim222: number[] = [];
  public tramiteTrim222: number[] = [];
  public conocimientoTrim222: number[] = [];

  public dateRange = {
    start: "2022-04",
    end: "2022-06"
  };
  public startDate = new Date(this.dateRange.start);
  public endDate = new Date(this.dateRange.end);

  public documents: Document[] = [];

  public gridData: Category[] = [
    {
      cabecera: "CJ",
      descripcion: "OFICINA DEL CONSEJERO JURÍDICO"
    },
    {
      cabecera: "DGC",
      descripcion: "DIRECCIÓN GENERAL CONSULTIVA"
    },
    {
      cabecera: "DGdC",
      descripcion: "DIRECCIÓN GENERAL DE LO CONTENCIOSO"
    },
    {
      cabecera: "DEL",
      descripcion: "DIRECCIÓN DE ESTUDIOS LEGISLATIVOS"
    },
    {
      cabecera: "DEJ",
      descripcion: "DIRECCIÓN DE ESTUDIOS JURÍDICOS"
    },
    {
      cabecera: "DSL",
      descripcion: "DIRECCIÓN DE SERVICIOS LEGALES"
    },
    {
      cabecera: "DATCC",
      descripcion: "DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN"
    },
    {
      cabecera: "DCNAIG",
      descripcion: "DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO"
    },
    {
      cabecera: "DCCG",
      descripcion: "DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN"
    },
    {
      cabecera: "DA",
      descripcion: "DIRECCIÓN ADMINISTRATIVA"
    },
    {
      cabecera: "UT",
      descripcion: "UNIDAD DE TRANSPARENCIA"
    }
  ];

  public categories: string[] = [
    'CJ',
    'DGC',
    'DGdC',
    'DEL',
    'DEJ',
    'DSL',
    'DATCC',
    'DCNAIG',
    'DCCG',
    'DA',
    'UT'
  ];

  constructor(private _documentService: DocumentService){

  }

  ngOnInit(): void {
    this.getTest();
    this.getTrim122();
    this.getTrim222();
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

  getTest():void{
    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'OFICINA DEL CONSEJERO JURÍDICO'
          ).filter(({estatus}) => estatus === 'EN TRAMITE').length;
        this.tramite[0] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'OFICINA DEL CONSEJERO JURÍDICO'
          ).filter(({estatus}) => estatus === 'CONCLUIDO').length;
        this.concluido[0] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'OFICINA DEL CONSEJERO JURÍDICO'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO').length;
        this.conocimiento[0] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL CONSULTIVA'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO').length;
        this.conocimiento[1] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL CONSULTIVA'
          ).filter(({estatus}) => estatus === 'EN TRAMITE').length;
        this.tramite[1] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL CONSULTIVA'
          ).filter(({estatus}) => estatus === 'CONCLUIDO').length;
        this.concluido[1] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL DE LO CONTENCIOSO'
          ).filter(({estatus}) => estatus === 'CONCLUIDO').length;
        this.concluido[2] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL DE LO CONTENCIOSO'
          ).filter(({estatus}) => estatus === 'EN TRAMITE').length;
        this.tramite[2] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL DE LO CONTENCIOSO'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO').length;
        this.conocimiento[2] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS LEGISLATIVOS'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO').length;
        this.conocimiento[3] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS LEGISLATIVOS'
          ).filter(({estatus}) => estatus === 'EN TRAMITE').length;
        this.tramite[3] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS LEGISLATIVOS'
          ).filter(({estatus}) => estatus === 'CONCLUIDO').length;
        this.concluido[3] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS JURÍDICOS'
          ).filter(({estatus}) => estatus === 'CONCLUIDO').length;
        this.concluido[4] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS JURÍDICOS'
          ).filter(({estatus}) => estatus === 'EN TRAMITE').length;
        this.tramite[4] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS JURÍDICOS'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO').length;
        this.conocimiento[4] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE SERVICIOS LEGALES'
          ).filter(({estatus}) => estatus === 'EN TRAMITE').length;
        this.tramite[5] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE SERVICIOS LEGALES'
          ).filter(({estatus}) => estatus === 'CONCLUIDO').length;
        this.concluido[5] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE SERVICIOS LEGALES'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO').length;
          this.conocimiento[5] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO').length;
          this.conocimiento[6] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN'
          ).filter(({estatus}) => estatus === 'EN TRAMITE').length;
          this.tramite[6] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN'
          ).filter(({estatus}) => estatus === 'CONCLUIDO').length;
          this.concluido[6] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO'
          ).filter(({estatus}) => estatus === 'CONCLUIDO').length;
          this.concluido[7] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO'
          ).filter(({estatus}) => estatus === 'EN TRAMITE').length;
          this.tramite[7] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO').length;
          this.conocimiento[7] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO').length;
          this.conocimiento[8] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN'
          ).filter(({estatus}) => estatus === 'EN TRAMITE').length;
          this.tramite[8] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN'
          ).filter(({estatus}) => estatus === 'CONCLUIDO').length;
          this.concluido[8] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN ADMINISTRATIVA'
          ).filter(({estatus}) => estatus === 'CONCLUIDO').length;
          this.concluido[9] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN ADMINISTRATIVA'
          ).filter(({estatus}) => estatus === 'EN TRAMITE').length;
          this.tramite[9] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN ADMINISTRATIVA'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO').length;
          this.conocimiento[9] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'UNIDAD DE TRANSPARENCIA'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO').length;
          this.conocimiento[10] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'UNIDAD DE TRANSPARENCIA'
          ).filter(({estatus}) => estatus === 'EN TRAMITE').length;
          this.tramite[10] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'UNIDAD DE TRANSPARENCIA'
          ).filter(({estatus}) => estatus === 'CONCLUIDO').length;
          this.concluido[10] = result;
      },
      err => {
        console.log(err);
      }
    );
  }

  getTrim122():void{
    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'OFICINA DEL CONSEJERO JURÍDICO'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.tramiteTrim122[0] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'OFICINA DEL CONSEJERO JURÍDICO'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.concluidoTrim122[0] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'OFICINA DEL CONSEJERO JURÍDICO'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.conocimientoTrim122[0] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL CONSULTIVA'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.conocimientoTrim122[1] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL CONSULTIVA'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.tramiteTrim122[1] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL CONSULTIVA'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.concluidoTrim122[1] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL DE LO CONTENCIOSO'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.concluidoTrim122[2] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL DE LO CONTENCIOSO'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.tramiteTrim122[2] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL DE LO CONTENCIOSO'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.conocimientoTrim122[2] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS LEGISLATIVOS'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.conocimientoTrim122[3] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS LEGISLATIVOS'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.tramiteTrim122[3] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS LEGISLATIVOS'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.concluidoTrim122[3] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS JURÍDICOS'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.concluidoTrim122[4] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS JURÍDICOS'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.tramiteTrim122[4] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS JURÍDICOS'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.conocimientoTrim122[4] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE SERVICIOS LEGALES'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.tramiteTrim122[5] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE SERVICIOS LEGALES'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
        this.concluidoTrim122[5] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE SERVICIOS LEGALES'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.conocimientoTrim122[5] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.conocimientoTrim122[6] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.tramiteTrim122[6] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.concluidoTrim122[6] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.concluidoTrim122[7] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.tramiteTrim122[7] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.conocimientoTrim122[7] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.conocimientoTrim122[8] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.tramiteTrim122[8] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.concluidoTrim122[8] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN ADMINISTRATIVA'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.concluidoTrim122[9] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN ADMINISTRATIVA'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.tramiteTrim122[9] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN ADMINISTRATIVA'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.conocimientoTrim122[9] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'UNIDAD DE TRANSPARENCIA'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.conocimientoTrim122[10] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'UNIDAD DE TRANSPARENCIA'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.tramiteTrim122[10] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'UNIDAD DE TRANSPARENCIA'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-01' && fecha_recepcion <= '2022-03'
          ).length;
          this.concluidoTrim122[10] = result;
      },
      err => {
        console.log(err);
      }
    );
  }

  getTrim222(): void{
    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'OFICINA DEL CONSEJERO JURÍDICO'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.tramiteTrim222[0] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'OFICINA DEL CONSEJERO JURÍDICO'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.concluidoTrim222[0] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'OFICINA DEL CONSEJERO JURÍDICO'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.conocimientoTrim222[0] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL CONSULTIVA'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.conocimientoTrim222[1] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL CONSULTIVA'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.tramiteTrim222[1] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL CONSULTIVA'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.concluidoTrim222[1] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL DE LO CONTENCIOSO'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.concluidoTrim222[2] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL DE LO CONTENCIOSO'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.tramiteTrim222[2] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN GENERAL DE LO CONTENCIOSO'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.conocimientoTrim222[2] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS LEGISLATIVOS'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.conocimientoTrim222[3] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS LEGISLATIVOS'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.tramiteTrim222[3] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS LEGISLATIVOS'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.concluidoTrim222[3] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS JURÍDICOS'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.concluidoTrim222[4] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS JURÍDICOS'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.tramiteTrim222[4] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ESTUDIOS JURÍDICOS'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.conocimientoTrim222[4] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE SERVICIOS LEGALES'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.tramiteTrim222[5] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE SERVICIOS LEGALES'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.concluidoTrim222[5] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE SERVICIOS LEGALES'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
          this.conocimientoTrim222[5] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
          this.conocimientoTrim222[6] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
          this.tramiteTrim222[6] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE ASISTENCIA TÉCNICA Y COMBATE A LA CORRUPCIÓN'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
          this.concluidoTrim222[6] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
          this.concluidoTrim222[7] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
          this.tramiteTrim222[7] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COMPILACIÓN NORMATIVA, ARCHIVO E IGUALDAD DE GÉNERO'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
          this.conocimientoTrim222[7] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
          this.conocimientoTrim222[8] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
          this.tramiteTrim222[8] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN DE COORDINACIÓN Y CONTROL DE GESTIÓN'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
          this.concluidoTrim222[8] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN ADMINISTRATIVA'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
          this.concluidoTrim222[9] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN ADMINISTRATIVA'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
          this.tramiteTrim222[9] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'DIRECCIÓN ADMINISTRATIVA'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
          this.conocimientoTrim222[9] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'UNIDAD DE TRANSPARENCIA'
          ).filter(({estatus}) => estatus === 'PARA CONOCIMIENTO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
        this.conocimientoTrim222[10] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'UNIDAD DE TRANSPARENCIA'
          ).filter(({estatus}) => estatus === 'EN TRAMITE'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
          this.tramiteTrim222[10] = result;
      },
      err => {
        console.log(err);
      }
    );

    this._documentService.getDocuments().subscribe(
      res => {
        this.documents = res.document;
        const result = this.documents.filter(
          ({asignado}) => asignado === 'UNIDAD DE TRANSPARENCIA'
          ).filter(({estatus}) => estatus === 'CONCLUIDO'
          ).filter(({fecha_recepcion}) => fecha_recepcion >= '2022-04' && fecha_recepcion <= '2022-06'
          ).length;
          this.concluidoTrim222[10] = result;
      },
      err => {
        console.log(err);
      }
    );
  }
}
